import { publicInstance } from './api/axios'

import { type User, type UserRequest } from 'store/useAppStore'

export const fetchAddUser = async (userRequest: UserRequest) => {
  const response = await publicInstance.post<User>('/users', userRequest)
  const data = response.data

  return data
}

export const fetchDeleteUser = async (userRequest: UserRequest) => {
  const response = await publicInstance.patch('/users/deleteUser', userRequest)
  const data = response.data

  return data
}

export const fetchAllUserOnline = async () => {
  const response = await publicInstance.get<User[]>('/users')
  const data = response.data

  return data
}
