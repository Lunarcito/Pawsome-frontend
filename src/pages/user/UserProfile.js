import { Link } from "react-router-dom";
import './UserProfile.css';
import axios from 'axios';
import { useState, useEffect } from "react";

const storedToken = localStorage.getItem("authToken");
const apiEndpoint = `${process.env.REACT_APP_API_URL}profile`;

const UserProfile = () => {

    const [profile, setProfile] = useState({})
    const [pet, setPet] = useState([])

    useEffect(() => {
        const apiCall = async () => {
            const result = await axios.get(apiEndpoint, {
                headers: { Authorization: `Bearer ${storedToken}` },
            });
            setProfile(result.data)
            setPet(result.data.pet)

        };
        apiCall();
    }, []);

    return (
        <div className="userprofile" key={profile._id}>
            <h1>Hello {profile.name}!</h1>
            <img src={profile.image} alt="" />
            <div>
                {pet.map((element) => {
                    return (
                        <div key={element._id}>
                            <h2>Pet name {element.namePet}</h2>
                            <img className="petProfile" src={element.image} alt=""/>
                        </div>
                    )
                })}
            </div>


        <ul>

        <Link to ="/Favorites">Favorites</Link> <br></br>
        <Link to ="/profile/MyPlaces">Created Places</Link> <br></br>
        <Link to ="/pet-profile">My Pets</Link><br></br>
        </ul>
        </div>
    )
}

export default UserProfile;
