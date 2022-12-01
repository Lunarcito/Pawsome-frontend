import axios from "axios"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/profile"
const storedToken = localStorage.getItem('authToken')

const image1 = 'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669895036/Pawsome/pexels-samson-katt-5255258_fxn2bg.jpg'
const image2 = 'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669895006/Pawsome/pexels-cesar-mendez-5230141_wpacpr.jpg'
const image3 = 'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669895006/Pawsome/pexels-andreas-schmolmueller-3376610_lpqob7.jpg'
const image4 = 'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669895006/Pawsome/pexels-matthias-zomer-422220_f8faal.jpg'
const image5 = 'https://res.cloudinary.com/dfajfbnkr/image/upload/v1669895005/Pawsome/pexels-engin-akyurt-1438798_sr9ard.jpg'

const images = [image1, image2, image3, image4, image5]

function MyPlaces() {
    const [places, setPlaces] = useState([])
    const { placeId } = useParams()

    const apiCall = async () => {
        try {
            const res = await axios.get(apiEndpoint, { headers: { Authorization: `Bearer ${storedToken}` } })
            setPlaces(res.data.createdPlaceId)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        apiCall()
    }, [])

    const deleteHandler = async (elementId) => {
        const res = await axios.delete(`http://localhost:8000/api/places/${elementId}`, {
            headers: { Authorization: `Bearer ${storedToken}` },
        });
        apiCall()
    }

    
    console.log(places)
    return (
        <div>
            <h1>My Places</h1>
            {places && places.map((place) => {
                return (
                    <div key={place._id}><div className="pplaces">
                        <h2 className="Placename">{place.name}</h2>
                        <img className="Placeimage" src={images[Math.floor(Math.random()*4)]} alt="place" />
                        
                        </div>
                        <Link to={`edit-place/${place._id}`}>Edit</Link>
                        <button onClick={() => deleteHandler(place._id)}>Remove Me</button>
                    </div>
                )
            })}
        </div>
    )
}

export default MyPlaces