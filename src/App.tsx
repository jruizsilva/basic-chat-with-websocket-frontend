import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import { ChatApp } from 'components/ChatApp'
import { useAddUserMutation } from 'hooks/mutation/useAddUserMutation'
import { useLogoutMutation } from 'hooks/mutation/useLogoutMutation'
import {
  useAppStore,
  type ChatMessage,
  type UserRequest
} from 'store/useAppStore'

export function App() {
  const stompClient = useAppStore((store) => store.stompClient)
  const logout = useAppStore((store) => store.logout)
  const setUserAuthenticated = useAppStore(
    (store) => store.setUserAuthenticated
  )
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const addMessage = useAppStore((store) => store.addMessage)
  const setStompClient = useAppStore((store) => store.setStompClient)
  const { logoutUser } = useLogoutMutation()
  const queryClient = useQueryClient()

  const { addUser } = useAddUserMutation()

  useEffect(() => {
    if (userAuthenticated !== null && stompClient === null) {
      const socket = new SockJS('http://localhost:8080/ws')

      const stompClient = Stomp.over(socket)

      setStompClient(stompClient)

      stompClient.connect({}, () => {
        console.log('connected')
        stompClient.subscribe('/topic/messages', (message) => {
          const newMessage = JSON.parse(message.body)

          addMessage(newMessage as ChatMessage)
        })
        stompClient.subscribe('/topic/users', (message) => {
          const users = JSON.parse(message.body)

          console.log(users)
          queryClient.invalidateQueries({ queryKey: ['users'] })
        })
      })
    }

    return () => {
      if (stompClient !== null && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log('web socket disconnected')
          logout()
        })
      }
    }
  }, [
    userAuthenticated,
    addMessage,
    stompClient,
    setStompClient,
    logout,
    setUserAuthenticated,
    queryClient
  ])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string

    const user: UserRequest = {
      username
    }

    addUser(user)
  }
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
    <>
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
      <Box maxW={{ base: '480px' }} mx={'auto'}>
        {userAuthenticated === null && (
          <>
            <Box>
              <Heading mb={5} size={'lg'}>
                Login
              </Heading>
            </Box>
            <Box
              as={'form'}
              display={'flex'}
              flexDirection={'column'}
              gap={4}
              onSubmit={handleSubmit}
            >
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input required minLength={2} name='username' />
              </FormControl>
              <Button type='submit'>Login</Button>
            </Box>
          </>
        )}
      </Box>
      <Box maxW={{ base: '480px', sm: '768px', md: '992px' }} mx={'auto'}>
        {userAuthenticated !== null && (
          <Box display={'flex'} flexDir={'column'} gap={6}>
            <Text fontSize={'2xl'}>Welcome {userAuthenticated.username}</Text>
            <ChatApp />
          </Box>
        )}
      </Box>
    </>
  )
}
