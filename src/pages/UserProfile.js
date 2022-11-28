import React from 'react'
import './UserProfile.css';
import {Link} from "react-router-dom";
import userProfileImg from "../assets/user-profile.png"
import favoriteImg from "../assets/favorite.png"
import logoutImg from "../assets/logout.png"
import myPlacesImg from "../assets/map.png"
import myPetImg from "../assets/mypet.png"


import './UserProfile.css';

const UserProfile =() => {

    return (
        <div className="userprofile">

        <ul>
        <Link to ="/UserProfile"><img src ={userProfileImg}/>User Profile</Link> <br></br>
        <Link to ="/Favorites"><img src ={favoriteImg}/>Favorites</Link> <br></br>
        <Link to ="/profile"><img src ={myPlacesImg}/> My Places</Link> <br></br>
        <Link to ="/pet-profile"><img src ={myPetImg}/>My Pet</Link><br></br>
        <Link to ="/Logout"><img src ={logoutImg}/> Logout</Link><br></br>

        </ul>

        </div>
    )
    
}


export default UserProfile;
