import { useMutation } from '@tanstack/react-query'
import { type AxiosError } from 'axios'
import { toast } from 'react-toastify'

import { fetchAddPrivateMessageToChatRoom } from 'services/chat-room'

export const useAddPrivateMessageToChatRoomMutation = () => {
  const { mutate, ...rest } = useMutation({
    mutationKey: ['addPrivateMessageToPrivateChat'],
    mutationFn: async (addPrivateMessageRequest: AddPrivateMessageRequest) => {
      return await fetchAddPrivateMessageToChatRoom(addPrivateMessageRequest)
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
