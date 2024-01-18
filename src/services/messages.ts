import { publicInstance } from './api/axios'

const BASE_URL = '/public-messages'

export const fetchAddPublicMessage = async (
  publicMessageRequest: PublicMessageRequest
) => {
  const response = await publicInstance.post<PublicMessage>(
    BASE_URL,
    publicMessageRequest
  )
  const newPublicMessage = response.data

  return newPublicMessage
}

export const fetchAllPublicMessages = async () => {
  const response = await publicInstance.get<PublicMessage[]>(BASE_URL)
  const publicMessages = response.data

  return publicMessages
}
