import React from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import './Map.css';

function Map() {
    const { isLoaded } = useLoadScript({ 
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    })
    if(!isLoaded) return <div>Loading ...</div>;
    return (
        <GoogleMap zoom={10} center={{lat: 41.3879, lng:2.16992}} mapContainerClassName="map-container"/>
    )
}

export default Map