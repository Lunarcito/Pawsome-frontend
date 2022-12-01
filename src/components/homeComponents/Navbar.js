import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../homeComponents/Navbar.css';
import { AuthContext } from '../../context/AuthContext';
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
// import { faUser as farUser } from '@fortawesome/free-regular-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faPaw } from '@fortawesome/free-solid-svg-icons'


export default function Navbar() {
   const { isLoggedIn, logOutUser } = useContext(AuthContext);

   const [open, setOpen] = useState(false)

   let menuRef = useRef()

   useEffect (() => {
      let handler = (e) => {
         if (!menuRef.current.contains(e.target)){
            setOpen(false); 
         }
      };

      document.addEventListener('mousedown', handler);


      return() =>{
         document.removeEventListener('mousedown', handler);
      }
   });
   function DropdownItem(props) {
      return (
         <li className='dropdownItem'>
            <div className='linkCon'>{props.children}</div>
         </li>
      )
   }
   
   return (
      <div className='nav-con'>
         <div className='menu-container' ref={menuRef}>
            <div onClick={() =>{setOpen(!open)}}>
            <FontAwesomeIcon icon={isLoggedIn? faUser : faUser} className='menu-trigger' />
            </div>
            {open &&<div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
               <ul>
                  {!isLoggedIn && <DropdownItem> <NavLink to="/signup" className="positionLink"><FontAwesomeIcon icon={ faUserPlus } />Sign up</NavLink></DropdownItem>}
                  {!isLoggedIn && <DropdownItem> <NavLink to="/" className="positionLink"><FontAwesomeIcon icon={ faRightToBracket } />Login</NavLink></DropdownItem>}
                  {isLoggedIn && <DropdownItem> <NavLink to="/addPlace" className="positionLink"> <FontAwesomeIcon icon={ faPlus } />Add place</NavLink></DropdownItem>}
                  {isLoggedIn && <DropdownItem> <NavLink to="/Favorites" className="positionLink"><FontAwesomeIcon icon={ faHeart } />Favorites</NavLink></DropdownItem>}
                  {isLoggedIn && <DropdownItem> <NavLink to="/profile/MyPlaces" className="positionLink"><FontAwesomeIcon icon={ faMapLocationDot } />Created Places</NavLink></DropdownItem>}
                  {isLoggedIn && <DropdownItem> <NavLink to="/pet-profile" className="positionLink"><FontAwesomeIcon icon={ faPaw } />My Pets</NavLink></DropdownItem>}
                  {isLoggedIn && <DropdownItem> <NavLink onClick={() => logOutUser()} className="positionLink"><FontAwesomeIcon icon={ faRightFromBracket } />Log out</NavLink></DropdownItem>}
               </ul>
            </div>}
         </div>
         <div>
            <img className='logoFooter' src="https://res.cloudinary.com/dfajfbnkr/image/upload/v1669817485/Pawsome/Logo_Paw_kinagr.png" alt='logo' /> 
         </div>
      </div>
   )
}
