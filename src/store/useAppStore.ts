import { create } from 'zustand'
import type Stomp from 'stompjs'

interface Store {
  user: User | null
  users: User[] | []
  stompClient: Stomp.Client | null
  messages: ChatMessage[] | []
  setUser: (user: User | null) => void
  setUsers: (users: User[] | []) => void
  setStompClient: (stompClient: Stomp.Client | null) => void
  addMessage: (chatMessage: ChatMessage) => void
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
  user: null,
  setUser: (user: User | null) => {
    set(() => ({ user }))
  },
  stompClient: null,
  setStompClient: (stompClient: Stomp.Client | null) => {
    set(() => ({ stompClient }))
  },
  messages: [],
  addMessage: (chatMessage: ChatMessage) => {
    set((store) => ({ messages: [...store.messages, chatMessage] }))
  },
  users: [],
  setUsers: (users: User[] | []) => {
    set(() => ({ users }))
  }
}))
