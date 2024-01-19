import { Box, Button, Text } from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import { useDeleteAllPublicMesaggesBySenderMutation } from 'hooks/mutation/useDeleteAllPublicMesaggesBySenderMutation'
import { useDeleteUserMutation } from 'hooks/mutation/useDeleteUserMutation'
import { useUsersQuery } from 'hooks/queries/useUsersQuery'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function ChatPage(props: Props): JSX.Element {
  useUsersQuery()
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const setUserSelected = useAppStore((store) => store.setUserSelected)
  const publicMessagesShowBadge = useAppStore(
    (store) => store.publicMessagesShowBadge
  )

  const pathnameIncludeUsers = useMemo(() => {
    return pathname.includes('users')
  }, [pathname])

  const stompClient = useAppStore((store) => store.stompClient)
  const setPublicMessagesShowBadge = useAppStore(
    (store) => store.setPublicMessagesShowBadge
  )
  const logout = useAppStore((store) => store.logout)
  const { deleteUser } = useDeleteUserMutation()
  const setUserAuthenticated = useAppStore(
    (store) => store.setUserAuthenticated
  )
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const setStompClient = useAppStore((store) => store.setStompClient)
  const queryClient = useQueryClient()
  const { deleteAllPublicMessagesBySender } =
    useDeleteAllPublicMesaggesBySenderMutation()

  useEffect(() => {
    if (userAuthenticated !== null && stompClient === null) {
      const socket = new SockJS('http://localhost:8080/ws')

      const stompClient = Stomp.over(socket)

      setStompClient(stompClient)

      stompClient.connect({}, () => {
        stompClient.subscribe('/topic/public-messages', (message) => {
          queryClient.invalidateQueries({ queryKey: ['public-messages'] })
          if (window.location.pathname.includes('/users')) {
            setPublicMessagesShowBadge(true)
          }
        })
        stompClient.subscribe('/topic/users', (message) => {
          queryClient.invalidateQueries({ queryKey: ['users'] })
        })

        stompClient.subscribe(
          `/user/${userAuthenticated.username}/queue/messages`,
          function (message) {
            const privateChat: PrivateChat = JSON.parse(message.body)

            navigate(`/chat/users/${privateChat.chatName}`, {
              state: privateChat
            })
          }
        )
      })
    }

    return () => {
      if (
        stompClient !== null &&
        stompClient.connected &&
        userAuthenticated !== null
      ) {
        stompClient.disconnect(() => {
          logout()
        })
      }
    }
  }, [
    userAuthenticated,
    stompClient,
    setStompClient,
    logout,
    setUserAuthenticated,
    queryClient,
    deleteUser,
    setPublicMessagesShowBadge,
    navigate
  ])

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (userAuthenticated === null) return
      deleteUser(userAuthenticated)
      deleteAllPublicMessagesBySender(userAuthenticated.username)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [deleteUser, userAuthenticated, deleteAllPublicMessagesBySender])

  return (
    <Box maxW={{ base: '480px', sm: '768px' }} mx={'auto'}>
      <Box display={'flex'} flexDir={'column'} gap={6}>
        <Text fontSize={'2xl'}>Welcome {userAuthenticated?.username}</Text>
        <Box maxWidth={'300px'} mx={'auto'}>
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
              color={'#bbb'}
              flexGrow={1}
              isActive={pathnameIncludeUsers}
              size={'sm'}
              variant={'unstyled'}
              onClick={() => {
                navigate('/chat/users')
                setUserSelected(null)
              }}
            >
              Chat usuarios
            </Button>
          </Box>
        </Box>

        <Outlet />
      </Box>
    </Box>
  )
}
