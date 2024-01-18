import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

import { useDeleteUserMutation } from 'hooks/mutation/useDeleteUserMutation'
import { MainRouter } from 'routes/MainRouter'
import { useAppStore } from 'store/useAppStore'

export function App() {
  const stompClient = useAppStore((store) => store.stompClient)
  const logout = useAppStore((store) => store.logout)
  const { deleteUser } = useDeleteUserMutation()
  const setUserAuthenticated = useAppStore(
    (store) => store.setUserAuthenticated
  )
  const setUsers = useAppStore((store) => store.setUsers)
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const addMessage = useAppStore((store) => store.addMessage)
  const setStompClient = useAppStore((store) => store.setStompClient)
  const queryClient = useQueryClient()

  useEffect(() => {
    if (userAuthenticated !== null && stompClient === null) {
      const socket = new SockJS('http://localhost:8080/ws')

      const stompClient = Stomp.over(socket)

      setStompClient(stompClient)

      stompClient.connect({}, () => {
        console.log('connected')
        stompClient.subscribe('/topic/messages', (message) => {
          const newMessage = JSON.parse(message.body)

          addMessage(newMessage as PublicMessage)
        })
        stompClient.subscribe('/topic/users', (message) => {
          queryClient.invalidateQueries({ queryKey: ['users'] })
        })

        stompClient.subscribe(
          `/user/${userAuthenticated.username}/queue/messages`,
          function (message) {
            console.log(message)
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
          console.log('web socket disconnected')
          logout()
        })
      }
    }
  }, [
    userAuthenticated,
    addMessage,
    stompClient,
    setStompClient,
    logout,
    setUserAuthenticated,
    queryClient,
    setUsers,
    deleteUser
  ])

  useEffect(() => {
    const handleBeforeUnload = () => {
      if (userAuthenticated === null) return
      deleteUser(userAuthenticated)
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [deleteUser, userAuthenticated])

  return <MainRouter />
}
