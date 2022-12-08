import axios from 'axios'
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const storedToken = localStorage.getItem("authToken");
const apiEndpoint = `${process.env.REACT_APP_API_URL}forgotPassword`;

function Forgotpassword(props) {

    const [email, setEmail] = useState('')

    const emailSend = {
        email: email
    }
    const navigate = useNavigate()

    const submitHandler = async (event) => {
        event.preventDefault()
        try {
            if (email !== '') {
                await axios.post(apiEndpoint, emailSend, { headers: { Authorization: `Bearer ${storedToken}` } })
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Please write your email</label>
                <input type="text" name="email" value={email} placeholder={email} onChange={(event) => setEmail(event.target.value)}></input>
                <button type="submit">Send email to reset the password</button>
            </form>
        </div>
    )
}

export default Forgotpassword