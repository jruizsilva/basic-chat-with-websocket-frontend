import { publicInstance } from '../api/axios'

export const fetchCreateChatRoom = async (chatRoomRequest: ChatRoomRequest) => {
  const response = await publicInstance.post<ChatRoom>(
    '/chat-rooms',
    chatRoomRequest
  )
  const chatRoom = response.data

  return chatRoom
}

export const fetchAddPrivateMessageToChatRoom = async (
  addPrivateMessageRequest: AddPrivateMessageRequest
) => {
  const response = await publicInstance.patch<ChatRoom>(
    `/chat-rooms`,
    addPrivateMessageRequest
  )
  const chatRoom = response.data

  return chatRoom
}
