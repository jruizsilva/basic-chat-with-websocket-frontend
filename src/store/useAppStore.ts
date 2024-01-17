import { create } from 'zustand'
import type Stomp from 'stompjs'
import { persist } from 'zustand/middleware'

interface Store {
  userAuthenticated: User | null
  users: User[] | []
  stompClient: Stomp.Client | null
  messages: ChatMessage[] | []
  setUserAuthenticated: (user: User) => void
  setUsers: (users: User[] | []) => void
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

export const useAppStore = create<Store>()(
  persist(
    (set) => ({
      userAuthenticated: null,
      setUserAuthenticated: (userAuthenticated: User) => {
        set((store) => ({
          userAuthenticated,
          users: [...store.users, userAuthenticated]
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
      setUsers: (users: User[] | []) => {
        set(() => ({ users }))
      },
      logout: () => {
        set(() => ({ userAuthenticated: null, stompClient: null }))
      }
    }),
    {
      name: 'userAuthenticated' // name of the item in the storage (must be unique)
    }
  )
)
