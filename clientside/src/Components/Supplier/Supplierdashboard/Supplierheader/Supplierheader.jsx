import React, { useState } from 'react'
import './Supplierheader.css'
import { SlBell } from "react-icons/sl";
import { Link } from "react-router-dom";
import profilePlaceholder from '../../Assets/profileimg.png';
const Corporateheader = () => {
  const [profileImage, setProfileImage] = useState(profilePlaceholder);

  return (
    <>
        <header className="header-head">
        <div className="home-return">
         <Link to='https://medxbay.com' className="text-home-return">Home</Link>
        </div>
        <div className='dashboard-setting-bell'>
          <button type="button" className="nav-notification-button">
            <SlBell className='notification-icon'/>
          </button>
        </div>
        <div className="profile-container">
          <div className="image-container">
            <img src={profileImage} alt="Profile"/>
          </div>
        </div>
      </header>
    </>
  )
}

export default Corporateheader