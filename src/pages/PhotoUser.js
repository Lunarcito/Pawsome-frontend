import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/user-profile/edit-photo"

function PhotoUser(){
    const [image, setImage]= useState("")

    const navigate = useNavigate()

    const imageHandler = (event) => {
        setImage(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()

        const addPhoto = {
            image: image
        }

        const apiCall = async () => {
            try {
                const res = await axios.post(apiEndpoint, addPhoto)
                console.log(res)
                setImage("")
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
                <label>Image</label>
                <input type="text" name="image" value={image} onChange={imageHandler} />
                <br></br>
                <button type="submit">ADD PET</button>
            </form>
        </div>
    )

}
export default PhotoUser;