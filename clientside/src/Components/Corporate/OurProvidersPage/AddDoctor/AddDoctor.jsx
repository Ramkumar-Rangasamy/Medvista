import React, { useState } from 'react';
import './adddoctor.css';
import { IoClose } from "react-icons/io5";
import { AiOutlineDoubleRight } from "react-icons/ai";
import axios from 'axios';

const AddDoctor = ({ inviteLinks, show, handleClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Prevent rendering when modal is hidden
  if (!show) return null;

  const handleSave = async () => {
    if (!email) {
      setError('Email is required.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      // Generate the invite link dynamically
      const generatedInviteLink = inviteLinks[0].inviteLink
      // console.log(inviteLinks.inviteLink); // Optional: If you want to show it in the UI
  
      // Send the data to the backend
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/corporate/send-invite`, {
        // name,
        email,
        inviteLink: generatedInviteLink, // Send the generated invite link
      },{withCredentials:true}
    );
  
      alert('Invitation sent successfully');
      handleClose(); // Close the modal after success
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Error sending invitation');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="add-doctor-modal">
      <div className="add-doctor-modal-content">
      <div className="our-providers-close-btn" onClick={handleClose}>
          <IoClose size="1.3rem" className="our-providers-close-icon" />
        </div>
        <h2 className="modal-title">Add Doctor</h2>
        {/* <div className="add-doctor-modal-form-group">
          <label htmlFor="doctor-name">Name</label>
          <input
            id="doctor-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter doctor's name"
          />
        </div> */}
        <div className="add-doctor-modal-form-group">
          <label htmlFor="doctor-email">Email</label>
          <input
            id="doctor-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter doctor's email"
          />
        </div>
        {/* <div className="add-doctor-modal-form-group">
          <label htmlFor="doctor-name">Name</label>
          <input
            id="doctor-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter doctor's name"
          />
        </div> */}
        {error && <p className="error-message">{error}</p>}
        <button
          onClick={handleSave}
          className="add-doctor-modal-save-button"
          disabled={loading}
        >
          {loading ? 'Sending...' : <><AiOutlineDoubleRight /> Send invite</>}
        </button>
      </div>
    </div>
  );
};

export default AddDoctor;
