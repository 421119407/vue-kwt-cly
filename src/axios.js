import axios from 'axios'
import { Message } from 'element-ui'
import store from './store'

const service = axios.create({
  baseURL: 'http://localhost:8081',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  timeout: 5000
})

service.interceptors.request.use(config => {
  if (store.state.user.token) {
    config.headers.token = store.state.user.token
  }
  return config
}, error => {
  console.log(error)
  Promise.reject(error)
})

service.interceptors.response.use(
  response => response,
  error => {
    console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
