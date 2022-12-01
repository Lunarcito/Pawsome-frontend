import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import '../homeComponents/Navbar.css';
import { AuthContext } from '../../context/AuthContext';
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser } from '@fortawesome/free-solid-svg-icons'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'


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
            <div>{props.children}</div>
         </li>
      )
   }
   
   return (
      <div className='nav-con'>
         <div className='menu-container' ref={menuRef}>
            <div onClick={() =>{setOpen(!open)}}>
            <FontAwesomeIcon icon={isLoggedIn? faUser : farUser} className='menu-trigger' />
            </div>
            {open &&<div className={`dropdown-menu ${open? 'active' : 'inactive'}`}>
               <ul>
                  {isLoggedIn && <DropdownItem> <NavLink to="/profile"> <FontAwesomeIcon icon={ faCircleUser } />User Profile</NavLink></DropdownItem>}
                  {!isLoggedIn && <DropdownItem> <NavLink to="/signup"><FontAwesomeIcon icon={ faUserPlus } />Sign up</NavLink></DropdownItem>}
                  {!isLoggedIn && <DropdownItem> <NavLink to="/"><FontAwesomeIcon icon={ faRightToBracket } />Login</NavLink></DropdownItem>}
                  {isLoggedIn && <DropdownItem> <NavLink onClick={() => logOutUser()}><FontAwesomeIcon icon={ faRightFromBracket } />Log out</NavLink></DropdownItem>}
               </ul>
            </div>}
         </div>
         <div>
            <img className='logoFooter' src="https://res.cloudinary.com/dfajfbnkr/image/upload/v1669817485/Pawsome/Logo_Paw_kinagr.png" alt='logo' /> 
         </div>
      </div>
   )
}
