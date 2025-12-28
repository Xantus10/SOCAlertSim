import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Paper, Title, Box, Group } from '@mantine/core'

import SelectJson from './Components/SelectJson'
import { JsonProvider } from './Components/JsonContext'

import AlertInspector from './Pages/AlertInspector'

import './App.css'

function App() {
  return (
      <>
      <Paper bd="solid 1px white" w="100%" pl="30px"><Title order={2}>SOC Alert Sim</Title></Paper>
      <JsonProvider>
        <Group p="1rem">
          <Box>
            <SelectJson />
          </Box>
          <Box>
            <BrowserRouter basename='/SOCAlertSim'>
              <Routes>
                <Route path='/' element={<AlertInspector />} />
              </Routes>
            </BrowserRouter>
          </Box>
        </Group>
      </JsonProvider>
      </>
    )
}

export default App;
