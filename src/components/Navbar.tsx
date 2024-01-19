import { Box, Heading } from '@chakra-ui/react'

import { UserMenu } from './UserMenu'

import { useAppStore } from 'store/useAppStore'

interface Props {}

export function Navbar(props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  return (
    <Box borderBottom='1px' borderColor='gray.200'>
      <Box maxW={{ base: '480px', sm: '640px' }} mx={'auto'} width={'95%'}>
        <Box alignItems={'center'} display={'flex'} height={'10vh'}>
          <Heading mr={'auto'} size={'lg'}>
            Simple Chat App
          </Heading>
          {userAuthenticated !== null && <UserMenu />}
        </Box>
      </Box>
    </Box>
  )
}
