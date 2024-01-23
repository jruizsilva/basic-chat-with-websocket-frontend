import {
  Avatar,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Spinner,
  Text
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { useAddPrivateMessageToChatRoomMutation } from 'hooks/mutation/useAddPrivateMessageToChatRoomMutation'
import { useAppStore } from 'store/useAppStore'
import { useFindChatRoomByChatName } from 'hooks/queries/useFindChatRoomByChatName'

interface Props {}

export function ChatPanel(props: Props): JSX.Element {
  const location = useLocation()
  const stateData: ChatRoom = location.state

  const { data: chatRoom, isPending: isChatRoomPending } =
    useFindChatRoomByChatName(stateData.chatName)

  const { addPrivateMessageToPrivateChat, isPending: isAddingMessage } =
    useAddPrivateMessageToChatRoomMutation()
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const userSelected = useAppStore((store) => store.userSelected)
  const stompClient = useAppStore((store) => store.stompClient)
  const [message, setMessage] = useState('')
  const messagesContainer = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (messagesContainer.current !== null) {
      messagesContainer.current.scrollTop =
        messagesContainer.current.scrollHeight
    }
  }, [chatRoom])

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (
      message.trim().length === 0 ||
      stompClient === null ||
      userAuthenticated === null ||
      userSelected === null ||
      chatRoom === undefined
    )
      return

    const addPrivateMessageRequest: AddPrivateMessageRequest = {
      sender: userAuthenticated.username,
      receiver: userSelected.username,
      content: message,
      chatName: chatRoom.chatName
    }

    addPrivateMessageToPrivateChat(addPrivateMessageRequest)

    setMessage('')
  }

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  return (
    <>
      {isChatRoomPending ? (
        <Spinner />
      ) : (
        <Box
          backgroundColor={'gray.700'}
          borderRadius={'8px'}
          height={'300px'}
          minW={'260px'}
          position={'relative'}
        >
          <List
            ref={messagesContainer}
            height={'240px'}
            overflow={'auto'}
            padding={'16px'}
            spacing={3}
          >
            {chatRoom?.messages.map((item) => (
              <ListItem key={item.id} display={'flex'} gap={2}>
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
                  isDisabled={
                    message.trim().length === 0 ||
                    stompClient === null ||
                    userAuthenticated === null ||
                    userSelected === null ||
                    chatRoom === null ||
                    isAddingMessage
                  }
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
      )}
    </>
  )
}
