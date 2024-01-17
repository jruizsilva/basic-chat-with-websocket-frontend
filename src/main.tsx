import ReactDOM from 'react-dom/client'

import { ChakraProvider, ColorModeScript, extendTheme } from '@chakra-ui/react'
import { App } from 'App'
import { ToastContainer } from 'react-toastify'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import 'react-toastify/dist/ReactToastify.css'

const queryClient = new QueryClient()

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
}

const theme = extendTheme({ config })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </ChakraProvider>
)
