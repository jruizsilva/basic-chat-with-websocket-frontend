import type Stomp from 'stompjs'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface Store {
  userAuthenticated: User | null
  stompClient: Stomp.Client | null
  userSelected: User | null
  publicMessagesShowBadge: boolean
  privateMessagesShowBadge: boolean
  setUserAuthenticated: (user: User) => void
  setStompClient: (stompClient: Stomp.Client) => void
  logout: () => void
  setUserSelected: (user: User | null) => void
  setPublicMessagesShowBadge: (publicMessagesShowBadge: boolean) => void
  setPrivateMessagesShowBadge: (privateMessagesShowBadge: boolean) => void
}

export const useAppStore = create(
  devtools<Store>((set) => ({
    userAuthenticated: null,
    stompClient: null,
    users: [],
    userSelected: null,
    publicMessagesShowBadge: false,
    privateMessagesShowBadge: false,
    setUserAuthenticated: (userAuthenticated: User) => {
      set(() => ({
        userAuthenticated
      }))
    },
    setStompClient: (stompClient: Stomp.Client) => {
      set(() => ({ stompClient }))
    },
    logout: () => {
      set(() => ({
        userAuthenticated: null,
        stompClient: null,
        users: [],
        userSelected: null,
        publicMessagesShowBadge: false,
        privateMessagesShowBadge: false
      }))
    },
    setUserSelected: (userSelected: User | null) => {
      set(() => ({ userSelected }))
    },
    setPublicMessagesShowBadge: (publicMessagesShowBadge: boolean) => {
      set(() => ({ publicMessagesShowBadge }))
    },
    setPrivateMessagesShowBadge: (privateMessagesShowBadge: boolean) => {
      set(() => ({ privateMessagesShowBadge }))
    }
  }))
)
