
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

const storedToken = localStorage.getItem("authToken");
const apiEndpoint = "http://localhost:8000/api/setNewPassword";

function ResetScreen(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            email: email,
            password: password
        }
        try {
            const response = await axios.put(apiEndpoint, user, { headers: { Authorization: `Bearer ${storedToken}` } })
            navigate('/')

        } catch (error) {
            setError(error.response.data.message)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input required type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <label>Password</label>
                <input required type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Change password </button>
            </form>
        </div>
    )
}

export default ResetScreen