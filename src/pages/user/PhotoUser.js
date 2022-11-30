import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/user-profile/edit-photo"

function PhotoUser() {
    const [file, setFile] = useState("");

    const storedToken = localStorage.getItem('authToken')

    const navigate = useNavigate()

    const submitHandler = (event) => {
        event.preventDefault()

        let formData = new FormData();

        formData.append("image", file);

        const apiCall = async () => {
            try {
                const res = await axios.post(apiEndpoint, formData, { headers: { Authorization: `Bearer ${storedToken}` } })
                setFile("")
              
                navigate("/")
            } catch (error) {
                console.log(error)
            }
        }
        apiCall()
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <h1>Add Photo</h1>
                <input type="file" accept="image/png, image/jpeg, image/jpg" name="image" placeholder="Upload one or more pictures" onChange={event => setFile(event.target.files)} />
                <br></br>
                <button type="submit">ADD PET</button>
            </form>
        </div>
    )

}

export default PhotoUser;