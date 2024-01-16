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
import { useEffect } from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import { ChatApp } from 'components/ChatApp'
import { type ChatMessage, useAppStore } from 'store/useAppStore'
import { capitalize } from 'utils/capitalize'

export function App() {
  const stompClient = useAppStore((store) => store.stompClient)
  const setUser = useAppStore((store) => store.setUser)
  const user = useAppStore((store) => store.user)
  const addMessage = useAppStore((store) => store.addMessage)

  const setStompClient = useAppStore((store) => store.setStompClient)

  useEffect(() => {
    if (user !== null && stompClient === null) {
      const socket = new SockJS('http://localhost:8080/ws')

      const stompClient = Stomp.over(socket)

      setStompClient(stompClient)

      stompClient.connect({}, () => {
        console.log('connected')
        stompClient.subscribe('/topic/messages', (message) => {
          const newMessage = JSON.parse(message.body)

          addMessage(newMessage as ChatMessage)
        })
      })
    }

    return () => {
      if (stompClient !== null && stompClient.connected) {
        stompClient.disconnect(() => {
          console.log('web socket disconnected')
          setStompClient(null)
        })
      }
    }
  }, [user, addMessage, stompClient, setStompClient])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string

    setUser(capitalize(username))
  }
  const handleLogout = () => {
    setUser(null)
    if (user === null && stompClient !== null && stompClient.connected) {
      stompClient.disconnect(() => {
        console.log('web socket disconnected')
        setStompClient(null)
      })
    }
  }

  return (
    <>
      <Box borderBottom='1px' borderColor='gray.200' mb={8}>
        <Box maxW={'480px'} mx={'auto'}>
          <Box display={'flex'} py={4}>
            <Heading mr={'auto'} size={'lg'}>
              Chat app
            </Heading>
            {user !== null && (
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
                  <Avatar name={user} size={'sm'} />
                  <Text fontSize={'2xl'}>{user}</Text>
                </Box>
                <Button variant={'outline'} onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Box maxW={'480px'} mx={'auto'}>
        {user === null && (
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
        {user !== null && (
          <Box display={'flex'} flexDir={'column'} gap={6}>
            <Text fontSize={'2xl'}>Welcome {user}</Text>
            <ChatApp />
          </Box>
        )}
      </Box>
    </>
  )
}
