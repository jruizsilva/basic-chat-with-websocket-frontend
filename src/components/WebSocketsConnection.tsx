import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import { useDeleteAllPublicMesaggesBySenderMutation } from 'hooks/mutation/useDeleteAllPublicMesaggesBySenderMutation'
import { useDeleteUserMutation } from 'hooks/mutation/useDeleteUserMutation'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function WebSocketsConnection(props: Props): JSX.Element {
  const navigate = useNavigate()
  const stompClient = useAppStore((store) => store.stompClient)
  const setPublicMessagesShowBadge = useAppStore(
    (store) => store.setPublicMessagesShowBadge
  )
  const setPrivateMessagesShowBadge = useAppStore(
    (store) => store.setPrivateMessagesShowBadge
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
  const params = useParams()
  const { pathname } = useLocation()

  useEffect(() => {
    if (userAuthenticated !== null && stompClient === null) {
      const socket = new SockJS('http://localhost:8080/ws')

      const stompClient = Stomp.over(socket)

      setStompClient(stompClient)

      stompClient.connect({}, () => {
        stompClient.subscribe('/topic/public-messages', (message) => {
          queryClient.invalidateQueries({ queryKey: ['public-messages'] })
          if (pathname.includes('/users')) {
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

            console.log('pathname', pathname)
            if (!pathname.includes('/users') && params.username === undefined) {
              setPrivateMessagesShowBadge(true)
            } else {
              navigate(`/chat/users/${privateChat.chatName}`, {
                state: privateChat
              })
            }
            // if (params.username !== undefined) {
            //   navigate(`/chat/users/${privateChat.chatName}`, {
            //     state: privateChat
            //   })
            // }
          }
        )
      })
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
    navigate,
    pathname,
    params.username,
    setPrivateMessagesShowBadge
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

  return <></>
}
