import { Box, Text } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { usePublicMessagesQuery } from 'hooks/queries/usePublicMessagesQuery'
import { useUsersQuery } from 'hooks/queries/useUsersQuery'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function ChatPage(props: Props): JSX.Element {
  usePublicMessagesQuery()
  useUsersQuery()

  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  return (
    <Box maxW={{ base: '480px', sm: '768px' }} mx={'auto'}>
      <Box display={'flex'} flexDir={'column'} gap={6}>
        <Text fontSize={'2xl'}>Welcome {userAuthenticated?.username}</Text>
        <Outlet />
      </Box>
    </Box>
  )
}
