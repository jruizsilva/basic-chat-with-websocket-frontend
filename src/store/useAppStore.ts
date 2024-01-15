import { create } from 'zustand'
import type Stomp from 'stompjs'

interface Store {
  isConnected: boolean
  setIsConnected: (isConnected: boolean) => void
  stompClient: Stomp.Client | null
  setStompClient: (stompClient: Stomp.Client) => void
}

export const useAppStore = create<Store>()((set) => ({
  isConnected: false,
  setIsConnected: (isConnected: boolean) => {
    set(() => ({ isConnected }))
  },
  stompClient: null,
  setStompClient: (stompClient: Stomp.Client) => {
    set(() => ({ stompClient }))
  }
}))
