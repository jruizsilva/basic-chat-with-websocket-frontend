import { useQuery } from '@tanstack/react-query'

import { fetchAllPublicMessages } from 'services/messages'
import { useAppStore } from 'store/useAppStore'

export const usePublicMessagesQuery = () => {
  const setPublicMessages = useAppStore((store) => store.setPublicMessages)
  const { data, ...rest } = useQuery({
    queryKey: ['public-messages'],
    queryFn: async () => {
      return await fetchAllPublicMessages()
    }
  })

  if (data === undefined) return
  console.log(data)
  setPublicMessages(data)

  return { data, ...rest }
}
