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

type PrivateMessageRequest = Omit<PublicMessage, 'id'>
