import { Box, Button, Text } from '@chakra-ui/react'
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
        <Box maxWidth={'300px'} mx={'auto'}>
          <Box
            backgroundColor={'gray.900'}
            display={'flex'}
            gap={2}
            mx={'auto'}
            p='5px'
            rounded={'8px'}
            width={'300px'}
          >
            <Button
              isActive
              _active={{ backgroundColor: 'gray.800', color: 'white' }}
              color={'#bbb'}
              flexGrow={1}
              size={'sm'}
              variant={'unstyled'}
            >
              Chat general
            </Button>
            <Button
              _active={{ backgroundColor: 'gray.800', color: 'white' }}
              color={'#bbb'}
              flexGrow={1}
              size={'sm'}
              variant={'unstyled'}
            >
              Chat usuarios
            </Button>
          </Box>
        </Box>

        <Outlet />
      </Box>
    </Box>
  )
}
