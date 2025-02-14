import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RiSearchLine } from "react-icons/ri";
import './AdmindoctorProfile.css';

const AdmindoctorProfile = () => {
    const [data, setData] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/doctor-profile-requests`);
            setData(response.data.profileRequests);
        };
        fetchData();
    }, []);

    const handleButtonClick = (doctorId) => {
        navigate(`admin-doctorprofile-verification/${doctorId}`);
    };

    const getStatusClassName = (status) => {
        switch (status) {
            case 'Verified':
                return 'status-verified';
            case 'Pending':
                return 'status-pending';
            case 'Not Verified':
                return 'status-not-verified';
            default:
                return '';
        }
    };

    const filteredData = data.filter((item) => {
        // Filter by status
        if (activeTab !== 'All' && item.verified !== activeTab) {
            return false;
        }
        // Filter by search query
        if (searchQuery && !(
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase())
        )) {
            return false;
        }
        return true;
    });

    return (
        <div className="admin-doctorprofile">
            <h2 className='admin-doctorprofile-title'>Doctor Profile Verification Requests</h2>
            <div className="admin-dashboard-appointments-tabs-container">
                <div className="admin-dashboard-appointments-tabs">
                    <button className={`admin-tab ${activeTab === 'All' ? 'admin-active' : ''}`} onClick={() => setActiveTab('All')}>All</button>
                    <button className={`admin-tab ${activeTab === 'Verified' ? 'admin-active' : ''}`} onClick={() => setActiveTab('Verified')}>Verified</button>
                    <button className={`admin-tab ${activeTab === 'Pending' ? 'admin-active' : ''}`} onClick={() => setActiveTab('Pending')}>Pending</button>
                    <button className={`admin-tab ${activeTab === 'Not Verified' ? 'admin-active' : ''}`} onClick={() => setActiveTab('Not Verified')}>Not Verified</button>
                </div>
                <div className="admin-search-bar">
                    <input
                        type="text"
                        placeholder="Search for doctors ..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <RiSearchLine
                        className="admin-search-bar-icon"
                        onClick={() => setSearchQuery(searchQuery.trim())}
                    />
                </div>
            </div>
            <div className='admin-doctorprofile-table-container'>
                <table className="admin-doctorprofile-table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map(({ _id, name, email, verified }) => (
                            <tr key={_id}>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td className={getStatusClassName(verified)}>{verified}</td>
                                <td>
                                    <button onClick={() => handleButtonClick(_id)} className='admin-doctorprofile-submit'>
                                        View Profile
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdmindoctorProfile;
