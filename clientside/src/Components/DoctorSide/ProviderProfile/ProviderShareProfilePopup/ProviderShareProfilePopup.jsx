import React, { useState } from 'react';
import './ProviderShareProfilePopup.css';
import { IoLogoWhatsapp, IoLogoInstagram, IoLogoFacebook, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io";
import { Link } from 'react-router-dom';
const ProviderShareProfilePopup = ({ Providername ,show, handleClose }) => {
    const [profileData, setProfileData] = useState({
        Providername: Providername,
        profileImage: "/path/to/profile.jpg", // Replace with actual image path
      });
      if (!show) return null;   
  return (
    <div className="providers-share-profile-container">
            <div className="providers-share-popup-overlay">
              <div className="providers-share-popup">
                <h3 className="providers-share-popup-title">Share Profile</h3>
                <div className="providers-social-icons-container">
                  <Link to={`https://api.whatsapp.com/send?text=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="providers-social-icon whatsapp">
                    <IoLogoWhatsapp size="2rem" />
                  </Link>
                  <Link to={`https://www.instagram.com/${window.location.href}`} target="_blank" rel="noopener noreferrer" className="providers-social-icon instagram">
                    <IoLogoInstagram size="2rem" />
                  </Link>
                  <Link to={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="providers-social-icon facebook">
                    <IoLogoFacebook size="2rem" />
                  </Link>
                  <Link to={`https://www.linkedin.com/sharing/share-offsite/?text=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="providers-social-icon linkedin">
                    <IoLogoLinkedin size="2rem" />
                  </Link>
                  <Link to={`https://twitter.com/intent/tweet?text=${profileData.Providername}&url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="providers-social-icon twitter">
                    <IoLogoTwitter size="2rem" />
                  </Link>
                </div>
                <button className="providers-close-btn" onClick={handleClose}>Close</button>
              </div>
            </div>
        </div>
  )
}

export default ProviderShareProfilePopup