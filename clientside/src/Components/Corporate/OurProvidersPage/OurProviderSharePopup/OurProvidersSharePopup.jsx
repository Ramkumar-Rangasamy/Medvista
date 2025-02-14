import React, { useState } from 'react';
import './OurProvidersSharePopup.css';
import { BiSolidShareAlt } from "react-icons/bi";
import { IoLogoWhatsapp, IoLogoInstagram, IoLogoFacebook, IoLogoLinkedin, IoLogoTwitter } from "react-icons/io";
import { Link } from 'react-router-dom';

const OurProvidersPage = ({ corporateName ,show, handleClose }) => {
  const [profileData, setProfileData] = useState({
    corporateName: corporateName,
    profileImage: "/path/to/profile.jpg", // Replace with actual image path
  });
  if (!show) return null;

  return (
    <div className="our-providers-profile-container">
        <div className="share-popup-overlay">
          <div className="share-popup">
            <h3 className="share-popup-title">Share Profile</h3>
            <div className="social-icons-container">
              <Link to={`https://api.whatsapp.com/send?text=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="social-icon whatsapp">
                <IoLogoWhatsapp size="2rem" />
              </Link>
              <Link to={`https://www.instagram.com/${window.location.href}`} target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                <IoLogoInstagram size="2rem" />
              </Link>
              <Link to={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="social-icon facebook">
                <IoLogoFacebook size="2rem" />
              </Link>
              <Link to={`https://www.linkedin.com/sharing/share-offsite/?text=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="social-icon linkedin">
                <IoLogoLinkedin size="2rem" />
              </Link>
              <Link to={`https://twitter.com/intent/tweet?text=${profileData.corporateName}&url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="social-icon twitter">
                <IoLogoTwitter size="2rem" />
              </Link>
            </div>
            <button className="close-btn" onClick={handleClose}>Close</button>
          </div>
        </div>
    </div>
  );
};

export default OurProvidersPage;
