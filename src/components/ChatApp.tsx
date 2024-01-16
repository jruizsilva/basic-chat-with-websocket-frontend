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

import { type ChatMessage, useAppStore } from 'store/useAppStore'

interface Props {}

export function ChatApp(props: Props): JSX.Element {
  const user = useAppStore((store) => store.user)
  const stompClient = useAppStore((store) => store.stompClient)
  const messages = useAppStore((store) => store.messages)
  const addMessage = useAppStore((store) => store.addMessage)
  const [message, setMessage] = useState('')

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (message.trim().length === 0 || stompClient === null || user === null)
      return

    const chatMessage: ChatMessage = {
      sender: user,
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
    <Box display={'flex'} flexDir={'column'} gap={4}>
      <Heading>Lista mensajes</Heading>
      <Box
        backgroundColor={'gray.700'}
        borderRadius={'8px'}
        height={'300px'}
        position={'relative'}
      >
        <List height={'240px'} overflow={'auto'} padding={'16px'} spacing={3}>
          {messages.map((item) => (
            <ListItem key={item.id} display={'flex'} gap={2}>
              <Avatar name={item.sender} size={'sm'} />
              <Text>{item.content}</Text>
            </ListItem>
          ))}
        </List>
        <Box
          as={'form'}
          bottom={'12px'}
          display={'flex'}
          left={'12px'}
          position={'absolute'}
          right={'8px'}
          width={'calc(100% - 24px)'}
          onSubmit={sendMessage}
        >
          <InputGroup>
            <Input value={message} onChange={handleMessageChange} />
            <InputRightElement width='4.5rem'>
              <Button
                h='1.75rem'
                isDisabled={message.trim().length === 0}
                size='sm'
                type='submit'
              >
                Enviar
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </Box>
  )
}
