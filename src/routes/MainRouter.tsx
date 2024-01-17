import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { PrivateRoutes } from './PrivateRoutes'
import { RedirectToChatWhenUserIsAuthenticated } from './RedirectToChatWhenUserIsAuthenticated'

import { ChatPage } from 'pages/chat/ChatPage'
import { HomePage } from 'pages/home/HomePage'
import { Navbar } from 'components/Navbar'

interface Props {}

export function MainRouter(props: Props): JSX.Element {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<ChatPage />} path='/chat' />
          </Route>
          <Route element={<RedirectToChatWhenUserIsAuthenticated />}>
            <Route element={<HomePage />} path='/' />
          </Route>
          <Route element={<ChatPage />} path='*' />
        </Routes>
      </BrowserRouter>
    </>
  )
}
