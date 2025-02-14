import React, { useEffect, useState } from 'react';
import './adminmanagebookings.css';
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

const Adminmanagebooking = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/bookings`);
        // console.log('Fetched bookings:', response.data); // Log the full response to confirm structure
        if (Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
        } else {
          console.error('Bookings data is not an array');
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
  
    fetchBookings();
  }, []);

  const filteredBookings = (Array.isArray(bookings) ? bookings : []).filter(booking => {
    const consultationType = booking.consultationType?.toLowerCase() || '';
    const patientName = booking.patientName?.toLowerCase() || '';
    const doctorName = booking.doctorName?.toLowerCase() || '';
    const doctorEmail = booking.doctorEmail?.toLowerCase() || '';

    const matchesTab = activeTab === 'All' || consultationType === activeTab;
    const matchesSearch = !searchQuery ||
      patientName.includes(searchQuery.toLowerCase()) ||
      doctorName.includes(searchQuery.toLowerCase()) ||
      doctorEmail.includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const handleSearch = () => {
    setSearchQuery(searchQuery.trim());
  };

  const handleViewDetails = (booking) => {
    navigate(`admin-viewbookings/${booking._id}`, { state: { booking } });
  };

  return (
    <div className="admin-bookings">
      <h2 className='admin-bookings-title'>Manage Bookings</h2>
      <div className="admin-dashboard-appointments-tabs-container">
        <div className="admin-dashboard-appointments-tabs">
          <button className={`admin-tab ${activeTab === 'All' ? 'admin-active' : ''}`} onClick={() => setActiveTab('All')}>All</button>
          <button className={`admin-tab ${activeTab === 'in-person' ? 'admin-active' : ''}`} onClick={() => setActiveTab('in-person')}>In-Person</button>
          <button className={`admin-tab ${activeTab === 'video call' ? 'admin-active' : ''}`} onClick={() => setActiveTab('video call')}>Video Call</button>
        </div>
        <div className="admin-search-bar">
          <input
            type="text"
            placeholder="Search for bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <RiSearchLine
            className="admin-search-bar-icon"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className='admin-bookings-table-container'>
        <table className="Admin-bookings-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Doctor Email</th>
              <th>Date</th>
              <th>Consultation Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.patientName}</td>
                  <td>{booking.doctorName}</td>
                  <td>{booking.doctorEmail}</td>
                  <td>{booking.date ? format(new Date(booking.date), 'dd/MM/yyyy') : 'N/A'}</td> {/* Format date */}
                  <td>{booking.consultationType}</td>
                  <td>
                    <button className='admin-bookings-View' onClick={() => handleViewDetails(booking)}>
                      view details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Adminmanagebooking;
