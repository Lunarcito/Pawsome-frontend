
import {Link} from "react-router-dom";
import myPetImg from "../assets/mypet.png"
import './UserProfile.css';
import axios from 'axios';
import { useState, useEffect } from 'react'

const storedToken = localStorage.getItem("authToken");
const apiEndpoint = "http://localhost:8000/api/pet-profile"

const PetProfile =() => {
  const [ pets, setPets] = useState([])
  useEffect (() => {
    const apiCall = async () => {
      const res = await axios.get(apiEndpoint, {
        headers: { Authorization: `Bearer ${storedToken}` },
    })
      setPets(res.data)
      console.log(res.data)
    }
    apiCall()
  }, [])

    return (
      <div className="petprofile">
        <ul>
          {pets.map((e) => {
            return(
              <div key={e._id}>
                <li>Pet Name: {e.namePet}</li>
                <img className="petProfile" src={e.image} alt=""/>
              </div>
            )
          })}

        </ul>
          <Link to="/pet-profile/create"><img src={myPetImg} />Add a pet</Link>
      </div>
    );
    
}

export default PetProfile;
