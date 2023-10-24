import { useNavigate } from "react-router-dom"

export default function Home () {
  const navigate = useNavigate()
  return <div class="text-red-500">
  Home page
  <button onClick={()=>navigate('/camera')}>to camera</button>
  </div>
}