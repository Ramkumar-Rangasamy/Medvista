import React, { useEffect, useState } from 'react';
import "./doctorprofileverification.css";
import doctorprofilesow from "../../../../Assets/doctoprofiletypeone.jpeg";
import insuranceTypeone from "../../../../Assets/metlife.png";
import insuranceTypetwo from "../../../../Assets/insurance-type-2.png";
import dummypdf from "../../../../Assets/dummypdf.pdf";
import testingimage from "../../../../Assets/testingimage.jpeg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RiArrowDownSLine } from "react-icons/ri";
import axios from 'axios';
import { toast } from 'react-toastify';

const Doctorprofileverification = () => {
  const {doctorID} = useParams();
  console.log('useParams ID ' + JSON.stringify(doctorID));
  
  const [doctorData, setDoctorData] = useState(null);
  const [insurances, setInsurances] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [reason, setReason] = useState('');
  const [commissionFee, setCommissionFee] = useState('');
  const [trialPeriod, setTrialPeriod] = useState('60'); // Default trial period
  const [maxTimeSlots, setMaxTimeSlots] = useState('3'); // Default max time slots
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch doctor profile data from the backend using doctorId
    const fetchDoctorData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/view/${doctorID}`);  // Use doctorId in the API call
        setDoctorData(response.data.doctor);
        setInsurances(response.data.insurances);
        console.log(response.data.doctor);
        
      } catch (error) {
        console.error('Error fetching doctor data:', error);
      }
    };
    fetchDoctorData();
  }, [doctorID]);  // Re-fetch if doctorId changes


  // const handleStatusChange = (id, newStatus) => {
  //   setSubscriptions(subscriptions.map(sub => sub.id === id ? { ...sub, status: newStatus } : sub));
  // };
   // Handle verification status change
   const handleStatusChange = (newStatus) => {
    setSelectedStatus(newStatus);
  };
console.log(insurances);

const bufferToBase64 = (buffer) => {
  if (typeof buffer === 'string') {
    return `data:image/jpeg;base64,${buffer}`;
  } else if (buffer?.data && typeof buffer.data === 'string') {
    return `data:${buffer.contentType};base64,${buffer.data}`;
  } else {
    console.error('Unexpected buffer type:', buffer);
    return '';
  }
};
  
  const getImage = (formData) => {
    if (formData?.data?.type === "Buffer") {
      return bufferToBase64(formData.data);
    } else if (typeof formData?.data === "string") {
      return `data:image/jpeg;base64,${formData.data}`;
    } else {
      return "Loading Image";
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      verificationStatus: selectedStatus,
      reason: selectedStatus === 'Not Verified' ? reason : undefined,
      commissionFee: selectedStatus === 'Verified' ? commissionFee : undefined,
      trialPeriod: selectedStatus === 'Verified' ? trialPeriod : undefined,
      maxTimeSlots: selectedStatus === 'Verified' ? maxTimeSlots : undefined,
    };
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/verify/${doctorID}`, payload,{withCredentials:true});
      alert('Verification status updated successfully.');
      // navigate('/admin-doctorprofile');
    } catch (error) {
      console.error('Error updating verification status:', error);
      alert('An error occurred while updating verification status.');
    }
  };
  const openModal = (document) => {
    setSelectedDocument(document);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
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
  return (
    <div className="admin-doctorprofileverification">
      <h2 className="head-title">Doctor Profile Verification</h2>
      <div className="admin-doctorprofileverification-container">
        <div className="admin-doctorprofileverification-header">
          <div className="admin-doctorprofileverification-profile">
            <img
              src={doctorprofilesow}
              alt="Profile"
              className="admin-verification-profile"
            />
          </div>
          <div className="admin-doctorprofileverification-title">
            <h2 className="name-clsn">{doctorData?.name}</h2>
            <p className="about-us-clsn">
            {doctorData?.aboutMe}
            </p>
          </div>
        </div>
          <form className="admin-dp-verification-pl-details" onSubmit={handleSubmit}>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value={doctorData?.title}
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
              Title<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="email"
                name="email"
                value={doctorData?.email}
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
              Email<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="date"
                value= {doctorData?.dateOfBirth}
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
             DOB<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value={doctorData?.gender}
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
              Gender<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value={doctorData?.country}
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
              Country<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value={doctorData?.state}
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
              State<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value={doctorData?.city}
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
              City<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value={doctorData?.availability}
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
              Availability<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value={doctorData?.consultation}
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
              Consultation<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
            {doctorData?.speciality.map((speciality, index) => (
                <input
                  key={index}
                  type="text"
                  className="admin-dp-verification-input"
                  value={speciality}
                  readOnly
                />
              ))}
              <p className="admin-dp-verification-input-placeholder">
                Specialities<span> *</span>
              </p>
              
            </div>
            <div className="admin-dp-verification-pd-itheader admin-dp-verification-pd-itheader-multi-input">
              <p className="admin-dp-verification-input-placeholder">
                Conditions Managed<span> *</span>
              </p>
              {doctorData?.conditions.map((condition, index) => (
                <input
                  key={index}
                  type="text"
                  className="admin-dp-verification-input"
                  value={condition}
                  readOnly
                />
              ))}
            </div>
            <div className="admin-dp-verification-pd-itheader admin-dp-verification-pd-itheader-multi-input">
              <p className="admin-dp-verification-input-placeholder">
                Languages Spoken<span> *</span>
              </p>
              {doctorData?.languages.map((lang, index) => (
                <input
                  key={index}
                  type="text"
                  className="admin-dp-verification-input"
                  value={lang}
                  readOnly
                />
              ))}
            </div>
            <div className="admin-dp-hospitals-verification-details-header">
              <h2>Social Media Handles</h2>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value="https://www.medxbay.com"
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
                Website<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value="https://www.twitter.com"
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
                Twitter<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value="https://www.linkedIn.com"
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
                LinkedIn<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                placeholder="No Data"
                value="https://www.instagram.com"
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
                Instagram<span> *</span>
              </p>
            </div>
            <div className="admin-dp-hospitals-verification-details-header">
              <h2>Subscription Details</h2>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value="Premium"
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
                {doctorData?.subscriptionType}<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="text"
                value="Verified"
                className="admin-dp-verification-input"
                readOnly
              />
              <p className="admin-dp-verification-input-placeholder">
                {doctorData?.subscriptionVerification} <span> *</span>
              </p>
            </div>
            <div className="admin-dp-hospitals-verification-details-header">
              <h2>Hospitals Details</h2>
            </div>
            <div className="admin-dp-verification-pd-itheader admin-dp-verification-pd-itheader-multi-input m-0">
              <p className="admin-dp-verification-input-placeholder">
                Hospital Name<span> *</span>
              </p>
              {doctorData?.hospitals.map((hospital, index) => (
                <input
                  key={`hospital-name-${index}`}
                  type="text"
                  className="admin-dp-verification-input"
                  value={hospital.name}
                  readOnly
                />
              ))}
            </div>
            <div className="admin-dp-verification-pd-itheader admin-dp-verification-pd-itheader-multi-input m-0">
              <p className="admin-dp-verification-input-placeholder">
                Location<span> *</span>
              </p>
              {doctorData?.hospitals.map((hospital, index) => {
                const fullAddress = `${hospital.street}, ${hospital.city}, ${hospital.state}, ${hospital.country}, ${hospital.zip}`;
                return (
                  <input
                    key={`hospital-location-${index}`}
                    type="text"
                    className="admin-dp-verification-input"
                    value={fullAddress}
                    readOnly
                  />
                );
              })}
            </div>
            <div className="admin-dp-hospitals-verification-details-header">
              <h2>Insurances & Awards</h2>
            </div>
            <div className="admin-dp-verification-pd-itheader admin-dp-verification-pd-itheader-multi-input m-0">
              {insurances?.map((insurance, index) => (
                <div key={insurance._id}>
                <img
                  key={`insurance-image-${index}`}
                  src={`data:${insurance.logo.contentType};base64,${insurance.logo.data}`}
                  alt={insurance.name}
                  className="admin-dp-verification-input input-for-image-showing"
                />
                </div>

              ))}
              <p className="admin-dp-verification-input-placeholder">
                Insurance image<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader admin-dp-verification-pd-itheader-multi-input m-0">
              {insurances?.map((insurance, index) => (
                <input
                  key={`insurance-name-${index}`}
                  type="text"
                  value={insurance.name}
                  className="admin-dp-verification-input"
                  readOnly
                />
              ))}
              <p className="admin-dp-verification-input-placeholder">
                Insurance Name<span> *</span>
              </p>
            </div>
            <div className="admin-dp-verification-pd-itheader admin-dp-verification-pd-itheader-multi-input">
              <p className="admin-dp-verification-input-placeholder">
                Awards<span> *</span>
              </p>
              {doctorData?.awards.map((awards, index) => (
                <input
                  key={index}
                  type="text"
                  className="admin-dp-verification-input"
                  value={awards}
                  readOnly
                />
              ))}
            </div>
            <div className="admin-dp-verification-pd-itheader admin-dp-verification-pd-itheader-multi-input">
            {doctorData?.faqs.map((faq, index) => (
              <div key={faq._id} className='mb-3'>
                <input
                  key={index}
                  type="text"
                  className="admin-dp-verification-input"
                  value={faq.question}
                  readOnly
                />
                <input
                  key={index}
                  type="text"
                  className="admin-dp-verification-input"
                  value={faq.answer}
                  readOnly
                />
                </div>
              ))}
              <p className="admin-dp-verification-input-placeholder">
                FAQs<span> *</span>
              </p>
            </div>
            <div className="admin-dp-hospitals-verification-details-header">
  <h2>Documents Proof</h2>
</div>
<div className="admin-dp-verification-documents">
  {Array.isArray(doctorData?.documents) && doctorData.documents.length > 0 ? (
    doctorData.documents.map((document) => (
      <div key={document.id} className="admin-dp-verification-document-item">
        <p>{document.name}</p>
        {viewDocument(document.data)}
        <button onClick={() => openModal(document)}>View</button>
      </div>
    ))
  ) : (
    <p>No documents available</p> // Show a message when no documents are available
  )}
</div>

{isModalOpen && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={closeModal}>&times;</span>
      {selectedDocument?.type === 'pdf' ? (
        <iframe src={selectedDocument.fileUrl} width="100%" height="600" title="Document Preview"></iframe>
      ) : (
        <img src={selectedDocument.fileUrl} alt={selectedDocument.name} />
      )}
    </div>
  </div>
)}


<div className="admin-dp-hospitals-verification-details-header">
            <h2>Verification</h2>
          </div>
          <div className="admin-dp-verification-pd-itheader">
            <input
              type="text"
              name="currentStatus"
              value={doctorData?.verified}
              className="admin-dp-verification-input"
              readOnly
            />
            <p className="admin-dp-verification-input-placeholder">
              Current Verification Status<span> *</span>
            </p>
          </div>
          <div className="admin-dp-verification-pd-itheader">
            <div className="admin-dp-verification-select-box-header">
              <select
                className="admin-dp-verification-select-box-input"
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="Verified">Verified</option>
                <option value="Pending">Pending</option>
                <option value="Not Verified">Not Verified</option>
              </select>
              <RiArrowDownSLine className="admin-dp-verification-select-box-arrow-icon" />
              <p className="admin-dp-verification-input-placeholder">
                Update Verification Status<span> *</span>
              </p>
            </div>
          </div>
          {/* Conditionally render inputs based on selectedStatus */}
          {selectedStatus === 'Not Verified' && (
            <div className="admin-dp-verification-pd-itheader">
              <input
                type="text"
                name="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="admin-dp-verification-input"
                required
              />
              <p className="admin-dp-verification-input-placeholder">
                Reason<span> *</span>
              </p>
            </div>
          )}
          {selectedStatus === 'Verified' && (
            <>
              <div className="admin-dp-verification-pd-itheader">
                <input
                  type="number"
                  name="commissionFee"
                  value={commissionFee}
                  onChange={(e) => setCommissionFee(e.target.value)}
                  className="admin-dp-verification-input"
                  required
                />
                <p className="admin-dp-verification-input-placeholder">
                  Commission Fee (%)<span> *</span>
                </p>
              </div>
              <div className="admin-dp-verification-pd-itheader">
                <input
                  type="number"
                  name="trialPeriod"
                  value={trialPeriod}
                  onChange={(e) => setTrialPeriod(e.target.value)}
                  className="admin-dp-verification-input"
                />
                <p className="admin-dp-verification-input-placeholder">
                  Trial Period (days)<span> *</span>
                </p>
              </div>
              <div className="admin-dp-verification-pd-itheader">
                <input
                  type="number"
                  name="maxTimeSlots"
                  value={maxTimeSlots}
                  onChange={(e) => setMaxTimeSlots(e.target.value)}
                  className="admin-dp-verification-input"
                />
                <p className="admin-dp-verification-input-placeholder">
                  Max Time Slots<span> *</span>
                </p>
              </div>
            </>
          )}
          <div className="admin-dp-verification-pd-button-itheader">
            <button type="submit" className="submit-button">Update</button>
            <Link to="/admin-doctorprofile" className="cancel-button">Close Profile</Link>
          </div>
          </form>
      </div>
    </div>
  );
};

export default Doctorprofileverification;