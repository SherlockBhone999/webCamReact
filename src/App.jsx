
import Homepage from './pages/Homepage'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"

function App() {
  const { params } = useParams()
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/:params" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

