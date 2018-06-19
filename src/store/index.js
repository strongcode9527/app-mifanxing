import topics from './topics'

class RootStore {
  constructor() {
    this.topics = new topics([],this)
  }
}

export default new RootStore()