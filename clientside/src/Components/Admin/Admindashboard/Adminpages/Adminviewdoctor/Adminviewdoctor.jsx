import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adminviewdoctor.css'; // Import the CSS file for the new design
import { RiSearchLine } from 'react-icons/ri'; // Import search icon

const Adminviewdoctor = () => {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/view-doctors`);
                // console.log(response.data);
                setDoctors(response.data.doctors);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleEdit = (doctorId) => {
        navigate(`edit-doctor/${doctorId}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/delete-doctor/${id}`);
            setDoctors(doctors.filter(doctor => doctor._id !== id));
        } catch (error) {
            console.error('Error deleting doctor:', error);
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter doctors based on search query
    const filteredDoctors = doctors.filter(doctor => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        return (
            doctor.name.toLowerCase().includes(lowerCaseSearchQuery) ||
            doctor.email.toLowerCase().includes(lowerCaseSearchQuery)
        );
    });

    return (
        <div className="admin-view-doctor">
            <div className="doctor-head-part-title-search">
                <h2 className="doctor-head-title">Doctors</h2>
                <div className="admin-search-bar">
                    <input
                        type="text"
                        placeholder="Search for doctors..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <RiSearchLine className="admin-search-bar-icon" />
                </div>
            </div>
            <div className="admin-view-doctor-table-container">
                <table className="admin-view-doctor-table">
                    <thead>
                        <tr>
                            <th>Doctor's Name</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDoctors.length === 0 ? (
                            <tr>
                                <td colSpan="4">No doctors available.</td>
                            </tr>
                        ) : (
                            filteredDoctors.map((doctor) => (
                                <tr key={doctor._id}>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                                    <td>
                                        <button
                                            className="admin-view-doctor-edit-button"
                                            onClick={() => handleEdit(doctor._id)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className="admin-view-doctor-delete-button"
                                            onClick={() => handleDelete(doctor._id)}
                                        >
                                            Delete
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

export default Adminviewdoctor;
