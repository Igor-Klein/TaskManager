import axios from 'axios'
import qs from 'qs'
import {toCamelCase, toSnakeCase} from './Util'

export default class Client {
  __resource(url) {
    return `${window.location.protocol}//${window.location.host}/${url}`
  }

  get(url, data, successCB, catchCB) {
    return this.__perform('get', url, data, successCB, catchCB)
  }

  post(url, data, successCB, catchCB) {
    return this.__perform('post', url, data, successCB, catchCB)
  }

  put(url, data, successCB, catchCB) {
    return this.__perform('put', url, data, successCB, catchCB)
  }

  delete(url, data, successCB, catchCB) {
    return this.__perform('delete', url, data, successCB, catchCB)
  }

  __getCSRFToken(name) {
    let cookieValue = null

    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';')

      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        // Does this cookie string begin with the name we want?

        if (cookie.substring(0, name.length + 1) === `${name}=`) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }

    return cookieValue
  }

  __perform(method, url, data, successCB, catchCB) {
    const headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken': this.__getCSRFToken('csrftoken')
    }

    let params = null

    if (method.toLowerCase() === 'get' || method.toLowerCase() === 'delete') {
      // If a GET or DELETE request
      // These request types use 'params' not 'data'
      params = {...data}
      Object.freeze(params)
      data = null
    }

    // You can intercept requests or responses before they are handled by then or catch.
    // https://github.com/axios/axios#interceptors

    // Add a response interceptor and camelCase return data (for JS)
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

    const response = axios({
      method,
      url: this.__resource(url),
      headers,
      params, // GET and DELETE requests have params
      // remove array params bracket
      paramsSerializer: params => {
        return qs.stringify(params, {indices: false})
      },
      data // POST and PUT requests have data
    })

    if (successCB || catchCB) {
      return response.then(successCB).catch(catchCB)
    }

    return response
  }
}
