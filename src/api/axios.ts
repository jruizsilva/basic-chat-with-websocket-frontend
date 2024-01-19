import axios from 'axios'

import { baseUrl } from 'utils/baseUrl'

export const publicInstance = axios.create({
  baseURL: baseUrl
})
