import React, { useState, useEffect,useRef } from 'react';
// import './login.css';
import { Modal, Button, Form } from 'react-bootstrap';
import '../../Authentication/Login/login.css';
import schedule from '../../Authentication/Assets/schedule.png'
import meds from '../../Authentication/Assets/meds.png';
import stethoscope from '../../Authentication/Assets/stethoscope.png';
import scheduletwo from '../../Authentication/Assets/schedule-two.png';
import doctorconsultation from '../../Authentication/Assets/doctor-consultation.png';
import medicalexamsvg from '../../Authentication/Assets/medical.png';
import heartbeat from '../../Authentication/Assets/heart-beat.png';
import brand from '../../Assets/logobrand.png';

import curvedesign from '../../Authentication/Assets/curvedesign.png';
import curvedsigntwo from '../../Authentication/Assets/curvedesign-two.png';

import Typed from 'typed.js';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Provider = ({ show, handleClose,openRegisterModal }) => {

  // const navigate = useNavigate();
  const typedElement = useRef('');
  const typedElementTwo = useRef('');
  const [successMessage, setSuccessMessage] = useState('');

  const [nameError, setNameError] = useState('');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);


  const [emailError, setEmailError] = useState('');



  
  
  const provider = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitDisabled(true);
      try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/submit-lead`, { email, name });
  
        if (res.status === 200) {
          setSuccessMessage('Form submitted successfully!');
          toast.info('Form submitted successfully!');
        }
      } catch (err) {
        if (err.response && err.response.status === 400) {
          toast.info('Email already exists.');
        } else {
          console.error('Error during form submission:', err);
          toast.info('Submission failed. Please try again.');
        }
      } finally {
        setIsSubmitDisabled(false);
      }
    }
  };
  
  


  const validateForm = () => {
    return   validateEmail(email) && validateName(name);
  };


  useEffect(() => {
    if (typedElement.current) {
      const options = {
        strings: ['Greetings! 👋 Book your visit <br>today. 📅'],
        typeSpeed: 50,
        backSpeed: 50,
        showCursor: false,
      };

      const typed = new Typed(typedElement.current, options);

      return () => {
        typed.destroy();
      };
    }
  }, [show]);

  useEffect(() => {
    if (typedElementTwo.current) {
      const optionsTwo = {
        strings: ['Hey! 😊 Hope you\'re well! 🌟'],
        typeSpeed: 50,
        backSpeed: 50,
        showCursor: false,
      };

      const typedTwo = new Typed(typedElementTwo.current, optionsTwo);

      return () => {
        typedTwo.destroy();
      };
    }
  }, [show]);

  const validateEmail = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setEmailError('Email is required.');
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(trimmedValue)) {
      setEmailError('Please enter a valid email address.');
      return false;
    }

    setEmailError('');
    return true;
  };

  const validateName = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setNameError('Name is required.');
      return false;
    }

    if (trimmedValue[0] === ' ') {
      setNameError('Name should not start with a space.');
      return false;
    }
    if (trimmedValue.includes('  ')) {
      setNameError('Name should not have more than 2 consecutive spaces.');
      return false;
    }
    if (/\d/.test(trimmedValue)) {
      setNameError('Name should not contain numbers.');
      return false;
    }
    if (/[^a-zA-Z\s]/.test(trimmedValue)) {
      setNameError('Name should not contain special characters.');
      return false;
    }

  

    if (trimmedValue.length < 3 || trimmedValue.length > 50) {
      setNameError('Name should be between 3 to 50 characters.');
      return false;
    }
  
    setNameError('');
    return true;
  };
  

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    validateEmail(value);
  };
  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    validateName(value);
  };


  
  return (
    <>        <ToastContainer />
    <Modal show={show} onHide={handleClose} centered className="custom-modal">
      <Modal.Title>
        <span className="model-header-login">Thank You</span>{' '}
        <span className="model-header-sub-login"> Please Enter Your Name and Email for more upadtes</span>
      </Modal.Title>
      <button type="button" className="btn-close-custom" aria-label="Close" onClick={handleClose}>
        x
      </button>
      <Modal.Body>
        <div className="smile-emoji">
   
          <img src={brand} alt="logo" className="brand-image-logo" />
          <div className="emoji-ring">😇</div>
          <div className="calender-emoji-container">
            <img src={schedule} alt="meds" className="calender-emoji" />
          </div>
          <img src={meds} alt="meds" className="band-aid-emoji" />
          <img src={stethoscope} alt="meds" className="stethoscope-emoji" />
          <img src={scheduletwo} alt="meds" className="scheduletwo-emoji" />
          <img src={doctorconsultation} alt="meds" className="consultation-emoji" />
          <img src={medicalexamsvg} alt="meds" className="medicalexam-emoji" />
          <div className="hand-emoji">👋</div>
          <img src={heartbeat} alt="meds" className="heartbeat-emoji" />
          <div className='running-container-two'>
            <img src={curvedsigntwo} alt="meds" className="curvedsigntwo" />
            <p className="running-text-two">
              <span ref={typedElement}></span>
            </p>
          </div>
          <div className='running-container'>

          <img src={curvedesign} alt="meds" className="curvedesign" />
          <p className="running-text">
            <span ref={typedElementTwo}></span>
          </p>
          </div>
        </div>
    
     

     <div className="sign-up-button-container"></div>
        <Form  onSubmit={provider} className="form-overall-container-login">

        <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Name"
              className="form-control-custom"
              value={name}
              onChange={handleNameChange}
              isInvalid={!!nameError}
            />
            <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
          </Form.Group>


          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              className="form-control-custom"
              value={email}
              onChange={handleEmailChange}
              isInvalid={!!emailError}
            />
            <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
          </Form.Group>

       
       
       


                <Button variant="primary" type="submit" className="btn-custom login-button-home" disabled={isSubmitDisabled}>
             Submit
                </Button>
              
           
          


        </Form>
        {successMessage && <p>{successMessage}</p>}

      </Modal.Body>
    </Modal>
    </>
  );
};

export default Provider;