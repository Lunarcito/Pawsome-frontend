import React, { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/pet-profile/create"

function CreatePet() {
    // const [name, setName] = useState('')
    // const [image, setImage] = useState('')
    const [namePet, setName] = useState("")
    const [file, setFile] = useState(null)

    const storedToken = localStorage.getItem('authToken')

    const navigate = useNavigate()

    const submitHandler = async (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("image", file);
        formData.append("namePet", namePet);

        try {
            const res = await axios.post(apiEndpoint, formData, { headers: { Authorization: `Bearer ${storedToken}` } })
            setName("")
            setFile(null)
            navigate("/pet-profile")

        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Name</label>
                <input type="text" name="namePet" value={namePet} onChange={(event) => setName(event.target.value)} />
                <br></br>
                <h1>Add Photo</h1>
                <input type="file" accept="image/png, image/jpeg, image/jpg" name="image" placeholder="Upload one or more pictures" onChange={event => setFile(event.target.files[0])} />
                <br></br>
                <button type="submit">ADD PET</button>
            </form>
        </div>
    )
}
export default CreatePet