import {
  Heading,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Box,
  FormControl,
  Text
} from '@chakra-ui/react'

import { useAddUserMutation } from 'hooks/mutation/useAddUserMutation'

interface Props {}

export function Login(props: Props): JSX.Element {
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
    <>
      <Box>
        <Heading mb={5} size={'lg'}>
          Welcome to Chat app!
        </Heading>
        <Text mb={5}>Please write your username to start chatting</Text>
      </Box>
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
        <Button type='submit'>Login</Button>
      </Box>
      <Alert status='warning'>
        <AlertIcon />
        Your account will be delete when you close the page.
      </Alert>
    </>
  )
}
