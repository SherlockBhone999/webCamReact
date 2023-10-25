import { useLocation } from "react-router-dom"
import { useRef , useEffect } from "react"


//accept one call 
export default function Viewer () {
  const location = useLocation()
  const streamProvider = location.pathname.slice(1)
  //we don't need peerId to accept the call, just to know who provide the stream
  const videoRef = useRef()
  //iterate videos, if provider and nameFromParams equals, show video 
  
  
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
      {streamProvider}
      <div>
        <video ref={videoRef} style={{ width : 90 }}/>
      </div>
      { videoRef.current ? <div>
      width : {videoRef.current.clientWidth}
      height : {videoRef.current.clientHeight}
      </div> 
      : null 
      }
    </div>
  )
}