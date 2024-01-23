interface User {
  id: string
  username: string
  privateChats: ChatRoom[]
  messageUnreads: MessageUnread[]
}
interface UserRequest {
  username: string
}

interface MessageUnread {
  fromUsername: string
  count: number
}
