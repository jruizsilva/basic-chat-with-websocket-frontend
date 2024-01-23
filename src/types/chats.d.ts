interface ChatRoom {
  id: number
  chatName: string
  messages: PrivateMessage[]
}
type ChatRoomRequest = Omit<ChatRoom, 'id' | 'messages' | 'status'>
