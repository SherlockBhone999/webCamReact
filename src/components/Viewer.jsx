import { useLocation } from "react-router-dom"
import { useRef , useEffect } from "react"

import { useContext } from "react"
import { Context } from "../ContextProvider"

//accept one call 
export default function Viewer () {
  
  //we don't need peerId to accept the call, just to know who provide the stream
  const videoRef = useRef()

  
  const streamVideo = () => {
    navigator.mediaDevices.getUserMedia({ video : {facingMode : "user"}})
    .then(stream => {
      videoRef.current.srcObject = stream
      videoRef.current.play()
    })
  }
  
  useEffect(()=>{
    streamVideo()
  },[])

  return (
    <div>
      ViewerPage
      {/*
      <div>
        <video ref={videoRef} style={{ width : 90 }}/>
      </div>
    */}
    </div>
  )
}