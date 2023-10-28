import App from './App'
import { useState , createContext , useEffect , useRef } from "react"
import Peer from "peerjs"
import io from "socket.io-client"

//const serverBaseUrl = "http://localhost:3000/"
const serverBaseUrl = "https://webcamserver.onrender.com"

const socket = io(serverBaseUrl)

export const Context = createContext()


const ContextProvider = () => {
  const [ users , setUsers ] = useState([])
  const [ userInfo, setUserInfo ] = useState({ name : "bhone", isViewer : true , platform : "web"})
  const peerConnectionRef = useRef(null)
  const [ isViewer , setIsViewer ] = useState(false)
  //for viewer
  const videoRef = useRef(null)
  const [ hideVideo , setHideVideo ] = useState("")
  
  const updateUsers = (potentialNewUser, userss) => {
      //update users
      var isAlreadyExist = false
      var indexToReplace = null
      userss.map((user,index) => {
        if(user.socketId === potentialNewUser.socketId ){
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
      if(userInfo.socketId && userInfo.peerId){
        socket.emit("sendUserInfoToServer", userInfo )
      }
    })
    
    socket.on("sendUsersToClient", (users) => {
      setUsers(users)
    })
    
    peer.on("call", (call) => {
      call.answer();
      call.on("stream", function (remoteStream) {
        videoRef.current.srcObject = remoteStream;
        videoRef.current.play();
      });
    });
    
    
    peerConnectionRef.current = peer 
  },[])
  
  useEffect(()=>{
    if(userInfo.socketId && userInfo.peerId){
      socket.emit("sendUserInfoToServer", userInfo )
    }
  },[userInfo])
  
  
  return (
    <Context.Provider value={{
      userInfo,
      setUserInfo,
      users,
      isViewer,
      setIsViewer,
      peerConnectionRef,
      videoRef,
      hideVideo,
      setHideVideo,
      
      
    }}>
      <App />
    </Context.Provider>
  )
}

export default ContextProvider