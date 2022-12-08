import axios from "axios"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import './EditPlace.css';

import {
    Input,
    InputGroup,
    InputLeftElement,
    FormControl,
    Stack,
    Button
  } from "@chakra-ui/react";

const apiEndpoint = `${process.env.REACT_APP_API_URL}places/`
const storedToken = localStorage.getItem('authToken')

function EditPlace() {
    const { placeId } = useParams()

    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState(null);
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

    const navigate = useNavigate()

    useEffect(() => {
        const apiCall = async () => {
            try {
                const res = await axios.get(apiEndpoint + placeId, { headers: { Authorization: `Bearer ${storedToken}` } })

                setName(res.data.name)
                setDescription(res.data.description)
                setAddress(res.data.address)
                setFiles(res.data.pictures)
                setType(res.data.type)
                if (res.data.socialMedia[0]) {
                    setSocialMedia(res.data.socialMedia[0])

                }
                if (res.data.socialMedia[1]) {
                    setSocialMedia1(res.data.socialMedia[1])
                }
                if (res.data.socialMedia[2]) {
                    setSocialMedia2(res.data.socialMedia[2])
                }

            } catch (error) {
                console.log(error)
            }
        }
        apiCall()
    }, [placeId]);

    const submitHandler = async (event) => {
        event.preventDefault()
        let formData = new FormData();
        if (files !== null) {
            files.forEach(element => {
                formData.append("pictures", element);
            })
        }

        formData.append("name", name);
        formData.append("address", address);
        formData.append("description", description);
        formData.append("typeOther", typeOther);
        formData.append("type", type);
        formData.append("socialMedia", socialMedia);

        try {
            await axios.put(apiEndpoint + placeId, formData, { headers: { Authorization: `Bearer ${storedToken}` } })
            setName("")
            setAddress("")
            setDescription("")
            setType("")
            setTypeOther("")
            setSocialMedia("")
            setSocialMedia1("")
            setSocialMedia2("")
            setFiles(null)

            navigate("/home")

        } catch (error) {
            console.log(error)

            navigate(`/profile/MyPlaces/edit-place/${placeId}`)
        }
    }
    return (
        <div>
            <form onSubmit={submitHandler}>

                <h3>Edit a Place</h3>

                <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"              
                  />
               <Input type="text" name="name" placeholder="Name" value={name} onChange={(event) => setName(event.target.value)}/>
                </InputGroup>
              </FormControl>


              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"                    
                  />
               <Input type="text" name="address" placeholder="Address" value={address}  onChange={(event) => setAddress(event.target.value)}/>
                </InputGroup>
              </FormControl>


                <select value={type} onChange={(event) => setType(event.target.value)}>
                    {options.map((option) => (
                        <option key={Math.random()} value={option.value} placeholder={type}>{option.label}</option>
                    ))}
                </select>
                {type === 'Other' && <input type="text" name="type" value={typeOther} onChange={(event) => setTypeOther(event.target.value)}></input>}
                <br></br>

                <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"                  
                  />
               <Input type="text" name="description" placeholder="Add a place's description" size="lg" value={description} onChange={(event) => setDescription(event.target.value)}/>
                </InputGroup>
              </FormControl>
    

                <p>Upload one or more pictures</p>
                <br></br>
                <input type="file" accept="image/png, image/jpeg, image/jpg" multiple="multiple" name="pictures" placeholder="Upload one or more pictures" onChange={event => setFiles(Array.from(event.target.files))} />
                <br></br>
                <input className="editbox" type="text" name="socialMedia" onChange={(event) => setSocialMedia(event.target.value)} value={socialMedia} placeholder={socialMedia} />
                <input className="editbox" type="text" name="socialMedia" onChange={(event) => setSocialMedia1(event.target.value)} value={socialMedia1} placeholder={socialMedia1} />
                <input className="editbox" type="text" name="socialMedia" onChange={(event) => setSocialMedia2(event.target.value)} value={socialMedia2} placeholder={socialMedia2} />
                <button className="editbox" type="submit">Save changes</button>
            </form>
            <Link to='/profile/MyPlaces'>

            <Stack direction='row' spacing={3}>
                    <Button type="submit" className="submitButton" colorScheme='teal' variant='outline'>
                       Cancel
                    </Button>
                </Stack>
            </Link>
        </div>
    )
}

export default EditPlace