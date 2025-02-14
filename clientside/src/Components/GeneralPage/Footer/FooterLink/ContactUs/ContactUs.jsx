import React, { useState } from 'react';
import axios from 'axios';
import './ContactUs.css';  
import locationIcon from './location.png';
import mailIcon from './mailIcon.png';
import phoneIcon from './phoneIcon.png';

const ContactUs = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        message: ''
    });


    const [responseMessage, setResponseMessage] = useState('');

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/contact-us`, formData,{ withCredentials: true});
            setResponseMessage(response.data.message); 
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
                message: ''
            });
        } catch (error) {
            setResponseMessage('Error submitting the form');
        }
    };

    return (
        <div className="contact-page">
            <div className="contact-header">
                <div className="container ">
                    <h2>Contact us</h2>
                    <p>We'd love to hear from you</p>
                </div>
   
                <div className="wave">
                    <svg
                        width="100%"
                        height="100%"
                        id="svg"
                        viewBox="0 0 1440 320"
                        xmlns="http://www.w3.org/2000/svg"
                        className="transition duration-300 ease-in-out delay-150"
                    >
                        <path
                            d="M 0,400 L 0,150 C 60.90415664720028,174.6939196152525 121.80831329440056,199.387839230505 180,194 C 238.19168670559944,188.612160769495 293.670903469598,153.14256269323255 376,153 C 458.329096530402,152.85743730676745 567.5080728272072,188.04190999656475 640,195 C 712.4919271727928,201.95809000343525 748.2968052215732,180.6897973205084 807,167 C 865.7031947784268,153.3102026794916 947.3047062864996,147.19890072140157 1014,163 C 1080.6952937135004,178.80109927859843 1132.4843696324288,216.51459979388528 1201,218 C 1269.5156303675712,219.48540020611472 1354.7578151837856,184.74270010305736 1440,150 L 1440,400 L 0,400 Z"
                            stroke="none"
                            strokeWidth="0"
                            fill="#f6f9ff"
                            fillOpacity="1"
                            className="transition-all duration-300 ease-in-out delay-150 path-0"
                        ></path>
                    </svg>
                </div>
            </div>

            {/* Main content */}
            <div className="container contact-container py-5">
                <div className="row">
                    <div className="col-md-4 contact-info">
                        <h4 className='mb-5'>Get in touch</h4>
                        <div className="info-item">
                            <img className='icon' src={locationIcon} alt="locationIcon" />
                            <div>
                                <h6>Address</h6>
                                <p>Compass Building
Al Shohada Road
Al Hamra Industrial Zone-FZ
Ras Al Khaimah, United Arab Emirates</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <img className='icon' src={mailIcon} alt="mailIcon" />
                            <div>
                                <h6>Email</h6>
                                <p>support@medxbay.com
                                </p>
                            </div>
                        </div>
                        {/* <div className="info-item">
                            <img className='icon' src={phoneIcon} alt="phoneIcon" />
                            <div>
                                <h6>Phone number</h6>
                                <p>(219) 555-0114</p>
                            </div>
                        </div> */}
                    </div>

                    <div className="col-md-8 contact-form">
                        <div className='head1'>
                            <h5>Have any questions?</h5>
                        </div>
                        <h5 className='head2'>We're here to help you</h5>
                        
                        {/* Form Submission */}
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="firstName" className='mb-4'>Your name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="lastName" className='mb-4'>Last name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="email" className='mb-4'>Email</label>
                                    <input 
                                        type="email" 
                                        className="form-control" 
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="phoneNumber" className='mb-4'>Phone number</label>
                                    <input 
                                        type="tel" 
                                        className="form-control" 
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message" className='mb-4'>Your message</label>
                                <textarea 
                                    className="form-control" 
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="5"
                                    required 
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit message</button>
                        </form>
                        
<div className='response-contact'> 
                        {responseMessage && <p>{responseMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
