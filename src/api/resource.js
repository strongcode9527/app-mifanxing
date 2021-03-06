import axios from "axios/index";
import CookieManager from "react-native-cookies";


axios.defaults.baseURL = 'http://www.mifanxing.com/api'

let token = ''




export const injectToken = (token) => {

  function inject(token) {
    axios.interceptors.request.use(function (config) {
      config.headers = config.headers || {}
      if (token) {
        config.headers.Authorization = 'Bearer ' + token
      }
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })
  }


  if(token) {
    inject(token)
  }else {
    CookieManager.getAll()
      .then((res) => {
        inject(res.token.value)
      });
  }

}


// 请求添加token

export const topicsResource = (method, id, data, api='article/topics') => {
  return axios[method](api+ (id?('/'+id):''), data)
}

export const oauthResource = (method, id, data, api='user/oauth') => {
  return axios[method](api+ (id?('/'+id):''), data)
}

export const userResource = (method, id, data, api='user/profiles') => {
  return axios[method](api+ (id?('/'+id):''), data)
}



