import axios from "axios";
import { useEffect, useState } from "react"
import './Favorites.css';

const apiEndpoint = "http://localhost:8000/api/favorites"

   function FavoritePlace() {
    const [favorites, setFavorites] = useState([])
 
    useEffect(() => {
       const apiCall = async () => {
          const res = await axios.get(apiEndpoint)
          setFavorites(res.data[0])
       }
        apiCall()
    }, [])



  return (
    <div>
       
       <h1> My favorites </h1>
       <ul>
       {favorites.map(item =>
          item.favorite === true ? <li key={item.id}>{item.name}</li> : null
        )}
      </ul>
       
    </div>
 )
}
export default FavoritePlace()
