import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Text
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'

import { useAddPublicMessageMutation } from 'hooks/mutation/useAddPublicMessageMutation'
import { usePublicMessagesQuery } from 'hooks/queries/usePublicMessagesQuery'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function GlobalMensagges(props: Props): JSX.Element {
  const { addPublicMessage, isPending: isAddingMessage } =
    useAddPublicMessageMutation()

  const { data: publicMessages } = usePublicMessagesQuery()

  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const stompClient = useAppStore((store) => store.stompClient)

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

    const publicMessage: PublicMessageRequest = {
      sender: userAuthenticated.username,
      content: message,
      type: 'MESSAGE'
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
    <Box
      backgroundColor={'gray.700'}
      borderRadius={'8px'}
      height={'300px'}
      maxW={{ base: '480px', sm: '640px' }}
      mb={10}
      mt={5}
      mx={'auto'}
      position={'relative'}
      width={'95%'}
    >
      <List
        ref={messagesContainer}
        height={'240px'}
        overflowY={'auto'}
        padding={'16px'}
        spacing={3}
      >
        {publicMessages !== undefined
          ? publicMessages.map((item) => (
              <ListItem key={item.id} display={'flex'} gap={2}>
                {item.type === 'MESSAGE' ? (
                  <Box
                    display={'flex'}
                    gap={2}
                    ml={
                      userAuthenticated?.username === item.sender ? 'auto' : '0'
                    }
                  >
                    <Box alignItems={'center'} display={'flex'} gap={2}>
                      <Avatar name={item.sender} size={'sm'} />
                      <Box display={'flex'} flexDir={'column'} gap={0}>
                        <Text
                          fontSize={'small'}
                          fontWeight={'500'}
                          lineHeight={1.2}
                        >
                          {item.sender}
                        </Text>
                        <Text fontSize={'small'} lineHeight={1.2}>
                          {item.content}
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Text color={'gray.400'}>{item.content}</Text>
                )}
              </ListItem>
            ))
          : null}
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
              isDisabled={message.trim().length === 0 || isAddingMessage}
              isLoading={isAddingMessage}
              loadingText='Loading...'
              size='sm'
              type='submit'
            >
              Enviar
            </Button>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Box>
  )
}
