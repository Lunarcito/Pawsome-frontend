import {
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Container,
    Box,
    Link,
    Image,
    FormControl,
    FormHelperText,
    InputRightElement,
    ArrowForwardIcon
  } from "@chakra-ui/react";

import axios from "axios";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import ThirdStepForm from "../../components/placeComponents/ThirdStepForm";
import SecondStepForm from "../../components/placeComponents/SecondStepForm";
import FirstStepForm from "../../components/placeComponents/FirstStepForm";

function PlaceForm() {
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [description, setDescription] = useState("")
    const [files, setFiles] = useState(null);
    const [type, setType] = useState('Beach')
    const [socialMedia, setSocialMedia] = useState("")
    const [socialMedia1, setSocialMedia1] = useState("")
    const [socialMedia2, setSocialMedia2] = useState("")
    const [typeOther, setTypeOther] = useState("")
    const [error, setError] = useState(null)
    const [step, setStep] = useState(0)


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

    const storedToken = localStorage.getItem('authToken');
    const API_ENDPOINT = "http://localhost:8000/api/addPlace"

    const nextStepHandler = () => {
        setStep((prev) => {
            return prev += 1
        })
    }
    const prevStepHandler = () => {
        setStep((prev) => {
            return prev = prev - 1
        })
    }

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
            await axios.post(API_ENDPOINT, formData, { headers: { Authorization: `Bearer ${storedToken}` } })
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

            setError(error.response.data.errorMessage)
            navigate("/addPlace")
            setStep(0)
        }
    }
    return (
        <div>
            <form onSubmit={submitHandler} >

                {step === 0 && <FirstStepForm
                    name={name}
                    address={address}
                    type={type}
                    typeOther={typeOther}
                    options={options}
                    onName={setName}
                    onAddress={setAddress}
                    onType={setType}
                    onTypeOther={setTypeOther}
                />}
                {step === 1 && <SecondStepForm
                    description={description}
                    onDescription={setDescription}
                />}
                {step === 2 && <ThirdStepForm
                    socialmedia={socialMedia}
                    socialmedia1={socialMedia1}
                    socialmedia2={socialMedia2}
                    onSocialmedia={setSocialMedia}
                    onSocialmedia1={setSocialMedia1}
                    onSocialmedia2={setSocialMedia2}
                    onFiles={setFiles}
                />}
                {step < 2 ? (
                    <Stack direction='row' spacing={3}>
                        <Button onClick={nextStepHandler} colorScheme='teal' variant='outline'>
                            Next
                        </Button>
                    </Stack>
                            ) : (
                    <button type="submit" className="submitButton">Create</button>
                )}
                {error && <h1>{error} </h1>}

            </form>
            {step > 0 && 
            <Stack direction='row' spacing={4}>
                <Button onClick={prevStepHandler} colorScheme='teal' variant='outline'>
                    Previous
                </Button>
            </Stack>
}
            
    
        </div>
    )
}
export default PlaceForm;























