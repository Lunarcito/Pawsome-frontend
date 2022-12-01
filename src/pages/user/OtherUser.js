import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import "./OtherUser.css"
import {Link} from "react-router-dom"

const apiEndpoint = "http://localhost:8000/api/user-profile/"

const image1 = 'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669895036/Pawsome/pexels-samson-katt-5255258_fxn2bg.jpg'
const image2 = 'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669895006/Pawsome/pexels-cesar-mendez-5230141_wpacpr.jpg'
const image3 = 'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669895006/Pawsome/pexels-andreas-schmolmueller-3376610_lpqob7.jpg'
const image4 = 'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669895006/Pawsome/pexels-matthias-zomer-422220_f8faal.jpg'
const image5 = 'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669895005/Pawsome/pexels-engin-akyurt-1438798_sr9ard.jpg'

const images = [image1, image2, image3, image4, image5]

function OtherUser() {
    const { userId } = useParams()
    const [user, setPlace] = useState({})

    useEffect(() => {
        const apiCall = async () => {
            try {
                const res = await axios.get((apiEndpoint + userId))
                setPlace(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        apiCall()
    }, [userId])

    return (
        <div>
            <h1 className="titleName">{user.name}'s Profile!</h1>
            {user.pet && user.pet.map((pet) => {
                return (
                    <div className="petInfo" key={pet._id}>
                        <img className="petImage" src={pet.image} alt="pet" />
                        <p className="petName">{pet.namePet}'s friend😊</p>
                    </div>
                )
            })}
            {user.createdPlaceId && user.createdPlaceId.map((place) => {
                return (
                    <div key={place._id}>
                    <Link to={`/places/${place._id}`}>
                    <div className="placeBox" >
                        <p className="name">{place.name}</p>
                        <img className="Imaginepet" src={images[Math.floor(Math.random()*4)]} alt=""/>
                    </div></Link></div>
                )
            })}
        </div >
    )
}

export default OtherUser