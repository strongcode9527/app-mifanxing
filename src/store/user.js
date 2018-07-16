import dayjs from 'dayjs'
import {pathOr, path} from 'ramda'
import jwtDecode from 'jwt-decode'
import {types, flow} from 'mobx-state-tree'
import CookieManager from 'react-native-cookies'

import * as api from '../api'

export const UserStore = types
  .model('UserStore', {
    token: types.string,
    error: types.string,
    userId: types.string,
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

        self.userId = pathOr('', ['user_id'], jwtDecode(access_token))
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
      try{

      }catch(e) {

      }
    })
      


    return {
      login,
      clearError,
      fetchUserInfo
    }
  })
