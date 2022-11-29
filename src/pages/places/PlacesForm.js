import { upload } from "@testing-library/user-event/dist/upload";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThirdStepForm from "../../components/placeComponents/ThirdStepForm";
import SecondStepForm from "../../components/placeComponents/SecondStepForm";
import FirstStepForm from "../../components/placeComponents/FirstStepForm";
import { NavLink } from "react-router-dom";



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
        console.log({ files, formData })

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
                    <svg onClick={nextStepHandler} width="69" height="87" viewBox="0 0 69 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M67.7332 47.3402C69.4178 45.2162 69.4178 41.7668 67.7332 39.6428L50.4832 17.8928C48.7986 15.7688 46.0629 15.7688 44.3783 17.8928C42.6937 20.0168 42.6937 23.4662 44.3783 25.5902L54.2701 38.0625H4.3125C1.92715 38.0625 0 40.4924 0 43.5C0 46.5076 1.92715 48.9375 4.3125 48.9375H54.2701L44.3783 61.4098C42.6937 63.5338 42.6937 66.9832 44.3783 69.1072C46.0629 71.2313 48.7986 71.2313 50.4832 69.1072L67.7332 47.3572V47.3402Z" fill="#EEBC0C" />
                    </svg>
                ) : (
                    <button type="submit" className="submitButton">Create</button>
                )}

                {error && <h1>{error} </h1>}

            </form>
                {step > 0 && <button onClick={prevStepHandler}>Previous</button>}
        </div>
    )
}
export default PlaceForm;























