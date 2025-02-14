import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminviewpatients.css'; // Import the CSS file for styling
import axios from 'axios';
import { RiSearchLine } from "react-icons/ri";

const Adminviewpatients = () => {
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleEdit = (id) => {
        navigate(`edit-viewpatients/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/delete-patient/${id}`);
            const updatedPatients = patients.filter(patient => patient._id !== id);
            setPatients(updatedPatients);
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/view-patients`,{withCredentials:'true'});
                setPatients(response.data.patients);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatientDetails();
    }, []);

    // Filter patients based on search query
    const filteredPatients = patients.filter((patient) => {
        const lowerCaseSearchQuery = searchQuery.toLowerCase();
        return (
            patient.name.toLowerCase().includes(lowerCaseSearchQuery) ||
            patient.email.toLowerCase().includes(lowerCaseSearchQuery)
        );
    });

    return (
        <div className="admin-view-patient">
            <div className='patient-head-part-title-search'>
                <h2 className='admin-view-patient-title'>Patients</h2>
                <div className="admin-search-bar">
                    <input
                        type="text"
                        placeholder="Search for patients..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                    <RiSearchLine className="admin-search-bar-icon" />
                </div>
            </div>
            <div className="admin-view-patient-table-container">
                <table className="admin-view-patient-table">
                    <thead>
                        <tr>
                            <th>Patient Name</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPatients.map((patient) => (
                            <tr key={patient._id}>
                                <td>{patient.name}</td>
                                <td>{patient.email}</td>
                                <td>
                                    <button
                                        className="admin-view-patient-edit-button"
                                        onClick={() => handleEdit(patient._id)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="admin-view-patient-delete-button"
                                        onClick={() => handleDelete(patient._id)}
                                    >
                                        Delete
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

export default Adminviewpatients;
