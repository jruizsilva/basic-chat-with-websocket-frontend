import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'
import { RedirectToChatWhenUserIsAuthenticated } from './RedirectToChatWhenUserIsAuthenticated'

import { Footer } from 'components/Footer'
import { Navbar } from 'components/Navbar'
import { WebSocketsConnection } from 'components/WebSocketsConnection'
import { ChatPage } from 'pages/chat/ChatPage'
import { ChatPanel } from 'pages/chat/components/ChatPanel'
import { ChatPanelUserUnselected } from 'pages/chat/components/ChatPanelUserUnselected'
import { GlobalMensagges } from 'pages/chat/components/GlobalMensagges'
import { OneToOneMensagges } from 'pages/chat/components/OneToOneMensagges'
import { HomePage } from 'pages/home/HomePage'

interface Props {}

export function MainRouter(props: Props): JSX.Element {
  return (
    <BrowserRouter>
      <Navbar />
      <WebSocketsConnection />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<ChatPage />} path='/chat'>
            <Route index element={<GlobalMensagges />} />
            <Route element={<OneToOneMensagges />} path='users'>
              <Route index element={<ChatPanelUserUnselected />} />
              <Route element={<ChatPanel />} path=':username' />
            </Route>
          </Route>
        </Route>
        <Route element={<RedirectToChatWhenUserIsAuthenticated />}>
          <Route element={<HomePage />} path='/' />
        </Route>
        <Route element={<Navigate to={'/'} />} path='*' />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
