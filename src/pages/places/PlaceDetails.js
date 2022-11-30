import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import CommentList from "../../components/reviewComponents/CommentList"

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";


const apiEndpoint = "http://localhost:8000/api/places/"
const apiEndpoint2 = "http://localhost:8000/api/favorite/"

function PlaceDetails() {
    const storedToken = localStorage.getItem("authToken");
    const { placeId } = useParams()
    const [place, setPlace] = useState(null)

    const navigate = useNavigate()

    const [hideReview, setHideReview] = useState(false)

    const [goodReviews, setGoodReviews]=useState(0)
    const [badReviews, setBadReviews]=useState(0)

    const [step, setStep] = useState(0)



    const { isLoggedIn, user } = useContext(AuthContext);

    useEffect(() => {
        const apiCall = async () => {
            try {
                const res = await axios.get((apiEndpoint + placeId))
                setPlace(res.data)

                res.data.Review.forEach(element => {
                    if (element.user === user._id) {
                        setHideReview(true)
                    }
                });

                if ( res.data.User._id === user._id){
                    setHideReview(true)
                    countReviewHandler()
                }
                

            } catch (error) {
                console.log(error)
            }
        }
        apiCall()
    }, [user])


    const addFavoriteHandler = async () => {
        try {
            const res = await axios.post(apiEndpoint2 + placeId, {}, { headers: { Authorization: `Bearer ${storedToken}` } })

            navigate("/favorites")

        } catch (err) {
            console.log(err)
        }
    }


    const countReviewHandler = async () => {
        try {
            const res = await axios.get(apiEndpoint + placeId + "/reviews", { headers: { Authorization: `Bearer ${storedToken}` } })
            console.log(res.data)
            console.log("Total reviews: " + res.data.length)
            
            const filteredArray = res.data.filter(review=> review.check === true);
            setGoodReviews(filteredArray.length/res.data.length*100)

            setBadReviews((res.data.length-filteredArray.length)/res.data.length*100)
            
            


        } catch (err) {
            console.log(err)
        }
    }
    // let num = 0
    // const showComments =  () => {
    //     return num++
    // }
    // console.log(num)
    const showComments = () => {
        setStep((prev) => {
            return prev += 1
        })
    }
    const hideComments = () => {
        setStep((prev) => {
            console.log(prev)
            return prev -= 1
        })
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



                <Link to={`/user-profile/${place.User._id}`}>Created by : {place.User.name}</Link>
                <hr></hr>

                <div>
                    <p>Good reviews:{goodReviews}%</p>
                    <p>Bad reviews:{badReviews}%</p>
                  
                </div>

                {!hideReview ? <Link to={`/addReview/${place._id}`}>Add review</Link> : null}
                <button onClick={() => addFavoriteHandler()}>Add to Favorites</button>
               {step === 0 && <button onClick={()=>showComments()}>Show Comments</button> }
               {step === 1 && <div><CommentList comment={place.Review}/>
               <button onClick={() =>hideComments()}>Hide Comments</button>
               </div>}
            </div>}
        </div>
    )

}
export default PlaceDetails

