import axios from "axios"
import { useState, useEffect } from "react";
import Map from "../../components/mapComponents/Map";
import { Marker } from "@react-google-maps/api";

const apiEndpoint = "http://localhost:8000/api/profile"

function MyPlaces() {
    const[places, setPlaces]= useState([])

    useEffect(() => {
        const apiCall = async () => {
            try{
            const res = await axios.get(apiEndpoint)
            console.log(res)
            setPlaces(res.data)
            }catch(err){
                console.log(err)
            }
        }
        apiCall()
    }, [])
    return (
        <div>
            <h1>My Places</h1>
            {places.map(place => {
                return(
                    <div key={place._id}>
                        <p>{place.name}</p>
                        <p>{place.address}</p>
                 
                    </div>
                )
            })}
          
        </div>
    )
}

export default MyPlaces