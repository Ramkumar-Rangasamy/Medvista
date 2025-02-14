import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

//image imported here ...
import doctorProfile from '../Assets/Ellipse-30.png';
import videoCall from '../Assets/video_call.svg';
import MedicalService from '../Assets/medical_services.svg';
import thumbsUp from '../Assets/ThumbsUp.svg';

//icons here...
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faStar as fasStar } from '@fortawesome/free-solid-svg-icons'; // Filled star
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Not filled star
import { faStarHalfAlt } from '@fortawesome/free-solid-svg-icons'; // Half-filled star
import { RiArrowDownSLine } from "react-icons/ri";

//components using here ....
import ClaimProfilePopup from './ClaimProfilePopup/ClaimProfilePopup';

//date format using lby.....
import moment from 'moment/moment.js';

//error message...
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



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
const DoctorCard = ({ isMapExpanded, doctor = {} }) => {
    const [startIndex, setStartIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(0);
    const [showDoctorCard, setShowDoctorCard] = useState(false);
    const [profilePicture, setProfilePicture] = useState(doctorProfile);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [consultationType, setConsultationType] = useState(''); // Default consultation type
    const [selectedHospital, setSelectedHospital] = useState('');
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
    const [hospitalDistance, setHospitalDistance] = useState(null);
    const [hospitalCity, setHospitalCity] = useState(null);
    const [hospitalLocationLat, setHospitalLocationLat] = useState(null);
    const [hospitalLocationLng, setHospitalLocationLng] = useState(null);
    const [userLoggedin, setUserLogged] = useState();
    const [showPopup, setShowPopup] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [totalFees, setTotalFees] = useState();
    const [currencytoBookingData, setCurrencytoBookingData] = useState('usd');
    const navigate = useNavigate();
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobileView(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            },
            (error) => {
                console.error('Error fetching geolocation:', error);
                // toast.error('Unable to fetch your location. Please enable location services.');
            }
        );
    }, []);
    useEffect(() => {
        const currencyDataApi = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/doctors/${doctor._id}/slots`, {
                    withCredentials: true
                });
                const { feesInAllCurrencies, totalFee } = response.data;
                setCurrencies(feesInAllCurrencies);
                setTotalFees(totalFee);

            } catch (error) {
                console.error("Error fetching doctor's fees:", error);
                // toast.error("Unable to fetch fees. Please try again.");
            }
        };
        currencyDataApi();
    }, [])
    // Calculate distance when hospital or user location changes
    useEffect(() => {
        if (selectedHospital && doctor.hospitals) {
            // console.log(userLocation)
            const hospital = doctor.hospitals.find(h => h.name === selectedHospital);
            setHospitalCity(hospital.city)
            setHospitalLocationLat(hospital.lat);
            setHospitalLocationLng(hospital.lng);
            if (hospital && hospital.lat && hospital.lng && userLocation.lat && userLocation.lng) {
                const distance = calculateDistance(userLocation.lat, userLocation.lng, hospital.lat, hospital.lng);
                setHospitalDistance(distance);
            }
        }
    }, [selectedHospital, doctor.hospitals, userLocation]);
    useEffect(() => {
        if (doctor.profilePicture && doctor.profilePicture.data) {
            const base64String = bufferToBase64(doctor.profilePicture.data);
            setProfilePicture(base64String);
        }
    }, [doctor.profilePicture]);
    useEffect(() => {
        const loggedIn = sessionStorage.getItem('loggedIn') === 'true';
        setUserLogged(loggedIn);
    }, []);
    const timeSlots = doctor.timeSlots || [];
    const filteredTimeSlots = selectedHospital
        ? timeSlots.filter(slot => slot.hospital === selectedHospital && new Date(slot.date) >= new Date() && slot.status === 'free')
        : timeSlots.filter(slot => new Date(slot.date) >= new Date() && slot.status === 'free');
    const datesMap = filteredTimeSlots.reduce((acc, slot) => {
        const date = new Date(slot.date).toDateString();
        if (!acc[date]) {
            acc[date] = { day: date, slots: 0, timeSlots: [] };
        }
        acc[date].slots += 1;
        acc[date].timeSlots.push(slot);
        return acc;
    }, {});
    const dates = Object.values(datesMap);
    while (dates.length < 3) {
        dates.push({ day: 'Unavailable', slots: 0, timeSlots: [] });
    }
    const groupedSlots = {
        morning: [],
        afternoon: [],
        evening: []
    };
    // Group time slots into morning, afternoon, evening
    if (dates[selectedDate]) {
        dates[selectedDate].timeSlots.forEach(slot => {
            const hour = parseInt(slot.startTime.split(':')[0], 10);
            if (hour < 12) {
                groupedSlots.morning.push(slot.startTime);
            } else if (hour < 17) {
                groupedSlots.afternoon.push(slot.startTime);
            } else {
                groupedSlots.evening.push(slot.startTime);
            }
        });
    }
    const showPrev = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
            setSelectedDate(selectedDate - 1);
        }
    };
    const showNext = () => {
        if (startIndex + 3 < dates.length) {
            setStartIndex(startIndex + 1);
            setSelectedDate(selectedDate + 1);
        }
    };
    const handleShowCard = () => {
        setShowDoctorCard(prevState => !prevState);
    };
    const handleShowLogin = () => setShowLoginPopup(true);
    const handleShowPopup = () => {
        navigate('/signup');
        // setShowPopup(true);
    }
    const handleClosePopup = () => setShowPopup(false);
    const handleTimeSlotClick = (slot) => {
        setSelectedTimeSlot(slot);
    };
    const handleBookAppointment = async () => {
        setIsSaving(true);  // Set saving state to true

        if (!userLoggedin) {
            toast.info('You need to log in to book an appointment.', {
                className: 'toast-sign toast-fail',
                closeButton: true,
                progressBar: true,
            });
            setTimeout(() => {
                navigate('/login');  // Navigate to login page if user is not logged in
            }, 2000);
            return;
        }

        if (consultationType === 'In-person' && !selectedHospital) {
            toast.info('Please select a hospital for in-person consultation.', {
                className: 'toast-center',
                closeButton: true,
                progressBar: true,
            });
            return;
        }

        try {
            const selectedDay = dates[selectedDate];
            if (!consultationType) {
                toast.error('Please select a consultation type.', {
                    className: 'toast-center',
                    closeButton: true,
                    progressBar: true,
                });
                return;
            }

            const bookingData = {
                doctorId: doctor._id,
                date: moment(selectedDay.day).format('YYYY-MM-DD'),
                startTime: selectedTimeSlot,
                consultationType,
                hospital: consultationType === 'In-person' ? selectedHospital : null,
                currency: consultationType === 'Video call' ? currencytoBookingData : null
            };

            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/patient/book`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(bookingData),
                credentials: 'include',
            });

            const result = await response.json();
            if (response.ok) {
                if (consultationType === "Video call" && result.url) {
                    window.open(result.url)
                } else {
                    navigate('/profile/userprofile/manage/appointments')
                    toast.info('Booking successfull.', {
                        className: 'toast-center',
                        closeButton: true,
                        progressBar: true,
                    });
                }
                setTimeout(() => {
                    setIsSaving(false);  // Reset saving state after the process is done
                    window.location.reload();
                }, 3000);  // 3000 milliseconds = 3 seconds
            } else {
                toast.error('Unexpected server response. Please try again.', {
                    className: 'toast-center toast-fail',
                    closeButton: true,
                    progressBar: true,
                });
                setIsSaving(false);  // Reset saving state after the process is done
            }
        } catch (error) {
            console.error('Error booking appointment:', error.message);
            toast.error('Error booking appointment. Please try again.', {
                className: 'toast-center toast-fail',
                closeButton: true,
                progressBar: true,
            });
            setIsSaving(false);  // Reset saving state after the process is done   
        }
    };
    const currencySymbols = {
        usd: '$',
        inr: '₹',
        gbp: '£',
        aed: 'د.إ',
        eur: '€',
        // Add more currencies and symbols as needed
    };
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
    const renderConsultationType = () => {
        return (
            <>
                {doctor.consultation === 'In-person' || doctor.consultation === 'Both' ? (
                    <div className={`p-1 ${consultationType === "In-person" ? "consultationActiveColor" : ""}`}>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="inPersonCheck"
                                checked={consultationType === 'In-person'}
                                onChange={() => {
                                    if (consultationType === 'In-person') {
                                        setConsultationType('');
                                        setSelectedHospital(''); // Clear hospital selection if unchecking
                                    } else {
                                        setConsultationType('In-person');
                                        setSelectedHospital(''); // Reset hospital when switching to In-person
                                    }
                                }}
                            />
                            <img src={MedicalService} alt="In-Person" />
                            <label className="form-check-label" htmlFor="inPersonCheck">
                                In-Person
                            </label>
                        </div>
                    </div>
                ) : null}

                {doctor.consultation === 'Video call' || doctor.consultation === 'Both' ? (
                    <div className={`p-1 ${consultationType === "Video call" ? "consultationActiveColor" : ""}`}>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="videoCallCheck"
                                checked={consultationType === 'Video call'}
                                onChange={() => {
                                    if (consultationType === 'Video call') {
                                        setConsultationType('');
                                    } else {
                                        setConsultationType('Video call');
                                        setSelectedHospital(''); // Clear hospital when switching to Video call
                                    }
                                }}
                            />
                            <img src={videoCall} alt="Video Consultation" />
                            <label className="form-check-label" htmlFor="videoCallCheck">
                                Video Consultation
                            </label>
                        </div>
                        {consultationType === 'Video call' && doctor.doctorFee && (
                            <div className="minimal-dropdown">
                                <select
                                    value={currencytoBookingData}
                                    onChange={(e) => setCurrencytoBookingData(e.target.value)}
                                >
                                    {Object.entries(currencies).map(([currency, value], index) => (
                                        <option key={index} value={currency}>
                                            {currency.toUpperCase()} - {currencySymbols[currency] || ''}{value}
                                        </option>
                                    ))}
                                </select>
                            </div>

                        )}
                    </div>
                ) : null}
            </>
        );
    };


    const renderHospitalOptions = () => {
        if (!doctor.hospitals || doctor.hospitals.length === 0) {
            return <p>No hospitals available</p>;
        }
        return (
            <>
                <div className={` hospital-sort-by ${isMapExpanded ? 'mapExpanded-hospital-sort-by' : ''}`}>
                    <div className="form-group">
                        <select value={selectedHospital}
                            onChange={(e) => setSelectedHospital(e.target.value)}>
                            <option value="" disabled selected>Select Hospital</option>
                            {doctor.hospitals.map((hospital, index) => (
                                <option key={index} value={hospital.name}>
                                    {hospital.name || 'Unnamed Hospital'}
                                </option>
                            ))}
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />
                    </div>
                </div>
            </>
        );
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
    // Function to truncate description
    const truncateDescription = (description, maxLength) => {
        if (description.length > maxLength) {
            return `${description.slice(0, maxLength)}...`;
        }
        return description;
    };

    return (
        <>
            <ToastContainer />
            <div className={`row doctor-card ${isMapExpanded ? 'mapExpanded-doctor-card' : ''}`}>
                <div className={`col-12 col-lg-7  ${isMapExpanded ? 'col-lg-12' : ''}`}>
                    <div className="doctor-info">
                        <div>
                            <Link to={`/book-appointment/${doctor?.slug}`}>
                                <img src={profilePicture} alt={doctor?.name || "Doctor"} className="sponsored-doctor-photo" />
                            </Link>
                            <div className={` ${isMapExpanded ? 'mapExpanded-sponsor-rating-stars' : 'd-none'}`}>
                                {doctor?.rating !== undefined ? renderStars(doctor.rating) : renderStars(0)}
                            </div>
                            <div className={`distance-div ${isMapExpanded ? 'mapExpanded-sponsor-distance-div' : 'd-none'}`}>
                                <div className='d-flex flex-row'>
                                    <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                                    <p className='distance'> {hospitalDistance ? `${hospitalDistance} km Away` : 'xyz km Away'}</p>
                                </div>
                            </div>
                        </div>
                        <div className="doctor-details1">
                            <Link to={`/book-appointment/${doctor?.slug}`}>
                                <h2>{doctor.name}</h2>
                            </Link>
                            <p className="speciality">{doctor.speciality.join(", ")}</p>
                            <p className="experience">{doctor.experience ? doctor.experience + " years experience overall" : " "}</p>
                            <p className={`location ${isMapExpanded ? 'mapExpanded-location' : ''}`}>
                            {!(doctor?.createdByAdmin === true && doctor?.profileTransferRequest !== "Accepted") ? "Hospital" : "About"}
                            </p>
                            <p className={`clinic ${isMapExpanded ? 'mapExpanded-clinic' : ''}`}>
                                <div className="row mt-2">
                                    <div className="col">
                                        {!(doctor?.createdByAdmin === true && doctor?.profileTransferRequest !== "Accepted") && (
                                            renderHospitalOptions()
                                        )}
                                        {(doctor?.createdByAdmin === true && doctor?.profileTransferRequest !== "Accepted") && (
                                            truncateDescription(doctor?.aboutMe, 115)
                                        )}
                                    </div>
                                </div>
                            </p>
                            <div className={`consultation-type ${isMapExpanded ? 'mapExpanded-consultation-type' : ''}`}>
                            {!(doctor?.createdByAdmin === true && doctor?.profileTransferRequest !== "Accepted") && (
                                renderConsultationType()
                                )}
                            </div>
                            <div className={`percentage-data d-flex ${isMapExpanded ? 'mapExpanded-percentage-data' : ''}`}>
                                <div className='liked'>
                                    <img src={thumbsUp} alt="thumbsUp" />
                                    <span>{`${doctor.rating ? doctor.rating * 20 : 0}%` || "70%"}</span>
                                </div>
                                {/* <span>{doctor?.patientStories || "0 Patient Stories"}</span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`col-12 col-lg-5 dc-filter-appointment ${isMapExpanded ? 'col-12 mapExpanded-appointment' : ''}`}>
                    <div>
                        <span className={`dc-filter-appointment-Rating ${isMapExpanded ? "d-none" : " "}`}>Rating</span>
                        <div className={`rating-stars ${isMapExpanded ? 'd-none' : ''}`}>
                            {doctor.rating !== undefined ? renderStars(doctor.rating) : renderStars(0)}
                        </div>
                    </div>

                    <div className='d-flex flex-column align-items-center'>
                        <div className={`distance-div ${isMapExpanded ? 'd-none' : ''}`}>
                            <div className={` ${selectedHospital ? "d-flex flex-row" : "d-none"}`}>
                                <FontAwesomeIcon icon={faLocationDot} style={{ fontSize: "11px", marginTop: "4.8px", marginRight: "3px" }} />
                                <p className='distance'> {hospitalDistance ? `${hospitalDistance} km Away` : 'xyz km Away'}</p>
                            </div>
                            <p className={`${doctor?.createdByAdmin === true && doctor?.profileTransferRequest !== "Accepted" ? "claim-profile-availability" : "availability"}`}>{doctor?.availability ? "Available" : "Not Available"}</p>
                        </div>
                        <div className='d-flex flex-row book-appointment-btn'>
                            {doctor?.createdByAdmin === true && doctor?.profileTransferRequest !== "Accepted" ? (
                                <button className={` mr-2 ${isMapExpanded ? 'mapExpanded-button' : ''} claim-profile-button`}
                                    onClick={openClaimPopup}
                                >Claim Profile!</button>
                            ) : (
                                <button className={`book-button  ${isMapExpanded ? 'mapExpanded-button' : ''}`} onClick={handleShowCard}>Book Appointment</button>
                            )}
                            {isClaimPopupVisible && (
                                <ClaimProfilePopup
                                    doctorId={doctor._id}
                                    handleCloseClaimPopup={handleCloseClaimPopup} />
                            )}
                            <button
                                className={`book-button ${isMapExpanded ? 'mapExpanded-button' : ''}   ${selectedHospital ? "" : "d-none"}`}
                                onClick={() => {
                                    const lat = hospitalLocationLat;  // Replace slot.lat with the actual latitude value
                                    const lng = hospitalLocationLng;  // Replace slot.lng with the actual longitude value
                                   
                                    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
                                    window.open(googleMapsUrl, '_blank');
                                }}
                            >
                                <FontAwesomeIcon icon={faLocationDot} />
                            </button>
                        </div>
                    </div>
                </div>
                {showDoctorCard && (
                    <div className="container doctor-card-date">
                        <div className="date-nav">
                            <button className="slots-arrow " onClick={showPrev} disabled={startIndex === 0}>‹</button>
                            <div className="date-carousel">
                                {dates.length > 0 ? (
                                    dates.slice(startIndex, startIndex + (isMapExpanded || isMobileView ? 1 : 3)).map((date, index) => (
                                        <div
                                            key={index}
                                            className={`date-item ${index + startIndex === selectedDate ? 'active' : ''}`}
                                            onClick={() => setSelectedDate(index + startIndex)}
                                            style={{
                                                pointerEvents: date.slots === 0 ? 'none' : 'auto',
                                                opacity: date.slots === 0 ? 0.5 : 1,
                                                cursor: date.slots === 0 ? 'not-allowed' : 'pointer'
                                            }}
                                        >
                                            <h3>{date.day}</h3>
                                            <span className="slots-available">{date.slots} Slots Available</span>
                                        </div>
                                    ))
                                ) : (
                                    <p>No slots are available</p>
                                )}
                            </div>
                            <button className="slots-arrow " onClick={showNext} disabled={startIndex + 3 >= dates.length}>›</button>
                        </div>
                        <div className="underline">
                            <div
                                className="underline-active"
                                style={{
                                    left: `calc(100% / ${isMapExpanded || isMobileView ? 1 : 3} * ${selectedDate - startIndex})`,
                                    width: `calc(100% / ${isMapExpanded || isMobileView ? 1 : 3})`
                                }}
                            ></div>
                        </div>
                        {dates[selectedDate] && (
                            <div className="container mt-3">
                                <div className="time-slots-group d-flex flex-row">
                                    <h6>Morning</h6>
                                    <div className="time-slots">
                                        {groupedSlots.morning.map((slot, index) => (
                                            <button
                                                key={`morning-${index}`}
                                                className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''}`}
                                                onClick={() => handleTimeSlotClick(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="time-slots-group d-flex flex-row">
                                    <h6>Afternoon</h6>
                                    <div className="time-slots">
                                        {groupedSlots.afternoon.map((slot, index) => (
                                            <button
                                                key={`afternoon-${index}`}
                                                className={`time-slot ${selectedTimeSlot === slot ? 'selected' : ''}`}
                                                onClick={() => handleTimeSlotClick(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="time-slots-group d-flex flex-row">
                                    <h6>Evening</h6>
                                    <div className="time-slots">
                                        {groupedSlots.evening.map((slot, index) => (
                                            <button
                                                key={`evening-${index}`}
                                                className={`time-slot ${selectedTimeSlot === slot ? 'selected btn-primary' : ''}`}
                                                onClick={() => handleTimeSlotClick(slot)}
                                            >
                                                {slot}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {selectedTimeSlot && (
                            <div className="book-now">
                                {!userLoggedin ?
                                    (<button className={`book-button book-login mr-2 p-3 ${isMapExpanded ? 'mapExpanded-button' : ''}`} onClick={handleShowPopup}>Register to book now</button>)
                                    : (
                                        <>
                                            <button className="savebutton" type="submit" onClick={handleBookAppointment} disabled={isSaving}>
                                                <span className="savebutton-text">Book Now</span>
                                                {isSaving && <div className="spinner-overlay">
                                                    <div className="small-spinner"></div>
                                                </div>}
                                            </button>
                                        </>
                                    )
                                }
                            </div>
                        )}
                    </div>
                )}
            </div>
            {/* <SignupCard show={showPopup} handleClose={handleClosePopup} openLoginModal={handleShowLogin} /> */}
        </>
    );
};

export default DoctorCard;