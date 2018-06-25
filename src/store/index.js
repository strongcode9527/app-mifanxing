import {TopicStore} from './topics'
import {types, getEnv} from 'mobx-state-tree'
import axios from 'axios'

axios.defaults.baseURL = 'http://www.mifanxing.com/api'


const Store = types.
  model('mifanxing', {
    topicStore: types.optional(TopicStore, {
      topics: [],
    })
  })
  .actions(self => ({
    afterCreate() {
      self.topicStore.fetchTopics()
    }
  }))

export default Store