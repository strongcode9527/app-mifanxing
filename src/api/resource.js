import axios from "axios/index";


axios.defaults.baseURL = 'http://www.mifanxing.com/api'

export const topicsResouce = (method, id, data, api='article/topics/search') => {
  return axios[method](api+ (id?('/'+id):''), data)
}





