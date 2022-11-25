import React ,{ useState }from "react";
import axios from "axios"

import { useNavigate } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/pet-profile/create"

function CreatePet(){
    // const [name, setName] = useState('')
    // const [image, setImage] = useState('')
    const[pet, setPet] = useState({
        name:"",
        image:""
    })
    const storedToken = localStorage.getItem('authToken')
    
    const navigate = useNavigate()

    const handleChange = (e) => {
        setPet(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    const submitHandler = async (event) => {
        event.preventDefault();
            try {
                const res = await axios.post(apiEndpoint, pet, { headers: { Authorization: `Bearer ${storedToken}`}})
                console.log(res.data)
               
                navigate("/")
            } catch (error) {
                console.log(error)
            }
        
    }
    

    return(
        <div>
            <form onSubmit={submitHandler}>
                <label>Name</label>
                <input type="text" name="name" value={pet.name} onChange={handleChange} />
                <br></br>
                <label>Image</label>
                <input type="text" name="image" value={pet.image} onChange={handleChange} />
                <br></br>
                <button type="submit">ADD PET</button>
            </form>
        </div>
    )
}
export default CreatePet