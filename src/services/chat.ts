import { publicInstance } from './api/axios'

export const fetchCreatePrivateChat = async (
  privateChatRequest: PrivateChatRequest
) => {
  const response = await publicInstance.post<PrivateChat>(
    '/private-chat',
    privateChatRequest
  )
  const privateChat = response.data

  return privateChat
}
