import React ,{ useState }from "react";
import axios from "axios"
import './CreatePet.css';

import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'

const apiEndpoint = "http://localhost:8000/api/pet-profile/create"

function CreatePet(){
    // const [name, setName] = useState('')
    // const [image, setImage] = useState('')
    const [namePet, setName] = useState("")
    const[file, setFile] = useState(null)
   
    

    const storedToken = localStorage.getItem('authToken')
    
    const navigate = useNavigate()



    const submitHandler = async (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append("image", file);
        formData.append("namePet", namePet);

            try {
                await axios.post(apiEndpoint, formData, { headers: { Authorization: `Bearer ${storedToken}`}})
                setName("")
                setFile(null)            
                navigate("/pet-profile")

            } catch (error) {
                console.log(error)
            }
        
    }
    

    return(
        <div className="creation">
            <form className="info" onSubmit={submitHandler}>
                <div>
                <div className="name">
                <label className="nameTitle">Name</label>
                <input type="text" name="namePet" value={namePet} onChange={(event) => setName(event.target.value)} />
                </div>
                <br></br>
                <div className="photo">
                <label className="photoTitle">Add Photo</label>
                <input type="file" accept="image/png, image/jpeg, image/jpg"  name="image" placeholder="Upload one picture" onChange={event => setFile(event.target.files[0])} />
                </div>
                </div>
                <br></br>
                <button className="button" type="submit"><FontAwesomeIcon icon={faArrowRight} /></button>
            </form>
        </div>
    )
}
export default CreatePet