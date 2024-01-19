import { useEffect } from 'react'

import { MainRouter } from 'routes/MainRouter'
import { useAppStore } from 'store/useAppStore'

export function App() {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const stompClient = useAppStore((store) => store.stompClient)
  const logout = useAppStore((store) => store.logout)

  useEffect(() => {
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
  }, [stompClient, userAuthenticated, logout])

  return <MainRouter />
}
