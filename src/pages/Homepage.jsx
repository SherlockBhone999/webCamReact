import { useLocation } from "react-router-dom"
import queryString from "query-string"


export default function Home () {
  const location = useLocation()
  const params = new URLSearchParams(location.search);
  const as = params.get('as')
  const name = params.get('name')
  
  return <div class="text-red-500">
  {as && <div>{as}</div>}
  {name && <div>{name}</div>}
  </div>
}