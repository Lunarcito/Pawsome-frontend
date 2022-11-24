import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function PlaceForm() {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [pictures, setPictures] = useState("")
    const [type, setType] = useState('')
    const [typeOthers, setTypeOthers] = useState("")
    const [socialMedia, setSocialMedia] = useState("")
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
    const API_ENDPOINT = "http://localhost:8000/api/addPlace"
    const submitHandler = async (event) => {
        event.preventDefault()
        const newPlace = {
            name: name,
            address: address,
            description: description,
            pictures: pictures,
            type: type,
            typeOthers: typeOthers,
            socialMedia: socialMedia
        }
        try {
            await axios.post(API_ENDPOINT, newPlace)
            setName("")
            setAddress("")
            setDescription("")
            setType("")
            setTypeOthers("")
            setSocialMedia("")
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
                <input type="file" accept="image/png, image/jpeg, image/jpg" multiple="multiple" name="pictures" placeholder="Upload one or more pictures" />
                <hr></hr>
                <label>Choose a type of place:</label>
                <select value= {type} onChange={(event) => setType(event.target.value)}>
                    {options.map((option) => (
                    <option value={option.value}>{option.label}</option>
                    ))}
                </select>
                {type === 'Other' && <input type= "text" name="type" value={''} onChange={(event) => setType(event.target.value)}></input>}
                <hr></hr>
                <button type="submit" className="submitButton">Create</button>
            </form>
        </div>
    )
}
export default PlaceForm;























