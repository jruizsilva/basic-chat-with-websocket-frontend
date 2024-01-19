import { Box } from '@chakra-ui/react'

import { Login } from './components/Login'

interface Props {}

export function HomePage(props: Props): JSX.Element {
  return (
    <Box maxW={{ base: '480px' }} mx={'auto'} width={'95%'}>
      <Login />
    </Box>
  )
}
