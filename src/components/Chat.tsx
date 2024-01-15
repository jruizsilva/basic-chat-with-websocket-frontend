import { useEffect, useState } from 'react'

import { useAppStore } from 'store/useAppStore'

interface ChatMessage {
  content: string
  sender: string
}

export function Chat() {
  const stompClient = useAppStore((store) => store.stompClient)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [messageInput, setMessageInput] = useState('')

  useEffect(() => {
    if (stompClient === null) {
      return
    }
    stompClient.subscribe('/topic/messages', (message) => {
      const newMessage: ChatMessage = JSON.parse(message.body)

      console.log(newMessage)

      setMessages((prevMessages) => [...prevMessages, newMessage])
    })
  }, [stompClient])

  const handleSendMessage = () => {
    if (stompClient != null && messageInput.trim() !== '') {
      const message = {
        content: messageInput,
        sender: 'user' // Puedes cambiar esto según tus necesidades
      }

      stompClient.send('/app/chat', {}, JSON.stringify(message))
      setMessageInput('')
    }
  }

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div>
        <input
          type='text'
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value)
          }}
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  )
}
