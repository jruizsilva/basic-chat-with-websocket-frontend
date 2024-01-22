interface User {
  id: string
  username: string
  privateChats: ChatRoom[]
}
interface UserRequest {
  username: string
}
