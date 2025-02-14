import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import './CorporateViewDoctors.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CorporateViewDoctors = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    // Get corporateId from sessionStorage
    const corporateId = sessionStorage.getItem('userId');    

    useEffect(() => {
        const fetchDoctors = async () => {
            if (!corporateId) {
                console.error("Corporate ID not found in session storage");
                return;
            }

            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/corporate/${corporateId}/doctors`,{withCredentials:true});
                const {data} = response;                
                    setDoctors(data.doctors);
                
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, [corporateId]);

    const handleViewInsights = (doctorId) => navigate(`/corporate/dashboardpage/corporate-view-doctors/view-insights/${doctorId}`);
    const handleViewBookings = (doctorId) => navigate(`/corporate/dashboardpage/corporate-view-doctors/view-bookings/${doctorId}`);
    const handleViewPatients = (doctorId) => navigate(`/corporate/dashboardpage/corporate-view-doctors/view-doctors-patients/${doctorId}`);

    const handleRemove = async (doctorId) => {
        if (!corporateId) {
            console.error("Corporate ID not found in session storage");
            return;
        }
    
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/corporate/remove-doctor/${doctorId}`,
                {},
                { withCredentials: true }
            );
    
            if (response.data.success) {
                setDoctors(doctors.filter(doctor => doctor._id !== doctorId));
                 toast.info(response.data.message, {
                                    position: "top-right",  // Use the correct string "top-right"
                                });
            } else {
                console.error("Error removing doctor:", response.data.message);
            }
        } catch (error) {
            console.error("Error removing doctor:", error);
        }
    };
    

    const handleSearch = (event) => setSearchQuery(event.target.value);

    const filteredDoctors = doctors.filter(doctor => 
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="Corporate-vd-view-doctor">
            <ToastContainer />
            <div className="Corporate-vd-doctor-search-head-part">
                <h2 className="Corporate-vd-doctor-head-title">View Doctors</h2>
                <div className="Corporate-vd-search-bar">
                    <input
                        type="text"
                        placeholder="Search for doctors..."
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
                            <th>Doctor's Name</th>
                            <th>Email</th>
                            <th>Insights</th>
                            <th>Bookings</th>
                            <th>Patients</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.length === 0 ? (
                            <tr>
                                <td colSpan="6">No doctors available.</td>
                            </tr>
                        ) : (
                            filteredDoctors.map((doctor) => (
                                <tr key={doctor._id}>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                                    <td>
                                        <button className="Corporate-vd-view-doctor-edit-button"
                                            onClick={() => handleViewInsights(doctor._id)}>
                                            View Insights
                                        </button>
                                    </td>
                                    <td>
                                        <button className="Corporate-vd-view-doctor-edit-button"
                                            onClick={() => handleViewBookings(doctor._id)}>
                                            View Bookings
                                        </button>
                                    </td>
                                    <td>
                                        <button className="Corporate-vd-view-doctor-edit-button"
                                            onClick={() => handleViewPatients(doctor._id)}>
                                            View Patients
                                        </button>
                                    </td>
                                    <td>
                                        <button className="Corporate-vd-view-doctor-delete-button"
                                            onClick={() => handleRemove(doctor._id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CorporateViewDoctors;
