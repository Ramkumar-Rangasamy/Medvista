import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CorporateViewDoctors.css';
import { RiSearchLine } from 'react-icons/ri';
import { TbSquareArrowLeft } from "react-icons/tb";
import { useParams } from 'react-router-dom';

const ViewBooking = () => {
    const [bookings, setBookings] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Get doctorId from sessionStorage
    const {doctorId} = useParams();

    useEffect(() => {
        const fetchBookings = async () => {
            if (!doctorId) {
                console.error("Doctor ID not found ");
                return;
            }

            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BASE_URL}/corporate/doctor/bookings/${doctorId}`,  // Added `/` after BASE_URL
                    { params: { searchQuery }, withCredentials: true }
                );                
                if (response.data.bookings) {
                    setBookings(response.data.bookings);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchBookings();
    }, [doctorId]); // Fetch data whenever doctorId or searchQuery changes

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredBookings = bookings.filter(booking => 
        booking.consultationType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="Corporate-vd-view-doctor">
            <div className="Corporate-vd-doctor-search-head-part">
                <div className='Corporate-vd-doctor-bk-and-title'>
                    <TbSquareArrowLeft className="C-vd-bk-arrow" onClick={() => window.history.back()} />
                    <h2 className="Corporate-vd-book-head-title">View Bookings</h2>
                </div>
                <div className="Corporate-vd-search-bar">
                    <input
                        type="text"
                        placeholder="Search by Consultation or Status..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <RiSearchLine className="Corporate-vd-search-bar-icon" />
                </div>
            </div>
            <div className="Corporate-vd-view-doctor-table-container">
                <table className="Corporate-vd-view-doctor-table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Booking Date</th>
                            <th>Time Slot</th>
                            <th>Consultation</th>
                            <th>Status</th>
                            <th>Hospital</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.length === 0 ? (
                            <tr>
                                <td colSpan="6">No bookings available.</td>
                            </tr>
                        ) : (
                            filteredBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>{booking.patient?.name || 'Unknown'}</td>
                                    <td>{new Date(booking.date).toDateString()}</td>
                                    <td>{booking.time}</td>
                                    <td>{booking.consultationType}</td>
                                    <td>{booking.status}</td>
                                    <td className='Corporate-vd-hospiatl-name'>{booking.hospital?.name || 'Unknown'}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewBooking;
