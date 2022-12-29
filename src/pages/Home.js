import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Places from "../components/homeComponents/Places";
import Search from "../components/homeComponents/Search";
import Filter from "../components/homeComponents/Filter";
import Map from "../components/mapComponents/Map";

import './Home.css'


const apiEndpoint = `${process.env.REACT_APP_API_URL}places`;

export default function Home() {
  const [searchLast, setSearchLast] = useState('');
  const [places, setPlaces] = useState([]);
  const [filterPlaces, setFilterPlaces] = useState([]);
  const [activePlaces, setActivePlaces] = useState([]);
  const [activeType, setActiveType] = useState([]);
  const [showMap, setShowMap] = useState(false)
  useEffect(() => {
    const apiCall = async () => {
      const res = await axios.get(apiEndpoint);
      setPlaces(res.data);
      setActivePlaces(res.data);
      setFilterPlaces(res.data);
    };
    apiCall();
    setShowMap(false);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (activeType === "") {
      const searchThis = places.filter((one) =>
        one.name.toLowerCase().includes(searchLast.toLowerCase())
      );
      setFilterPlaces(searchThis);
    }
    const filtered = places.filter((place) => place.type.includes(activeType));
    setActivePlaces(filtered);
    const searchThis = filtered.filter((one) =>
      one.name.toLowerCase().includes(searchLast.toLowerCase())
    );
    setFilterPlaces(searchThis);
  }, [activeType, places, searchLast]); 

  const searchHandler = (search) => {
    setSearchLast(search);
    const searchThis = activePlaces.filter((one) =>
      one.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilterPlaces(searchThis);
  };

  const mapClickHandler = () => {
    setShowMap(true);
  };

  return (
    <div className= "containerAll">
   
      <div className="mapita">
      {showMap && <Map places={filterPlaces} />}</div>
      {!showMap && <div>
      <Search onSearch={searchHandler} onMapClick={mapClickHandler}/>
      <div className="filter">
      <Filter setActiveType={setActiveType} />
      </div>
 
      <div className= "space">
        {filterPlaces.map((place) => {
          return <Places key={place._id} place={place} />;
        })}
     
       </div>
      </div>}

   
    </div>
  );
}
