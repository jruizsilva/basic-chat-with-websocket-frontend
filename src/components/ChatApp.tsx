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
import { useEffect, useState } from 'react'

import { useAppStore } from 'store/useAppStore'

interface Props {}

export function ChatApp(props: Props): JSX.Element {
  const user = useAppStore((store) => store.user)
  const stompClient = useAppStore((store) => store.stompClient)
  const messages = useAppStore((store) => store.messages)
  const addMessage = useAppStore((store) => store.addMessage)
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if (message.trim().length === 0 || stompClient == null) return

    const chatMessage = {
      nickname: user,
      content: message
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
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <ListItem key={item} display={'flex'} gap={2}>
              <Avatar name='Dan Abrahmov' size={'sm'} />
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </Text>
            </ListItem>
          ))}
        </List>
        <Box
          bottom={'12px'}
          display={'flex'}
          left={'12px'}
          position={'absolute'}
          right={'8px'}
          width={'calc(100% - 24px)'}
        >
          <InputGroup>
            <Input />
            <InputRightElement width='4.5rem'>
              <Button h='1.75rem' size='sm'>
                Enviar
              </Button>
            </InputRightElement>
          </InputGroup>
        </Box>
      </Box>
    </Box>
  )
}
