import { Navigate, Outlet } from 'react-router-dom'

import { useAppStore } from 'store/useAppStore'

export const RedirectToChatWhenUserIsAuthenticated = () => {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  return userAuthenticated === null ? <Outlet /> : <Navigate to='/chat' />
}
