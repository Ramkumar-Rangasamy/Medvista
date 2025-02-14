import React, { useState } from 'react'
import Nestednavbar from '../Nestednavbar/Nestednavbar2'
import DoctorMainCard from './DoctorMainCard'
import Filter from './Filter'
import './FilterPage.css'
import MidPartTwo from '../../MidPartTwo'
import Footer from '../footer/footerrs'
import Footerr from '../footer/footer'
import MapContainer from './Mapcontainer'
import './filter.css';
import './DoctorMainCard.css'
import VerifiedImg from '../../assests/img/Verified-SVG.svg'
import { BsInfoCircle } from "react-icons/bs";
import DoctorCard from './DoctorCard'
import Sponsor from './Sponsor'
import doctorProfile from '../../assests/img/Ellipse-30.png'
import videoCall from '../../assests/img/video_call.svg'
import MedicalService from '../../assests/img/medical_services.svg'
import thumbsUp from '../../assests/img/ThumbsUp.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faStar as fasStar } from '@fortawesome/free-solid-svg-icons'; // Filled star
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'; // Not filled star

//imported and install bootstrap-icons
import 'bootstrap-icons/font/bootstrap-icons.css';

//imported react-iocns 
import { RiArrowDownSLine } from "react-icons/ri";
import { FiCalendar } from "react-icons/fi";
import './mapcontainer.css';
import { IoClose } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";


const FilterPage = () => {
    const [expanded, setExpanded] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    const handleButtonClick = () => {
        setExpanded(!expanded);
    };

    const handleInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchButtonClick = () => {
        // Handle search functionality here, such as fetching data based on searchInput
        // console.log('Searching for:', searchInput);
    };

    const handleResetClick = () => {
        // Reset the component to default state
        setExpanded(false);
        setSearchInput('');
    };

    const [startIndex, setStartIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState(0);
    const [showDoctorCard, setShowDoctorCard] = useState(false);


    const dates = [
        { day: 'Today', slots: 11 },
        { day: 'Tomorrow', slots: 17 },
        { day: 'Fri, 5 May', slots: 18 },
        { day: 'Sat, 6 May', slots: 15 },
        { day: 'Sun, 7 May', slots: 10 },
        { day: 'Mon, 8 May', slots: 12 },
        { day: 'Tue, 9 May', slots: 14 },
        { day: 'Wed, 10 May', slots: 9 },
        { day: 'Thu, 11 May', slots: 8 },
        { day: 'Fri, 12 May', slots: 13 }
    ];

    const timeSlots = {
        morning: ['11:30 AM'],
        afternoon: ['12:00 PM', '12:30 PM', '01:30 PM', '02:00 PM', '02:30 PM'],
        evening: ['06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM']
    };

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

    const handleBookAppointment = () => {
        setShowDoctorCard(true);
    };

    /*first set defult value*/
    const [filters, setFilters] = useState({
        specialty: 'All Specialty',
        gender: '',
        date: '',
        hospital: '',
        language: '',
        consultation: '',
        availability: '',
        condition: '',
    });

    /*onclick events*/
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    /*reset button Logic start */
    const handleReset = () => {
        setFilters({
            specialty: 'All Specialty',
            gender: '',
            date: '',
            hospital: '',
            language: '',
            consultation: '',
            availability: '',
            condition: '',
        });
    };
    /*reset button Logic End */

    return (
        <>
            <Nestednavbar />
            <div className='container-fluid'>
                <div className='d-flex'>
                    <div className=" filter-edit">
                        <>
                            <div className="sidebar-filter d-none d-md-block">
                                <div className='filter-heading-reset'>
                                    <h5>Filter</h5>
                                    <button onClick={handleReset}><i className="bi bi-arrow-counterclockwise " /> Reset Filter</button>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>Specialty</label>
                                        <select name="specialty" value={filters.specialty} onChange={handleChange}>
                                            <option>All Specialty</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>Gender</label>
                                        <select name="gender" value={filters.gender} onChange={handleChange}>
                                            <option value="">Select Gender</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>By Date</label>
                                        <div className="date-input-container">
                                            <input type="date" name="date" value={filters.date} onChange={handleChange} />
                                            <FiCalendar className="custom-calendar-icon" />
                                        </div>
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>By Hospital Name</label>
                                        <select name="hospital" value={filters.hospital} onChange={handleChange}>
                                            <option value="">Hospital name</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>Language</label>
                                        <select name="language" value={filters.language} onChange={handleChange}>
                                            <option value="">Select Language</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>By Consultation</label>
                                        <select name="consultation" value={filters.consultation} onChange={handleChange}>
                                            <option value="">Consultation Type</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>By Availability</label>
                                        <select name="availability" value={filters.availability} onChange={handleChange}>
                                            <option value="">Availability</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>

                                <div className="select-container-filter">
                                    <div className="form-group">
                                        <label>By Condition</label>
                                        <select name="condition" value={filters.condition} onChange={handleChange}>
                                            <option value="">Condition Type</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon-filter" />
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                    <div className="doctorMainCard-edit">
                        <>
                            <div className="container mt-4">
                                <div className="row">
                                    <div className='col-7 doc-card-header'>
                                        <h4>55 doctors available in Andheri west</h4>
                                        <div className='d-flex'>
                                            <img src={VerifiedImg} alt="VerifiedImg" style={{ width: "26px", height: "26px" }} />
                                            <p>Book appointments with minimum wait-time & varified doctor details</p>
                                        </div>
                                    </div>
                                    <div className='col-1'></div>
                                    <div className="col-4 sort-by">
                                        <label htmlFor="sort">Sort By</label>
                                        <select id="sort">
                                            <option value="relevance" className='custom-option'>Relevance</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='sponsor-card'>
                                    <div className='sponsored-text d-flex'>
                                        <BsInfoCircle />
                                        <p>Sponsored</p>
                                    </div>
                                    <div className='row doctor-card'>
                                        <div className="col-7 ">
                                            <div className="doctor-info">
                                                <img src={doctorProfile} alt="Dr. Shantanu Jambhekar" className="doctor-photo" />
                                                <div className="doctor-details">
                                                    <h2>Dr. Shantanu Jambhekar</h2>
                                                    <p className="speciality">Dentist</p>
                                                    <p className="experience">16 years experience overall</p>
                                                    <p className="location">Pare, Mumbai</p>
                                                    <p className="clinic">Smilesense Center for Advanced Dentistry + 1 more</p>
                                                    <div className="consultation-type">
                                                        <img src={MedicalService} alt="videoCall" />
                                                        <span>In-Person</span>
                                                        <img src={videoCall} alt="videoCall" style={{ color: "#37adff" }} />
                                                        <span>Video Consultation</span>
                                                    </div>
                                                    <div className="percentage-data d-flex">
                                                        <div className='liked'>
                                                            <img src={thumbsUp} alt="thumbsUp" />
                                                            <span>99% </span>
                                                        </div>
                                                        <span>93 Patient Stories</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-1"></div> */}
                                        <div className="col-5 appointment d-flex flex-column">
                                            <div className='rating-stars'>
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                            </div>
                                            <div className=''>
                                                <div className='distance-div'>
                                                    <div className='d-flex flex-row'>
                                                        <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                                                        <p className='distance'>1.3km Away</p>
                                                    </div>
                                                    <p className="availability">Available Today</p>
                                                </div>
                                                <div className='d-flex flex-row'>
                                                    <button className="book-button mr-2" onClick={handleBookAppointment}>Book Appointment</button>
                                                    <button className="book-button"><FontAwesomeIcon icon={faPaperPlane} /></button>
                                                </div>
                                            </div>
                                        </div>
                                        {showDoctorCard && (
                                            <div className="container doctor-card-date">
                                                <div className="date-nav">
                                                    <button className="arrow" onClick={showPrev} disabled={startIndex === 0}>‹</button>
                                                    <div className="date-carousel">
                                                        {dates.slice(startIndex, startIndex + 3).map((date, index) => (
                                                            <div
                                                                key={index}
                                                                className={`date-item ${index + startIndex === selectedDate ? 'active' : ''}`}
                                                                onClick={() => setSelectedDate(index + startIndex)}
                                                            >
                                                                <h3>{date.day}</h3>
                                                                <span className="slots-available">{date.slots} Slots Available</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button className="arrow" onClick={showNext} disabled={startIndex + 3 >= dates.length}>›</button>
                                                </div>
                                                <div className="underline">
                                                    <div
                                                        className="underline-active"
                                                        style={{ left: `calc(100% / 2.67 * ${selectedDate - startIndex})` }}
                                                    ></div>
                                                </div>
                                                <div className='container mt-3'>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6>Morning</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.morning.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6 style={{ marginLeft: "0px" }}>Afternoon</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.afternoon.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6>Evening</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.evening.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className='result-card'>
                                    <p>All results</p>
                                    <div className='row doctor-card'>
                                        <div className="col-7 ">
                                            <div className="doctor-info">
                                                <img src={doctorProfile} alt="Dr. Shantanu Jambhekar" className="doctor-photo" />
                                                <div className="doctor-details">
                                                    <h2>Dr. Shantanu Jambhekar</h2>
                                                    <p className="speciality">Dentist</p>
                                                    <p className="experience">16 years experience overall</p>
                                                    <p className="location">Pare, Mumbai</p>
                                                    <p className="clinic">Smilesense Center for Advanced Dentistry + 1 more</p>
                                                    <div className="consultation-type">
                                                        <img src={MedicalService} alt="videoCall" />
                                                        <span>In-Person</span>
                                                        <img src={videoCall} alt="videoCall" style={{ color: "#37adff" }} />
                                                        <span>Video Consultation</span>
                                                    </div>
                                                    <div className="percentage-data d-flex">
                                                        <div className='liked'>
                                                            <img src={thumbsUp} alt="thumbsUp" />
                                                            <span>99% </span>
                                                        </div>
                                                        <span>93 Patient Stories</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="col-1"></div> */}
                                        <div className="col-5 appointment d-flex flex-column">
                                            <div className='rating-stars'>
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={fasStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                                <FontAwesomeIcon icon={farStar} style={{ color: "#37adff", fontSize: "12px" }} />
                                            </div>
                                            <div className=''>
                                                <div className='distance-div'>
                                                    <div className='d-flex flex-row'>
                                                        <FontAwesomeIcon icon={faPaperPlane} style={{ fontSize: "10px", marginTop: "4.8px", marginRight: "3px" }} />
                                                        <p className='distance'>1.3km Away</p>
                                                    </div>
                                                    <p className="availability">Available Today</p>
                                                </div>
                                                <div className='d-flex flex-row'>
                                                    <button className="book-button mr-2" onClick={handleBookAppointment}>Book Appointment</button>
                                                    <button className="book-button"><FontAwesomeIcon icon={faPaperPlane} /></button>
                                                </div>
                                            </div>
                                        </div>
                                        {showDoctorCard && (
                                            <div className="container doctor-card-date">
                                                <div className="date-nav">
                                                    <button className="arrow" onClick={showPrev} disabled={startIndex === 0}>‹</button>
                                                    <div className="date-carousel">
                                                        {dates.slice(startIndex, startIndex + 3).map((date, index) => (
                                                            <div
                                                                key={index}
                                                                className={`date-item ${index + startIndex === selectedDate ? 'active' : ''}`}
                                                                onClick={() => setSelectedDate(index + startIndex)}
                                                            >
                                                                <h3>{date.day}</h3>
                                                                <span className="slots-available">{date.slots} Slots Available</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <button className="arrow" onClick={showNext} disabled={startIndex + 3 >= dates.length}>›</button>
                                                </div>
                                                <div className="underline">
                                                    <div
                                                        className="underline-active"
                                                        style={{ left: `calc(100% / 2.67 * ${selectedDate - startIndex})` }}
                                                    ></div>
                                                </div>
                                                <div className='container mt-3'>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6>Morning</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.morning.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6 style={{ marginLeft: "0px" }}>Afternoon</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.afternoon.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="time-slots-group d-flex flex-row">
                                                        <h6>Evening</h6>
                                                        <div className="time-slots">
                                                            {timeSlots.evening.map((time, index) => (
                                                                <button key={index} className="time-slot">{time}</button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </>
                    </div>
                    <div className="">
                        <>
                            <div className='resetButtonContainer'>
                                <button className='resetButton' onClick={handleResetClick}>
                                    <IoClose />
                                </button>
                            </div>
                            <div className='mapHead'>
                                <div className={`mapContainer ${expanded ? 'expanded' : ''}`}>
                                    <iframe
                                        className="mapFrame"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509349!2d144.9631579153587!3d-37.81627974201782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5772d5fd411f07b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1619929516970"
                                        allowFullScreen=""
                                        loading="lazy"
                                        title="Google Maps"
                                    ></iframe>
                                    {expanded ? (
                                        <div className="searchInputContainer">
                                            <input
                                                type="text"
                                                className="searchInput"
                                                placeholder="Enter search term"
                                                value={searchInput}
                                                onChange={handleInputChange}
                                            />
                                            <button className="searchButton" onClick={handleSearchButtonClick}>
                                                <IoSearch />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="searchButtonContainer">
                                            <button className="searchButton" onClick={handleButtonClick}>
                                                Search on Map <IoSearch />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    </div>
                </div>
                {/* <MidPartTwo/>
        <Footerr/>
        <Footer/> */}
            </div>
        </>
    )
}

export default FilterPage


// import React, { useEffect, useState } from 'react';
// import DoctorMainCard from './DoctorMainCard';
// import Filter from './Filter';
// import './FilterPage.css';
// import Footer from '../footer/footerrs';
// import MapContainer from './Mapcontainer';
// import './OffCanvas.css';
// import { fetchFromPatient } from '../../actions/api';
// import Nestednavbar from '../Nestednavbar2/Nestednavbar2';
// import { useLocation } from 'react-router-dom';
// import { useSearch } from '../context/context';

// const FilterPage = () => {
//   const location = useLocation();
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isMapExpanded, setIsMapExpanded] = useState(false);
//   const [searchInput, setSearchInput] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [doc, setDoc] = useState([]);
//   const [responseStatus, setResponseStatus] = useState();
//   const [filters, setFilters] = useState({
//     what: '',
//     where: '',
//     country: '',
//     state: '',
//     city: '',
//     speciality: '',
//     conditions: [],
//     languages: [],
//     gender: '',
//     hospital: "",
//     availability: '',
//     dateAvailability: '',
//     consultation: ''
//   });

//   const { searchData } = useSearch();

//   useEffect(() => {
//     if (searchData.doctors) {
//       setDoctors(searchData.doctors);
//       setFilters(prevFilters => ({
//         ...prevFilters,
//         what: searchData.what || '',
//         where: searchData.where || ''
//       }));
//     } else if (searchData.error) {
//       console.error(searchData.error);
//     }
//   }, [searchData]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await fetchFromPatient('/doctors');
//       if (response && Array.isArray(response.doctors)) {
//         setDoc(response.doctors);
//       }
//       setResponseStatus(response.status === 200 ? "Success" : "Failed");
//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const toggleFilterCanvas = () => {
//     setIsFilterOpen(!isFilterOpen);
//   };

//   const handleMapExpandToggle = () => {
//     setIsMapExpanded(!isMapExpanded);
//   };

//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const handleSearchButtonClick = () => {
//     setFilters((prevFilters) => ({ ...prevFilters, what: searchInput }));
//   };

//   const handleFilterChange = (filterData) => {
//     setFilters(filterData);
//   };

//   const handleResetClick = () => {
//     setIsMapExpanded(false);
//     setSearchInput('');
//   };

//   const handleMapClose = () => {
//     setIsMapExpanded(false);
//   };

//   const filterDoctors = (doctors) => {
//     if (!Array.isArray(doctors)) return [];

//     return doctors.filter(doctor => {
//       const getStringValue = value => (typeof value === 'string' ? value.toLowerCase().replace(" ", "") : '');

//       const country = getStringValue(doctor.country || '');
//       const state = getStringValue(doctor.state || '');
//       const city = getStringValue(doctor.city || '');
//       const speciality = (doctor.speciality || []).map(getStringValue);
//       const gender = getStringValue(doctor.gender || '');
//       const hospital = doctor.hospitals ? doctor.hospitals.map(hospital => getStringValue(hospital.name)) : [];
//       const availability = getStringValue(doctor.availability || '');
//       const conditions = (doctor.conditions || []).map(getStringValue);
//       const languages = (doctor.languages || []).map(getStringValue);
//       const consultation = getStringValue(doctor.consultation || '');

//       return (
//         (!filters.country || country === getStringValue(filters.country)) &&
//         (!filters.state || state === getStringValue(filters.state)) &&
//         (!filters.city || city === getStringValue(filters.city)) &&
//         (!filters.speciality || speciality.includes(getStringValue(filters.speciality))) &&
//         (!filters.gender || gender === getStringValue(filters.gender)) &&
//         (!filters.hospital || hospital.includes(getStringValue(filters.hospital))) &&
//         (!filters.availability || availability === getStringValue(filters.availability)) &&
//         (!filters.conditions.length || filters.conditions.every(condition => conditions.includes(getStringValue(condition)))) &&
//         (!filters.languages.length || filters.languages.every(language => languages.includes(getStringValue(language)))) &&
//         (!filters.consultation || consultation === getStringValue(filters.consultation))
//       );
//     });
//   };

//   const filteredDoctors = filterDoctors(doctors.length === 0 ? doc : doctors);

//   // Extract unique locations from filteredDoctors
//   const uniqueLocations = filteredDoctors
//     .flatMap(doctor =>
//       doctor.hospitals?.map(hospital => ({
//         lat: hospital.lat,
//         lng: hospital.lng,
//         name: hospital.name,
//         city: hospital.city
//       })) || []
//     )
//     .filter((location, index, self) =>
//       index === self.findIndex(loc => loc.lat === location.lat && loc.lng === location.lng)
//     );

//   return (
//     <>
//       <Nestednavbar />
//       <div className='container-fluid mt-5'>
//         <div className='filterpage-parent'>
//           <button onClick={toggleFilterCanvas} className="btn btn-primary my-3 d-lg-none">
//             Open Filters
//           </button>

//           <div className='row'>
//             <div className="filter-edit col-3 d-none d-lg-block">
//               <Filter onFilterChange={handleFilterChange} initialFilters={filters} />
//             </div>
//             <div className={`doctorMainCard-edit ${isMapExpanded ? 'col-4' : 'col-12 col-lg-6'}`}>
//               <DoctorMainCard isMapExpanded={isMapExpanded} doctors={filteredDoctors} />
//             </div>
//             <div className={`map-edit d-none d-lg-block ${isMapExpanded ? 'col-5 mt-4' : 'col-3'}`}>
//               <MapContainer
//                 expanded={isMapExpanded}
//                 searchInput={searchInput}
//                 onExpandToggle={handleMapExpandToggle}
//                 onSearchInputChange={handleSearchInputChange}
//                 onSearchButtonClick={handleSearchButtonClick}
//                 onResetClick={handleResetClick}
//                 uniqueLocations={uniqueLocations}
//                 onClickOutside={handleMapClose}
//               />
//             </div>
//           </div>
//         </div>

//         <Footer />
//       </div>
//     </>
//   );
// };

// export default FilterPage;


// update map before hirushit bro update :
// import React, { useEffect, useState } from 'react';
// // import Nestednavbar from '../Nestednavbar/Nestednavbar';
// import DoctorMainCard from './DoctorMainCard';
// import Filter from './Filter';
// import './FilterPage.css';
// import MidPartTwo from '../../MidPartTwo';
// import Footer from '../footer/footerrs';
// import Footerr from '../footer/footer';
// import MapContainer from './Mapcontainer';
// import './OffCanvas.css';
// import { fetchFromPatient } from '../../actions/api';
// import Nestednavbar from '../Nestednavbar2/Nestednavbar2';
// import { useLocation } from 'react-router-dom';
// import { useSearch } from '../context/context';

// const FilterPage = () => {
//   const location = useLocation();
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isMapExpanded, setIsMapExpanded] = useState(false);
//   const [searchInput, setSearchInput] = useState('');
//   const [doctors, setDoctors] = useState([]);
//   const [doc, setDoc] = useState([]);
//   const [locations, setLocations] = useState([]);
//   const [responseStatus,setresponseStatus] = useState();
//   const [filters, setFilters] = useState({
//     what: '',
//     where: '',
//     country: '',
//     state: '',
//     city: '',
//     speciality: '',
//     conditions: [],
//     languages: [],
//     gender: '',
//     hospital: "",
//     availability: '',
//     dateAvailability: '',
//     consultation: ''
//   });

//   const { searchData } = useSearch();

//   console.log(searchData,'jkahfkjehkje')

//   useEffect(() => {
//     if (searchData.doctors) {
//       setDoctors(searchData.doctors);
//       setFilters(prevFilters => ({
//         ...prevFilters,
//         what: searchData.what || '',
//         where: searchData.where || ''
//       }));
//     } else if (searchData.error) {
//       console.error(searchData.error);
//       // Handle error display to user
//     } 
//   }, [searchData]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await fetchFromPatient('/doctors');
//       if (response && Array.isArray(response.doctors)) {
//         setDoc(response.doctors);
//         const extractedLocations = response.doctors
//           .filter(doctor => doctor.hospitals && Array.isArray(doctor.hospitals))
//           .flatMap(doctor =>
//             doctor.hospitals
//               .filter(hospital => hospital.lat && hospital.lng)
//               .map(hospital => ({
//                 lat: hospital.lat,
//                 lng: hospital.lng,
//                 name: hospital.name,
//                 city: hospital.city
//               }))
//           );
//         setLocations(extractedLocations);
//         console.log(response.doctors);

//       } else {
//         setLocations([])
//       }
      
//       if(response.status === 200){
//         setresponseStatus("Success");
//       }
//       else if(response.status === 500){
//         setresponseStatus("Failed");
//       }
//       else{
//         setresponseStatus("Pending");
//       }

//     } catch (error) {
//       console.error('Error fetching doctors:', error);
//     }
//   };

//   useEffect(() => {
//       fetchDoctors()
    
//   }, []);


//   const toggleFilterCanvas = () => {
//     setIsFilterOpen(!isFilterOpen);
//   };

//   const handleMapExpandToggle = () => {
//     setIsMapExpanded(!isMapExpanded);
//   };

//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const handleSearchButtonClick = () => {
//     setFilters((prevFilters) => ({ ...prevFilters, what: searchInput }));
//   };

//   const handleFilterChange = (filterData) => {
//     setFilters(filterData);
//   };

//   const handleResetClick = () => {
//     setIsMapExpanded(false);
//     setSearchInput('');

//   };
//   const handleMapClose = () => {
//     setIsMapExpanded(false);
//   };

//   const filterDoctors = (doctors) => {
//     if (!Array.isArray(doctors)) {
//       return [];
//     }

//     return doctors.filter((doctor) => {
//       const getStringValue = (value) => (typeof value === 'string' ? value.toLowerCase().replace(" ", "") : '');

//       const country = getStringValue(doctor.country || '');
//       const state = getStringValue(doctor.state || '');
//       const speciality = (doctor.speciality.length > 0 ? doctor.speciality : []).map(getStringValue);
//       const city = getStringValue(doctor.city || '');
//       const gender = getStringValue(doctor.gender || '');
//       const hospital = doctor.hospitals.length > 0 ? doctor.hospitals.map(hospital => getStringValue(hospital.name)) : [];
//       const availability = getStringValue(doctor.availability || '');
//       const doctorConditions = (doctor.conditions || []).map(getStringValue);
//       const doctorLanguages = (doctor.languages || []).map(getStringValue);
//       const consultation = getStringValue(doctor.consultation || '');
//        // Extract dates from the doctor's time slots
//     const doctorDates = (doctor.timeSlots || []).map((slot) => new Date(slot.date).toISOString().split('T')[0]); 

//     // Convert the filter date to the correct format
//     const filterDate = filters.dateAvailability ? new Date(filters.dateAvailability).toISOString().split('T')[0] : null;


//       const matchesCountry = !filters.country || country === getStringValue(filters.country);
//       const matchesState = !filters.state || state === getStringValue(filters.state);
//       const matchesCity = !filters.city || city === getStringValue(filters.city);
//       const matchesSpeciality = !filters.speciality || speciality.includes(getStringValue(filters.speciality));
//       const matchesGender = !filters.gender || gender === getStringValue(filters.gender);
//       const matchesHospital = !filters.hospital || hospital.includes(getStringValue(filters.hospital));
//       const matchesAvailability = !filters.availability || availability === getStringValue(filters.availability);
//       const matchesConditions = filters.conditions.length === 0 || filters.conditions.every(condition => doctorConditions.includes(getStringValue(condition)));
//       const matchesLanguages = filters.languages.length === 0 || filters.languages.every(language => doctorLanguages.includes(getStringValue(language)));
//       const matchesConsultation = !filters.consultation || consultation === getStringValue(filters.consultation);
 
//     // Check if the doctor's available dates match the selected dateAvailability
//     const matchesDateAvailability = !filterDate || doctorDates.includes(filterDate);

//       return (
//         matchesCountry &&
//         matchesState &&
//         matchesCity &&
//         matchesSpeciality &&
//         matchesGender &&
//         matchesHospital &&
//         matchesAvailability &&
//         matchesConditions &&
//         matchesLanguages &&
//         matchesConsultation &&
//         matchesDateAvailability
//       );
//     });
//   };
//   const filteredDoctors = doctors.length == 0 ? filterDoctors(doc) : filterDoctors(doctors);
//   return (
//     <>
//     <Nestednavbar/>
//       <div className='container-fluid mt-5'>
//         <div className='filterpage-parent'>
//           <button onClick={toggleFilterCanvas} className="btn btn-primary my-3 d-lg-none">
//             Open Filters
//           </button>

//           {/* <div className={`offcanvas left ${isFilterOpen ? 'open' : ''}`}>
//             <button className="closebtn" onClick={toggleFilterCanvas}>&times;</button>
//             <div className="filter-container">
//               <Filter onFilterChange={handleFilterChange} filters={filters} />
//             </div>
//           </div> */}

//           <div className='row'>
//             <div className="filter-edit col-3 d-none d-lg-block">
//             <Filter onFilterChange={handleFilterChange} initialFilters={filters} />

//             </div>
//             <div className={`doctorMainCard-edit ${isMapExpanded ? 'col-4' : 'col-12 col-lg-6'}`}>
//               <DoctorMainCard isMapExpanded={isMapExpanded} doctors={filteredDoctors} location={locations} responseStatus={responseStatus}/>
//             </div>
//             <div className={`map-edit d-none d-lg-block ${isMapExpanded ? 'col-5 mt-4' : 'col-3'}`}>
//               <MapContainer
//                 expanded={isMapExpanded}
//                 searchInput={searchInput}
//                 onExpandToggle={handleMapExpandToggle}
//                 onSearchInputChange={handleSearchInputChange}
//                 onSearchButtonClick={handleSearchButtonClick}
//                 onResetClick={handleResetClick}
//                 uniqueLocations={locations}
//                 onClickOutside={handleMapClose} // Pass handleMapClose function
//                 doctors={filteredDoctors}

//               />
//             </div>
//           </div>
//         </div>


//         <Footer />
//       </div>
//     </>
//   );
// };

// export default FilterPage;

// import React, { useEffect, useState } from 'react';
// import DoctorMainCard from './DoctorMainCard';
// import Filter from './Filter';
// import './FilterPage.css';
// import MapContainer from './Mapcontainer';
// import { fetchFromPatient } from '../../../actions/api';
// import { useSearch } from '../../context/context';
// import { faFilter } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { IoClose } from "react-icons/io5";
// import axios from 'axios';

// const FilterPage = () => {
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [isMapExpanded, setIsMapExpanded] = useState(false);
//   const [searchInput, setSearchInput] = useState('');
//   const [corporates, setCorporates] = useState([]);
//   const [doc, setDoc] = useState([]);
//   const [filtersData, setFiltersData] = useState(null);
//   const [locations, setLocations] = useState([]);
//   const [responseStatus, setResponseStatus] = useState();
//   const [filters, setFilters] = useState({
//     what: '',
//     where: '',
//     country: '',
//     state: '',
//     city: '',
//     speciality: '',
//     conditions: [],
//     languages: [],
//     gender: '',
//     hospital: "",
//     availability: '',
//     dateAvailability: '',
//     consultation: ''
//   });

//   const { searchData } = useSearch();

//   useEffect(() => {
//     if (searchData.corporates) {
//       setCorporates(searchData.corporates);
//       setFilters(prevFilters => ({
//         ...prevFilters,
//         what: searchData.what || '',
//         where: searchData.where || ''
//       }));
//     } else if (searchData.error) {
//       console.error(searchData.error);
//     }
//   }, [searchData]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await fetchFromPatient('/corporate-list');
//       const filterResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/corporate/corporate-list`);
      
//       // Set filters data
//       console.log('Response from backend:', filterResponse.data);  // Logs the response immediately

//       setFiltersData(filterResponse.data);

//       if (response && Array.isArray(response.corporates)) {
//         setCorporates(response.corporates);
//         setDoc(response.corporates);
//         setResponseStatus(response.status === 200 ? "Success" : "Failed");
  
//         // const extractedLocations = response.uniqueLocations.map(location => ({
//         //   lat: location.lat,
//         //   lng: location.lng,
//         //   hospitalName: location.hospitalName,
//         //   city: location.city,
//         //   doctorName: location.doctorName,
//         //   doctorTitle: location.doctorTitle,
//         //   doctorImage: location.doctorImage || '/path/to/default/profile/pic.png',
//         //   doctorId: location.doctorId,
//         //   subscriptionType: location.subscriptionType
//         // }));
  
//         // setLocations(extractedLocations);
//         // console.log('Unique Locations:', extractedLocations);
//       } else {
//         // setLocations([]);
//         setCorporates([]);
//       }
  
//       if (response.status === 200) {
//         setResponseStatus("Success");
//       } else if (response.status === 500) {
//         setResponseStatus("Failed");
//       } else {
//         setResponseStatus("Pending");
//       }
//     } catch (error) {
//       console.error('Error fetching corporates:', error);
//     }
//   };
  
//   useEffect(() => {
//     console.log('Updated filtersData:', filtersData);  // Logs after filtersData is updated
//   }, [filtersData]);  // This effect runs when filtersData changes
  

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const toggleFilterCanvas = () => {
//     setIsFilterOpen(!isFilterOpen);
//   };

//   const handleMapExpandToggle = () => {
//     setIsMapExpanded(!isMapExpanded);
//   };

//   const handleSearchInputChange = (e) => {
//     setSearchInput(e.target.value);
//   };

//   const handleSearchButtonClick = () => {
//     setFilters((prevFilters) => ({ ...prevFilters, what: searchInput }));
//   };

//   const handleFilterChange = (filterData) => {
//     setFilters(filterData);
//   };

//   const handleResetClick = () => {
//     setIsMapExpanded(false);
//     setSearchInput('');

//   };

//   const handleMapClose = () => {
//     setIsMapExpanded(false);
//   };

//   const handleLocationClick = (doctorId) => {
//     if (doctorId) {
//       const filtered = corporates.filter(doctor => doctor._id === doctorId);
//       setCorporates(filtered);
//     } else {
//       fetchDoctors();
//     }
//   };

//   const filterDoctors = (corporates) => {
//     if (!Array.isArray(corporates)) {
//       return [];
//     }

//     // return corporates.filter((doctor) => {
//     //   const getStringValue = (value) => (typeof value === 'string' ? value.toLowerCase().replace(" ", "") : '');

//     //   const country = getStringValue(doctor.country || '');
//     //   const state = getStringValue(doctor.state || '');
//     //   const speciality = (doctor.speciality.length > 0 ? doctor.speciality : []).map(getStringValue);
//     //   const city = getStringValue(doctor.city || '');
//     //   const gender = getStringValue(doctor.gender || '');
//     //   const hospital = doctor.hospitals.length > 0 ? doctor.hospitals.map(hospital => getStringValue(hospital.name)) : [];
//     //   const availability = getStringValue(doctor.availability || '');
//     //   const doctorConditions = (doctor.conditions || []).map(getStringValue);
//     //   const doctorLanguages = (doctor.languages || []).map(getStringValue);
//     //   const consultation = getStringValue(doctor.consultation || '');
//     //   const doctorDates = (doctor.timeSlots || []).map((slot) => new Date(slot.date).toISOString().split('T')[0]);
//     //   const filterDate = filters.dateAvailability ? new Date(filters.dateAvailability).toISOString().split('T')[0] : null;

//     //   const matchesCountry = !filters.country || country === getStringValue(filters.country);
//     //   const matchesState = !filters.state || state === getStringValue(filters.state);
//     //   const matchesCity = !filters.city || city === getStringValue(filters.city);
//     //   const matchesSpeciality = !filters.speciality || speciality.includes(getStringValue(filters.speciality));
//     //   const matchesGender = !filters.gender || gender === getStringValue(filters.gender);
//     //   const matchesHospital = !filters.hospital || hospital.includes(getStringValue(filters.hospital));
//     //   const matchesAvailability = !filters.availability || availability === getStringValue(filters.availability);
//     //   const matchesConditions = filters.conditions.length === 0 || filters.conditions.every(condition => doctorConditions.includes(getStringValue(condition)));
//     //   const matchesLanguages = filters.languages.length === 0 || filters.languages.every(language => doctorLanguages.includes(getStringValue(language)));
//     //   const matchesConsultation = !filters.consultation || consultation === getStringValue(filters.consultation);
//     //   const matchesDateAvailability = !filterDate || doctorDates.includes(filterDate);

//     //   return (
//     //     matchesCountry &&
//     //     matchesState &&
//     //     matchesCity &&
//     //     matchesSpeciality &&
//     //     matchesGender &&
//     //     matchesHospital &&
//     //     matchesAvailability &&
//     //     matchesConditions &&
//     //     matchesLanguages &&
//     //     matchesConsultation &&
//     //     matchesDateAvailability
//     //   );
//     // });
//   };

//   // const filteredDoctors = filterDoctors(corporates);
//   const filteredDoctors = corporates.length === 0 ? filterDoctors(doc) : filterDoctors(corporates);
//   console.log(filtersData);
  

//   return (
//     <>
//       <div className='container-fluid mt-lg-5'>
//         <div className='filterpage-container'>
//           <button onClick={toggleFilterCanvas} className="filterpage-hamburger btn btn-primary my-3 d-lg-none">
//             <FontAwesomeIcon icon={faFilter} />
//           </button>

//           <div className={`filterpage-offcanvas ${isFilterOpen ? 'filterpage-offcanvas-show' : ''}`}>
//             <button className="filterpage-offcanvas-close btn-close" onClick={toggleFilterCanvas}><IoClose /></button>
//             <Filter onFilterChange={handleFilterChange} initialFilters={filtersData} />
//             <div className='d-flex justify-content-center '>
//               <button className="btn btn-primary" onClick={toggleFilterCanvas}>Apply filters</button>
//             </div>
//           </div>
//         </div>

//         <div className='filterpage-parent'>
//           <div className='row'>
//             <div className="filter-edit col-3 d-none d-lg-block">
//               <Filter onFilterChange={handleFilterChange} initialFilters={filtersData} />
//             </div>
//             <div className={`doctorMainCard-edit ${isMapExpanded ? 'col-4' : 'col-12 col-lg-6'}`}>
//               <DoctorMainCard isMapExpanded={isMapExpanded} corporates={corporates} 
//               // location={locations} 
//               responseStatus={responseStatus} />
//             </div>
//             <div className={`map-edit d-none d-lg-block ${isMapExpanded ? 'col-5 mt-4' : 'col-3'}`}>
//               <MapContainer
//                 expanded={isMapExpanded}
//                 searchInput={searchInput}
//                 onExpandToggle={handleMapExpandToggle}
//                 onSearchInputChange={handleSearchInputChange}
//                 onSearchButtonClick={handleSearchButtonClick}
//                 onResetClick={handleResetClick}
//                 // uniqueLocations={locations}
//                 onClickOutside={handleMapClose}
//                 onLocationClick={handleLocationClick}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FilterPage;
