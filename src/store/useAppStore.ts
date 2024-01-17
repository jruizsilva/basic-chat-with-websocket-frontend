import { create } from 'zustand'
import type Stomp from 'stompjs'

interface Store {
  userAuthenticated: User | null
  stompClient: Stomp.Client | null
  messages: ChatMessage[] | []
  users: User[] | []
  setUserAuthenticated: (user: User) => void
  setStompClient: (stompClient: Stomp.Client) => void
  addMessage: (chatMessage: ChatMessage) => void
  logout: () => void
  setUsers: (users: User[]) => void
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

const initialValues = {
  userAuthenticated: null,
  stompClient: null,
  messages: [],
  users: []
}

export const useAppStore = create<Store>()((set) => ({
  ...initialValues,
  setUserAuthenticated: (userAuthenticated: User) => {
    set((store) => ({
      userAuthenticated,
      users: [...store.users, userAuthenticated]
    }))
  },
  setStompClient: (stompClient: Stomp.Client) => {
    set(() => ({ stompClient }))
  },
  addMessage: (chatMessage: ChatMessage) => {
    set((store) => ({ messages: [...store.messages, chatMessage] }))
  },
  logout: () => {
    set(() => ({ userAuthenticated: null, stompClient: null }))
  },
  setUsers: (users: User[]) => {
    set(() => ({ users }))
  }
}))
