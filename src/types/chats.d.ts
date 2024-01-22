interface ChatRoom {
  id: number
  chatName: string
  messages: PrivateMessage[]
  status: MessageStatus
}
type ChatRoomRequest = Omit<ChatRoom, 'id' | 'messages' | 'status'>

type MessageStatus = 'UNREAD' | 'READ'
