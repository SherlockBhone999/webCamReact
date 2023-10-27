import App from './App'
import { useState , createContext , useEffect , useRef } from "react"
import Peer from "peerjs"
import io from "socket.io-client"

const serverBaseUrl = "http://localhost:3000/"

const socket = io(serverBaseUrl)

export const Context = createContext()

const ContextProvider = () => {
  const [ users , setUsers ] = useState([])
  const [ userInfo, setUserInfo ] = useState({ name : "bhone", isViewer : true , platform : "web"})
  const peerConnectionRef = useRef(null)
  const [ isViewer , setIsViewer ] = useState(false)
  
  const updateUsers = (potentialNewUser, userss) => {
      //update users
      var isAlreadyExist = false
      var indexToReplace = null
      userss.map((user,index) => {
        if(user.socketId === potentialNewUser.socketId){
          isAlreadyExist = true
          indexToReplace = index
        }
      })
      if(!isAlreadyExist){
        const arr = [...userss, potentialNewUser]
        setUsers(arr)
      }else{
        const arr = [...userss]
        arr.splice(indexToReplace, 1, potentialNewUser)
        setUsers(arr)
      }
  }
  
  useEffect(()=>{
    const peer = new Peer()
    peer.on("open", (peerId) => {
      const newUserInfo = {
          ...userInfo,
          socketId : socket.id ,
          peerId : peerId
        }
      setUserInfo(newUserInfo)
      socket.emit("sendUserInfoToServer", newUserInfo, users )
    })
    
    socket.on("sendUserInfoToClient", (newUserInfo, userss) => {
      updateUsers(newUserInfo, userss)
    })
    
    peerConnectionRef.current = peer 
  },[])
  
  useEffect(()=>{
    if(userInfo.socketId && userInfo.peerId){
      socket.emit("sendUserInfoToServer", userInfo, users )
    }
  },[userInfo])
  
  
  return (
    <Context.Provider value={{
      userInfo,
      setUserInfo,
      users,
      isViewer,
      setIsViewer,

    }}>
      <App />
    </Context.Provider>
  )
}

export default ContextProvider