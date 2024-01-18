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

export const fetchAddPrivateMessageToPrivateChat = async (
  addPrivateMessageRequest: AddPrivateMessageRequest
) => {
  const response = await publicInstance.patch<PrivateChat>(
    `/private-chat`,
    addPrivateMessageRequest
  )
  const privateChat = response.data

  return privateChat
}
