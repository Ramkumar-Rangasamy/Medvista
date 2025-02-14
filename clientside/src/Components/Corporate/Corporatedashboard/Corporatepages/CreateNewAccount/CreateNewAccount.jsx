import React, { useState } from "react";
import "./CreateNewAccount.css";
import { RiArrowDownSLine } from "react-icons/ri";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const CreateNewAccount = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [isSaving, setIsSaving] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);  // Set saving state to true
    
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/corporate/create-account`, formData, { withCredentials: true });
    
            if (response.status === 201) {
                toast.info(response.data.message, {
                    position: "top-right",  // Use the correct string "top-right"
                });
                setIsSaving(false);  // Set saving state to true

                  // Reset form fields
                  setFormData({
                    name: "",
                    email: "",
                    password: "",
                });
            }
        } catch (error) {
            if (error.response) {
                toast.error(error.response.data.message, {
                    position: "top-right",  // Use the correct string "top-right"
                });
                setIsSaving(false);  // Set saving state to true
            } else {
                console.error("Error:", error);
                toast.error("An unexpected error occurred.", {
                    position: "top-right",  // Use the correct string "top-right"
                });
                setIsSaving(false);  // Set saving state to true
            }
        }
    };
    
    return (
        <div className="CreateNewAccount-form-container">
            <h2 className="CreateNewAccount-title">Create New Account</h2>
            <form onSubmit={handleSubmit} autoComplete="off">
            <ToastContainer />
                <div className="CreateNewAccount-form-input-container">
                    <div className="CreateNewAccount-form-sub-container">
                        <div className="CreateNewAccount-form-input-header">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter Your Name"
                                className="CreateNewAccount-form-input"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                           <p className="CreateNewAccount-form-input-placeholder">
                                {"Name"}
                                <span style={{ color: "red" }}> *</span>
                            </p>
                        </div>

                        {/* <div className="CreateNewAccount-form-input-header CreateNewAccount-select-box-head">
                            <select
                                id="role"
                                name="role"
                                className="CreateNewAccount-form-input CreateNewAccount-select-box-input"
                                value={"doctor"}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Doctor</option>
                                <option value="corporate">Corporate</option>
                                <option value="supplier">Supplier</option>
                                <option value="doctor">Doctor</option>
                            </select>
                            <RiArrowDownSLine className="CreateNewAccount-select-box-arrow-icon" />
                            <p className="CreateNewAccount-form-input-placeholder">
                                Role<span style={{ color: "red" }}> *</span>
                            </p>
                        </div> */}
                    </div>

                        <div className="CreateNewAccount-form-input-header">
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Your Email"
                                className="CreateNewAccount-form-input"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <p className="CreateNewAccount-form-input-placeholder">
                                Email<span style={{ color: "red" }}> *</span>
                            </p>
                        </div>

                        <div className="CreateNewAccount-form-input-header">
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter Your Password"
                                className="CreateNewAccount-form-input"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <p className="CreateNewAccount-form-input-placeholder">
                                Password<span style={{ color: "red" }}> *</span>
                            </p>
                        </div>
                </div>  

                <div className="CreateNewAccount-button-group">
                    <button className="Create-Account-button" type="submit" disabled={isSaving}>
                        <span className="Create-Account-button-text">Create Account</span>
                        {isSaving && <div className="Create-Account-button-spinner-overlay">
                            <div className="Create-Account-button-small-spinner"></div>
                        </div>}
                    </button>

                    <button
                        type="button"
                        className="Create-Back-to-Accounts"
                        onClick={() => {
                            navigate('/corporate/dashboardpage/corporate-view-doctors');
                        }}
                    >
                        Back to Accounts
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNewAccount;
