import React, { useEffect, useState, useRef } from 'react';
import './editviewpatient.css'; // Use the CSS file from your first example
import { FaPlusCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditPatient = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const lastContactRef = useRef(null);
    const fileInputRef = useRef(null);

    const [patientData, setPatientData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        dateOfBirth: '',
        address: '',
        insuranceProvider: '',
        policyNumber: '',
        emergencyContacts: [],
        profilePicture: null,
    });

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/edit-patient/${id}`);
                const data = response.data.patient;
                setPatientData({
                    ...data,
                    dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : '',
                    emergencyContacts: data.emergencyContacts || [],
                });
            } catch (error) {
                console.error('Error fetching patient details:', error);
            }
        };
        fetchPatientDetails();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPatientData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setPatientData(prevData => ({ ...prevData, profilePicture: e.target.files[0] }));
    };

    const handleEmergencyContactChange = (index, field, value) => {
        const newContacts = [...patientData.emergencyContacts];
        newContacts[index][field] = value;
        setPatientData(prevData => ({ ...prevData, emergencyContacts: newContacts }));
    };

    const handleAddContact = () => {
        setPatientData(prevData => ({
            ...prevData,
            emergencyContacts: [...prevData.emergencyContacts, { name: '', relationship: '', phone: '', email: '' }],
        }));
        setTimeout(() => {
            if (lastContactRef.current) {
                lastContactRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const handleRemoveContact = (index) => {
        const newContacts = [...patientData.emergencyContacts];
        newContacts.splice(index, 1);
        setPatientData(prevData => ({ ...prevData, emergencyContacts: newContacts }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isoDateOfBirth = new Date(patientData.dateOfBirth).toISOString();
    
        try {
            let payload;
    
            if (patientData.profilePicture) {
                // Use FormData if an image is included
                const formData = new FormData();
                formData.append('name', patientData.name);
                formData.append('email', patientData.email);
                formData.append('phoneNumber', patientData.phoneNumber);
                formData.append('dateOfBirth', isoDateOfBirth);
                formData.append('address', patientData.address);
                formData.append('insuranceProvider', patientData.insuranceProvider);
                formData.append('policyNumber', patientData.policyNumber);
                formData.append('profilePicture', patientData.profilePicture);
    
                // Append emergency contacts to the form data
                patientData.emergencyContacts.forEach((contact, index) => {
                    formData.append(`emergencyContacts[${index}][name]`, contact.name);
                    formData.append(`emergencyContacts[${index}][phone]`, contact.phone);
                    formData.append(`emergencyContacts[${index}][relationship]`, contact.relationship);
                });
    
                payload = formData;
            } else {
                // If no image is uploaded, use JSON format
                payload = {
                    ...patientData,
                    dateOfBirth: isoDateOfBirth,
                };
            }
    
            await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/update-patient/${id}`, payload, {
                headers: patientData.profilePicture
                    ? { 'Content-Type': 'multipart/form-data' }
                    : { 'Content-Type': 'application/json' },
            });
    
            // Show success message
            toast.success('Patient updated successfully!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
    
            // Navigate back after a delay
            setTimeout(() => {
                navigate('/admin-viewpatients');
            }, 3000);
        } catch (error) {
            console.error('Error updating patient details:', error);
            // Show error message
            toast.error('Error updating patient details!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    

    return (
        <div className="admin-edit-patient">
            <h2>Edit Patient Profile</h2>
            <form className="admin-edit-patient-container" onSubmit={handleSubmit}>
                <div className="admin-edit-patient-header">
                    <input
                        type="text"
                        name="name"
                        value={patientData.name}
                        className="admin-edit-patient-input"
                        onChange={handleInputChange}
                    />
                    <p className="admin-edit-patient-input-placeholder">
                        Name<span style={{ color: "red" }}> *</span>
                    </p>
                </div>
                <div className="admin-edit-patient-header">
                    <input
                        type="email"
                        name="email"
                        value={patientData.email}
                        className="admin-edit-patient-input"
                        onChange={handleInputChange}
                    />
                    <p className="admin-edit-patient-input-placeholder">
                        Email<span style={{ color: "red" }}> *</span>
                    </p>
                </div>
                <div className="admin-edit-patient-header">
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={patientData.phoneNumber}
                        className="admin-edit-patient-input"
                        onChange={handleInputChange}
                    />
                    <p className="admin-edit-patient-input-placeholder">
                        Phone Number<span style={{ color: "red" }}> *</span>
                    </p>
                </div>
                <div className="admin-edit-patient-header">
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={patientData.dateOfBirth}
                        className="admin-edit-patient-input"
                        onChange={handleInputChange}
                    />
                    <p className="admin-edit-patient-input-placeholder">
                        Date of Birth<span style={{ color: "red" }}> *</span>
                    </p>
                </div>
                <div className="admin-edit-patient-header">
                    <input
                        type="text"
                        name="address"
                        value={patientData.address}
                        className="admin-edit-patient-input"
                        onChange={handleInputChange}
                    />
                    <p className="admin-edit-patient-input-placeholder">
                        Address<span style={{ color: "red" }}> *</span>
                    </p>
                </div>
                <div className="admin-edit-patient-header">
                    <input
                        type="text"
                        name="insuranceProvider"
                        value={patientData.insuranceProvider}
                        className="admin-edit-patient-input"
                        onChange={handleInputChange}
                    />
                    <p className="admin-edit-patient-input-placeholder">
                        Insurance Provider<span style={{ color: "red" }}> *</span>
                    </p>
                </div>
                <div className="admin-edit-patient-header">
                    <input
                        type="text"
                        name="policyNumber"
                        value={patientData.policyNumber}
                        className="admin-edit-patient-input"
                        onChange={handleInputChange}
                    />
                    <p className="admin-edit-patient-input-placeholder">
                        Policy Number<span style={{ color: "red" }}> *</span>
                    </p>
                </div>
                <div className="admin-edit-patient-header emergency-container">
                    <p className="emergency-label">
                        Emergency Contacts
                        <FaPlusCircle className="admin-edit-patient-add-icon" onClick={handleAddContact} />
                        <span style={{ color: "red" }}> *</span>
                    </p>
                    {patientData.emergencyContacts.map((contact, index) => (
                        <div
                            key={index}
                            className="admin-edit-patient-contact-row"
                            ref={index === patientData.emergencyContacts.length - 1 ? lastContactRef : null}
                        >
                             <input
                                type="text"
                                placeholder="Name"
                                value={contact.name}
                                className="admin-edit-patient-contact-input"
                                onChange={(e) => handleEmergencyContactChange(index, 'name', e.target.value)}
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={contact.phone}
                                className="admin-edit-patient-contact-input"
                                onChange={(e) => handleEmergencyContactChange(index, 'phone', e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Relationship"
                                value={contact.relationship}
                                className="admin-edit-patient-contact-input"
                                onChange={(e) => handleEmergencyContactChange(index, 'relationship', e.target.value)}
                            />
                            <button
                                type="button"
                                className="admin-edit-patient-remove-button"
                                onClick={() => handleRemoveContact(index)}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="admin-edit-patient-file">
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="admin-edit-patient-file-input"
                        onChange={handleFileChange}
                    />
                    <p className="admin-edit-patient-file-name">{patientData.profilePicture?.name}</p>
                    <div className="admin-edit-patient-choose-file" onClick={() => fileInputRef.current.click()}>
                        <span>Choose File</span>
                    </div>
                    <p className="admin-edit-patient-input-placeholder">
                        Profile Picture<span style={{ color: "red" }}> *</span>
                    </p>
                </div>
                <div className="admin-edit-patient-button-header">
                    <button type="submit" className="submit-button">Update Patient</button>
                    <button type="button" className="cancel-button" onClick={() => navigate('/Patientprofile')}>
                        Cancel
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default EditPatient;
