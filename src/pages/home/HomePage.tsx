import { Box, Heading, Text } from '@chakra-ui/react'

import { LoginForm } from './components/LoginForm'

interface Props {}

export function HomePage(props: Props): JSX.Element {
  return (
    <Box
      maxW={{ base: '480px', sm: '640px' }}
      minHeight={'calc(80vh - 3px)'}
      mx={'auto'}
      pt={8}
      width={'95%'}
    >
      <Heading mb={5} size={'lg'}>
        Welcome to Chat app!
      </Heading>
      <Text mb={5}>Please write your username to start chatting</Text>
      <LoginForm />
    </Box>
  )
}
