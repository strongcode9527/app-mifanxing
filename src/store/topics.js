import {values} from 'mobx'
import {types, getParent, flow} from 'mobx-state-tree'
import axios from 'axios'

const post = types.model('post', {
  title: types.string,
  // description: types.string,
})

const image = types.model('image', {
  filename: types.string,
})


export const Topic = types.model('Topic', {
  id: types.number,
  images: types.array(image),
  post: types.optional(post, {
    title: '',
  })
})

export const TopicStore = types
  .model('TopicStore', {
    isLoading: false,
    topics: types.array(Topic)
  })
  .views(self => ({
    get getTopics() {
      return self.topics
    }
  }))
  .actions(self => {
    const fetchTopics = flow(function* () {
      const json = yield axios.get('http://www.mifanxing.com/api/article/topics/search')
      self.topics = json.data.data
    })

    return {
      fetchTopics
    }
  })
