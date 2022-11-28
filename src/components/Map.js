import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import {useState} from 'react'
import './Map.css';



function Map() {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    })

    const [map, setMap] = useState(null)
    const onLoad = marker => {
        console.log('marker: ', marker)
      }
    if (!isLoaded) return <div>Loading ...</div>;
    return (
        <div>
            <GoogleMap zoom={10} center={{ lat: 41.3879, lng: 2.16992 }} mapContainerClassName="map-container" onLoad={map => setMap(map)}/>
            <Marker onLoad={onLoad}position={{ lat: 41.3879, lng: 2.16992 }}/>

        </div>
    )
}

export default Map