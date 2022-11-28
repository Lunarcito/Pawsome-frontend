import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
   
   return (
      <div>
         {user && <p>Hello {user.userName}</p>}
         <ul>
            <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/home">Home</NavLink></li>
            {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/signup">Sign up</NavLink></li>}
            {!isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/">Login</NavLink></li>}
            {isLoggedIn && <li><NavLink className={(element) => element.isActive ? 'selected' : ''} to="/profile">User Profile</NavLink></li>}
            {isLoggedIn && <li><button onClick={() => logOutUser()}>Log out</button></li>}
         </ul>
      </div>
   )
}
