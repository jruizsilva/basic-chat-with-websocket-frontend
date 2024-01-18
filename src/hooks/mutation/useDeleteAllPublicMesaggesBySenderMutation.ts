import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { fetchDeleteAllPublicMesaggesBySender } from 'services/messages'

export const useDeleteAllPublicMesaggesBySenderMutation = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ['deleteAllPublicMessagesBySender'],
    mutationFn: async (sender: string) => {
      await fetchDeleteAllPublicMesaggesBySender(sender)
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        error.response?.data !== null
          ? (error?.response?.data as string)
          : 'Something went wrong'

      toast.error(errorMessage)
    }
  })

  return { deleteAllPublicMessagesBySender: mutate, ...rest }
}
