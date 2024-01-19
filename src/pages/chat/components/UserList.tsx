import { Avatar, List, ListItem, Text } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

import { useCreatePrivateChatMutation } from 'hooks/mutation/useCreatePrivateChatMutation'
import { useUsersQuery } from 'hooks/queries/useUsersQuery'
import { useAppStore } from 'store/useAppStore'
import { generateChatName } from 'utils/generateChatName'

interface Props {}

export function UserList(props: Props): JSX.Element {
  const { data: users } = useUsersQuery()
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const userSelected = useAppStore((store) => store.userSelected)
  const setUserSelected = useAppStore((store) => store.setUserSelected)
  const [searchParams, setSearchParams] = useSearchParams()

  console.log(searchParams.get('sender'))

  const { createPrivateChat } = useCreatePrivateChatMutation()

  const handleSelectUser = (user: User) => {
    if (user === null || userAuthenticated === null) return

    const privateChatRequest: PrivateChatRequest = {
      chatName: generateChatName(user.username, userAuthenticated?.username)
    }

    setUserSelected(user)
    createPrivateChat(privateChatRequest)
    searchParams.delete('sender')
  }

  return (
    <List height={'100%'} overflow={'auto'} padding={'16px'}>
      {users !== undefined
        ? users
            .filter((user) => user.id !== userAuthenticated?.id)
            .map((item) => (
              <ListItem
                key={item.id}
                _hover={{ cursor: 'pointer' }}
                alignItems={'center'}
                backgroundColor={
                  userSelected?.id === item.id ? 'gray.600' : 'transparent'
                }
                bg={
                  searchParams.get('sender') === item.username
                    ? 'red'
                    : 'transparent'
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
            ))
        : null}
    </List>
  )
}
