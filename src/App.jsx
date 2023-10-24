import CameraPage from './pages/CameraPage'
import ViewerPage from './pages/ViewerPage'
import Homepage from './pages/Homepage'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom"

function App() {
  //peerId of client that send the stream
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/view" element={<ViewerPage />} /> 
        <Route path="/camera" element={ <CameraPage /> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App

