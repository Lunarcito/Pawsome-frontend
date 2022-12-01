import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import "./OtherUser.css"
import {Link} from "react-router-dom"

const apiEndpoint = "http://localhost:8000/api/user-profile/"

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
                        <img className="placeImage" src={place.pictures} alt="place" />
                    </div></Link></div>
                )
            })}
        </div >
    )
}

export default OtherUser