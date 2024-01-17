import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { fetchLogoutUser } from 'services/users'
import { type UserRequest } from 'store/useAppStore'

export const useLogoutMutation = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ['logoutUser'],
    mutationFn: async (userRequest: UserRequest) => {
      return await fetchLogoutUser(userRequest)
    },
    onSuccess: () => {
      toast('Logout successfuly')
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        error.response?.data !== null
          ? (error?.response?.data as string)
          : 'Something went wrong'

      toast.error(errorMessage)
    }
  })

  return { logoutUser: mutate, ...rest }
}