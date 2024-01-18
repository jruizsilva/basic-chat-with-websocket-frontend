import type Stomp from 'stompjs'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Store {
  userAuthenticated: User | null
  stompClient: Stomp.Client | null
  privateChat: PrivateChat | null
  publicMessages: PublicMessage[] | []
  users: User[] | []
  userSelected: User | null
  setUserAuthenticated: (user: User) => void
  setStompClient: (stompClient: Stomp.Client) => void
  addPublicMessage: (chatMessage: PublicMessage) => void
  logout: () => void
  setUsers: (users: User[]) => void
  setUserSelected: (user: User | null) => void
  setPublicMessages: (messages: PublicMessage[]) => void
  setPrivateChat: (privateChat: PrivateChat | null) => void
}

export const useAppStore = create(
  devtools<Store>((set) => ({
    userAuthenticated: null,
    stompClient: null,
    publicMessages: [],
    users: [],
    userSelected: null,
    privateChat: null,
    setUserAuthenticated: (userAuthenticated: User) => {
      set((store) => ({
        userAuthenticated,
        users: [...store.users, userAuthenticated]
      }))
    },
    setStompClient: (stompClient: Stomp.Client) => {
      set(() => ({ stompClient }))
    },
    setPublicMessages: (publicMessages: PublicMessage[]) => {
      set(() => ({ publicMessages }))
    },
    addPublicMessage: (chatMessage: PublicMessage) => {
      set((store) => ({
        publicMessages: [...store.publicMessages, chatMessage]
      }))
    },
    logout: () => {
      set(() => ({ userAuthenticated: null, stompClient: null }))
    },
    setUsers: (users: User[]) => {
      set(() => ({ users }))
    },
    setUserSelected: (userSelected: User | null) => {
      set(() => ({ userSelected }))
    },
    setPrivateChat: (privateChat: PrivateChat | null) => {
      set(() => ({ privateChat }))
    }
  }))
)
