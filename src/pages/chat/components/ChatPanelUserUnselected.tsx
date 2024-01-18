import { Box, Text } from '@chakra-ui/react'

interface Props {}

export function ChatPanelUserUnselected(props: Props): JSX.Element {
  return (
    <Box
      alignItems={'center'}
      backgroundColor={'gray.700'}
      borderRadius={'8px'}
      display={'flex'}
      flexDirection={'column'}
      height={'300px'}
      justifyContent={'center'}
    >
      <Text fontSize={'larger'}>Select an user to start chatting</Text>
    </Box>
  )
}
