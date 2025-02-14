import React, { useState, useEffect} from 'react';
import './login.css';

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

import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginCard = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState('');
  
  const [password, setPassword] = useState('');

  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [emailError, setEmailError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const login = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitDisabled(true); 
      
      try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/login`, 
          { email, password }, 
          { withCredentials: true }
        );
        
        if (res.data.success) {
          const { user } = res.data;
          const { role, _id: userId, email: userEmail, subscriptionType, subscriptionVerification, trialEndDate } = user;
          
          sessionStorage.setItem('userId', userId);
          sessionStorage.setItem('userEmail', userEmail);
          sessionStorage.setItem('role', role);
          sessionStorage.setItem('loggedIn', 'true');
          sessionStorage.setItem('subscriptionType', subscriptionType || 'none');
          sessionStorage.setItem('subscriptionVerification', subscriptionVerification || 'not verified');
          sessionStorage.setItem('trialEndDate', trialEndDate || 'not set');
          
          toast.info("Login successful!", {
            position: "top-center",
            closeButton: true,
            progressBar: true,
            className: 'toast-sign toast-success',
          });
          
          setTimeout(() => {
            switch (role) {
              case 'doctor':
                navigate('/doctorprofile/dashboardpage/start-dashboard');
                break;
              case 'patient':
                navigate('/profile/userprofile/');
                break;
              case 'supplier':
                navigate('/OurProducts');
                break;
              case 'corporate':
                navigate('/OurProviders');
                break;
              case 'admin':
                navigate('/admin/dashboardpage/');
                break;
              default:
                alert('Unexpected role.');
                break;
            }
            
            setEmail('');
            setPassword('');
            // handleClose();
          }, 1000);
        }
        
      } catch (err) {

        if (err.response && err.response.data && err.response.data.message) {
          if (err.response.data.message === 'User does not exist') {
            toast.info("User does not exist.", {
              position: "top-center",
              closeButton: true,
              progressBar: true,
              className: 'toast-sign toast-error',
            });
          } else if (err.response.data.message === 'Password is incorrect') {
            toast.info("Password is incorrect.", {
              position: "top-center",
              closeButton: true,
              progressBar: true,
              className: 'toast-sign toast-error',
            });
          } else if (err.response.data.message === 'Please verify your email before logging in.') {
            toast.info("Please verify your email before logging in.", {
              position: "top-center",
              closeButton: true,
              progressBar: true,
              className: 'toast-sign toast-error',
            });
          } else {
            toast.info("Login failed. Please try again.", {
              position: "top-center",
              closeButton: true,
              progressBar: true,
              className: 'toast-sign toast-error',
            });
          }
        } else {
          toast.info("Login failed. Please try again.", {
            position: "top-center",
            closeButton: true,
            progressBar: true,
            className: 'toast-sign toast-error',
          });
        }
      } finally {
        setIsSubmitDisabled(false); 
      }
    }
  };
  
  
  
  const forgetPassword = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setIsSubmitDisabled(true); 
      try {
        const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/forgot-password`, { email });
        if (res.data.success) {
          toast.info('Password reset email sent successfully.', { 
            position: "top-center" ,
            closeButton: true,
            progressBar: true,
            className: 'toast-sign toast-success',

          });
          setIsForgotPassword(false);
        } else {
          toast.info(res.data.message || 'Failed to send reset email. Please try again.', { position: "top-center" });
        }
      } catch (err) {
        console.error('Error during password reset:', err);
        toast.info('Failed to send reset email. Please try again.', { 
          position: "top-center" ,
          closeButton: true,
          progressBar: true,
          className: 'toast-sign toast-success',
        });
      } finally {
        setIsSubmitDisabled(false); 
      }
    } else {
      toast.info('Please enter a valid email address.', {
        position: "top-center" , 
        closeButton: true,
        progressBar: true,
        className: 'toast-sign toast-success',
       });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    const name = urlParams.get('name');
    const id = urlParams.get('id');
    const email = urlParams.get('email');
    const userSubscriptionType = urlParams.get('userSubscriptionType');
    const userSubscriptionVerification = urlParams.get('userSubscriptionVerification');
  
    console.log('Role:', role);
    console.log('Name:', name);
    console.log('ID:', id);
    console.log('Email:', email);
    console.log('Subscription Type:', userSubscriptionType);
    console.log('Subscription Verification:', userSubscriptionVerification);
  
    if (role && name && id) {
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userName', name);
      sessionStorage.setItem('userId', id);
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('subscriptionType', userSubscriptionType);
      sessionStorage.setItem('subscriptionVerification', userSubscriptionVerification);
      
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);
  
  // const handleGoogleSignIn = (role) => {
  //   setIsLoading(true);
  //   const url = role === 'patient'
  //     ? `${process.env.REACT_APP_BASE_URL}/auth/google/patient?state=${JSON.stringify({ role })}`
  //     : `${process.env.REACT_APP_BASE_URL}/auth/google/doctor?state=${JSON.stringify({ role })}`;
  
  //   window.location.href = url;
  // };
  

  const validateForm = () => {
    return   validateEmail(email) && validatePassword(password);
  };


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

  const validatePassword = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setPasswordError('Password is required.');
      return false;
    }

    // if (trimmedValue.length < 6) {
    //   setPasswordError('Password should be at least 6 characters.');
    //   return false;
    // }

    setPasswordError('');
    return true;
  };
  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    validateEmail(value);
  };
  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    validatePassword(value);
  };


  
  return (
    <>
     <div className='login-new--total-container'>
        <div className='login-new--close-custom-container'>
          <button type="button" className="login-new--close-custom" aria-label="Close">
            <Link to='/'>
             <FaTimes size='1rem'/>
            </Link>
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
                <span className="login-header-login">Sign In</span>{' '}
                <span className="login-header-sub-login"> Sign In to your account.</span>
              </div>

              <form onSubmit={isForgotPassword ? forgetPassword : login} className="form-overall-container-login ">
                <div className="form-group cutom-form-group-login">
                  <label>Email</label>
                  <input
                    type="email"
                    id="formEmail"
                    placeholder="Enter your Email"
                    className="form-control-custom"
                    value={email}
                    onChange={handleEmailChange}
                    aria-invalid={!!emailError}
                    />
                  {emailError && <span className="text-danger">{emailError}</span>}
                </div>

                {!isForgotPassword && (
                  <div className="form-group cutom-form-group-login">
                    <label> Password </label>
                    <input
                      type="password"
                      id="formPassword"
                      placeholder="Enter your Password"
                      className="form-control-custom"
                      value={password}
                      onChange={handlePasswordChange}
                      aria-invalid={!!passwordError}
                    />
                    {passwordError && <span className="text-danger">{passwordError}</span>}
                  </div>
                )}

                <div className="d-grid gap-2">
                  {!isForgotPassword ? (
                    <>
                      <div className='forgot-password-login-container'>
                        <Link
                          to="#"
                          onClick={() => setIsForgotPassword(true)}
                          className="forgot-password-login"
                        >
                          Forgot Password?
                        </Link>
                      </div>

                      <button
                        type="submit"
                        className="btn-custom-first"
                        disabled={isSubmitDisabled}
                      >
                        Sign In
                      </button>
                        
                    </>
                  ) : (
                    <div className='Reset-Password-container'>
                      <button type="submit" className="btn-custom-first">
                        Reset Password
                      </button>
                      <Link
                        to="#"
                        onClick={() => setIsForgotPassword(false)}
                        className="forgot-password-login"
                      >
                        Back to Login
                      </Link>
                    </div>
                  )}
                </div>
              </form>

              <div className='or-login-container'>
                <div className='or-line-container'>
                  <div className='end-line-login'></div>
                  <div className='or-login'>OR</div>
                  <div className='end-line-login-two'></div>
                </div>
                {/* <div className='button-login-container'>
                    <button className='google-button-login'>                 
                      <img src={google} alt="Google" onClick={() => handleGoogleSignIn(isProvider ? 'doctor' : 'patient')} className="social-login" />
                    </button> 
                    <button className='apple-button-login'><img src={apple} alt='Apple' className='apple-login-image'></img></button>
                </div> */}
                    
                <div className='login-option-container'>
                  <div className='account-login'>Don't have an account?</div>
                  <Link className='login-link-signup' to="/signup" >
                    Sign Up
                  </Link>
                </div>
              </div>
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

export default LoginCard;