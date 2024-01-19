import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { fetchCreatePrivateChat } from 'services/chat'

export const useCreatePrivateChatMutation = () => {
  const navigate = useNavigate()
  const { mutate, ...rest } = useMutation({
    mutationKey: ['addUser'],
    mutationFn: async (privateChatRequest: PrivateChatRequest) => {
      return await fetchCreatePrivateChat(privateChatRequest)
    },
    onSuccess: (privateChat: PrivateChat) => {
      navigate(`/chat/users/${privateChat.chatName}`)
    },
    onError: (error: AxiosError) => {
      const errorMessage =
        error.response?.data !== null
          ? (error?.response?.data as string)
          : 'Something went wrong'

      toast.error(errorMessage)
    }
  })

  return { createPrivateChat: mutate, ...rest }
}
