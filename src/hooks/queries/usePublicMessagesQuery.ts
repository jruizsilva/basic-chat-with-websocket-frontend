import { useQuery } from '@tanstack/react-query'

import { fetchAllPublicMessages } from 'services/public-messages'

export const usePublicMessagesQuery = () => {
  const { data, ...rest } = useQuery({
    queryKey: ['public-messages'],
    queryFn: async () => {
      return await fetchAllPublicMessages()
    }
  })

  return { data, ...rest }
}
