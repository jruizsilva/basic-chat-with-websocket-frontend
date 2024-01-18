interface PrivateChat {
  id: number
  chatName: string
  messages: PrivateMessage[]
}
type PrivateChatRequest = Omit<PrivateChat, 'id' | 'messages'>
