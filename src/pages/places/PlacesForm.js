import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function PlaceForm() {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [pictures, setPictures] = useState([])
    const [type, setType] = useState('Beach')
    const [socialMedia, setSocialMedia] = useState("")
    const [socialMedia1, setSocialMedia1] = useState("")
    const [socialMedia2, setSocialMedia2] = useState("")
    const [typeOther, setTypeOther] = useState("")
    const options = [
        {
            label: "Beach",
            value: "Beach",
        },
        {
            label: "Restaurant",
            value: "Restaurant",
        },
        {
            label: "Cafeteria",
            value: "Cafeteria",
        },
        {
            label: "Museum",
            value: "Museum",
        },
        {
            label: "Other",
            value: "Other",
        }
    ];
    const storedToken = localStorage.getItem('authToken');
    const API_ENDPOINT = "http://localhost:8000/api/addPlace"



    const submitHandler = async (event) => {
        event.preventDefault()
        console.log(socialMedia)
        const newPlace = {
            name: name,
            address: address,
            description: description,
            pictures: pictures,
            type: type,
            typeOther: typeOther,
            socialMedia: [socialMedia, socialMedia1, socialMedia2]
        }
        try {
            await axios.post(API_ENDPOINT, newPlace, { headers: { Authorization: `Bearer ${storedToken}` } })
            setName("")
            setAddress("")
            setDescription("")
            setType("")
            setTypeOther("")
            setSocialMedia("")
            setSocialMedia1("")
            setSocialMedia2("")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <form onSubmit={submitHandler} >
                <label>Name of the place:</label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <hr></hr>
                <label>Address:</label>
                <input
                    type="text"
                    name="address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                />
                <hr></hr>
                <label>Description:</label>
                <textarea cols="30" rows="10"
                    type="text"
                    name="description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />
                <hr></hr>
                <label>Upload one or more pictures</label>
                <input type="file" accept="image/png, image/jpeg, image/jpg" multiple="multiple" name="pictures" placeholder="Upload one or more pictures" onChange={event => setPictures(event.target.files[0])} />
                <label>Choose a type of place:</label>
                <select value={type} onChange={(event) => setType(event.target.value)}>
                    {options.map((option) => (
                        <option value={option.value}>{option.label}</option>
                    ))}
                </select>
                {type === 'Other' && <input type="text" name="type" value={typeOther} onChange={(event) => setTypeOther(event.target.value)}></input>}

                <label>Social media:</label>
                <input
                    type="text"
                    name="socialMedia"
                    onChange={(event) =>
                        setSocialMedia(event.target.value)
                    }
                    value={socialMedia}
                />
                <input
                    type="text"
                    name="socialMedia"
                    onChange={(event) =>
                        setSocialMedia1(event.target.value)
                    }
                    value={socialMedia1}
                />
                <input
                    type="text"
                    name="socialMedia"
                    onChange={(event) =>
                        setSocialMedia2(event.target.value)
                    }
                    value={socialMedia2}
                />

                <hr></hr>
                <button type="submit" className="submitButton">Create</button>
            </form>
        </div>
    )
}
export default PlaceForm;























