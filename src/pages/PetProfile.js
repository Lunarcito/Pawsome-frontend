import React from 'react'
import './UserProfile.css';
import {Link} from "react-router-dom";
import myPetImg from "../assets/mypet.png"


import './UserProfile.css';

const PetProfile =() => {

    return (
      <div className="petprofile">
        <ul>
          <Link to="/pet-profile/create">
            <img src={myPetImg} />
            My Pet
          </Link>
          <br></br>
        </ul>
      </div>
    );
    
}

export default PetProfile;
