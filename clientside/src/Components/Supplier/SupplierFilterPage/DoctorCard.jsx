import React, { useEffect, useState } from 'react';
import doctorProfile from '../../Assets/Ellipse-30.png';
import thumbsUp from '../../Assets/ThumbsUp.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar as fasStar } from '@fortawesome/free-solid-svg-icons'; // Filled star
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Not filled star
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'; // Half-filled star

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Link, useNavigate } from 'react-router-dom';

import ClaimProfilePopup from './ClaimProfilePopup/ClaimProfilePopup';

const bufferToBase64 = (buffer) => {
    if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
        const bytes = new Uint8Array(buffer.data);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return `data:image/jpeg;base64,${btoa(binary)}`;
    } else {
        console.error('Unexpected buffer type:', typeof buffer);
        return '';
    }
};
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => value * Math.PI / 180;
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2); // Return distance with two decimal places
};
const DoctorCard = ({ isMapExpanded, supplier, location }) => {

    const [startIndex, setStartIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(0);
    // const [showDoctorCard, setShowDoctorCard] = useState(false);
    const [profilePicture, setProfilePicture] = useState(doctorProfile);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [consultationType, setConsultationType] = useState(''); // Default consultation type
    // const [showAllHospitals, setShowAllHospitals] = useState(false); // State to show all hospitals
    const [selectedHospital, setSelectedHospital] = useState(''); // State for selected hospital
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
    const [hospitalDistance, setHospitalDistance] = useState(null);
    const [hospitalLocationLat, setHospitalLocationLat] = useState(null);
    const [hospitalLocationLng, setHospitalLocationLng] = useState(null);
    const [hospitalCity, setHospitalCity] = useState(null);
    const [userLoggedin, setUserLogged] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [totalFees, setTotalFees] = useState();
    const [currencytoBookingData, setCurrencytoBookingData] = useState('usd');
    const navigate = useNavigate();

    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (supplier.profilePicture && supplier.profilePicture.data) {
            const base64String = bufferToBase64(supplier.profilePicture.data);
            setProfilePicture(base64String);
        }
    }, [supplier.profilePicture]);
    useEffect(() => {
        const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
        setUserLogged(loggedIn);
    }, []);

    const handleShowLogin = () => setShowLoginPopup(true);
    const handleShowPopup = () => {
        navigate('/signup')
        // setShowPopup(true);
    };
    const handleClosePopup = () => setShowPopup(false);
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        const stars = [];
        for (let i = 0; i < fullStars; i++) {
            stars.push(<FontAwesomeIcon key={`full-${i}`} icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />);
        }
        if (hasHalfStar) {
            stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} style={{ color: "#37adff", fontSize: "12px" }} />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />);
        }
        return stars;
    };
    // Function to truncate description
    const truncateDescription = (description, maxLength) => {
        if (description?.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    };
    const handleViewProfile = () => {
        navigate(`/OurProducts/${supplier?.slug}`);
    }
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
            <ToastContainer />
            <div className={`row doctor-card ${isMapExpanded ? 'mapExpanded-doctor-card' : ''}`}>
                <div className={`col-12 col-lg-7  ${isMapExpanded ? 'col-lg-12' : ''}`}>
                    <div className="doctor-info">
                        <div>
                            <Link to={`/OurProducts/${supplier?.slug}`}>
                                <img src={profilePicture} alt={supplier?.companyName || "supplier"} className="doctor-photo" />
                            </Link>

                            <div className={`distance-div ${isMapExpanded ? 'mapExpanded-sponsor-distance-div' : 'd-none'}`}>
                                <div className='d-flex flex-row'>
                                    <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                                    <p className='distance'>{hospitalDistance ? `${hospitalDistance} km Away` : 'xyz km away'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-details1">

                            <Link to={`/OurProducts/${supplier?.slug}`}>
                                <h2>{supplier?.name}</h2>
                            </Link>
                            <p className="speciality">{supplier?.tagline + " "}</p>
                            <p className={`location ${isMapExpanded ? 'mapExpanded-location' : ''}`}>{supplier?.address?.country + " | " + supplier?.address?.state  || "Hospital"}</p>
                            <p className={`location ${isMapExpanded ? 'mapExpanded-location' : ''}`}>{"About"}</p>
                            <p className="supplier-aboutMe">{truncateDescription(supplier?.overview, 90)}</p>
                            <p className={`clinic ${isMapExpanded ? 'mapExpanded-clinic' : ''}`}>

                            </p>
                            <div className={`percentage-data d-flex ${isMapExpanded ? 'mapExpanded-percentage-data' : ''}`}>
                                <div className='liked'>
                                    <img src={thumbsUp} alt="thumbsUp" />
                                    <span>{`${supplier?.rating ? supplier?.rating * 20 : 0}%` || "70%"}</span>
                                </div>
                                <span>{supplier?.followers?.length} follower{supplier?.followers?.length >= 1 ? 's' : ''}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-12 col-lg-5 dc-filter-appointment ${isMapExpanded ? 'col-12 mapExpanded-appointment' : ''}`}>
                <div>
                        <span className='dc-filter-appointment-Rating'>Rating</span>
                        <div className={`rating-stars ${isMapExpanded ? 'd-none' : ''}`}>
                            {supplier?.rating !== undefined ? renderStars(supplier?.rating) : renderStars(0)}
                        </div>
                    </div>
                    <div className='d-flex flex-column align-items-center'>
                        <div className='d-flex flex-row book-appointment-btn'>
                            {supplier?.createdByAdmin === true && supplier?.profileTransferRequest !== "Accepted" ? (
                                <button className={`claim-profile-button  mr-2 ${isMapExpanded ? 'mapExpanded-button' : ''}`}
                                    onClick={openClaimPopup}  // Toggle the popup on button click
                                >
                                    Claim Profile!
                                </button>
                            ) : (
                                <button className={`book-button  mr-2 ${isMapExpanded ? 'mapExpanded-button' : ''}`}
                                    onClick={handleViewProfile}
                                >View Profile </button>
                            )}
                            {isClaimPopupVisible && (
                                <ClaimProfilePopup
                                    supplierId={supplier._id}
                                    handleCloseClaimPopup={handleCloseClaimPopup} />
                            )}
                            <button
                                className={`book-button ${isMapExpanded ? 'mapExpanded-button' : ''} ${selectedHospital ? "" : "d-none"}`}
                            // onClick={() => {
                            //     const lat = hospitalLocationLat;  // Replace slot.lat with the actual latitude value
                            //     const lng = hospitalLocationLng;  // Replace slot.lng with the actual longitude value
                            //     console.log(hospitalLocationLat)
                            //     console.log(hospitalLocationLng)
                            //     const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                            //     window.open(googleMapsUrl, '_blank');
                            // }}
                            >
                                <FontAwesomeIcon icon={faLocationDot} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            {/* <SignupCard show={showPopup} handleClose={handleClosePopup} openLoginModal={handleShowLogin} /> */}
        </>
    );
};
export default DoctorCard;