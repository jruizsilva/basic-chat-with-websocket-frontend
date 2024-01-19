import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'

import { useAddUserMutation } from 'hooks/mutation/useAddUserMutation'

interface Props {}

export function LoginForm(props: Props): JSX.Element {
  const { addUser } = useAddUserMutation()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string

    const user: UserRequest = {
      username
    }

    addUser(user)
  }

  return (
    <Box maxW={{ base: '480px' }}>
      <Box
        as={'form'}
        display={'flex'}
        flexDirection={'column'}
        gap={4}
        mb={'16px'}
        onSubmit={handleSubmit}
      >
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input required minLength={2} name='username' />
        </FormControl>
        <Button colorScheme='messenger' type='submit'>
          Start chatting
        </Button>
      </Box>
      <Alert status='warning'>
        <AlertIcon />
        Your account will be delete when you close the page.
      </Alert>
    </Box>
  )
}
