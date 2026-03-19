import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Header from './Components/Header'
import { JsonProvider } from './Components/JsonContext'

import AlertInspector from './Pages/AlertInspector'

import './App.css'

function App() {
  return (
      <>
      <Header />
      <JsonProvider>
        <BrowserRouter basename='/SOCAlertSim'>
          <Routes>
            <Route path='/' element={<AlertInspector />} />
            <Route path='/create' element={<></>} />
          </Routes>
        </BrowserRouter>
      </JsonProvider>
      </>
    )
}

export default App;
