import { Box, Text } from '@chakra-ui/react'

import { ChatApp } from 'components/ChatApp'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function ChatPage(props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  return (
    <Box maxW={{ base: '480px', sm: '768px', md: '992px' }} mx={'auto'}>
      {userAuthenticated !== null && (
        <Box display={'flex'} flexDir={'column'} gap={6}>
          <Text fontSize={'2xl'}>Welcome {userAuthenticated.username}</Text>
          <ChatApp />
        </Box>
      )}
    </Box>
  )
}
