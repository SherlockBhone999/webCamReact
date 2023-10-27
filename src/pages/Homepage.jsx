import UserInfo from "../components/UserInfo"
import Camera from "../components/Camera"
import Viewer from "../components/Viewer"


import { useContext } from "react"
import { Context } from "../ContextProvider"

export default function Home () {
  const { userInfo } = useContext(Context)
  return (
    <div class="w-screen h-screen bg-yellow-50">
      <UserInfo />
      
      <div class="">
      { userInfo.isViewer ? <Viewer /> : <Camera /> }
      </div>

    </div>
  )
}

/*
export default function Home () {
  const [ messenges , setMessenges ] = useState([])
  const [ name, setName ] = useState("bhone")
  const [ newMessenge , setNewMessenge] = useState("")
  
  useEffect(()=>{
    socket.on("connect" , () => {
      socket.emit("sendSocketIdToServer", socket.id , name )
    })
    
    socket.on("receiveText", (text) => {
      setMessenges(prevv => [...prevv, text ])
    })
  },[])
  
  const send = () => {
    const room = name
    socket.emit("sendText", newMessenge, room )
  }
  
  return <div class="">
    <div class="p-4 bg-yellow-100">
      name : 
      <input value={name} onChange={(e)=>setName(e.target.value)} />
    </div>
    <div class="p-4 bg-yellow-100">
      new messenge : 
      <input value={newMessenge} onChange={(e)=>setNewMessenge(e.target.value)} />
      <button onClick={send} > Send </button>
    </div>
    <div class="p-4 bg-gray-400">
    {messenges.map(string => <p>{string}</p>)}
    </div>
  </div>
}
*/
