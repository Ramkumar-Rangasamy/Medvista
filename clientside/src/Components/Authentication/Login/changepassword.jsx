import React, { useState } from 'react';
import './changepassword.css';

import logobrand from '../../Assets/logobrand.png';
import { FaTimes } from "react-icons/fa";

import schedule from '../Assets/schedule.png';
import stethoscope from '../Assets/stethoscope.png';
import meds from '../Assets/meds.png';
import firstaidkit from '../Assets/first-aid-kit.png';
import doctorconsultation from '../Assets/doctor-consultation.png';
import welocome from '../Assets/welocome.gif';
import video from '../Assets/video.png';

// import google from '../../assests/img/google.png'
// import apple from '../../assests/img/apple.png'

// import {useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  // const navigate = useNavigate();
 
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isForgotPassword] = useState(false);



  const validatePassword = (value) => {
    if (value.trim().length < 6) {
      setPasswordError('Password should be at least 6 characters.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setNewPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (event) => {
    const { value } = event.target;
    setConfirmPassword(value);
    if (value !== newPassword) {
      setPasswordError('Passwords do not match.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validatePassword(newPassword) && validatePassword(confirmPassword) && newPassword === confirmPassword) {
      try {
        const token = new URLSearchParams(window.location.search).get('token');
        
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/reset-password`, { 
          token, 
          newPassword, 
          confirmPassword 
        });
        
        if (res.data.success) {
          toast.info('Password reset successful.',{
            position: "top-center" ,
           closeButton: true,
           progressBar: true,
           className: 'toast-sign toast-success',
 
         });
         window.location.href = 'https://medxbay.com'; // Redirect to the desired URL
        } else {
          toast.error(res.data.message || 'Failed to reset password. Please try again.',{
            position: "top-center" ,
           closeButton: true,
           progressBar: true,
           className: 'toast-sign toast-success',
 
         });
        }
      } catch (err) {
        console.error('Error during password reset:', err);
        toast.info('Failed to reset password. Please try again.',{
          position: "top-center" ,
         closeButton: true,
         progressBar: true,
         className: 'toast-sign toast-success',

       });
      }
    } else {
      toast.info('Please correct the errors in the form.',{
        position: "top-center" ,
       closeButton: true,
       progressBar: true,
       className: 'toast-sign toast-success',

     });
    }
  };
    
  return (
    <>
     <div className='login--new-total-container'>
        <div className='login-new--close-custom-container'>
          <button type="button" className="login-new--close-custom" aria-label="Close">
            <FaTimes size='1rem'/>
          </button>
        </div>
        <div className='login-new--container'>
          <ToastContainer />
         
          <div className="login-smile-emoji">
            <div className='login-smile-emoji-container-one'>
              <img src={logobrand} alt="logo" className="login-brand-image-logo" />
              <img src={schedule} alt="schedule" className="login-schedule-emoji" />
              <div className="login-emoji-ring">😇</div>
              <div className="login-speech-bubble-container">
                <div className="login-speech-bubble">
                  <span className="login-typing-animation">
                    Hey! How you doing today🤔?
                  </span>
                </div>
              </div>
              <img src={stethoscope} alt="stethoscope-emoji" className="login-stethoscope-emoji" />
              <img src={meds} alt="meds-emoji" className="login-meds-emoji" />
              <img src={firstaidkit} alt="meds" className="login-firstaidkit-emoji" />
            </div>


            <div className='login-center-container'>
              <div className='login-center-container-head'>
                <span className="login-header-login mb-2">Reset Password</span>{' '}
                <span className="login-header-sub-login"> Change password to your account.</span>
              </div>

              <form onSubmit={handleSubmit} className="form-overall-container-login">
                {!isForgotPassword && (
                  <>
                    <div className="form-group cutom-form-group-login">
                      <label>
                        New Password
                      </label>
                      <input
                        type="password"
                        id="formPassword"
                        placeholder="Enter your Password"
                        className="form-control-custom"
                        value={newPassword}
                        onChange={handlePasswordChange}
                        aria-invalid={!!passwordError}
                      />
                      {passwordError && <span className="text-danger">{passwordError}</span>}
                    </div>

                    <div className="form-group cutom-form-group-login">
                      <label>
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        id="formConfirmPassword"
                        placeholder="Confirm your Password"
                        className="form-control-custom"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        aria-invalid={!!passwordError}
                      />
                      {passwordError && <span className="text-danger">{passwordError}</span>}
                    </div>
                  </>
                )}

                <div className="d-grid gap-2">
                  <button type="submit" className="btn-custom-first">
                    Reset Password
                  </button>
                </div>
              </form>

            </div>  
       
            <div className='login-smile-emoji-container-one'>
              <div className="login-speech-bubble-container-std">
                <div className="login-speech-bubble-std">
                  <span className="login-typing-animation-std">
                    Greetings! 👋 Book your visit <br/>today. 📅
                  </span>
                </div>
              </div>
              <div className="login-handsucking">👋</div>
              <img src={doctorconsultation} alt="meds" className="doctorconsultation-emoji" />
              <img src={welocome} alt="meds" className="welocome-emoji" />
              <img src={video} alt="meds" className="video-emoji" />
            </div>

          </div>
        </div>
      </div>  
    </>
  );
};

export default ChangePassword;