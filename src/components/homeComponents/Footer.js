import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../homeComponents/Footer.css';
import { AuthContext } from '../../context/AuthContext';

export default function Navbar() {
   const { isLoggedIn, } = useContext(AuthContext);

   
   return (
      <div className='nav-con'>
         <div>
            <ul>
               <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/home">Home</NavLink>
               {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected' : ''} to="/addPlace">Add place</NavLink>}
            </ul> 
         </div>
      </div>
   )
}
