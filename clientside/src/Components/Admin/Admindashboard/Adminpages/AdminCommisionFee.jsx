import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminCommisionFee.css'

const CommissionFeeUpdate = () => {
  const [currentCommissionFee, setCurrentCommissionFee] = useState(null);
  const [adminCommissionFee, setAdminCommissionFee] = useState('');

  // Fetch current commission fee when component mounts
  useEffect(() => {
    const fetchCurrentCommissionFee = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/commission-fee` , {withCredentials:true});
        setCurrentCommissionFee(response.data.currentCommissionFee);
      } catch (error) {
        console.error('Error fetching commission fee:', error);
      }
    };

    fetchCurrentCommissionFee();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/commission-fee`, { adminCommissionFee } , {withCredentials:true});
      window.location.reload(); // Reload to show updated fee
    } catch (error) {
      console.error('Error updating commission fee:', error);
    }
  };

  return (
    <div className="commission-container">
      <h1>Update Commission for Doctors</h1>
      <form onSubmit={handleSubmit} className="commission-form">
        <label htmlFor="adminCommissionFee" className="commission-label">
          Set Commission for All Doctors (%):
        </label>
        <input
          type="number"
          id="adminCommissionFee"
          step="0.1"
          value={adminCommissionFee}
          onChange={(e) => setAdminCommissionFee(e.target.value)}
          className="commission-input"
          required
        />
        <button type="submit" className="commission-submit-btn">Update Commission</button>
      </form>

      <div className="commission-current-fee">
        <h2>Current Commission for Standard Plan:</h2>
        <p><strong>{currentCommissionFee !== null ? `${currentCommissionFee} %` : 'Not set'}</strong></p>
      </div>
    </div>
  );
};

export default CommissionFeeUpdate;
