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
import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { useAddPublicMessageMutation } from 'hooks/mutation/useAddPublicMessageMutation'
import { usePublicMessagesQuery } from 'hooks/queries/usePublicMessagesQuery'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function GlobalMensagges(props: Props): JSX.Element {
  usePublicMessagesQuery()
  const { addPublicMessage } = useAddPublicMessageMutation()

  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const stompClient = useAppStore((store) => store.stompClient)
  const publicMessages = useAppStore((store) => store.publicMessages)

  const [message, setMessage] = useState('')

  const messagesContainer = useRef<HTMLUListElement>(null)

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      message.trim().length === 0 ||
      stompClient === null ||
      userAuthenticated === null
    )
      return

    const publicMessage: PublicMessage = {
      sender: userAuthenticated.username,
      content: message,
      id: uuidv4()
    }

    addPublicMessage(publicMessage)

    setMessage('')
  }

  useEffect(() => {
    if (messagesContainer.current !== null) {
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight
    }
  }, [publicMessages])

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  return (
    <Box display={'flex'} flexDir={'column'} flexGrow={1} gap={4}>
      <Heading>Chat general</Heading>
      <Box
        backgroundColor={'gray.700'}
        borderRadius={'8px'}
        height={'300px'}
        position={'relative'}
      >
        <List
          ref={messagesContainer}
          height={'240px'}
          overflowY={'auto'}
          padding={'16px'}
          spacing={3}
        >
          {publicMessages.map((item) => (
            <ListItem key={item.id} display={'flex'} gap={2}>
              <Box
                display={'flex'}
                gap={2}
                ml={userAuthenticated?.username === item.sender ? 'auto' : '0'}
              >
                <Avatar name={item.sender} size={'sm'} />
                <Text>
                  <Text display={'inline-block'} fontWeight={'bold'}>
                    {item.sender}:
                  </Text>{' '}
                  {item.content}
                </Text>
              </Box>
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
