import dayjs from 'dayjs'
import {pathOr, path} from 'ramda'
import jwtDecode from 'jwt-decode'
import {types, flow} from 'mobx-state-tree'
import CookieManager from 'react-native-cookies'

import * as api from '../api'
import axios from "axios/index";


const userInfo = types.model('userInfo', {
  fullname: types.string,
  userAvatar: types.string,
})

export const UserStore = types
  .model('UserStore', {
    token: types.string,
    error: types.string,
    userId: types.string,
    userInfo: types.optional(userInfo, {
      fullname: '',
      userAvatar: '',
    })
  })
  .views(self => ({
  }))
  .actions(self => {

    const login = flow(function* (account, password, navigation) {
      try{
        const json = yield api.login(account, password)

        const {access_token} = pathOr({}, ['data', 'data'], json),
          now = new Date()

        now.setDate(now.getDate() + 7)

        CookieManager.set({
          path: '/',
          origin: '',
          version: '1',
          name: 'token',
          value: access_token,
          domain: 'www.mifanxing.com',
          expiration: dayjs(now).format('YYYY-MM-DDTHH:mm:ss.sssZ'),
        })
        const userId = pathOr('', ['user_id'], jwtDecode(access_token))

        self.fetchUserInfo(userId)

        self.userId = userId
        self.token = access_token
        navigation.navigate('Home')
      }catch(e) {
        self.error = path(['response', 'data', 'errors', '0', 'detail'], e)
      }
    })


    const clearError = () => {
      self.error = ''
    }

    const fetchUserInfo = flow(function* (id) {

      if(!id) {
        const res = yield CookieManager.getAll(),
              token = pathOr('', ['token', 'value'], res)

        id = pathOr('', ['user_id'], jwtDecode(token))
      }


      try{
        const json = yield api.fetchUserInfo(id)

        self.userInfo = pathOr({fullname: '', userAvatar: '',}, ['data', 'data'], json)
      }catch(e) {
        console.log(e)
      }
    })
      


    return {
      login,
      clearError,
      fetchUserInfo
    }
  })
