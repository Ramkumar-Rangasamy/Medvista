import React, { useEffect, useState } from 'react';
import { RiSearchLine, RiArrowDownSLine } from "react-icons/ri";
import { FaCheckCircle } from 'react-icons/fa';
import axios from 'axios';
import './adminappointments.css';

const DashboardAppointments = () => {
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/view-appointments`);
                setAppointments(response.data.bookings);
            } catch (error) {
                console.error("Error fetching details:", error);
            }
        };

        fetchData();
    }, []);

    const updateStatus = (id, newStatus) => {
        setAppointments(prevAppointments =>
            prevAppointments.map(app =>
                app._id === id ? { ...app, status: newStatus } : app
            )
        );
    };

    const updateOnDatabase = async (id, newStatus) => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/view-appointments/${id}`, { status: newStatus });
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const formatDate = (dateString) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleSearch = () => {
        setSearchQuery(searchQuery.trim());
    };

    const filteredAppointments = appointments.filter(appointment => {
        if (activeTab !== 'All' && appointment.status !== activeTab) {
            return false;
        }
        if (searchQuery && !(
            appointment.doctor?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            appointment.patient?.name.toLowerCase().includes(searchQuery.toLowerCase())
        )) {
            return false;
        }
        return true;
    });

    return (
        <div className="admin-dashboard-appointments">
            <h2 className='admin-manage-title'>Manage Appointments</h2>
            <div className="admin-dashboard-appointments-tabs-container">
                <div className="admin-dashboard-appointments-tabs">
                    <button className={`admin-tab ${activeTab === 'All' ? 'admin-active' : ''}`} onClick={() => setActiveTab('All')}>All</button>
                    <button className={`admin-tab ${activeTab === 'waiting' ? 'admin-active' : ''}`} onClick={() => setActiveTab('waiting')}>Waiting</button>
                    <button className={`admin-tab ${activeTab === 'accepted' ? 'admin-active' : ''}`} onClick={() => setActiveTab('accepted')}>Accepted</button>
                    <button className={`admin-tab ${activeTab === 'rejected' ? 'admin-active' : ''}`} onClick={() => setActiveTab('rejected')}>Rejected</button>
                    <button className={`admin-tab ${activeTab === 'completed' ? 'admin-active' : ''}`} onClick={() => setActiveTab('completed')}>Completed</button>
                </div>
                <div className="admin-search-bar">
                    <input
                        type="text"
                        placeholder="Search for appointments ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <RiSearchLine
                        className="admin-search-bar-icon"
                        onClick={handleSearch}
                    />
                </div>
            </div>
            <div className="admin-manage-appointments-table-container">
                <table className="admin-manage-appointments-table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Patient</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Action</th>
                            <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((appointment) => (
                            <tr key={appointment._id}>
                                <td className='sizing'>{appointment.doctor?.name}</td>
                                <td className='sizing'>{appointment.patient?.name}</td>
                                <td>{formatDate(appointment.date)}</td>
                                <td>{appointment?.time}</td>
                                <td>
                                    <span className={`admin-status-dot ${appointment.status}`}></span>
                                    {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1)}
                                </td>
                                <td>
                                    <div className="admin-manage-appointments-select-container">
                                        <select
                                            className="admin-manage-appointments-status-select"
                                            value={appointment.status}
                                            onChange={(e) => updateStatus(appointment?._id, e.target.value)}
                                        >
                                            <option value="waiting">Waiting</option>
                                            <option value="accepted">Accepted</option>
                                            <option value="rejected">Rejected</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                        <RiArrowDownSLine className="admin-manage-arrow-icon" />
                                    </div>
                                </td>
                                <td>
                                    <button className="admin-manage-update-button" onClick={() => updateOnDatabase(appointment._id, appointment.status)}>
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DashboardAppointments;
