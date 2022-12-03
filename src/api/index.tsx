import axios, { AxiosRequestConfig } from 'axios'
import apiPathMapping from './mapping'
import type { ApiMapping } from './mapping'

const checkCode = (response: any) => {
  const { code, msg } = response
  if (code && code === 10110) return errorHandler(msg)
  return response
}

const errorHandler = (errorHandler: any) => console.log(errorHandler)

const checkStatus = (response: any) => {
  if (response.status >= 200 && response.status < 300) {
    if (response.data) return checkCode(response.data)
    return response
  } else {
    const err = new Error('error')
    // err.response = response
    return err
  }
}

const BASE_URL = () => '' //getConfig().API_URL || process.env.REACT_APP_API_BASE

interface SendRequestConfig extends AxiosRequestConfig {
  isFake?: boolean;
  fakeType?: string
}

const sendRequest = ({ url, method = 'get', data, params, isFake, fakeType }: SendRequestConfig) => { // TODO isFake
  // if (isFake) return fakeApi(fakeType) // TODO isFake
  return axios({
    baseURL: BASE_URL(),
    method,
    url,
    ...(data && { data }),
    ...(params && { params })
  })
}

axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => checkStatus(response),
  error => errorHandler(error)
)

axios.defaults.timeout = 0.5 * 60 * 1000
axios.defaults.headers.common['Content-Type'] = 'application/json'
// axios.defaults.headers = {
//   'Content-Type': 'application/json'
// }

class API {
  constructor (obj: ApiMapping) {
    Object.entries(obj).forEach(([key, val]) => {
      // @ts-ignore: Unreachable code error
      this[key] = async (config: SendRequestConfig) => {
        return await sendRequest({
          method: val.method,
          url: val.path,
          ...config,
          ...(config && config.isFake && { fakeType: key }) // TODO isFake
        })
      }
    })
  }
}

export default new API(apiPathMapping)
