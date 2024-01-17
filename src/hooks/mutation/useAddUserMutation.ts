import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { fetchAddUser } from 'services/users'
import { useAppStore, type User, type UserRequest } from 'store/useAppStore'

export const useAddUserMutation = () => {
  const setUserAuthenticated = useAppStore(
    (store) => store.setUserAuthenticated
  )
  const { mutate, ...rest } = useMutation({
    mutationKey: ['addUser'],
    mutationFn: async (userRequest: UserRequest) => {
      return await fetchAddUser(userRequest)
    },
    onSuccess: (userAuthenticated: User) => {
      setUserAuthenticated(userAuthenticated)
      toast.success('Login successfuly')
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        error.response?.data !== null
          ? (error?.response?.data as string)
          : 'Something went wrong'

      toast.error(errorMessage)
    }
  })

  return { addUser: mutate, ...rest }
}
