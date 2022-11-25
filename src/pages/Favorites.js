import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UserProfile from "./UserProfile"

function Favorites() {    
    const [favorites, setFavorites] = useState([])
    const apiEndpoint = "http://localhost:8000/api/favorites/"
    const {placeId}= useParams()
    useEffect(() => {
        const apiCall = async () => {
            console.log("PLACEID",placeId)
            try{
                const res = await axios.get(apiEndpoint + placeId )
                setFavorites(res.data)
            } catch (err){
                console.log (err)
            }
        }

        apiCall()
    }, [])

  return (
    <div>       
       <h1> My favorites </h1>
       {favorites.map(place =>{
        return(
        <div key = {place._id}>
            <p>{place.name}</p>
            <p>{place.address}</p>
            <p>{place.type}</p>
            <p>{place.description}</p>
            
        </div>
        )       
    })}    
    </div>
 )
}

export default Favorites

