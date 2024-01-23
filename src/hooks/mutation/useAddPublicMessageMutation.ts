import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { fetchAddPublicMessage } from 'services/public-messages'

export const useAddPublicMessageMutation = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ['addPublicMessage'],
    mutationFn: async (publicMessageRequest: PublicMessageRequest) => {
      return await fetchAddPublicMessage(publicMessageRequest)
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        error.response?.data !== null
          ? (error?.response?.data as string)
          : 'Something went wrong'

      toast.error(errorMessage)
    }
  })

  return { addPublicMessage: mutate, ...rest }
}
