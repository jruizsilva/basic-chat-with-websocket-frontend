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
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAddPrivateMessageToPrivateChatMutation } from 'hooks/mutation/useAddPrivateMessageToPrivateChatMutation'
import { useCreatePrivateChatMutation } from 'hooks/mutation/useCreatePrivateChatMutation'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function ChatPanel(props: Props): JSX.Element {
  const [privateChat, setPrivateChat] = useState<PrivateChat | null>(null)
  const { createPrivateChat, data } = useCreatePrivateChatMutation()
  const { addPrivateMessageToPrivateChat, data: privateChatUpdated } =
    useAddPrivateMessageToPrivateChatMutation()
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const userSelected = useAppStore((store) => store.userSelected)
  const stompClient = useAppStore((store) => store.stompClient)
  const [message, setMessage] = useState('')
  const params = useParams()

  useEffect(() => {
    if (params.username !== undefined && privateChat === null) {
      const privateChatRequest: PrivateChatRequest = {
        chatName: params.username
      }

      createPrivateChat(privateChatRequest)
    }
  }, [params.username, privateChat, createPrivateChat])

  useEffect(() => {
    if (data !== undefined) {
      setPrivateChat(data)
    }
  }, [data])
  useEffect(() => {
    if (privateChatUpdated !== undefined) {
      setPrivateChat(privateChatUpdated)
    }
  }, [privateChatUpdated])

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      message.trim().length === 0 ||
      stompClient === null ||
      userAuthenticated === null ||
      userSelected === null ||
      privateChat === null
    )
      return

    const addPrivateMessageRequest: AddPrivateMessageRequest = {
      sender: userAuthenticated.username,
      receiver: userSelected.username,
      content: message,
      chatName: privateChat.chatName
    }

    addPrivateMessageToPrivateChat(addPrivateMessageRequest)

    setMessage('')
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  return (
    <Box
      backgroundColor={'gray.700'}
      borderRadius={'8px'}
      height={'300px'}
      position={'relative'}
    >
      <List height={'240px'} overflow={'auto'} padding={'16px'} spacing={3}>
        {privateChat?.messages.map((item) => (
          <ListItem key={item.id} display={'flex'} gap={2}>
            <Box
              display={'flex'}
              gap={2}
              ml={userAuthenticated?.username === item.sender ? 'auto' : '0'}
            >
              <Box alignItems={'center'} display={'flex'} gap={2}>
                <Avatar name={item.sender} size={'sm'} />
                <Box display={'flex'} flexDir={'column'} gap={0}>
                  <Text fontSize={'small'} fontWeight={'500'} lineHeight={1.2}>
                    {item.sender}
                  </Text>
                  <Text fontSize={'small'} lineHeight={1.2}>
                    {item.content}
                  </Text>
                </Box>
              </Box>
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
  )
}
