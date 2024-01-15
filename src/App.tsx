import { Chat } from 'components/Chat'
import { useSocketWithStomp } from 'hooks/useSocketWithStomp'

export function App() {
  useSocketWithStomp()

  return <Chat />
}
