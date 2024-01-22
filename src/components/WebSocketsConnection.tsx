import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import { useDeleteAllPublicMesaggesBySenderMutation } from 'hooks/mutation/useDeleteAllPublicMesaggesBySenderMutation'
import { useDeleteUserMutation } from 'hooks/mutation/useDeleteUserMutation'
import { useAppStore } from 'store/useAppStore'
import { baseUrl } from 'utils/baseUrl'

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

  useEffect(() => {
    if (userAuthenticated !== null && stompClient === null) {
      const socket = new SockJS(`${baseUrl}/ws`)

      const stompClient = Stomp.over(socket)

      setStompClient(stompClient)

      stompClient.connect({}, () => {
        stompClient.subscribe('/topic/public-messages', (message) => {
          queryClient.setQueryData(
            ['public-messages'],
            JSON.parse(message.body)
          )
          if (window.location.pathname.includes('/users')) {
            setPublicMessagesShowBadge(true)
          }
        })
        stompClient.subscribe('/topic/users', (message) => {
          queryClient.setQueryData(['users'], JSON.parse(message.body))
        })

        stompClient.subscribe(
          `/user/${userAuthenticated.username}/queue/messages`,
          function (message) {
            const privateChat: ChatRoom = JSON.parse(message.body)
            const sender = privateChat.messages.find(
              (message) => message.receiver === userAuthenticated.username
            )

            if (sender !== undefined) {
              console.log(sender)
            }

            console.log(window.location)
            if (!window.location.pathname.includes('/users')) {
              setPrivateMessagesShowBadge(true)
            } else if (
              !window.location.pathname.includes(privateChat.chatName) &&
              sender !== undefined
            ) {
              navigate(`/chat/users?sender=${sender.sender}`, {
                state: privateChat
              })
            } else {
              navigate(`/chat/users/${privateChat.chatName}`, {
                state: privateChat
              })
            }
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
