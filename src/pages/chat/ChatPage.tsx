import { Box, Button, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useUsersQuery } from 'hooks/queries/useUsersQuery'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function ChatPage(props: Props): JSX.Element {
  const { data: users } = useUsersQuery()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const unreadMessages = useAppStore((store) => store.unreadMessages)
  const setUserSelected = useAppStore((store) => store.setUserSelected)
  const setPrivateMessagesShowBadge = useAppStore(
    (store) => store.setPrivateMessagesShowBadge
  )
  const publicMessagesShowBadge = useAppStore(
    (store) => store.publicMessagesShowBadge
  )
  const privateMessagesShowBadge = useAppStore(
    (store) => store.privateMessagesShowBadge
  )

  const pathnameIncludeUsers = useMemo(() => {
    return pathname.includes('users')
  }, [pathname])

  const setPublicMessagesShowBadge = useAppStore(
    (store) => store.setPublicMessagesShowBadge
  )

  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  console.log(unreadMessages)

  return (
    <Box minHeight={'calc(80vh - 4px)'} pt={8}>
      <Box maxW={{ base: '480px', sm: '640px' }} mx={'auto'} width={'95%'}>
        <Box display={'flex'} flexDir={'column'} gap={6}>
          <Box display={'flex'} justifyContent={'space-between'}>
            <Text fontSize={'2xl'}>Welcome {userAuthenticated?.username}</Text>
            <Text fontSize={'2xl'}>{users?.length} users online</Text>
          </Box>

          <Box maxWidth={'300px'} mx={'auto'} width={'95%'}>
            <Box
              backgroundColor={'gray.900'}
              display={'flex'}
              gap={2}
              mx={'auto'}
              p='5px'
              rounded={'8px'}
              width={'300px'}
            >
              <Button
                _active={{ backgroundColor: 'gray.800', color: 'white' }}
                _after={
                  publicMessagesShowBadge
                    ? {
                        content: `" "`,
                        bg: 'red',
                        position: 'absolute',
                        top: '8px',
                        right: '22px',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%'
                      }
                    : {}
                }
                color={'#bbb'}
                flexGrow={1}
                isActive={!pathnameIncludeUsers}
                position={'relative'}
                size={'sm'}
                variant={'unstyled'}
                onClick={() => {
                  navigate('/chat')
                  setUserSelected(null)
                  setPublicMessagesShowBadge(false)
                }}
              >
                Chat general
              </Button>
              <Button
                _active={{ backgroundColor: 'gray.800', color: 'white' }}
                _after={
                  privateMessagesShowBadge
                    ? {
                        content: `" "`,
                        bg: 'red',
                        position: 'absolute',
                        top: '8px',
                        right: '22px',
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%'
                      }
                    : {}
                }
                color={'#bbb'}
                flexGrow={1}
                isActive={pathnameIncludeUsers}
                size={'sm'}
                variant={'unstyled'}
                onClick={() => {
                  navigate('/chat/users')
                  setUserSelected(null)
                  setPrivateMessagesShowBadge(false)
                }}
              >
                Chat usuarios
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <Outlet />
    </Box>
  )
}
