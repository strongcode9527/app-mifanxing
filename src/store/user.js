import dayjs from 'dayjs'
import {pathOr} from 'ramda'
import {types, flow} from 'mobx-state-tree'
import CookieManager from 'react-native-cookies'

import * as api from '../api'

export const UserStore = types
  .model('UserStore', {
    token: types.string,
  })
  .views(self => ({
  }))
  .actions(self => {
    const login = flow(function* (account, password) {
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

      self.token = access_token

    })

    return {
      login,
    }
  })
