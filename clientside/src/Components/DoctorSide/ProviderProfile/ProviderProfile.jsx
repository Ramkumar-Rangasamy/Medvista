import React, { useState, useRef, useEffect } from 'react';
import './ProviderProfile.css';
import axios from 'axios';

import doctorsCoverImage from './Assets/doctors-cover-image.png';
import profileHolder from '../../Assets/doctor-holder-image.png';
import { Link, useNavigate, useParams } from "react-router-dom";

//React icons
import { LuPencil } from 'react-icons/lu';
import { PiDotsThreeCircle } from 'react-icons/pi';
import { RxExternalLink } from 'react-icons/rx';
import { BiSolidShareAlt } from 'react-icons/bi';
import { TbEdit } from 'react-icons/tb';

//All components render in ProviderProfile page
import ProviderShareProfilePopup from './ProviderShareProfilePopup/ProviderShareProfilePopup';
import AppointmentPOPOP from './AppointmentPOPOP/AppointmentPOPOP';
import AboutsProviderProfile from './AboutsProviderProfile/AboutsProviderProfile';
import LocationProviderProfile from './LocationProviderProfile/LocationProviderProfile';
import AcceptedInsurancesPP from './AcceptedInsurancesPP/AcceptedInsurancesPP';
import AwardsProviderProfile from './AwardsProviderProfile/AwardsProviderProfile';
// import BlogsProviderProfile from './BlogsProviderProfile/BlogsProviderProfile';
import FAQProviderProfile from './FAQProviderProfile/FAQProviderProfile';

import { fetchFromDoctor } from '../../Api';
import {ToastContainer, toast } from 'react-toastify';
import ClaimProfilePopup from '../../FilterPage/ClaimProfilePopup/ClaimProfilePopup';
// import DynamicMeta from '../DynamicMeta/DynamicMeta';



const ProviderProfile = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [profileImg, setProfileimage] = useState(profileHolder);
  const [coverProfileImg, setCoverProfileimage] = useState(doctorsCoverImage);
  const [doctor, setDoctor] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [verificationStatus, setVerificationStatus] = useState("");
  const [backgroundImage, setBackgroundImage] = useState(doctorsCoverImage);
  const profileData = {
    Providername: 'Dr. Sheetal Sharma',
    subtitle: 'Vascular Surgery (MBBS, MD)',
    email: 'hirushit8@gmail.com',
    profileImage: profileHolder,
  };
  const bufferToBase64 = (buffer) => {
    if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
      const bytes = new Uint8Array(buffer.data);
      let binary = '';
      bytes.forEach(byte => binary += String.fromCharCode(byte));
      return `data:image/jpeg;base64,${btoa(binary)}`;
    }
    return '';
  };
   useEffect(() => {
    const userId = sessionStorage.getItem('userId'); // Check if user is logged in

    if (!userId && !slug) {  // If no user is logged in and no `id` in URL
      toast.warning("You need to log in.");
      navigate("/login"); // Redirect to login
    }
  }, [navigate, slug]);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`,
        { withCredentials: true }
      );
      const doctorData = response.data;
      var formData = doctorData.doctor;
      const profileImageData = formData?.profilePicture
        ? `data:image/jpeg;base64,${formData.profilePicture.data}`
        : profileHolder;
      const coverProfileImageData = formData?.coverPhoto
        ? `data:image/jpeg;base64,${formData?.coverPhoto.data}`
        : profileHolder;
      setProfileimage(profileImageData);
      setCoverProfileimage(coverProfileImageData);
      setDoctor(doctorData.doctor);
      setInsurances(doctorData.insurances);
      setBlogs(doctorData.blogs);
      setVerificationStatus(doctorData.doctor.verified);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
  };


  useEffect(() => {
    if (slug) {
      const fetchDoctorslugDetails = async () => {
        try {
          const response = await fetchFromDoctor(`/doctors/${slug}/slots`);
          if (response?.doctor.dateOfBirth) {
            const date = new Date(response.doctor.dateOfBirth);
            const formattedDate = `${String(date.getDate()).padStart(
              2,
              "0"
            )}-${String(date.getMonth() + 1).padStart(
              2,
              "0"
            )}-${date.getFullYear()}`;
            response.doctor.dateOfBirth = formattedDate;
          }
          const doctorData = response?.doctor;
          setDoctor(response.doctor);
          const profileImageData = bufferToBase64(doctorData?.profilePicture.data)
          const coverProfileImageData = bufferToBase64(doctorData?.coverPhoto.data)
          setProfileimage(profileImageData);
          setCoverProfileimage(coverProfileImageData);
          setInsurances(response.insurances);
          // setBlogs(response.blogs);
          setVerificationStatus(response.doctor.verified);
        } catch (error) {
          console.error("Error fetching doctor details:", error);
        }
      };
      fetchDoctorslugDetails();
    }
    else{
    fetchDoctorDetails();
    }
  }, []);

  //Navition to doctor edit profile
  const handleNavigateDoctorEditProfile = () => {
    navigate("/edit/profile/doctor");
  };

  //Copy Link Logic here
  const handleCopyLink = () => {
    if (!doctor.name) {
      alert("Doctor name is missing wait a second");
      return;
    }
    const link = `${window.location.origin}/book-appointment/${doctor?.slug}`; // Dynamically get the base URL
    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };
  
  const [loading, setLoading] = useState(false);
  const handleVerify = async (e) => {
    e.preventDefault();

    if (
      doctor.verified === "Verified" &&
      doctor.subscriptionVerification !== "Verified"
    ) {
      navigate("/SubscriptionPlans");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/doctor/profile/verify`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      await fetchDoctorDetails();
    } catch (error) {
      console.error(
        "Verification request failed:",
        error.response?.data?.message || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  //ShareProfile Functions 
  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false); // State for share popup
  const [Provider, setProvider] = useState([]);
  const handleShareClick = () => {
    setIsSharePopupVisible(true); // Show the share popup
  };

  const handleCloseSharePopup = () => {
    setIsSharePopupVisible(false); // Close the share popup
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);

  // Handle file selection
  const handleChangeCoverimage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result);
        setShowPreview(true); // Show preview only when selecting an image
      };
      reader.readAsDataURL(file);
      setSelectedFile(file);
    }
  };

  // Handle file input click
  const handleEditClick = () => {
    fileInputRef.current.click();
  };


  // Handle cover photo upload
  const handleConfirmUpload = async () => {
    if (!selectedFile) return;
    setIsSaving(true);

    const formData = new FormData();
    formData.append("coverPhoto", selectedFile);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/doctor/profile/upload-cover`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        alert("Cover photo updated successfully");
        setCoverProfileimage(backgroundImage); // Update cover image in UI
        setBackgroundImage(null);
        setShowPreview(false); // Hide preview
        setSelectedFile(null);
        setIsSaving(false);
        fetchDoctorDetails();
      }
    } catch (error) {
      console.error("Error uploading cover photo:", error);
      setIsSaving(false);
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    setBackgroundImage(null);
    setShowPreview(false); // Hide preview
    setSelectedFile(null);
  };

  //ToggleDropdown function
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleBlur = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  //Popup logic
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);

  const openEditPopup = () => {
    setIsEditPopupOpen(true);
    document.body.classList.add('scroll-lock');
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    document.body.classList.remove('scroll-lock');
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, []);
    // Claim Profile using Start
    const [isClaimPopupVisible, setIsClaimPopupVisible] = useState(false);
  
    const openClaimPopup = () => {
      setIsClaimPopupVisible(true);
      document.body.classList.add("scroll-lock");
    };
  
    const handleCloseClaimPopup = () => {
      setIsClaimPopupVisible(false);
      document.body.classList.remove("scroll-lock");
    };
    // Claim Profile using End
  
  return (
    <>
      {/* <DynamicMeta
        title={doctor?.name}
        description={doctor?.aboutMe}
        image={bufferToBase64(doctor?.profilePicture?.data)}
      /> */}
      <ToastContainer/>
      <div className="Provider-profile-container">
        <div className="Provider-profile-cover-profile-image-head">
          <img src={coverProfileImg} alt="Background" />
          {sessionStorage.getItem('userId') === doctor._id && (
            <div className="Provider-profile-edit-cover-img">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleChangeCoverimage}
                style={{ display: 'none' }}
                accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
              />
              <LuPencil className="Provider-profile-cover-edit-icon" onClick={handleEditClick} />
            </div>
          )}
          {/* Preview and confirmation UI */}
          {showPreview && (
            <div className="Provider-profile-preview-container">
              <img src={backgroundImage} alt="Cover Preview" className="Provider-profile-cover-preview" />
              <div className="Provider-profile-button-group">
                <button onClick={handleConfirmUpload} className="Provider-profile-savebutton" type="submit" disabled={isSaving}>
                  <span className="Provider-profile-savebutton-text">Confirm</span>
                  {isSaving && <div className="Provider-profile-spinner-overlay">
                    <div className="Provider-profile-small-spinner"></div>
                  </div>}
                </button>
                <button onClick={handleCancel} className="Provider-profile-cancel-btn">Cancel</button>
              </div>
            </div>
          )}

          <div className="Provider-profile-profile-info">
            <div className="Provider-profile-profile-img">
              <img src={profileImg} alt="Profile" />
            </div>
          </div>
        </div>

        <div className="Provider-profile-profile-details">
          <div className="Provider-profile-body">
            <div className="Provider-profile-body-title-container">
              <h2>{doctor?.name || "No name available"}</h2>
            </div>
            <p className="subtitle">{doctor?.title || "No title available"}</p>
          </div>

          <div className="Provider-profile-body-buttons">
            <div className="Provider-profile-body-buttons-two">
              {sessionStorage.getItem('userId') === doctor?._id && (
                <button className="Edit-button" onClick={handleNavigateDoctorEditProfile}>
                  <TbEdit size="1rem" /> Edit Profile
                </button>
              )
              }
              {sessionStorage.getItem('userId') === doctor?._id && (
              <button
                className="verify-button"
                onClick={handleVerify}
                disabled={
                  loading ||
                  doctor.verified === "Pending" ||
                  (doctor.verified === "Verified" &&
                    doctor.subscriptionVerification === "Verified")
                }>
                {doctor.verified === "Verified"
                  ? doctor.subscriptionVerification === "Verified"
                    ? doctor.subscriptionType
                    : "Subscribe"
                  : doctor.verified === "Pending"
                    ? "Pending"
                    : "Request To Verify"}
              </button>
              )}
                {/* {id && (
                <button className="appointment-button" onClick={openEditPopup}>Book an Appointment</button>
              )} */}
              {doctor?.createdByAdmin === true && doctor?.profileTransferRequest !== "Accepted" ? (
                <button className={`appointment-button  mr-2  `}
                  onClick={openClaimPopup}
                >Claim Profile!</button>
              ) : slug && (
                <button className={`appointment-button `} onClick={openEditPopup} >Book an Appointment</button>
              )}
              <div className="DotsThreeCircle" tabIndex={0} onClick={toggleDropdown}>
                <PiDotsThreeCircle className={`DotsThreeCircle-icon ${isDropdownOpen ? 'rotate' : ''}`} />
              </div>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className={`Provider-profile-dropdown-content ${isDropdownOpen ? 'show' : ''}`}
                  tabIndex={0}
                  onBlur={handleBlur}
                >
                  <div className="Provider-profile-dropdown-item" onClick={handleCopyLink}>
                    <RxExternalLink size="1rem" /> Copy Link
                  </div>
                  <div className="Provider-profile-dropdown-item" onClick={handleShareClick}>
                    <BiSolidShareAlt size="1rem" /> Share Profile
                  </div>

                </div>
              )}
            </div>
            {isEditPopupOpen && (
              <AppointmentPOPOP
                closeEditPopup={closeEditPopup}
              />
            )}
          </div>
        </div>
        {isClaimPopupVisible && (
          <ClaimProfilePopup
          doctorId={doctor._id}
            handleCloseClaimPopup={handleCloseClaimPopup} />
        )}
        <AboutsProviderProfile doctor={doctor} />
        <LocationProviderProfile doctor={doctor} />
        {doctor?.showInsurances && (
          <AcceptedInsurancesPP insurances={insurances} />
        )}
        {doctor?.showAwards && (
          <AwardsProviderProfile doctor={doctor} />
        )}
        {/* {doctor?.showArticle && (
          <BlogsProviderProfile />
        )} */}
        {doctor?.showFaq && (
          <FAQProviderProfile doctor={doctor} />
        )}
        <ProviderShareProfilePopup Providername={doctor?.name} show={isSharePopupVisible} handleClose={handleCloseSharePopup} />
      </div>
    </>
  )
}

export default ProviderProfile