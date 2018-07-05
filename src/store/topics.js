
import {types, flow} from 'mobx-state-tree'

import * as api from '../api'

const post = types.model('post', {
  title: types.string,
  // description: types.string,
  content: types.optional(types.string, '')
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
  forumId: types.number,
})

export const TopicStore = types
  .model('TopicStore', {
    isLoading: false,
    topics: types.array(Topic),
    meta: types.optional(Meta, {
      number: 1,
      last: false,
    }),
    topic: types.optional(Topic, {
      id: 0,
      images: [],
      post: {
        title: ''
      },
      forumId: 0,
    })
  })
  .views(self => ({
    get getAll() {
      return self.topics
    },
    get getNews() {
      return self.topics.filter(item => item.forumId === 3)
    },
    get getEvaluatings() {
      return self.topics.filter(item => item.forumId === 4)
    },
    get getVideos() {
      return self.topics.filter(item => item.forumId === 5)
    }
  }))
  .actions(self => {
    const fetchTopics = flow(function* (number, size, forumId) {
      console.log(number, size, forumId)
      self.isloading = true
      const json = yield api.fetchTopics(number, 10, forumId)
      self.meta = json.data.meta
      self.topics.push(...json.data.data)
      self.isloading = false
    })

    const fetchTopicDetail = flow(function* (id) {
      const json = yield api.fetchTopicDetail(id)

      self.topic = json.data.data

    })

    return {
      fetchTopics,
      fetchTopicDetail
    }
  })
