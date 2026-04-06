import { Routes, Route } from "react-router-dom"

import Header from "./Components/Header"

import AlertInspector from "./Pages/AlertInspector"
import Creator from "./Pages/Creator"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<AlertInspector />} />
        <Route path='/create' element={<Creator />} />
      </Routes>
    </>
  )
}

export default App
