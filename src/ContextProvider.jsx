import App from './App'
import { useState , createContext , useEffect } from "react"
import Peer from "peerjs"

const serverBaseUrl = "http://localhost:3000"
const peer = new Peer()

export const Context = createContext()

const ContextProvider = () => {
  const [ videoDimensions, setVideoDimensions ] = useState({ width : null, height : null })
  const [ viewerPeerIds , setViewerPeerIds ] = useState([])
  
  //states should update via socket 
  const [ myPeerId , setMyPeerId ] = useState(null)
  const [ videos , setVideos ] = useState([
    { provider : "" , stream : null }
    ])
  
  useEffect(()=>{
    /*
    peer.on("open" , (id) => {
      setMyPeerId(id)
    }) 
    */
    
  },[])
  
  return (
    <Context.Provider value={{
      serverBaseUrl,
      myPeerId,
      
    }}>
      <App />
    </Context.Provider>
  )
}

export default ContextProvider