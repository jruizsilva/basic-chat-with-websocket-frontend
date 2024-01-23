import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { fetchCreateChatRoom } from 'services/chat-room'

export const useCreateChatRoomMutation = () => {
  const navigate = useNavigate()
  const { mutate, ...rest } = useMutation({
    mutationKey: ['createPrivateChat'],
    mutationFn: async (privateChatRequest: ChatRoomRequest) => {
      return await fetchCreateChatRoom(privateChatRequest)
    },
    onSuccess: (privateChat: ChatRoom) => {
      navigate(`/chat/users/${privateChat.chatName}`, { state: privateChat })
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
