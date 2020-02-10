import {fetch} from './Fetch'

export default {
  post(url, body) {
    return fetch('POST', url, body)
  }
}
//   get (task) {
//     return fetch('GET', url, body)
//   },
//   put (url, body) {
//     return fetch('PUT', url, body)
//   },
//   delete (url, body) {
//     return fetch('DELETE', url, body)
//   }
