import axios from 'axios'
import qs from 'qs'
import {toCamelCase, toSnakeCase} from './Util'

export function authenticityToken() {
  const token = document.querySelector('meta[name="csrf-token"]')
  return token ? token.content : null
}

function headers() {
  return {
    Accept: '*/*',
    'content-Type': 'application/json',
    'X-CSRF-Token': authenticityToken(),
    'X-Requested-With': 'XMLHttpRequest'
  }
}

export function fetch(method, url, data) {
  // let params = null

  // if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
  //   // If a GET or DELETE request
  //   // These request types use 'params' not 'data'
  //   params = {...data}
  //   Object.freeze(params)
  //   data = null
  // }

  axios.interceptors.response.use(
    response => {
      response.data = toCamelCase(response.data)

      return response
    },
    error => {
      error.response.data = toCamelCase(error.response.data)

      return Promise.reject(error)
    }
  )

  // Add a request interceptor and snakeCase POST data (for django)
  axios.interceptors.request.use(
    config => {
      config.params = toSnakeCase(config.params)
      config.data = toSnakeCase(config.data)

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  const options = {
    method,
    headers: headers(),
    data,
    // params, // GET and DELETE requests have params
    // // remove array params bracket
    // paramsSerializer: params => {
    //   return qs.stringify(params, {indices: false})
    // },
    url
  }
  return axios(options)
}
