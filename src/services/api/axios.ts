import axios from 'axios'

export const publicInstance = axios.create({
  baseURL: 'http://localhost:8080'
})
