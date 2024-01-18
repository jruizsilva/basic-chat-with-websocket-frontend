import { Avatar, List, ListItem, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { useCreatePrivateChatMutation } from 'hooks/mutation/useCreatePrivateChatMutation'
import { useAppStore } from 'store/useAppStore'
import { generateChatName } from 'utils/generateChatName'

interface Props {}

export function UserList(props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const users = useAppStore((store) => store.users)
  const userSelected = useAppStore((store) => store.userSelected)
  const setUserSelected = useAppStore((store) => store.setUserSelected)
  const navigate = useNavigate()

  const { createPrivateChat } = useCreatePrivateChatMutation()

  const handleSelectUser = (user: User) => {
    if (user === null || userAuthenticated === null) return

    const privateChatRequest: PrivateChatRequest = {
      chatName: generateChatName(user.username, userAuthenticated?.username)
    }

    if (userSelected?.id === user.id) {
      setUserSelected(null)
      navigate(`/chat/users`)
    } else {
      setUserSelected(user)
      createPrivateChat(privateChatRequest)
    }
  }

  return (
    <List height={'100%'} overflow={'auto'} padding={'16px'}>
      {users
        .filter((user) => user.id !== userAuthenticated?.id)
        .map((item) => (
          <ListItem
            key={item.id}
            _hover={{ backgroundColor: 'gray.600', cursor: 'pointer' }}
            alignItems={'center'}
            border={'1px solid'}
            borderColor={
              userSelected?.id === item.id ? 'gray.600' : 'transparent'
            }
            display={'flex'}
            gap={2}
            p={2}
            rounded={'8px'}
            width={'100%'}
            onClick={() => {
              handleSelectUser(item)
            }}
          >
            <Avatar name={item.username} size={'sm'} />
            <Text>{item.username}</Text>
          </ListItem>
        ))}
    </List>
  )
}
