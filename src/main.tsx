import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import App from './App.tsx'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import './index.css'


const theme = createTheme({
  components: {
    Button: {
      defaultProps: {
        variant: "gradient",
        gradient: {
          from: "rgba(74, 74, 74, 1)",
          to: "rgba(115, 115, 115, 0.85)",
          deg: 45
        }
      }
    }
  }
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider forceColorScheme='dark' theme={theme}>
      <Notifications position='bottom-right' autoClose={5000} />
      <App />
    </MantineProvider>
  </StrictMode>,
)
