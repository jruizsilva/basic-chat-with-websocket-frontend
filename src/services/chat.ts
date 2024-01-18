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

export const fetchAddMessageToPrivateChat = async ({
  chatName,
  ...addPrivateMessageRequest
}: AddPrivateMessageRequest) => {
  const response = await publicInstance.patch<PrivateChat>(
    `/private-chat?chatName=${chatName}`,
    addPrivateMessageRequest
  )
  const privateChat = response.data

  return privateChat
}
