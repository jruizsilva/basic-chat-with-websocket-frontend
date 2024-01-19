import { Box, Heading } from '@chakra-ui/react'

import { UserMenu } from './UserMenu'

import { useAppStore } from 'store/useAppStore'

interface Props {}

export function Navbar(props: Props): JSX.Element {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)

  return (
    <Box borderBottom='1px' borderColor='gray.200' mb={8}>
      <Box maxW={{ base: '480px' }} mx={'auto'} width={'95%'}>
        <Box alignItems={'center'} display={'flex'} py={4}>
          <Heading mr={'auto'} size={'lg'}>
            Chat app
          </Heading>
          {userAuthenticated !== null && <UserMenu />}
        </Box>
      </Box>
    </Box>
  )
}
