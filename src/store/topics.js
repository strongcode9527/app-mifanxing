import {values} from 'mobx'
import {types, getParent, flow} from 'mobx-state-tree'
import axios from 'axios'



export const Topic = types.model('Topic', {
  id: types.number,
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
