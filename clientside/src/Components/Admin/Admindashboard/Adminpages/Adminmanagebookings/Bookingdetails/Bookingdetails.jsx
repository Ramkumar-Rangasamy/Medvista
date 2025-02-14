import React, { useEffect, useState } from 'react';
import './bookingdetails.css';
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const Bookingdetails = () => {
  const navigate = useNavigate(); 
  const { state } = useLocation(); // Retrieve the passed state
  const { id } = useParams(); // Get the booking ID from the URL params
  const [booking, setBooking] = useState(state?.booking || null);

  useEffect(() => {
    console.log("Current booking:", booking); // Log the current booking state
    if (!booking) {
      const fetchBookingDetails = async () => {
        console.log("Fetching booking details..."); // Log before fetching
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/booking-details/${id}`);
          console.log("API response:", response.data); // Log the full response
          setBooking(response.data.booking);
        } catch (error) {
          console.error('Error fetching booking details:', error);
        }
      };
      fetchBookingDetails();
    }
  }, [id, booking]);
  
  if (!booking) {
    return <div>No booking details available.</div>;
  }

  const handleGoBack = () => {
    navigate('/admin-managebookings');
  };

  return (
    <div className="bookingdetails-container">
      <div className="bookingdetails-heading-container">
       <FaArrowAltCircleLeft className='booking-back-arrow' onClick={handleGoBack} />
       <h2 className="bookingdetails-main-heading">View Bookings</h2>
      </div>
      <div className="admin-bookingdetails-scroll">
        <h2 className="bookingdetails-title">Booking Details</h2>
        <div className="bookingdetails-wrapper">
          <div className="bookingdetails-layout">
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Patient Name</label>
              <input className="bookingdetails-input" type="text" value={booking.patientName} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Doctor Name</label>
              <input className="bookingdetails-input" type="text" value={booking.doctorName} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Doctor Email</label>
              <input className="bookingdetails-input" type="email" value={booking.doctorEmail} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Appointment Date</label>
              <input className="bookingdetails-input" type="text" value={booking.appointmentDate} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Appointment Time</label>
              <input className="bookingdetails-input" type="text" value={booking.appointmentTime} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Consultation Type</label>
              <input className="bookingdetails-input" type="text" value={booking.consultationType} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Status</label>
              <input className="bookingdetails-input" type="text" value={booking.status} readOnly />
            </div>
          </div>
        </div>

        <h2 className="bookingdetails-title">Hospital Details</h2>
        <div className="bookingdetails-wrapper">
          <div className="bookingdetails-layout">
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Hospital Name</label>
              <input className="bookingdetails-input" type="text" value={booking.hospital.name} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Street</label>
              <input className="bookingdetails-input" type="text" value={booking.hospital.location.street} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">City</label>
              <input className="bookingdetails-input" type="text" value={booking.hospital.location.city} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">State</label>
              <input className="bookingdetails-input" type="text" value={booking.hospital.location.state} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Country</label>
              <input className="bookingdetails-input" type="text" value={booking.hospital.location.country} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Zip Code</label>
              <input className="bookingdetails-input" type="text" value={booking.hospital.location.zip} readOnly />
            </div>
          </div>
        </div>

        <h2 className="bookingdetails-title">Payment Details</h2>
        <div className="bookingdetails-wrapper">
          <div className="bookingdetails-layout-payment">
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Amount</label>
              <input className="bookingdetails-amount" type="text" value={booking.payment} readOnly />
            </div>
            <div className="bookingdetails-item">
              <label className="bookingdetails-label">Payment Status</label>
              <button className='admin-booking-paid'>{booking.paid ? "Paid" : "Not Paid"}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookingdetails;
