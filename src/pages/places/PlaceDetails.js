import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import './PlaceDetails.css'
import CommentList from "../../components/reviewComponents/CommentList"

import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const apiEndpoint = "http://localhost:8000/api/places/"
const apiEndpoint2 = "http://localhost:8000/api/favorite/"


function PlaceDetails() {

    const storedToken = localStorage.getItem("authToken");

    const { placeId } = useParams();

    const [place, setPlace] = useState(null)
    const [hideReview, setHideReview] = useState(false)

    const [image, setImage] = useState(0)

    const navigate = useNavigate();

    const [goodReviews, setGoodReviews] = useState(0)
    const [badReviews, setBadReviews] = useState(0)

    const [step, setStep] = useState(0)

    const { user } = useContext(AuthContext);

    useEffect(() => {
        const countReviewHandler = async () => {
            try {
                const res = await axios.get(apiEndpoint + placeId + "/reviews", { headers: { Authorization: `Bearer ${storedToken}` } })


                const filteredArray = res.data.filter(review => review.check === true);
                setGoodReviews(filteredArray.length / res.data.length * 100)

                setBadReviews((res.data.length - filteredArray.length) / res.data.length * 100)


            } catch (err) {
                console.log(err)
            }
        }
        const apiCall = async () => {
            try {
                const res = await axios.get((apiEndpoint + placeId))
                setPlace(res.data)

                res.data.Review.forEach(element => {
                    if (element.user === user._id) {
                        setHideReview(true)
                    }
                });

                if (res.data.User._id === user._id) {
                    setHideReview(true)
                    countReviewHandler()
                }

            } catch (error) {
                console.log(error)
            }
        }
        apiCall()

    }, [user, storedToken, placeId]);


    const addFavoriteHandler = async () => {
        try {
            await axios.post(apiEndpoint2 + placeId, {}, { headers: { Authorization: `Bearer ${storedToken}` } })

            navigate("/favorites")
        } catch (err) {
            console.log(err)
        }
    }


    const showComments = () => {
        setStep((prev) => {
            return prev += 1
        })
    }
    const hideComments = () => {
        setStep((prev) => {
            return prev -= 1
        })
    }
    return (
        <div className= 'placeDetails'>
            {place && <div>
                <h1>{place.name}</h1>
                <h2>{place.address}</h2>
                {place.description !== null && place.description !== '' && <p>{place.description}</p>}

                {place.pictures.forEach((element, index) => {
                    <button onClick={()=>setImage(index)} ></button>
                })}
                
                <img id="place" src={place.pictures[index]}></img>

                <p>Pet friendly {place.type}</p>
                <a href= '{place.socialMedia}'/>
            
                <Link to={`/user-profile/${place.User._id}`}>Posted by: {place.User.name}</Link>
                <hr></hr>

                <div>
                    <p>Good reviews:{goodReviews}%</p>
                    <p>Bad reviews:{badReviews}%</p>
                </div>

                {!hideReview ? <Link to={`/addReview/${place._id}`}>Add review</Link> : null}
                <button onClick={() => addFavoriteHandler()}>Add to Favorites</button>
                {step === 0 && <button onClick={() => showComments()}>Show Comments</button>}
                {step === 1 && <div><CommentList comment={place.Review} />
                    <button onClick={() => hideComments()}>Hide Comments</button>
                </div>}
            </div>
            }
        </div>
    )

}
export default PlaceDetails

