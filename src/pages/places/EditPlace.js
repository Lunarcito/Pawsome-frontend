import axios from "axios"
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const apiEndpoint = "http://localhost:8000/api/places/"
const storedToken = localStorage.getItem('authToken')

function EditPlace() {
    const {placeId} = useParams()
   
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
            <h1>Hello</h1>
            <form onSubmit={submitHandler}>
                <label>Name</label>
                <input type="text" name="name" value={name} placeholder={name} onChange={(event) => setName(event.target.value)} />
                <br></br>
                <label>Address:</label>
                <input type="text" name="address" value={address} placeholder={address} onChange={(event) => setAddress(event.target.value)}
                />
                <br></br>
                <label>Choose a type of place:</label>
                <select value={type} onChange={(event) => setType(event.target.value)}>
                    {options.map((option) => (
                        <option key={Math.random()} value={option.value} placeholder={type}>{option.label}</option>
                    ))}
                </select>
                {type === 'Other' && <input type="text" name="type" value={typeOther} onChange={(event) => setTypeOther(event.target.value)}></input>}
                <br></br>
                <label>Description</label>
                <textarea cols="30" rows="10" type="text" name="description" value={description} placeholder={description} onChange={(event) => setDescription(event.target.value)}
                />
                <br></br>
                <label>Upload one or more pictures</label>
                <input type="file" accept="image/png, image/jpeg, image/jpg" multiple="multiple" name="pictures" placeholder="Upload one or more pictures" onChange={event => setFiles(Array.from(event.target.files))} />
                <br></br>
                <label>Social media:</label>
                <input type="text" name="socialMedia" onChange={(event) => setSocialMedia(event.target.value)} value={socialMedia} placeholder={socialMedia} />
                <input type="text" name="socialMedia" onChange={(event) => setSocialMedia1(event.target.value)} value={socialMedia1} placeholder={socialMedia1} />
                <input type="text" name="socialMedia" onChange={(event) => setSocialMedia2(event.target.value)} value={socialMedia2} placeholder={socialMedia2} />
                <button type="submit">Save changes</button>
            </form>
                <Link to = '/profile/MyPlaces'> 
                <button>Cancel</button>
                </Link>
        </div>
    )
}

export default EditPlace