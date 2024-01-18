import {
  Avatar,
  Box,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Text
} from '@chakra-ui/react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Outlet } from 'react-router-dom'

import { useAppStore, type ChatMessage } from 'store/useAppStore'
import { useUsersQuery } from 'hooks/queries/useUsersQuery'

interface Props {}

export function ChatApp(props: Props): JSX.Element {
  useUsersQuery()

  const user = useAppStore((store) => store.userAuthenticated)
  const stompClient = useAppStore((store) => store.stompClient)
  const messages = useAppStore((store) => store.messages)
  const users = useAppStore((store) => store.users)
  const [message, setMessage] = useState('')

  console.log(users)

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim().length === 0 || stompClient === null || user === null)
      return

    const chatMessage: ChatMessage = {
      sender: user.username,
      content: message,
      id: uuidv4()
    }

    stompClient.send('/app/chat', {}, JSON.stringify(chatMessage))
    setMessage('')
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  return (
    <Box display={'flex'} gap={'64px'} justifyContent={'space-between'}>
      <Box display={'flex'} flexDir={'column'} flexGrow={1} gap={4}>
        <Heading>Usuarios conectados</Heading>
        <Box backgroundColor={'gray.700'} borderRadius={'8px'} height={'300px'}>
          <List height={'100%'} overflow={'auto'} padding={'16px'}>
            {users.map((item) => (
              <ListItem
                key={item.id}
                _hover={{ backgroundColor: 'gray.600', cursor: 'pointer' }}
                alignItems={'center'}
                display={'flex'}
                gap={2}
                p={2}
                rounded={'8px'}
              >
                <Avatar name={item.username} size={'sm'} />
                <Text>{item.username}</Text>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Outlet />
    </Box>
  )
}
