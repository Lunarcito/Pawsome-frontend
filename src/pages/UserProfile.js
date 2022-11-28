
import './UserProfile.css';
import {Link} from "react-router-dom";
import userProfileImg from "../assets/user-profile.png"
import favoriteImg from "../assets/favorite.png"
import logoutImg from "../assets/logout.png"
import myPlacesImg from "../assets/map.png"
import myPetImg from "../assets/mypet.png"
import './UserProfile.css';
import axios from 'axios';
import { useState, useEffect } from "react";

const storedToken = localStorage.getItem("authToken");
const apiEndpoint = "http://localhost:8000/api/profile";

const UserProfile =() => {

    const [ profile, setProfile] = useState([]) 

    useEffect(() => {
        const apiCall = async () => {
            const result = await axios.get(apiEndpoint, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setProfile(result.data)
            console.log(result.data)
        };
        apiCall();
    }, []);

    return (
        <div className="userprofile" key={profile._id}>
            <h1>Hello {profile.name}!</h1>
            <img src={profile.image} alt="" />

        <ul>
        <Link to ="/profile"><img src ={userProfileImg}/>User Profile</Link> <br></br>
        <Link to ="/Favorites"><img src ={favoriteImg}/>Favorites</Link> <br></br>
        <Link to ="/profile/MyPlaces"><img src ={myPlacesImg}/> My Places</Link> <br></br>
        <Link to ="/pet-profile"><img src ={myPetImg}/>My Pet</Link><br></br>
        <Link to ="/Logout"><img src ={logoutImg}/> Logout</Link><br></br>
        </ul>
        </div>
    )
}


export default UserProfile;
