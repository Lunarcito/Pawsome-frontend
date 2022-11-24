import axios from 'axios';
import React, { useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
   const { storeToken, authenticateUser } = useContext(AuthContext);
   const [user, setUser] = useState({
      email: '',
      password: ''
   });
   const [errorMessage, setErrorMessage] = useState(undefined);
   const navigate = useNavigate();

   const handleChange = (e) => {
      setUser(prev => {
         return {
            ...prev,
            [e.target.name]: e.target.value
         }
      })
   }

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, user);
         toast.success('Welcome back!')
         storeToken(response.data.authToken);
         authenticateUser();
         navigate('/');
      } catch (error) {
         setErrorMessage(error.response.data.error)
      }
   }

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input required type="email" name="email" value={user.email} onChange={handleChange} />
            <label>Password</label>
            <input required type="password" name="password" value={user.password} onChange={handleChange} />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <button type="submit">Log in </button>
         </form>
      </div>
   )
}
