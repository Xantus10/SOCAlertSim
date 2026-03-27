import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import './index.css'

import App from './App.tsx'

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
    },
    Modal: {
      defaultProps: {
         withinPortal: false
      }
    }
  }
});


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider forceColorScheme='dark' theme={theme}>
      <BrowserRouter basename='/SOCAlertSim'>
        <App />
        <Notifications position='bottom-right' autoClose={5000} />
      </BrowserRouter>
    </MantineProvider>
  </StrictMode>,
)
