import React, { useState } from 'react'
import './Corporateheader.css'
import { Link } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";
import holderimageprofile from '../../../Assets/doctor-holder-image.png';
const Corporateheader = () => {
  const [profileImage, setProfileImage] = useState(holderimageprofile);

  return (
    <>
        <header className="Corporate-DBD-header-head">
        <div className="Corporate-DBD-home-return">
         <Link to='https://medxbay.com' className="Corporate-DBD-text-home-return">Home</Link>
        </div>
        <div className="Corporate-DBD-home-return">
         <Link to='/OurProviders' className="Corporate-DBD-text-home-return d-flex "><FaArrowRightToBracket size="1.2rem"/> 
         <p className='ml-2'>Back to profile</p>
         </Link>
         
        </div>
        <div className="Corporate-DBD-profile-container">
          <div className="Corporate-DBD-image-container">
            <img src={profileImage} alt="Profile"/>
          </div>
        </div>
      </header>
    </>
  )
}

export default Corporateheader