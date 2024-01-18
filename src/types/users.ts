interface User {
  id: string
  username: string
  privateChats: PrivateChat[]
}
interface UserRequest {
  username: string
}
