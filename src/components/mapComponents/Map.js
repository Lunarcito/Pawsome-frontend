import React, { useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useState } from 'react'
import './Map.css'

import Point from './Point';

function Map(props) {

    const [map, setMap] = useState(null)

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    })


    if (!props.places[0]) return <div>Loading ...</div>;


    return (
        <div>
            <GoogleMap zoom={13} clickableIcons={true} center={{ lat: 41.3879, lng: 2.16992 }} mapContainerClassName="map-container" onLoad={map => setMap(map)} >
                {props.places.map(place => {
                    return <Point address={place.address}
                        name={place.name}
                        id={place._id}
                    />
                })}
            </GoogleMap>


        </div>
    )
}

export default Map