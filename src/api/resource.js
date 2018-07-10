import axios from "axios/index";


axios.defaults.baseURL = 'http://www.mifanxing.com/api'

export const topicsResource = (method, id, data, api='article/topics') => {
  return axios[method](api+ (id?('/'+id):''), data)
}

export const oauthResource = (method, id, data, api='user/oauth') => {
  return axios[method](api+ (id?('/'+id):''), data)
}





