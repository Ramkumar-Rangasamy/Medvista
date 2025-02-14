import React, { useEffect, useState } from 'react';
import './admindoctorsubscription.css';
import { RiSearchLine, RiArrowDownSLine } from "react-icons/ri";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdmindoctorSubscription = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState({});
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [statusChanges, setStatusChanges] = useState({});

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/admin/subscriptions`
        );
        setSubscriptions(response.data.doctors);
      } catch (error) {
        console.error("Error fetching subscription details:", error);
      }
    };

    fetchSubscriptionDetails();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    setSubscriptions(
      subscriptions.map(sub => sub._id === id ? { ...sub, subscriptionVerification: newStatus } : sub)
    );
    setStatusChanges({
      ...statusChanges,
      [id]: newStatus,
    });
  };

  const submitStatus = async (id) => {
    const newStatus = statusChanges[id];
    if (newStatus) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/admin/verify-subscription/${id}`,
          { verificationStatus: newStatus }
        );
        console.log(response);
        toast.success('Status updated successfully!');
      } catch (error) {
        console.error("Error updating status:", error);
        toast.error('Failed to update status');
      }
    } else {
      toast.warn("Please select a status");
    }
  };
  

  const openModal = (documents) => {
    setSelectedDocuments(documents);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDocuments({});
    setSelectedDocument(null);
  };

  const viewDocument = (document) => {
    if (!document || !document.data) {
      toast.error('Document not found');
      return;
    }

    try {
      // Convert Base64 to binary data
      const byteCharacters = atob(document.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      // Create a Blob from the binary data
      const blob = new Blob([byteArray], { type: document.contentType });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Open the PDF in a new tab
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error viewing document:', error);
      toast.error('Error opening document');
    }
  };

  const filteredSubscriptions = subscriptions.filter(subscription => {
    if (activeTab !== 'All' && subscription.subscriptionVerification.toLowerCase() !== activeTab) {
      return false;
    }
    if (searchQuery && !subscription.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="admin-subscription">
      <h2 className='admin-subscription-title'>Doctor Subscriptions</h2>
      <div className="admin-dashboard-appointments-tabs-container">
        <div className="admin-dashboard-appointments-tabs">
          <button className={`admin-tab ${activeTab === 'All' ? 'admin-active' : ''}`} onClick={() => setActiveTab('All')}>All</button>
          <button className={`admin-tab ${activeTab === 'verified' ? 'admin-active' : ''}`} onClick={() => setActiveTab('verified')}>Verified</button>
          <button className={`admin-tab ${activeTab === 'pending' ? 'admin-active' : ''}`} onClick={() => setActiveTab('pending')}>Pending</button>
          <button className={`admin-tab ${activeTab === 'rejected' ? 'admin-active' : ''}`} onClick={() => setActiveTab('rejected')}>Rejected</button>
        </div>
        <div className="admin-search-bar">
          <input
            type="text"
            placeholder="Search for subscriptions ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <RiSearchLine
            className="admin-search-bar-icon"
            onClick={() => setSearchQuery(searchQuery.trim())}
          />
        </div>
      </div>
      <div className='admin-subscription-table-container'>
        <table className="Admin-subscription-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Subscription Type</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Documents</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubscriptions.map(({ _id, name, subscriptionType, subscriptionVerification, documents }) => (
              <tr key={_id}>
                <td>{name}</td>
                <td>{subscriptionType}</td>
                <td>
                  <span className={`status-dot ${subscriptionVerification.toLowerCase()}`}></span>
                  {subscriptionVerification}
                </td>
                <td>
                  <div className="admin-select-container">
                    <select
                      className={`admin-status-select ${subscriptionVerification.toLowerCase()}`}
                      value={statusChanges[_id] || subscriptionVerification}
                      onChange={(e) => handleStatusChange(_id, e.target.value)}
                    >
                      <option value="Verified">Verified</option>
                      <option value="Pending">Pending</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                    <RiArrowDownSLine className="arrow-icon" />
                  </div>
                </td>
                <td>
                  <button className='subscription-View' onClick={() => openModal(documents)}>
                    View
                  </button>
                </td>
                <td>
                  <button onClick={() => submitStatus(_id)} className='subscription-submit'>
                    Submit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="adminsubscription-modal-overlay" onClick={closeModal}>
          <div className="adminsubscription-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Document Details</h2>
            {selectedDocument ? (
              <>
                <p>Opening document...</p>
                <button onClick={() => setSelectedDocument(null)} className="adminsubscription-modal-close">
                  Back
                </button>
              </>
            ) : (
              <>
                <p>
                  <strong>Business Proof:</strong>{" "}
                  <button
                    className="subscription-modal-View"
                    onClick={() => viewDocument(selectedDocuments.businessProof)}
                  >
                    View
                  </button>
                </p>
                <p>
                  <strong>Certification Proof:</strong>{" "}
                  <button
                    className="subscription-modal-View"
                    onClick={() => viewDocument(selectedDocuments.certificationProof)}
                  >
                    View
                  </button>
                </p>
                <p>
                  <strong>License Proof:</strong>{" "}
                  <button
                    className="subscription-modal-View"
                    onClick={() => viewDocument(selectedDocuments.licenseProof)}
                  >
                    View
                  </button>
                </p>
              </>
            )}
            <button onClick={closeModal} className="adminsubscription-modal-close">Close</button>
          </div>
        </div>
      )}

      {/* Toast container */}
      <ToastContainer />
    </div>
  );
};

export default AdmindoctorSubscription;
