import React, { useState, useEffect, useRef } from "react";
import "./AppointmentPOPOP.css";

// Icons
import { IoClose } from "react-icons/io5";
import { RiArrowLeftSLine, RiArrowRightSLine, RiArrowDownSLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { TbVideo } from "react-icons/tb";

// Images
import Morning from "../Assets/Morning.png";
import Afternoon from "../Assets/Afternoon.png";
import Evening from "../Assets/Evening.png";

import axios from 'axios';
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import moment from "moment";
import { fetchFromDoctor } from "../../../Api";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AppointmentPOPOP = ({ closeEditPopup }) => {

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

  const [showAppointmentDropdown, setShowAppointmentDropdown] = useState(false);
  const [appointmentContainerHeight, setAppointmentContainerHeight] = useState("409px");
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();
  const [totalFees, setTotalFees] = useState();
  const [doctorData, setDoctorData] = useState([]);
  const [profile, setProfile] = useState("");
  const [insurance, setInsurance] = useState([])
  const [selectedDate, setSelectedDate] = useState(0);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [consultationType, setConsultationType] = useState('In-person');
  const [selectedPlace, setSelectedPlace] = useState("");
  const handleInsuranceChange = (event) => {
    setSelectedInsurancePlace(event.target.value);
  };
  const [selectedInsurance, setSelectedInsurancePlace] = useState("");
  const [currencytoBookingData, setCurrencytoBookingData] = useState('usd');
  const [currencies, setCurrencies] = useState([]);
  const handleChange = (event) => {
    setSelectedPlace(event.target.value);
  };
  const { slug } = useParams();
  useEffect(() => {
    document.title = "Doctor-Profile";
    if (slug) {
      const fetchDoctors = async () => {
        try {
          const response = await fetchFromDoctor(`/doctors/${slug}/slots`);  
          const base64String = response.doctor.profilePicture?.data
            ? bufferToBase64(response.doctor.profilePicture.data)
            : "";
  
          setDoctorData(response.doctor);
          setInsurance(response.insurances);
          setProfile(base64String); // ✅ Avoid calling a separate function
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };
  
      fetchDoctors();
    }
  }, [slug]);
  
  const currencyDataApi = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/doctors/${doctorData?.slug}/slots`, {
        withCredentials: true
      });
      setCurrencies(response.data.feesInAllCurrencies);
      setTotalFees(response.data.totalFee);
    } catch (error) {
      console.error("Error fetching doctor's fees:", error);
    }
  };
  useEffect(() => {
    if (doctorData._id) {
      currencyDataApi();
    }
  }, [doctorData._id]);
    
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
  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
  };

  const timeSlots = doctorData.timeSlots || [];
  const datesMap = timeSlots.reduce((acc, slot) => {
    const date = new Date(slot.date).toDateString();
    if (!acc[date]) {
      acc[date] = { day: date, slots: 0, timeSlots: [] };
    }
    acc[date].slots += 1;
    acc[date].timeSlots.push(slot);
    return acc;
  }, {});

  const dates = Object.values(datesMap);

  const groupedSlots = {
    morning: [],
    afternoon: [],
    evening: []
  };


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

  const [errorMessage, setErrorMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [popupMessage, setPopupMessage] = useState(""); // ✅ State for popup message
  const handleBookAppointment = async () => {
    setIsSaving(true);  // Set saving state to true

    const user = sessionStorage.getItem('loggedIn');

    if (!user) {
      setIsSaving(false);
      setPopupMessage("⚠️ Please log in before booking.");
      return;
    }

    if (consultationType === 'In-person' && !selectedPlace) {
      setIsSaving(false);
      setPopupMessage("⚠️ Please select a hospital for In-person consultation.");
      return;
    }
    setErrorMessage(''); // Clear error if validation passes

    try {
      const selectedDay = dates[selectedDate];
      const bookingData = {
        doctorId: doctorData._id,
        date: moment(selectedDay.day).format('YYYY-MM-DD'),
        startTime: selectedTimeSlot,
        consultationType,
        hospital: consultationType === 'In-person' ? selectedPlace : null,
        currency: consultationType === 'Video call' ? currencytoBookingData : null
      };

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/patient/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(bookingData),
        credentials: 'include'
      });

      const result = await response.json();
      // console.log(result.url);
      if (response.status === 200) {
        if (consultationType === "Video call" && result.url) {
          window.open(result.url);
          setIsSaving(false);  // Reset saving state after the process is done
          setPopupMessage("Payment Initiated.")
          // if(response){
          //   setErrorMessage("Booking successfully completed .")
            
          // }
        } else {
          closeEditPopup();
          setIsSaving(false);  // Reset saving state after the process is done
          toast.info('Booking successful.', {
            className: 'toast-center',
            closeButton: true,
            progressBar: true,
          });
          setPopupMessage("Booking successful.")
          navigate('/profile/userprofile/manage/appointments');
        }
      } else {
        closeEditPopup();
        toast.error('Unexpected server response. Please try again.', {
          className: 'toast-center toast-fail',
          closeButton: true,
          progressBar: true,
        });
        setIsSaving(false);  // Reset saving state after the process is done
      }
    }
    catch (error) {
      closeEditPopup();
      console.error('Error booking appointment:', error.message);
      toast.info('Error booking appointment. Please try again.', {
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
  };

  const handleConsultationTypeChange = async (type) => {
    setConsultationType(type);


    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/doctors/${doctorData?.slug}/slots`, {
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
  return (
    <div className="AppointmentPOPOP-container">
      <ToastContainer/>
      <div className="AppointmentPOPOP-content">
        <div className="AppointmentPOPOP-close-btn-container" onClick={closeEditPopup}>
          <IoClose size="1.3rem" className="AppointmentPOPOP-close-btn-icon" />
        </div>
        <h2 className="AppointmentPOPOP-title">Book Appointment</h2>

        <div className="APOPOP-general-container">
          {/* Consultation Type */}
          <div className="APOPOP-consultation-selection">
            <button
              className={`APOPOP-consultation-btn ${consultationType === "In-person" ? "active" : ""}`}
              onClick={() => handleConsultationTypeChange("In-person")}
            >
              <FaUser className="APOPOP-consultation-icon" /> In-person
            </button>
            
            <button
              className={`APOPOP-consultation-btn ${consultationType === "Video call" ? "active" : ""}`}
              onClick={() => setConsultationType("Video call")}
            >
              <TbVideo className="APOPOP-consultation-icon" /> Video consultation
            </button>

            {/* Currency Dropdown for Video Consultation */}
            {consultationType === "Video call" && doctorData.doctorFee && (
              <div className="APOPOP-dropdown-container ml-3">
                <label className="APOPOP-dropdown-label">Select Currency:</label>
                <select
                  className="APOPOP-dropdown"
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

          

          {/* Select Place */}
          <div className="APOPOP-select-box-group-container">
            <label htmlFor="Place">Select Place</label>
            <select
              id="Place"
              className="APOPOP-select-box"
              value={selectedPlace}
              onChange={handleChange}
              required
            >
              <option value="">
                Select Place
              </option>
              {doctorData.hospitals?.map((i, index) => (
                <option key={i._id} value={i._id}>{i.name}</option>
              ))}
            </select>
            <RiArrowDownSLine className="APOPOP-select-box-arrow-icon" />
          </div>

          {/* Select Insurance Plan */}
          <div className="APOPOP-select-box-group-container">
            <label htmlFor="InsurancePlan">Select Insurance Plan</label>
            <select
              id="InsurancePlan"
              className="APOPOP-select-box"
              value={selectedInsurance}
              onChange={handleInsuranceChange}
            >
              <option>Select Insurance Plan</option>
              {insurance.map(i => (
                <option key={i._id} value={i._id}>{i.name}</option>
              ))}
            </select>
            <RiArrowDownSLine className="APOPOP-select-box-arrow-icon" />
          </div>

          {/* Date & Slots */}
          <div className="APOPOP-date-total-container">
            <h2>Select date & slot</h2>
            <div className="APOPOP-date-sub-container">
              <button
                className={`APOPOP-arrow-button ${startIndex === 0 ? "disabled" : ""}`}
                onClick={showPrev}
                disabled={startIndex === 0}
              >
                <RiArrowLeftSLine className="APOPOP-arrow-icon" />
              </button>

              {dates.slice(startIndex, startIndex + 3).map((date, index) => (
                <div
                  key={index}
                  className={`APOPOP-date-button ${index + startIndex === selectedDate ? "active" : ""}`}
                  onClick={() => setSelectedDate(index + startIndex)}
                >
                  <span>{date?.day}</span>
                  <span>{date?.slots} Slots Available</span>
                </div>
              ))}

              <button
                className={`APOPOP-arrow-button ${startIndex + 3 >= dates.length ? "disabled" : ""}`}
                onClick={showNext}
                disabled={startIndex + 3 >= dates.length}
              >
                <RiArrowRightSLine className="APOPOP-arrow-icon" />
              </button>
            </div>

            {/* Scroll Bar with dynamic width */}
            <div className="underline-doctor">
              <div
                className="underline-doctor-active"
                style={{
                  left: `calc(100% / ${3} * ${selectedDate - startIndex})`,
                  width: `calc(100% / ${3})`
                }}
              ></div>
            </div>

          </div>

          {/* Time Slots */}
          {/* <div className="APOPOP-time-slots">
            {["Morning", "Afternoon", "Evening"].map((session, index) => {
              const timeSlots =
                session === "Morning"
                  ? ["09:30 AM", "10:30 AM", "11:30 AM", "12:30 PM"]
                  : session === "Afternoon"
                  ? ["01:30 PM", "02:30 PM", "03:30 PM", "04:30 PM"]
                  : ["05:30 PM", "06:30 PM", "07:30 PM", "08:30 PM"];

              return (
                <div className="APOPOP-slot-group" key={index}>
                  <span className="APOPOP-slot-header">
                    {session === "Morning" && <img src={Morning} alt="Morning Icon" />}
                    {session === "Afternoon" && <img src={Afternoon} alt="Afternoon Icon" />}
                    {session === "Evening" && <img src={Evening} alt="Evening Icon" />}
                    {session}
                  </span>
                  <div className="APOPOP-slot-row">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        className={selectedSlot === time ? "active" : ""}
                        onClick={() => handleSlotChange(time)}
                      >
                        {time}
                      </button>
                    ))}
                    
                  </div>
                </div>
              );
            })}
          </div> */}

          {dates[selectedDate] && (
            <div className="APOPOP-time-slots">
              <div className="APOPOP-slot-group">
                <img src={Morning} alt="Morning Icon" />
                <h6>Morning</h6>
                <div className="APOPOP-slot-row">
                  {groupedSlots.morning.map((slot, index) => (
                    <button
                      key={`morning-${index}`}
                      className={selectedTimeSlot === slot ? "active" : ""}
                      onClick={() => handleTimeSlotClick(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div className="APOPOP-slot-group">
                <img src={Afternoon} alt="Afternoon Icon" />
                <h6>Afternoon</h6>
                <div className="APOPOP-slot-row">
                  {groupedSlots.afternoon.map((slot, index) => (
                    <button
                      key={`${index}`}
                      className={selectedTimeSlot === slot ? "active" : ""}
                      onClick={() => handleTimeSlotClick(slot)}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <div className="APOPOP-slot-group">
                <img src={Evening} alt="Evening Icon" />
                <h6>Evening</h6>
                <div className="APOPOP-slot-row">
                  {groupedSlots.evening.map((slot, index) => (
                    <button
                      key={`evening-${index}`}
                      className={selectedTimeSlot === slot ? "active" : ""}
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
              <button className="AppointmentPOPOP-savebutton" type="button" onClick={handleBookAppointment} disabled={isSaving}>
                <span className="AppointmentPOPOP-savebutton-text">Book Now</span>
                {isSaving && <div className="AppointmentPOPOP-spinner-overlay">
                  <div className="AppointmentPOPOP-small-spinner"></div>
                </div>}
              </button>
              {errorMessage && <div className="AppointmentPOPOP-custom-error">{errorMessage}</div>}
            </div>
          )}
        </div>
      </div>
      {/* Popup Message Modal */}
      {popupMessage && (
        <div className="APOPOP-popup-overlay">
          <div className="APOPOP-popup-content">
            <p>{popupMessage}</p>
            <button onClick={() => setPopupMessage("")}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentPOPOP;
