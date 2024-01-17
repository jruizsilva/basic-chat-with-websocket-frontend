import { Box } from '@chakra-ui/react'

import { Login } from './components/Login'
import { useAppStore } from 'store/useAppStore'

interface Props {}

export function HomePage(props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  return (
    <Box maxW={{ base: '480px' }} mx={'auto'}>
      {userAuthenticated === null && <Login />}
    </Box>
  )
}
