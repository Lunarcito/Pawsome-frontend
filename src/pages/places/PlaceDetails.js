import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";import Map from "../../components/Map";


const apiEndpoint = "http://localhost:8000/api/places/"
const apiEndpoint2 ="http://localhost:8000/api/favorite/"

function PlaceDetails() {
    const { placeId } = useParams()
    const [place, setPlace] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const apiCall = async () => {
            try{
                const storedToken = localStorage.getItem("authToken");
                const res = await axios.get((apiEndpoint + placeId))
                setPlace(res.data)
            }catch(error){
                console.log(error)
            } 
        }
        apiCall()
    }, [placeId])

    const addFavoriteHandler = async (event) => { 
      
        try{
            const storedToken = localStorage.getItem("authToken");
            const res = await axios.post(
                apiEndpoint2 + placeId,
                { headers: { Authorization: `Bearer ${storedToken}` }})
                
                navigate("/favorites")

        } catch(err){
            console.log(err)
        }
    }



    return (
        <div>
            {place && <div>
                <h1>Name:{place.name}</h1>
                <p>Address:{place.address}</p>
                <p>Description:{place.description}</p>
                <p>Picture:{place.pictures}</p>
                <p>Type:{place.type}</p>
                <p>SocialMedia:{place.socialMedia}</p>
                <Link to={`/user-profile/${place.User._id}`}>UserProfile</Link>
                <button onClick={addFavoriteHandler}>Add to Favorites</button>   
                <Map/>
            </div>}
        </div>
    )

}
export default PlaceDetails