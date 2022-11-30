import React from 'react'
import { GoogleMap } from '@react-google-maps/api'
import { useState } from 'react'
import './Map.css'

import Point from './Point';

function Map(props) {

    const [map, setMap] = useState(null)



    if (!props.places[0]) return <div>Loading ...</div>;
    console.log(props.places)

    return (
        <div>
            <GoogleMap zoom={13} clickableIcons={true} center={{ lat: 41.3879, lng: 2.16992 }} mapContainerClassName="map-container" onLoad={map => setMap(map)} >
                {props.places.map(place => {
                    return <div key={place._id}><Point address={place.address}
                    name={place.name}
                    id = {place._id}
                    map = {map}
                    /></div>
                })}
            </GoogleMap>
        </div>
    )
}

export default Map