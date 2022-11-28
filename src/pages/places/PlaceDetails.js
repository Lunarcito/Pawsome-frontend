import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import Map from "../../components/Map";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const apiEndpoint = "http://localhost:8000/api/places/"
const apiEndpoint2 ="http://localhost:8000/api/favorite/"

function PlaceDetails() {
    const { placeId } = useParams()
    const [place, setPlace] = useState(null)

    const navigate = useNavigate()

    const [hideReview, setHideReview] = useState(false)


    const { isLoggedIn, user } = useContext(AuthContext);
  
    useEffect(() => {
        const apiCall = async () => {
            try{

                const storedToken = localStorage.getItem("authToken");
                const res = await axios.get((apiEndpoint + placeId))
                setPlace(res.data)

            const res = await axios.get((apiEndpoint + placeId))
            setPlace(res.data)
            console.log(user)

           res.data.Review.forEach(element => {
                if (element.user === user._id){
                    setHideReview(true)
                }
            });

            console.log(res.data)

            }catch(error){
                console.log(error)
            } 
        }
        apiCall()
    }, [user])






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
                <Map/>
                <Link to={`/user-profile/${place.User._id}`}>UserProfile</Link>
                <hr></hr>
                {!hideReview && <Link to={`/addReview/${place._id}`}>Add review</Link>}
                <button onClick={addFavoriteHandler}>Add to Favorites</button>   
            </div>}
        </div>
    )

}
export default PlaceDetails