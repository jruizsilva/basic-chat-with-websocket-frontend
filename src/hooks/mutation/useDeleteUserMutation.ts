import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { fetchDeleteUser } from 'services/users'

export const useDeleteUserMutation = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ['deleteUser'],
    mutationFn: async (userRequest: UserRequest) => {
      return await fetchDeleteUser(userRequest)
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

  return { deleteUser: mutate, ...rest }
}
