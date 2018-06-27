
import {types, flow} from 'mobx-state-tree'

import * as api from '../api'

const post = types.model('post', {
  title: types.string,
  // description: types.string,
})

const image = types.model('image', {
  filename: types.string,
})

const Meta = types.model('meta', {
  number: types.number,
  last: types.boolean,
})

export const Topic = types.model('Topic', {
  id: types.number,
  images: types.array(image),
  post: types.optional(post, {
    title: '',
  }),
})

export const TopicStore = types
  .model('TopicStore', {
    isLoading: false,
    topics: types.array(Topic),
    meta: types.optional(Meta, {
      number: 1,
      last: false,
    })
  })
  .views(self => ({
    get getTopics() {
      return self.topics
    },
    get getMeta() {
      return self.meta
    },
    get getIsLoading() {
      return self.isLoading
    }
  }))
  .actions(self => {
    const fetchTopics = flow(function* (number) {
      self.isloading = true
      const json = yield api.fetchTopics(number)
      self.meta = json.data.meta
      self.topics.push(...json.data.data)
      self.isloading = false
    })

    return {
      fetchTopics
    }
  })
