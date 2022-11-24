import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Search from "../components/Search.jsx";

const apiEndpoint = "http://localhost:8000/api/places";
console.log(apiEndpoint);
export default function Home() {
  const [places, setPlaces] = useState([]);
  const [filterPlaces, setFilterPlaces] = useState([]);

  useEffect(() => {
    const apiCall = async () => {
      const res = await axios.get(apiEndpoint);
      setPlaces(res.data);
      setFilterPlaces(res.data);
      console.log(res.data);
    };
    apiCall();
  }, []);
  const searchHandler = (search) => {
    const searchThis = places.filter((one) =>
      one.name.toLowerCase().toUpperCase().includes(search)
    );
    setFilterPlaces(searchThis);
  };

  return (
   <div>
      <h1>list</h1>
      <Search onSearch={searchHandler} />
      <ul>
        {filterPlaces.map((place) => {
            return (
               <li key={place._id}>
               <h2>{place.name}</h2>
               <img src={place.pictures} alt="" />
               <p>{place.address}</p>
               <p>{place.Review}</p>
               <Link to={`/places/${place._id}`}>More Details</Link>
               </li>
            );
         })}
      </ul>
   </div>
  );
}
