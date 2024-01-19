import { useMutation, useQueryClient } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { fetchAddUser } from 'services/users'
import { useAppStore } from 'store/useAppStore'

export const useAddUserMutation = () => {
  const queryClient = useQueryClient()
  const setUserAuthenticated = useAppStore(
    (store) => store.setUserAuthenticated
  )
  const { mutate, ...rest } = useMutation({
    mutationKey: ['addUser'],
    mutationFn: async (userRequest: UserRequest) => {
      return await fetchAddUser(userRequest)
    },
    onSuccess: (userAuthenticated: User) => {
      const users = queryClient.getQueryData<User[]>(['users'])

      setUserAuthenticated(userAuthenticated)
      if (users !== undefined) {
        queryClient.setQueryData(['users'], [...users, userAuthenticated])
      }
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
