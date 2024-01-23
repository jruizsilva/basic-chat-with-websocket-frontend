import { useQuery } from '@tanstack/react-query'

import { fetchFindChatRoomByChatName } from 'services/chat-room'

export const useFindChatRoomByChatName = (chatName: string) => {
  const { data, ...rest } = useQuery({
    queryKey: [`chat-room/${chatName}`],
    queryFn: async () => {
      return await fetchFindChatRoomByChatName(chatName)
    }
  })

  return { data, ...rest }
}
