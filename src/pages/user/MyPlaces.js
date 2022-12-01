import axios from "axios"
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/profile"
const storedToken = localStorage.getItem('authToken')

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
                        <img className="Placeimage" src={place.pictures} alt="place" />
                        
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