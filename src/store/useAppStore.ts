import { create } from 'zustand'
import type Stomp from 'stompjs'

interface Store {
  userAuthenticated: User | null
  stompClient: Stomp.Client | null
  messages: ChatMessage[] | []
  setUserAuthenticated: (user: User) => void
  setStompClient: (stompClient: Stomp.Client) => void
  addMessage: (chatMessage: ChatMessage) => void
  logout: () => void
}

export interface ChatMessage {
  id: string
  sender: string
  content: string
}
export interface User {
  id: string
  username: string
}
export interface UserRequest {
  username: string
}

export const useAppStore = create<Store>()((set) => ({
  userAuthenticated: null,
  setUserAuthenticated: (userAuthenticated: User) => {
    set(() => ({
      userAuthenticated
    }))
  },
  stompClient: null,
  setStompClient: (stompClient: Stomp.Client) => {
    set(() => ({ stompClient }))
  },
  messages: [],
  addMessage: (chatMessage: ChatMessage) => {
    set((store) => ({ messages: [...store.messages, chatMessage] }))
  },
  users: [],
  logout: () => {
    set(() => ({ userAuthenticated: null, stompClient: null }))
  }
}))
