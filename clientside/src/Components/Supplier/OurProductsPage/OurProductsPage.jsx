import React, { useState, useRef, useEffect } from 'react';
import './ourproductspage.css';
//Defult Cover-Image
import providers from './Assets/providers3.png';
//Defult profile-Image
import providersprofile from '../../Assets/doctor-holder-image.png';

//React icons
import { LuPencil } from 'react-icons/lu';
import { IoIosStar } from 'react-icons/io';
import { PiDotsThreeCircle } from 'react-icons/pi';
import { PiPaperPlaneTiltBold } from 'react-icons/pi';
import { RxExternalLink } from 'react-icons/rx';
import { BiSolidShareAlt } from 'react-icons/bi';
import { TbEdit } from 'react-icons/tb';

//All components render in Ourproviders page
import OurProductsPEPOP from './OurProductsPEPOP/OurProductsPEPOP';
import OverviewActivityProducts from './OverviewActivityProducts/OverviewActivityProducts';
import OurProductsDC from './OurProductsDC/OurProductsDC';
import ReviewPageProducts from './ReviewPageProducts/ReviewPageProducts';
import MessagePEPOP from './MessagePEPOP/MessagePEPOP';
import axios from 'axios';

import OurProductsSharePopup from './OurProductsSharePopup/OurProductsSharePopup'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import ClaimProfilePopup from '../SupplierFilterPage/ClaimProfilePopup/ClaimProfilePopup';
import network from '../Assets/network.png';
// import DynamicMeta from '../../DynamicMeta/DynamicMeta';

const OurProductsPage = () => {
  const [backgroundImage, setBackgroundImage] = useState(providers);
  const [profileData, setProfileData] = useState({
    name: 'MedxBay',
    rating: 4.1,
    Headline: 'Your Vision | Our Innovation',
    location: 'IT Services and IT Consulting | Aminjikkarai, Tamil Nadu 24 followers | 11-50 employees',
    followers: 24,
    employees: 50,
    profileImage: providersprofile,
  });
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const fileInputRef = useRef(null);
  const [supplier, setSupplier] = useState([]);
  const [products, setProducts] = useState([]);
  const [blogs, setBlogs] = useState([]);
    const { slug } = useParams(); // Get slug from the route
       useEffect(() => {
        const userId = sessionStorage.getItem('userId'); // Check if user is logged in
    
        if (!userId && !slug) {  // If no user is logged in and no `id` in URL
          toast.warning("You need to log in.");
          navigate("/login"); // Redirect to login
        }
      }, [navigate, slug]);
    
  
  // Fetch profile data from the backend
  const fetchSuppliersDetails = async () => {
    try {
      const url = slug
        ? `${process.env.REACT_APP_BASE_URL}/supplier/supplier/${slug}` // New route with slug
        : `${process.env.REACT_APP_BASE_URL}/supplier/profile`; // Existing route

      const response = await axios.get(url, { withCredentials: true });
      const { supplier, products, blogs } = response.data;
      setSupplier(supplier);
      setProducts(products);
      setBlogs(blogs);
      setProfileData({
        name: supplier.name || "Supplier Name",
        rating: supplier.rating || 0,
        tagline: supplier.tagline,
        location: supplier.address || "IT Services and Consulting",
        followers: supplier.followers?.length || 24,
        employees: supplier.employees || "11-50",
        profileImage: supplier.profilePicture ? bufferToBase64(supplier.profilePicture.data) : providersprofile,
      });
      setBackgroundImage(bufferToBase64(supplier.coverPhoto.data) || providers);
    } catch (error) {
      console.error("Error fetching supplier details:", error);
    }
  };
  useEffect(() => {

    fetchSuppliersDetails();
  }, []);

  // Convert buffer data to Base64
  const bufferToBase64 = (buffer) => {
    if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
      const bytes = new Uint8Array(buffer.data);
      let binary = '';
      bytes.forEach(byte => binary += String.fromCharCode(byte));
      return `data:image/jpeg;base64,${btoa(binary)}`;
    }
    return '';
  };

  //Cover-image-Handle the image change
  // const handleChangeCoverimage = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => setBackgroundImage(reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // };
  const handleChangeCoverImage = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setBackgroundImage(reader.result);
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("coverPhoto", file);

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/supplier/update-profile`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        fetchSuppliersDetails()
        if (response.status === 200) {
          console.log("Cover photo updated successfully");
          toast.info("Cover photo updated successfully")
        }
      } catch (error) {
        console.error("Error uploading cover photo:", error);
      }
    }
  };
  //Cover-image-Handle the file input click 
  const handleEditClick = () => fileInputRef.current.click();

  //ToggleDropdown function
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  const handleBlur = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  //Popup logic
  const [tempProfileData, setTempProfileData] = useState(profileData);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isEditMessagePopupOpen, setIsEditMessagePopupOpen] = useState(false); // Add popup state
  const [isSharePopupVisible, setIsSharePopupVisible] = useState(false); // State for share popup

  // Message Popup logic    
  const handleShowEditMessagePopup = () => {
    setIsEditMessagePopupOpen(true);
    document.body.classList.add('scroll-lock');
  };

  const closeEditMessagePopup = () => {
    setIsEditMessagePopupOpen(false);
    document.body.classList.remove('scroll-lock');
  };

  const openEditPopup = () => {
    setTempProfileData(profileData);
    setIsEditPopupOpen(true);
    document.body.classList.add('scroll-lock');
  };

  const closeEditPopup = () => {
    setIsEditPopupOpen(false);
    document.body.classList.remove('scroll-lock');
  };

  const handleShareClick = () => {
    setIsSharePopupVisible(true); // Show the share popup
  };

  const handleCloseSharePopup = () => {
    setIsSharePopupVisible(false); // Close the share popup
  };


  useEffect(() => {
    return () => {
      document.body.classList.remove('scroll-lock');
    };
  }, []);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setTempProfileData(prevData => ({ ...prevData, profileImage: imageURL }));
    }
  };

  const handleProfileDataChange = (e) => {
    const { name, value } = e.target;
    setTempProfileData(prevData => ({ ...prevData, [name]: value }));
  };

  const copyLink = () => {
    const link = `${window.location.origin}/OurProducts/${supplier?.slug}`; // Dynamically get the base URL
    navigator.clipboard.writeText(link)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy link: ', err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData(tempProfileData);
    closeEditPopup();
  };
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
      title={supplier?.name}
      description={supplier?.overview}
      image={bufferToBase64(supplier?.profilePicture?.data)}
    /> */}
    <ToastContainer/>
    <div className="our-products-profile-container">
      <div className="our-products-cover-profile-image-head">
        <img src={backgroundImage} alt="Background" />
        {sessionStorage.getItem('userId') === supplier._id && (
        <div className="our-products-edit-cover-img">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChangeCoverImage}
            style={{ display: 'none' }}
            accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
          />
          <LuPencil className="our-products-cover-edit-icon" onClick={handleEditClick} />
        </div>
        )}

        <div className="our-products-profile-info">
          <div className="our-products-profile-img">
            <img src={profileData.profileImage} alt="Profile" />
          </div>
        </div>
      </div>

      <div className="our-products-profile-details">
        <div className="our-products-body">
          <div className="our-products-body-title-container">
            <h2>{profileData.name}</h2>
            <div className="our-products-rating-number">
              {profileData.rating} <IoIosStar />
            </div>
          </div>
          <p className="Headline">{profileData.tagline}</p>
          <p className="location">{profileData.location.city + ' | ' + profileData.location.state + ' | ' + profileData.location.country}</p>
          <p className="followers">
            {profileData.followers} followers | {profileData.employees} employees
          </p>
        </div>

        <div className="our-products-body-buttons">
            <div className="our-products-body-buttons-two">
              <Link to={'https://medxbay.com/social/'} target='_blank'>
                <button className="follow-button" ><img src={network} alt='social media'/> Social</button>
              </Link>

              <button className="message-button" onClick={handleShowEditMessagePopup}>
                <PiPaperPlaneTiltBold size='1rem' /> Message
              </button> 
              {isEditMessagePopupOpen && (
                <MessagePEPOP
                  closeEditMessagePopup={closeEditMessagePopup}
                  supplierId = {supplier?._id}
                />
              )}
            <div className="DotsThreeCircle" tabIndex={0} onClick={toggleDropdown}>
              <PiDotsThreeCircle className={`DotsThreeCircle-icon ${isDropdownOpen ? 'rotate' : ''}`} />
            </div>

            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className={`our-products-dropdown-content ${isDropdownOpen ? 'show' : ''}`}
                tabIndex={0}
                onBlur={handleBlur}
              >
                <div className="our-products-dropdown-item" onClick={copyLink}>
                  <RxExternalLink size="1rem" /> Copy Link
                </div>
                <div className="our-products-dropdown-item" onClick={handleShareClick}>
                  <BiSolidShareAlt size="1rem" /> Share Profile
                </div>
                {sessionStorage.getItem('userId') === supplier._id && (
                    <div className="our-products-dropdown-item" onClick={openEditPopup}>
                      <TbEdit size="1rem" /> Edit Profile
                    </div>
                  )}
                </div>
            )}

            {isEditPopupOpen && (
              <OurProductsPEPOP
                tempProfileData={supplier}
                handleProfileDataChange={handleProfileDataChange}
                handleProfileImageChange={handleProfileImageChange}
                handleSubmit={handleSubmit}
                closeEditPopup={closeEditPopup}
                refreshProfileData={fetchSuppliersDetails} // Pass function as prop
              />
            )}
            </div>
            {supplier?.createdByAdmin === true && supplier?.profileTransferRequest !== "Accepted" ? (
              <button className={`appointment-button  mr-2  `}
                onClick={openClaimPopup}
              >Claim Profile!</button>
            ) : (
              <Link to={'/contact-us'}>
                <button className={`appointment-button `} >Book Appointment</button>
              </Link>
            )}
          </div>
        </div>
        {isClaimPopupVisible && (
        <ClaimProfilePopup
          supplierId={supplier._id}
          handleCloseClaimPopup={handleCloseClaimPopup} />
      )}
      <OverviewActivityProducts supplier={supplier} overviewData={supplier.overview} productCategories={supplier.productCategories} supplierId = {supplier._id}/>
      {supplier.showProducts && (
        <OurProductsDC products={products} />
      )}
            {supplier.showReviews && (
      <ReviewPageProducts review={supplier.reviews} />
    )}
        {/* {supplier.showConditionLibrary && (
      <Condition blogs={blogs} />
    )} */}

      <OurProductsSharePopup name={supplier.name} show={isSharePopupVisible} handleClose={handleCloseSharePopup} />

    </div>
    </>
  );
};

export default OurProductsPage
