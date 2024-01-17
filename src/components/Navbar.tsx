import { Avatar, Box, Button, Heading, Text } from '@chakra-ui/react'

import { useLogoutMutation } from 'hooks/mutation/useLogoutMutation'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function Navbar(props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const stompClient = useAppStore((store) => store.stompClient)
  const logout = useAppStore((store) => store.logout)
  const { logoutUser } = useLogoutMutation()

  const handleLogout = () => {
    if (
      userAuthenticated !== null &&
      stompClient !== null &&
      stompClient.connected
    ) {
      logoutUser(userAuthenticated)
      stompClient.disconnect(() => {
        console.log('web socket disconnected')
        logout()
      })
    }
  }

  return (
    <Box borderBottom='1px' borderColor='gray.200' mb={8}>
      <Box maxW={{ base: '480px', sm: '768px', md: '992px' }} mx={'auto'}>
        <Box display={'flex'} py={4}>
          <Heading mr={'auto'} size={'lg'}>
            Chat app
          </Heading>
          {userAuthenticated !== null && (
            <Box
              alignContent={'center'}
              display={'flex'}
              gap={8}
              justifyContent={'center'}
            >
              <Box
                alignItems={'center'}
                display={'flex'}
                gap={2}
                justifyContent={'center'}
              >
                <Avatar name={userAuthenticated.username} size={'sm'} />
                <Text fontSize={'2xl'}>{userAuthenticated.username}</Text>
              </Box>
              <Button variant={'outline'} onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
