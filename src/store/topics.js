
import { observable } from 'mobx'



export default class topics{
  @observable  allDatas = {}
  constructor(data, rootStore) {
    this.data = [1,2,3,4]
    this.rootStore = rootStore
  }
}
