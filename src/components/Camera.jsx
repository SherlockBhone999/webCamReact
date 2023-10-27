

import { useContext, useState, useEffect } from "react"
import { Context } from "../ContextProvider"

const OneCallableUser = ({user}) => {
  const [ isCalled, setIsCalled ] = useState(false)
  const { peerConnectionRef } = useContext(Context)
  
  const call = (peerId) => {
    setIsCalled(true)
    
    navigator.mediaDevices.getUserMedia({ video : {facingMode : "user"} })
    .then(stream => {
      peerConnectionRef.current.call(peerId, stream)
    })
  }
  
  const cancel = () => {
    setIsCalled(false)
    
    peerConnectionRef.current.close()
  }
  
  return (
    <div class="m-3 p-4 flex">
      <p class="mr-4 text-bg flex items-center">{user.name} </p>
      { !isCalled?
        <button onClick={()=>call(user.peerId)}
        class="pt-1 pb-1 pl-2 pr-2 bg-green-400 rounded"> Call </button >
      :
        <button onClick={cancel}
        class="pt-1 pb-1 pl-2 pr-2 bg-red-600 rounded"> Cancel </button >
      }
    </div>
  )
}

//caller 
export default function Camera () {
  const { users , userInfo } = useContext(Context)
  const [ callableUsers , setCallableUsers ] = useState([])
  
  
  useEffect(()=>{
    const arr = []
    users.map(user => {
      if(user.isViewer === true && user.peerId !== userInfo.peerId && user.platform === "web"){
        arr.push(user)
      }
    })
    setCallableUsers(arr)
  },[users])
  
  return (
    <div>
      { callableUsers.length === 0? <div>
        <p> Waiting for callable devices ... </p>
      </div> : null }
      
      { callableUsers.map( user => <OneCallableUser user={user} /> ) }
      
    </div>
  )
}


/*
import { useContext, useState, useEffect } from "react"
import { Context } from "../ContextProvider"

const OneCallableUser = ({user}) => {
  const [ isCalled, setIsCalled ] = useState(false)

  
  const call = (peerId) => {
    setIsCalled(true)
  }
  
  const cancel = () => {
    setIsCalled(false)
  }
  
  return (
    <div class="m-3 p-4 flex">
      <p class="mr-4 text-bg flex items-center">{user.name} </p>
      { !isCalled?
        <button onClick={()=>call(user.peerId)}
        class="pt-1 pb-1 pl-2 pr-2 bg-green-400 rounded"> Call </button >
      :
        <button onClick={cancel}
        class="pt-1 pb-1 pl-2 pr-2 bg-red-600 rounded"> Cancel </button >
      }
    </div>
  )
}

//caller 
export default function Camera () {
  const { users , userInfo } = useContext(Context)
  const [ callableUsers , setCallableUsers ] = useState([])
  
  
  useEffect(()=>{
    const arr = []
    users.map(user => {
      if(user.isViewer === true && user.peerId !== userInfo.peerId && user.platform === "web"){
        arr.push(user)
      }
    })
    setCallableUsers(arr)
  },[users])
  
  return (
    <div>
      { callableUsers.length === 0? <div>
        <p> Waiting for callable devices ... </p>
      </div> : null }
      
      { callableUsers.map( user => <OneCallableUser user={user} /> ) }
      
    </div>
  )
}
*/