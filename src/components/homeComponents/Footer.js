import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../homeComponents/Footer.css';
import { AuthContext } from '../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
   const { isLoggedIn, } = useContext(AuthContext);

   
   return (
      <div className='fixed-bottom'>
               <NavLink className={(element) => element.isActive ? 'selected iconSize' : 'iconSize'} to="/home"><FontAwesomeIcon icon={ faMagnifyingGlass } /></NavLink>
               {isLoggedIn && <NavLink className={(element) => element.isActive ? 'selected iconSize' : 'iconSize'} to="/addPlace"><FontAwesomeIcon icon={ faPlus } /></NavLink>}
               {<NavLink className={(element) => element.isActive ? 'selected iconSize' : 'iconSize'} to="/Favorites"><FontAwesomeIcon icon={ faHeart } /></NavLink>}
      </div>
   )
}
