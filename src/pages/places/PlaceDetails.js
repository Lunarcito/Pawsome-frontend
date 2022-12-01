import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import './PlaceDetails.css'
import CommentList from "../../components/reviewComponents/CommentList"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const apiEndpoint = "http://localhost:8000/api/places/"
const apiEndpoint2 = "http://localhost:8000/api/favorite/"
const apiEndpoint3 = "http://localhost:8000/api/favorites/"
function PlaceDetails() {
    const storedToken = localStorage.getItem("authToken");
    const { placeId } = useParams();
    const [hideReview, setHideReview] = useState(false)
    const [image, setImage] = useState(0)
    const [goodReviews, setGoodReviews] = useState(0)
    const [badReviews, setBadReviews] = useState(0)
    const [selectedHeart, setSelectedHeart] = useState(false)
    const [place, setPlace] = useState("")
    const [step, setStep] = useState(0)
    const { user } = useContext(AuthContext);
    const [favorites, setFavorites] = useState(false)
    const [main, setMain] = useState(true)
    const [main1, setMain1] = useState(true)
    const [main2, setMain2] = useState(true)
    const [main3, setMain3] = useState(true)
    const [main4, setMain4] = useState(true)
    const [main5, setMain5] = useState(true)
    useEffect(() => {
        const countReviewHandler = async () => {
            try {
                const res = await axios.get(apiEndpoint + placeId + "/reviews", { headers: { Authorization: `Bearer ${storedToken}` } })
                const filteredArray = res.data.filter(review => review.check === true);
                if (res.data.length === 0) {
                    setGoodReviews(0)
                    setBadReviews(0)
                } else {
                    setGoodReviews(filteredArray.length / res.data.length * 100)
                    setBadReviews((res.data.length - filteredArray.length) / res.data.length * 100)
                }
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
    useEffect(() => {
        const apiCall = async () => {
            try {
                const storedToken = localStorage.getItem("authToken");
                const res = await axios.get(
                    apiEndpoint3,
                    { headers: { Authorization: `Bearer ${storedToken}` } }
                )
                res.data.forEach(element => {
                    if (element.place._id === placeId)
                        setFavorites(element)
                    setSelectedHeart(true)
                })
            } catch (err) {
                console.log(err)
            }
        }
        apiCall()
    }, [placeId]);
    const addFavoriteHandler = async () => {
        try {
            if (!selectedHeart) {
                const res = await axios.post(apiEndpoint2 + placeId, {}, { headers: { Authorization: `Bearer ${storedToken}` } })
                setFavorites(res.data)
                setSelectedHeart(!selectedHeart)
            } else {
                await axios.delete(apiEndpoint3 + favorites._id, { headers: { Authorization: `Bearer ${storedToken}` } })
                setFavorites(false)
                setSelectedHeart(!selectedHeart)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const buttonImagesHandler = (index) => {
        setImage(index)
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


    useEffect(() => {

        if (place.pictures) {

            if (place.pictures.length === 0 && place.type === "Restaurant") {
                setMain(false)
            }

            if (place.pictures.length === 0 && place.type === "Cafeteria") {
                setMain2(false)
            }

            if (place.pictures.length === 0 && place.type === "Museum") {
                setMain3(false)
            }
            if (place.pictures.length === 0 && place.type === "Beach") {
                setMain4(false)
            }
            if (place.pictures.length === 0 && place.type === "Other") {
                setMain5(false)
            }
            if (!main || !main2 || !main3 || !main4 || !main5) {
                setMain1(false)
            }
        }
    }, [place.pictures, main, main1, main2, main3, main4, main5, place.type])


    return (
        <div className='placeDetails'>
            {place && <div className="placeDetails">
                <h1>{place.name}</h1>
                <h2>{place.address}</h2>
                {place.description !== null && place.description !== '' && <p>{place.description}</p>}
                <div className='imagesDetails'>
                    {main1 && <img id="place" src={place.pictures[image]} alt=""></img>}
                    {!main && <img id="place" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669836239/Pawsome/white-interior-blur-blurred-chair_s7b2zj.jpg' alt="place" />}
                    {!main2 && <img id="place" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669836161/Pawsome/cup-fresh-made-coffee-served-cup_1_rnb735.jpg' alt="place" />}
                    {!main3 && <img id="place" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669835759/Pawsome/long-narrow-painting-art-exhibition_xsdyvx.jpg' alt="place" />}
                    {!main4 && <img id="place" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669836393/Pawsome/adorable-pomeranian-spitz-dog-having-fun-running-beach_1_a2m3j3.jpg' alt="place" />}
                    {!main5 && <img id="place" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669835759/Pawsome/adorable-french-bulldog-with-colorful-shopping-bags-isolated-white-background_fnkp7p.jpg' alt="place" />}
                    <button className="heartButton" onClick={() => addFavoriteHandler()}>
                        {!favorites && <img className='heart' src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669888197/Pawsome/like_2_h3ib1q.png' alt="" />}
                        {favorites && <img className='heart' src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669887369/Pawsome/like_1_bpibsd.png' alt="" />}
                    </button>
                </div>
                <div className="buttonImages">
                    {place.pictures && place.pictures.map((element, index) => {
                        return (
                            <div key={element}>
                                <button className={index === image ? 'button-green ' : 'button-grey'} onClick={() => buttonImagesHandler(index)} ></button>
                            </div>
                        )
                    })}
                </div>
                <p>Pet friendly {place.type}</p>
                <div className="posted">
                    {place.User && <Link to={`/user-profile/${place.User._id}`}><h3>Posted by:</h3> {place.User.name} </Link>}
                </div>
                <div className="verification">
                    <div className="verificationYes">
                        <img className="verifImage" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669885442/Pawsome/sad_iukrsb.png' alt="" />
                        <p>{goodReviews} %</p>
                    </div>
                    <div className="verificationNo">
                        <img className="verifImage" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669885442/Pawsome/happiness_pdzvmw.png' alt="" />
                        <p>{badReviews} %</p>
                    </div>
                </div>
                {!hideReview ? <Link to={`/addReview/${place._id}`}><button>Add review</button></Link> : null}
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

