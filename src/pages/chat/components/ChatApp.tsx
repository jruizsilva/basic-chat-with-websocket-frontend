import { Box, Heading } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { UserList } from 'pages/chat/components/UserList'

interface Props {}

export function ChatApp(props: Props): JSX.Element {
  return (
    <Box display={'flex'} gap={'64px'} justifyContent={'space-between'}>
      <Box display={'flex'} flexDir={'column'} flexGrow={1} gap={4}>
        <Heading>Usuarios conectados</Heading>
        <Box backgroundColor={'gray.700'} borderRadius={'8px'} height={'300px'}>
          <UserList />
        </Box>
      </Box>
      <Outlet />
    </Box>
  )
}
