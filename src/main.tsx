import ReactDOM from 'react-dom/client'

import { ChakraProvider, ColorModeScript, theme } from '@chakra-ui/react'
import { App } from 'App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ChakraProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <App />
  </ChakraProvider>
)
