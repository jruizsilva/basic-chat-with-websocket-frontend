interface PublicMessage {
  id: string
  sender: string
  content: string
  type?: MessageType
}
type MessageType = 'JOIN' | 'LEAVE' | 'MESSAGE'

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
  chatName: string
  sender: string
  content: string
}
