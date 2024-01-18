import { List, ListItem, Avatar, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

import { type User, useAppStore } from 'store/useAppStore'

interface Props {}

export function UserList(props: Props): JSX.Element {
  const users = useAppStore((store) => store.users)
  const userSelected = useAppStore((store) => store.userSelected)
  const setUserSelected = useAppStore((store) => store.setUserSelected)
  const navigate = useNavigate()

  const handleSelectUser = (user: User) => {
    if (userSelected?.id === user.id) {
      setUserSelected(null)
      navigate(`/chat`)
    } else {
      setUserSelected(user)
      navigate(`/chat/${user.username}`)
    }
  }

  return (
    <List height={'100%'} overflow={'auto'} padding={'16px'}>
      {users.map((item) => (
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
