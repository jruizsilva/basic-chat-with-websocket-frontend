import { Box } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'

import { UserList } from './UserList'

interface Props {}

export function OneToOneMensagges(props: Props): JSX.Element {
  return (
    <Box
      display={'flex'}
      flexDir={{ base: 'column', md: 'row' }}
      gap={'24px'}
      justifyContent={'space-between'}
      maxW={{ base: '480px', sm: '640px' }}
      mb={10}
      mt={5}
      mx={'auto'}
      width={'95%'}
    >
      <Box display={'flex'} flexDir={'column'} flexGrow={1} gap={4}>
        <Box backgroundColor={'gray.700'} borderRadius={'8px'} height={'300px'}>
          <UserList />
        </Box>
      </Box>
      <Box display={'flex'} flexDir={'column'} flexGrow={1} gap={4}>
        <Outlet />
      </Box>
    </Box>
  )
}
