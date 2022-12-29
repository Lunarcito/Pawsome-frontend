import {Link} from "react-router-dom";

import '../user/UserProfile'
import axios from 'axios';
import { useState, useEffect } from 'react'
import './PetProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons'


const storedToken = localStorage.getItem("authToken");
const apiEndpoint = `${process.env.REACT_APP_API_URL}pet-profile`;

const PetProfile =() => {
  const [ pets, setPets] = useState([]) 

  const apiCall = async () => {
      const res = await axios.get(apiEndpoint, {
        headers: { Authorization: `Bearer ${storedToken}` },
    })
      setPets(res.data)
      console.log(res.data)
  }

  useEffect (() => {
    apiCall()
  }, [])
  
  const deleteHandler = async (elementId) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}pet-profile/${elementId}`, {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    apiCall()
  } 
  
    return (
      <div className="petprofile">
        <h3> My Pets </h3>
        
        <div className="petInfo">
        
          {pets.map((e) => {
            console.log(e)
            return(
              <div className="everyPet "key={e._id}>
                <img className="petit" src={e.image} alt="pet"/>
                <p className="petito">{e.namePet}</p>
                <button onClick={() => deleteHandler(e._id)}><FontAwesomeIcon className="deleteButton" icon={faTrashCan} /></button>
              </div>
            )
          })}
        </div>
          <Link className="createLink" to="/pet-profile/create"><FontAwesomeIcon className="designIcon" icon={faSquarePlus} /></Link>
      </div>
    );  
}

export default PetProfile;
