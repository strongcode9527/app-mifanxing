import {types} from 'mobx-state-tree'

import {UserStore} from './user'
import {TopicStore} from './topics'




const Store = types.
  model('mifanxing', {
    topicStore: types.optional(TopicStore, {
      topics: [],
    }),
    userStore: types.optional(UserStore, {
      token: '',
      error: '',
    })
  })
  .actions(self => ({
    afterCreate() {
      // self.userStore
    }
  }))

export default Store