import { Marker, InfoWindow } from "@react-google-maps/api"
import Geocode from "react-geocode";
import { useState } from 'react'
import React, { useEffect } from 'react'
import { Link } from "react-router-dom"

Geocode.setApiKey("AIzaSyCkcywzbIz_vlwGJtBK8AmiesinG8aXAIU");

function Point(props) {

    const address = props.address
    const name = props.name
    const placeId = props.id

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [position, setPosition] = useState({})

    //find coordinates from the address
    useEffect(() => {
        Geocode.setRegion("es");
        Geocode.setLocationType("ROOFTOP");
        Geocode.fromAddress(address).then(
            (response) => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(Number(lat))
                setLng(Number(lng))
            },
            (error) => {
                console.error(error);
            }
        );
    }, [address])

    const onLoad = marker => {
        marker.visible = true
        marker.position = { lat: lat, lng: lng }
    }

    const handleClick = (var1) => {
        setPosition(var1)
    }

    const handleClick2 = () => {
        setPosition({})
    }

    return (
        <div>
            {lat && lng &&
                <Marker onLoad={onLoad} onClick={() => handleClick({ lat: lat, lng: lng })}>
                    {position.lat && (<InfoWindow position={position} onCloseClick={() => handleClick2()} ><div>
                        <h1>{name}</h1>
                        <h1>{address}</h1>
                        <Link to={`/places/${placeId}`}>See More</Link>
                    </div></InfoWindow>)}
                </Marker>}
        </div>)
}

export default Point