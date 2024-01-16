import { useState } from 'react'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function Main(props: Props): JSX.Element {
  const user = useAppStore((store) => store.user)
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  return <h1>Main</h1>
}
