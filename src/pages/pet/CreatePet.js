import React, { useState } from "react";
import axios from "axios"
import './CreatePet.css';
import {
    InputGroup,
    InputLeftElement,
    Input,
    FormControl,
    Stack,
    Button
} from "@chakra-ui/react";

import { ArrowForwardIcon } from '@chakra-ui/icons'


import { useNavigate } from "react-router-dom";



const apiEndpoint = `${process.env.REACT_APP_API_URL}pet-profile/create`;

function CreatePet() {
 
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
                await axios.post(apiEndpoint, formData, { headers: { Authorization: `Bearer ${storedToken}`}})
                setName("")
                setFile(null)            
                navigate("/pet-profile")

    }catch(err){
        console.log(err)
    }
}

    return(
        <div className="placeForm">
            <form className="info" onSubmit={submitHandler}>
                <div>
                    <h3> My pet info </h3>
                    
                <div className="nameTitle">
                <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"              
                  />
               <Input type="text" name="namePet" placeholder="Your pet name" value={namePet} onChange={(event) => setName(event.target.value)}/>
                </InputGroup>
              </FormControl>
               </div>

                <div className="photo">

                <label className="photoTitle">Add Photo</label>
                <input type="file" accept="image/png, image/jpeg, image/jpg"  name="image" placeholder="Upload one picture" onChange={event => setFile(event.target.files[0])} />
                </div>
                </div>
                <br></br>
                <Stack direction='row' spacing={3}>
                    <Button type="submit" className="next" rightIcon={<ArrowForwardIcon />}colorScheme='teal' variant='outline'>
                        Next
                    </Button>
                </Stack>
           
            </form>
        </div>
    )
}
export default CreatePet