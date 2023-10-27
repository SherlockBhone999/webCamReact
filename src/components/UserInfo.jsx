import { useContext , useState } from "react"
import { Context } from "../ContextProvider"

export default function UserInfoBox (){
  const {users, userInfo, setUserInfo, isViewer, setIsViewer } = useContext(Context)

  const [ name, setName ] = useState("bhone")
  
  const updateName = (newName) => {
    setName(newName)
  }
  
  const updateIsViewer = () => {
    setIsViewer(!isViewer)
  }
  
  return (
    <div>
      <div class="flex bg-gray-200 p-4 justify-between">
        <div class="flex items-center">
          <p>name : </p>
          <input value={name} onChange={(e)=>updateName(e.target.value)} class="ml-3 pl-1"/>
        </div>
        
        <div>
          <div class="flex justify-center text-lg p-2"> mode </div>
          <div class="text-xs grid grid-flow-col gap-2">
            Viewer : <input type="checkBox" checked={isViewer} onChange={updateIsViewer}/> 
        
            Camera : <input type="checkBox" checked={!isViewer} onChange={updateIsViewer}/>
          </div>
        </div>
        
        <div class="flex justify-center items-center">
          <button onClick={()=>{
           const info = {...userInfo, name : name, isViewer : isViewer} 
           setUserInfo(info)
          }} class="p-3 bg-blue-500 rounded shadow">Set </button>
        </div>
      </div>
      
    
      <div>
        {JSON.stringify(users)}
      </div>
    </div>
  )
}