import {fetch} from './Fetch'
import {toCamelCase, toSnakeCase} from './Util'


export default {
  create(task) {
    return fetch('POST', window.Routes.api_v1_tasks_path(), task)
  },
  index(state, page) {
    return fetch('GET', window.Routes.api_v1_tasks_path({q: {state_eq: state}, page, per_page: 10, format: 'json'}))
  },
  show(cardId) {
    return fetch('GET', window.Routes.api_v1_task_path(cardId, {format: 'json'}))
  },
  update(cardId, task) {
    return fetch('PUT', window.Routes.api_v1_task_path(cardId, {format: 'json'}), task)
  },
  destroy(cardId) {
    return fetch('DELETE', window.Routes.api_v1_task_path(cardId, {format: 'json'}))
  }
}
