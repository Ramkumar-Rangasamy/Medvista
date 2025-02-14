import React, { useState, useEffect } from 'react';
import './adminmanagepayments.css';
import { RiSearchLine } from 'react-icons/ri';
import { LiaEditSolid } from 'react-icons/lia';
import { RiArrowDownSLine } from 'react-icons/ri';
import axios from 'axios';

const Adminmanagepayments = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [managePayments, setManagePayments] = useState([]);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editableField, setEditableField] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/manage-payments`, {
          withCredentials: true,
        });
        setManagePayments(response.data.doctors || []);
        console.log(response.data.doctors);

      } catch (error) {
        console.error('Error fetching payments:', error);
        setManagePayments([]);
      }
    };

    fetchPayments();
  }, [searchQuery, activeTab]);

  const filteredPayments = (managePayments || []).filter((payment) => {
    // Safeguard against undefined values
    const subscriptionType = payment.subscriptionType?.toLowerCase() || '';
    const name = payment.name?.toLowerCase() || '';
    const email = payment.email?.toLowerCase() || '';

    if (activeTab !== 'All' && subscriptionType !== activeTab) {
      return false;
    }
    if (
      searchQuery &&
      !(name.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  const handleSearch = () => {
    setSearchQuery(searchQuery.trim());
  };

  const openModal = (payment) => {
    console.log("Opening modal with payment:", payment); // Add this
    setCurrentPayment(payment);
    setIsModalOpen(true);
    setEditableField(null);
  };


  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentPayment(null);
    setEditableField(null);
  };

  const handleIconClick = (field) => {
    setEditableField(field);
  };

  const handleInputChange = (e) => {
    if (editableField) {
      setCurrentPayment({
        ...currentPayment,
        [editableField]: e.target.value,
      });
    }
  };
  console.log(currentPayment);
  const saveChanges = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/admin/update-payments/${currentPayment._id}`,
        {
          tempDoctorFee: currentPayment.totalFees,
          tempDoctorFeeStatus: currentPayment.paymentStatus,
        },
        { withCredentials: true }
      );
      setManagePayments(
        managePayments.map((payment) =>
          payment._id === currentPayment._id ? response.data.doctor : payment
        )
      );
      closeModal();
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="adminpayment">
      <h2 className="adminpayment-title">Manage Payments</h2>
      <div className="admin-dashboard-appointments-tabs-container">
        <div className="admin-dashboard-appointments-tabs">
          <button
            className={`admin-tab ${activeTab === 'All' ? 'admin-active' : ''}`}
            onClick={() => setActiveTab('All')}
          >
            All
          </button>
          <button
            className={`admin-tab ${activeTab === 'standard' ? 'admin-active' : ''}`}
            onClick={() => setActiveTab('standard')}
          >
            Standard
          </button>
          <button
            className={`admin-tab ${activeTab === 'premium' ? 'admin-active' : ''}`}
            onClick={() => setActiveTab('premium')}
          >
            Premium
          </button>
        </div>
        <div className="admin-search-bar">
          <input
            type="text"
            placeholder="Search for payments ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <RiSearchLine className="admin-search-bar-icon" onClick={handleSearch} />
        </div>
      </div>
      <div className="adminpayment-table-container">
        <table className="Adminpayment-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Payment Type</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.name}</td>
                <td>{payment.subscriptionType}</td>
                <td>{payment.email}</td>
                <td>
                  <button className="payment-View" onClick={() => openModal(payment)}>
                    Payment Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentPayment && (
        <div className="adminpayment-modal-overlay" onClick={closeModal}>
          <div className="adminpayment-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="adminpayment-modal-header">
              <h2>Payment Details</h2>
            </div>
            <div className="adminpayment-modal-body">
              <div className="adminpayment-modal-field">
                <label>Total Fees</label>
                <input
                  type="text"
                  value={currentPayment.totalDoctorFee || currentPayment.tempDoctorFee}
                  readOnly
                />
              </div>

              {currentPayment.subscriptionType?.toLowerCase() === 'standard' && (
                <div className="adminpayment-modal-field">
                  <label>Service Charge</label>
                  <div className="adminpayment-input-with-icon">
                    <input
                      type="text"
                      value={currentPayment.serviceCharge}
                      readOnly
                    />
                  </div>
                </div>
              )}

              <div className="adminpayment-modal-field">
                <label>Pending Amount</label>
                <div className="adminpayment-input-with-icon">
                  <input
                    type="text"
                    value={currentPayment.tempDoctorFee || ''}
                    onChange={(e) => setCurrentPayment({
                      ...currentPayment,
                      tempDoctorFee: e.target.value,
                    })}
                    readOnly={editableField !== 'pendingAmount'}
                  />
                  <LiaEditSolid
                    className="adminpayment-input-icon"
                    onClick={() => handleIconClick('pendingAmount')}
                  />
                </div>
              </div>

              <div className="adminpayment-modal-field adminpayment-modal-select-box-container">
                <label>Payment Status</label>
                <select
                  value={currentPayment.tempDoctorFeeStatus}
                  onChange={(e) =>
                    setCurrentPayment({
                      ...currentPayment,
                      tempDoctorFeeStatus: e.target.value,
                    })
                  }
                  className="adminpayment-modal-select-box"
                >
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <RiArrowDownSLine className="adminpayment-modal-arrow-icon" />
              </div>
            </div>

            <div className="adminpayment-modal-footer">
              <button className="adminpayment-savebutton" onClick={saveChanges}>
                Save Changes
              </button>
              <button className="adminpayment-closebutton" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Adminmanagepayments;
