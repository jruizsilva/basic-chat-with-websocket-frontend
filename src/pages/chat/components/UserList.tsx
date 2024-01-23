import { Avatar, Badge, Box, List, ListItem, Text } from '@chakra-ui/react'
import { useSearchParams } from 'react-router-dom'

import { useCreateChatRoomMutation } from 'hooks/mutation/useCreateChatRoomMutation'
import { useUsersQuery } from 'hooks/queries/useUsersQuery'
import { useAppStore } from 'store/useAppStore'
import { generateChatName } from 'utils/generateChatName'

interface Props {}

export function UserList(props: Props): JSX.Element {
  const { data: users } = useUsersQuery()
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const userSelected = useAppStore((store) => store.userSelected)
  const setUserSelected = useAppStore((store) => store.setUserSelected)
  const removeUnreadMessagesBySenderName = useAppStore(
    (store) => store.removeUnreadMessagesBySenderName
  )
  const [searchParams, setSearchParams] = useSearchParams()
  const unreadMessages = useAppStore((store) => store.unreadMessages)

  const { createPrivateChat, isPending: isPendingCreatePrivateChat } =
    useCreateChatRoomMutation()

  const handleSelectUser = (user: User) => {
    if (
      user === null ||
      userAuthenticated === null ||
      isPendingCreatePrivateChat
    )
      return

    const privateChatRequest: ChatRoomRequest = {
      chatName: generateChatName(user.username, userAuthenticated?.username)
    }

    setUserSelected(user)
    createPrivateChat(privateChatRequest)
    searchParams.delete('sender')
    removeUnreadMessagesBySenderName(user.username)
  }

  return (
    <List height={'100%'} overflow={'auto'} padding={'16px'}>
      {users !== undefined
        ? users
            .filter((user) => user.id !== userAuthenticated?.id)
            .map((item) => (
              <ListItem
                key={item.id}
                _hover={{
                  cursor: isPendingCreatePrivateChat ? 'not-allowed' : 'pointer'
                }}
                alignItems={'center'}
                backgroundColor={
                  userSelected?.id === item.id ? 'gray.600' : 'transparent'
                }
                display={'flex'}
                gap={2}
                p={2}
                position={'relative'}
                rounded={'8px'}
                width={'100%'}
                onClick={() => {
                  handleSelectUser(item)
                }}
              >
                <Avatar name={item.username} size={'sm'} />
                <Text>{item.username}</Text>
                {unreadMessages.some((el) => el.sender === item.username) && (
                  <Badge colorScheme='purple'>
                    {
                      unreadMessages.filter((el) => el.sender === item.username)
                        .length
                    }{' '}
                    new messages
                  </Badge>
                )}

                {searchParams.get('sender') === item.username && (
                  <Box bg='red' borderRadius='100%' height='8px' width='8px' />
                )}
              </ListItem>
            ))
        : null}
    </List>
  )
}
