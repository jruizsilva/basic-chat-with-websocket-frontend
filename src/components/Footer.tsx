'use client'

import {
  Box,
  Container,
  Stack,
  Text,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  type BoxProps
} from '@chakra-ui/react'
import { type ReactNode } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const SocialButton = ({
  children,
  label,
  href
}: {
  children: ReactNode
  label: string
  href: string
}) => {
  return (
    <chakra.button
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
      }}
      alignItems={'center'}
      as={'a'}
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      cursor={'pointer'}
      display={'inline-flex'}
      h={8}
      href={href}
      justifyContent={'center'}
      rounded={'full'}
      transition={'background 0.3s ease'}
      w={8}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  )
}

export function Footer() {
  return (
    <Box borderTop={'1px solid'}>
      <Container
        align={{ base: 'center', md: 'center' }}
        as={Stack}
        direction={{ base: 'column', md: 'row' }}
        justify={{ base: 'center', md: 'space-between' }}
        maxW={'6xl'}
        minHeight={'10vh'}
        py={4}
        spacing={4}
      >
        <Text>
          © January, 2024 - Build with Spring boot and React by Jonathan Ruiz
          Silva
        </Text>
        <Stack direction={'row'} spacing={6}>
          <SocialButton href={'https://github.com/jruizsilva'} label={'Github'}>
            <FaGithub />
          </SocialButton>
          <SocialButton
            href={'https://www.linkedin.com/in/jruizsilva'}
            label={'Linkedin'}
          >
            <FaLinkedin />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  )
}
