import { publicInstance } from './api/axios'

import { type User, type UserRequest } from 'store/useAppStore'

export const fetchAddUser = async (userRequest: UserRequest) => {
  const response = await publicInstance.post<User>('/users', userRequest)
  const data = response.data

  return data
}
