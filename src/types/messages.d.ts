interface PublicMessage {
  id: string
  sender: string
  content: string
}

type PublicMessageRequest = Omit<PublicMessage, 'id'>

interface PrivateMessage {
  id: string
  sender: string
  content: string
  receiver: string
}

type PrivateMessageRequest = Omit<PrivateMessage, 'id'>
type AddPrivateMessageRequest = Omit<PrivateMessage, 'id'> & {
  chatName: string
}

interface UnreadMessage {
  sender: string
  content: string
}
type UnreadMessages = Record<string, UnreadMessage[]>
