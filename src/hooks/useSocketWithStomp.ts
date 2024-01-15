import Stomp from 'stompjs'
import SockJS from 'sockjs-client'
import { useEffect } from 'react'

import { useAppStore } from 'store/useAppStore'

export const createWebSocket = () => {
  const socket = new SockJS('http://localhost:8080/ws')

  return Stomp.over(socket)
}

export const useSocketWithStomp = () => {
  const setStompClient = useAppStore((store) => store.setStompClient)
  const client = createWebSocket()

  useEffect(() => {
    client.connect({}, () => {
      setStompClient(client)
    })

    return () => {
      if (client !== null) {
        client.disconnect(() => {
          console.log('disconnected')
        })
      }
    }
  }, [client, setStompClient])
  client.connect({}, () => {
    console.log('connected')
  })

  return client
}
