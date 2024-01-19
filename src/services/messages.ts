import { publicInstance } from '../api/axios'

export const fetchAddPublicMessage = async (
  publicMessageRequest: PublicMessageRequest
) => {
  const response = await publicInstance.post<PublicMessage>(
    '/public-messages',
    publicMessageRequest
  )
  const newPublicMessage = response.data

  return newPublicMessage
}

export const fetchAllPublicMessages = async () => {
  const response = await publicInstance.get<PublicMessage[]>('/public-messages')
  const publicMessages = response.data

  return publicMessages
}

export const fetchDeleteAllPublicMesaggesBySender = async (sender: string) => {
  await publicInstance.delete(`/public-messages?sender=${sender}`)
}
