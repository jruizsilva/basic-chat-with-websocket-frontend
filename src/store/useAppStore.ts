import { create } from 'zustand'
import type Stomp from 'stompjs'

interface Store {
  user: string | null
  setUser: (user: string | null) => void
  stompClient: Stomp.Client | null
  setStompClient: (stompClient: Stomp.Client | null) => void
  messages: ChatMessage[] | []
  addMessage: (chatMessage: ChatMessage) => void
}

export interface ChatMessage {
  sender: string
  content: string
}

export const useAppStore = create<Store>()((set) => ({
  user: null,
  setUser: (user: string | null) => {
    set(() => ({ user }))
  },
  stompClient: null,
  setStompClient: (stompClient: Stomp.Client | null) => {
    set(() => ({ stompClient }))
  },
  messages: [],
  addMessage: (chatMessage: ChatMessage) => {
    set((store) => ({ messages: [...store.messages, chatMessage] }))
  }
}))
