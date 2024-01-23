'use client'

import {
  Avatar,
  Box,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text
} from '@chakra-ui/react'
import { MdDelete } from 'react-icons/md'

import { useDeleteUserMutation } from 'hooks/mutation/useDeleteUserMutation'
import { useAppStore } from 'store/useAppStore'
import { useDeleteAllPublicMesaggesBySenderMutation } from 'hooks/mutation/useDeleteAllPublicMesaggesBySenderMutation'

export function UserMenu() {
  const userAuthenticated = useAppStore((store) => store.userAuthenticated)
  const stompClient = useAppStore((store) => store.stompClient)
  const logout = useAppStore((store) => store.logout)
  const { deleteUser, isPending: isPendingDeleteUser } = useDeleteUserMutation()
  const { deleteAllPublicMessagesBySender } =
    useDeleteAllPublicMesaggesBySenderMutation()

  const handleButtonDelete = () => {
    if (
      userAuthenticated !== null &&
      stompClient !== null &&
      stompClient.connected
    ) {
      deleteUser(userAuthenticated)
      stompClient.disconnect(() => {
        logout()
      })
    }
  }

  return (
    <Popover isLazy placement='bottom'>
      <PopoverTrigger>
        <Box
          _hover={{ cursor: 'pointer' }}
          alignItems={'center'}
          display={'flex'}
          gap={2}
          justifyContent={'center'}
        >
          <Avatar name={userAuthenticated?.username} size={'sm'} />
          <Text fontSize={'2xl'}>{userAuthenticated?.username}</Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent _focus={{ boxShadow: 'none' }} w='fit-content'>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            <Button
              colorScheme='red'
              fontSize='sm'
              fontWeight='normal'
              isDisabled={isPendingDeleteUser}
              isLoading={isPendingDeleteUser}
              justifyContent='space-between'
              loadingText='Loading...'
              rightIcon={<MdDelete />}
              variant='ghost'
              w='194px'
              onClick={handleButtonDelete}
            >
              Delete user
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
