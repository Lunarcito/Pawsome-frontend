import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Map from "../../components/Map";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const apiEndpoint = "http://localhost:8000/api/places/"

function PlaceDetails() {
    const { placeId } = useParams()
    const [place, setPlace] = useState(null)
    const [hideReview, setHideReview] = useState(false)

    const { isLoggedIn, user } = useContext(AuthContext);
  
    useEffect(() => {
        const apiCall = async () => {
            try{
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





    return (
        <div>
            {place && <div>
                <h1>{place.name}</h1>
                <p>{place.address}</p>
                {isLoggedIn && <div> 
                <Link to={`/user-profile/${place.User._id}`}>UserProfile</Link>
                <hr></hr>
                {!hideReview && <Link to={`/addReview/${place._id}`}>Add review</Link>}
                </div>}

            </div>}
        </div>
    )

}
export default PlaceDetails