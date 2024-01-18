import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { fetchAddPrivateMessageToPrivateChat } from 'services/chat'
import { useAppStore } from 'store/useAppStore'

export const useAddPrivateMessageToPrivateChatMutation = () => {
  const setPrivateChat = useAppStore((store) => store.setPrivateChat)
  const { mutate, ...rest } = useMutation({
    mutationKey: ['addPrivateMessageToPrivateChat'],
    mutationFn: async (addPrivateMessageRequest: AddPrivateMessageRequest) => {
      return await fetchAddPrivateMessageToPrivateChat(addPrivateMessageRequest)
    },
    onSuccess: (privateChat: PrivateChat) => {
      setPrivateChat(privateChat)
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        error.response?.data !== null
          ? (error?.response?.data as string)
          : 'Something went wrong'

      toast.error(errorMessage)
    }
  })

  return { addPrivateMessageToPrivateChat: mutate, ...rest }
}
