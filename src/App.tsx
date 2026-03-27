import { Routes, Route } from 'react-router-dom'

import Header from './Components/Header'
import { JsonProvider } from './Components/JsonContext'

import AlertInspector from './Pages/AlertInspector'
import Creator from './Pages/Creator'

function App() {
  return (
      <>
      <JsonProvider>
        <Header />
        <Routes>
          <Route path='/' element={<AlertInspector />} />
          <Route path='/create' element={<Creator />} />
        </Routes>
      </JsonProvider>
      </>
    )
}

export default App;
