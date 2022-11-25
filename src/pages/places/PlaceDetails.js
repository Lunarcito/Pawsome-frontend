import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const apiEndpoint = "http://localhost:8000/api/places/"

function PlaceDetails() {
    const { placeId } = useParams()
    const [place, setPlace] = useState(null)

    useEffect(() => {
        const apiCall = async () => {
            try{

            const res = await axios.get((apiEndpoint + placeId))
            setPlace(res.data)
            }catch(error){
                console.log(error)
            } 
        }
        apiCall()
    }, [placeId])

console.log(place)
    return (
        <div>
            {place && <div>
                <h1>{place.name}</h1>
                <p>{place.address}</p>
                <Link to={`/user-profile/${place.User._id}`}>UserProfile</Link>
            </div>}
        </div>
    )

}
export default PlaceDetails