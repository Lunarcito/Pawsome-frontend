import {
    Button,
    Link
} from "@chakra-ui/react";

import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

import CommentList from "../../components/reviewComponents/CommentList"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import './PlaceDetails.css'

const apiEndpoint =  `${process.env.REACT_APP_API_URL}places/`
const apiEndpoint2 = `${process.env.REACT_APP_API_URL}favorite/`
const apiEndpoint3 = `${process.env.REACT_APP_API_URL}favorites/`


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
                if (res.data.User) {
                    if (res.data.User._id === user._id) {
                        setHideReview(true)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
        apiCall()
        countReviewHandler()
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
                    if (element.place._id === placeId) {
                        setFavorites(element)
                        setSelectedHeart(true)
                    }
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
    const getDefaultImage = (place) => {

        if (place.type ==="Restaurant"){
            return  'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669836239/Pawsome/white-interior-blur-blurred-chair_s7b2zj.jpg'
        }
        if (place.type ==="Cafeteria"){
            return  'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669836161/Pawsome/cup-fresh-made-coffee-served-cup_1_rnb735'

        }
        if (place.type ==="Museum"){
            return  'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669835759/Pawsome/long-narrow-painting-art-exhibition_xsdyvx.jpg'
        }
        if (place.type ==="Beach"){
            return  'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669836393/Pawsome/adorable-pomeranian-spitz-dog-having-fun-running-beach_1_a2m3j3.jpg'
        }
        if (place.type ==="Other"){
            return  'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669835759/Pawsome/adorable-french-bulldog-with-colorful-shopping-bags-isolated-white-background_fnkp7p.jpg'
        }
    }

    return (
        <div className='placeCard'>
            
                <h1>{place.name}</h1>
                <h4>{place.address}</h4>
                <p>{place.description !== null && place.description !== ''}</p>                
                <p><Link href={place.socialMedia}>{place.socialMedia}</Link></p>
                <p><Link href={place.socialMedia1}>{place.socialMedia1}</Link></p>
                <div className='imagesDetails'>
                    <img id="place" src={(place.pictures && place.pictures.length !== 0) ? place.pictures[image] : getDefaultImage(place) } alt="place"></img>
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
                <h4>Type of place: {place.type}</h4>
                <div className="posted">
                    {place.User && <Link to={`/user-profile/${place.User._id}`}><h5>Posted by:</h5> {place.User.name} </Link>}
                </div>
                <div className="verification">
                    <div className="verificationYes">
                        <img className="verifImage" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669885442/Pawsome/happiness_pdzvmw.png' alt="" />
                        <p>{goodReviews} %</p>
                    </div>
                    <div className="verificationNo">
                        <img className="verifImage" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669885442/Pawsome/sad_iukrsb.png' alt="" />
                        <p>{badReviews} %</p>
                    </div>
                </div>
                
                <div className="addReview" >
                                      
                    {!hideReview ? <Link href={`/addReview/${place._id}`}>Add review</Link> : null}

                {step === 0 &&
                
                    <Button onClick={() => showComments()} colorScheme='teal' variant='outline'>
                        Show Comments
                    </Button>
                    }
                {step === 1 &&
                
                <div>
                    <CommentList comment={place.Review} />
               
                    <div className="HideButton">
                    <Button onClick={() => hideComments()} colorScheme='teal' variant='outline'>
                            Hide Comments
                    </Button>
                    </div>         
                </div>}
                
              
                </div>
        </div>
    )
}
export default PlaceDetails

