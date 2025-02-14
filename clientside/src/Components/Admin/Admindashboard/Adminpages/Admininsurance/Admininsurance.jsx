import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import './Admininsurance.css'; 
import { CiImageOn } from "react-icons/ci";
import { TiPlus } from "react-icons/ti";

Modal.setAppElement('#root');

const Admininsurance = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [insurances, setInsurances] = useState([]);
  const [newInsurance, setNewInsurance] = useState({ name: "", logo: null });

  useEffect(() => {
    const fetchInsuranceDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/insurances`);
        setInsurances(response.data.insurances);
      } catch (error) {
        console.error("Error fetching insurance details:", error);
      }
    };

    fetchInsuranceDetails();
  }, []);

  const openModal = () => setModalIsOpen(true);

  const closeModal = () => {
    setNewInsurance({ name: "", logo: null });
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewInsurance(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewInsurance(prevState => ({
        ...prevState,
        logo: file
      }));
    }
  };

  const handleAddInsurance = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', newInsurance.name);
    if (newInsurance.logo) {
      formData.append('logo', newInsurance.logo);
    }

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/insurance`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/insurances`);
      setInsurances(response.data.insurances);

      closeModal();
    } catch (error) {
      console.error("Error adding insurance:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/insurance/delete/${id}`);
      setInsurances(insurances.filter((insurance) => insurance._id !== id));
    } catch (error) {
      console.error("Error deleting insurance:", error);
    }
  };

  return (
    <div className="admin-insurance">
      <div className="admin-insurance-header">
        <h2>All Insurance</h2>
        <button className="Admin-new-insurance" onClick={openModal}>
          Add New Insurance <TiPlus className="Admin-new-insurance-icon" />
        </button>
      </div>

      <div className="admin-insurance-list">
        {insurances.map((insurance) => (
          <div key={insurance._id} className="admin-insurance-content">
            <div className="admin-insurance-image">
              <img
                src={`data:${insurance.logo.contentType};base64,${insurance.logo.data}`}
                alt={insurance.name}
              />
            </div>
            <p className="admin-insurance-specialist">{insurance.name}</p>
            <button
              className="admin-insurance-delete"
              onClick={() => handleDelete(insurance._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal for adding insurance */}
      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal}
        contentLabel="Add Insurance"
        className="admin-insurance-modal"
        overlayClassName="admin-insurance-modal-overlay"
      >
        <h2>New Insurance Provider</h2>
        <form onSubmit={handleAddInsurance}>
          <div className="admin-insurance-form-group">
            <label>Insurance Name</label>
            <input 
              type="text" 
              name="name" 
              value={newInsurance.name} 
              onChange={handleInputChange}
              placeholder="Enter the Insurance Name" 
              required 
            />
          </div>
          <div className="admin-insurance-form-group">
            <label>Upload Logo</label>
            <input 
              type="file" 
              id="logo-input" 
              style={{ display: 'none' }} 
              onChange={handleFileChange} 
            />
            <label 
              htmlFor="logo-input" 
              className="image-upload-box"
            >
              {newInsurance.logo ? 
                <img 
                  src={URL.createObjectURL(newInsurance.logo)} 
                  alt="Logo" 
                  className="uploaded-image" 
                /> : 
                <div className="image-placeholder">
                  <CiImageOn size={50} />
                  <p>Click to upload</p>
                </div>
              }
            </label>
          </div>
          <div className="admin-insurance-modal-buttons">
            <button type="submit" className="admin-insurance-modal-submit">Add Insurance</button>
            <button type="button" onClick={closeModal} className="admin-insurance-modal-close">Close</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Admininsurance;
