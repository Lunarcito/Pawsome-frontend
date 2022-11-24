import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/pet-profile/create"

function CreatePet(){
    const [name, setName] = useState("")
    const [image, setImage] = useState("")
    
    const navigate = useNavigate()

    const nameHandler = (event) => {
        setName(event.target.value)
    }

    const imageHandler = (event) => {
        setImage(event.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault()

        const createPet = {
            name: name,
            image: image,
        }

        const newApi = async () => {
            try {
                const res = await axios.post(apiEndpoint, createPet)
                console.log(res)
               
                navigate("/")
            } catch (error) {
                console.log(error)
            }
        }
        newApi()
    }
    

    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>Name</label>
                <input type="text" name="name" value={name} onChange={nameHandler} />
                <br></br>
                <label>Image</label>
                <input type="text" name="image" value={image} onChange={imageHandler} />
                <br></br>
                <button type="submit">ADD PET</button>
            </form>
        </div>
    )
}
export default CreatePet