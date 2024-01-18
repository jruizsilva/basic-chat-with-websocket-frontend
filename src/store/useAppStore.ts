import type Stomp from 'stompjs'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Store {
  userAuthenticated: User | null
  stompClient: Stomp.Client | null
  messages: ChatMessage[] | []
  users: User[] | []
  userSelected: User | null
  setUserAuthenticated: (user: User) => void
  setStompClient: (stompClient: Stomp.Client) => void
  addMessage: (chatMessage: ChatMessage) => void
  logout: () => void
  setUsers: (users: User[]) => void
  setUserSelected: (user: User | null) => void
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
  users: [],
  userSelected: null
}

export const useAppStore = create(
  devtools<Store>((set) => ({
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
    },
    setUserSelected: (userSelected: User | null) => {
      set(() => ({ userSelected }))
    }
  }))
)
