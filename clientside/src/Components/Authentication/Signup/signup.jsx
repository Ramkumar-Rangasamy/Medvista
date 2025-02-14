import React, { useEffect,useState} from 'react';
import './signup.css';

import logobrand from '../../Assets/logobrand.png';
import { FaTimes } from "react-icons/fa";

import schedule from '../Assets/schedule.png';
import stethoscope from '../Assets/stethoscope.png';
import meds from '../Assets/meds.png';
import scheduletwo from '../Assets/schedule-two.png';
import doctorconsultation from '../Assets/doctor-consultation.png';
import medicalexamsvg from '../Assets/medical.png';
import heartbeat from '../Assets/heart-beat.png';

import patientRole from '../Assets/patient_role.png';
import doctorRole from '../Assets/doctor_role.png';
import corporateRole from '../Assets/corporate_role.png';
import supplierRole from '../Assets/supplier_role.png';

// import google from '../../assests/img/google.png';
// import apple from '../../assests/img/apple.png';

import axios from 'axios';
//error and successfully message 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//mobile number countys
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


import { Link } from 'react-router-dom';

const SignupCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState('Patient');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  
  // const handleGoogleSignIn = (role) => {
  //   setIsLoading(true);
  //   const rolePath = role.toLowerCase();
  //   const url = `${process.env.REACT_APP_BASE_URL}/auth/google/${rolePath}?state=${JSON.stringify({ role })}`;
  //   window.location.href = url;
  // };


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


  const register = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    let user;
    let endpoint;
    
    // Define the endpoint and request body based on the selected role
    if (selectedRole === 'Provider') {
      endpoint = `${process.env.REACT_APP_BASE_URL}/auth/signup/doctor`;
      user = { name, email, phoneNumber, password };
    } else if (selectedRole === 'Patient') {
      endpoint = `${process.env.REACT_APP_BASE_URL}/auth/signup/patient`;
      user = { name, email, phoneNumber, password };
    } else if (selectedRole === 'Supplier') {
      endpoint = `${process.env.REACT_APP_BASE_URL}/supplier/register`;
      user = { name, email, phone : phoneNumber, password };
    } else if (selectedRole === 'Corporate') {
      endpoint = `${process.env.REACT_APP_BASE_URL}/corporate/signup`;
      user = { corporateName: name, email, mobileNumber : phoneNumber, password };
    } else {
      console.error("Invalid user type");
      setIsSubmitting(false);
      return;
    }

    if (validateForm()) {
      try {
        const res = await axios.post(endpoint, user);
        console.log(res.data);
        toast.info("Registration successful! Please check your email and verify.", {
          position: "top-center",
          closeButton: true,
          progressBar: true,
          className: 'toast-sign toast-success',
          autoClose: 5000,

        });


        setName('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
        // handleClose();
      } catch (err) {
        console.error("Error during registration:", err);
        if (err.response) {
          if (err.response.status === 400 && err.response.data.error) {
            if (err.response.data.error.includes("User already exists")) {
              toast.info("User already exists. Please use a different email.", {
                closeButton: true,
                progressBar: true,
                className: 'toast-center toast-success',
              });
            } else {
              toast.info(err.response.data.error, {
                closeButton: true,
                progressBar: true,
                className: 'toast-center toast-success',

              });
            }
          } else {
            toast.info("Registration failed. Please try again.", {
              closeButton: true,
              progressBar: true,
              className: 'toast-center toast-success',

            });
          }
        } else {
          toast.info("Registration failed. Please try again.", {
            closeButton: true,
            progressBar: true,
            className: 'toast-center toast-success',

          });
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };


  const [isProvider, setIsProvider] = useState(false);
  const [isPatient, setIsPatient] = useState(false);
  const [isCorporate, setIsCorporate] = useState(false);
  const [isSupplier, setIsSupplier] = useState(false);

  const validateForm = () => {
    return validateName(name) && validateEmail(email) && validateMobile(phoneNumber) && validatePassword(password);
  };

  const handleProviderClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsProvider(true);
      setIsLoading(false);
    }, 500);
  };

  const handlePatientClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsPatient(true);
      setIsLoading(false);
    }, 500);
  };

  const handleCorporateClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsCorporate(true);
      setIsLoading(false);
    }, 500);
  };

  const handleSupplierClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsSupplier(true);
      setIsLoading(false);
    }, 500);
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

    if (!/^[a-zA-Z ]+$/.test(trimmedValue)) {
      setNameError('Name should only contain alphabets.');
      return false;
    }

    if (trimmedValue.includes('  ')) {
      setNameError('Name should not have more than 2 consecutive spaces.');
      return false;
    }

    if (trimmedValue.length < 3 || trimmedValue.length > 50) {
      setNameError('Name should be between 3 to 50 characters.');
      return false;
    }

    setNameError('');
    return true;
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

  const validateMobile = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setMobileError('Mobile number is required.');
      return false;
    }

    // if (!/^\d{10}$/.test(trimmedValue)) {
    //   setMobileError('Please enter a valid 10-digit mobile number.');
    //   return false;
    // }

    setMobileError('');
    return true;
  };

  const validatePassword = (value) => {
    const trimmedValue = value.trim();

    if (trimmedValue.length === 0) {
      setPasswordError('Password is required.');
      return false;
    }

    if (trimmedValue.length < 6) {
      setPasswordError('Password should be at least 6 characters.');
      return false;
    }

    setPasswordError('');
    return true;
  };

  const handleNameChange = (event) => {
    const { value } = event.target;
    setName(value);
    validateName(value);
  };

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    validateEmail(value);
  };

  const handleMobileChange = (event) => {
    const { value } = event.target;
    setPhoneNumber(value);
    validateMobile(value);
  };
  const handlePhoneChange = (value) => {
    setPhoneNumber(value);

  };


  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPassword(value);
    validatePassword(value);
  };

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  return (
    <>
      <div className='signupnew--total-container'>
        <div className='signupnew--close-custom-container'>
          <button type="button" className="signupnew--close-custom" aria-label="Close">
            <Link to={'/'}>
              <FaTimes size='1rem'/>
            </Link>
          </button>
        </div>
        <div className='signupnew--container'>
          <ToastContainer />
         
          <div className="smile-emoji">
            <div className='smile-emoji-container-one'>
              <img src={logobrand} alt="logo" className="brand-image-logo" />
              <div className="emoji-ring">😇</div>
              <img src={schedule} alt="meds" className="calender-emoji" />
              <div className="speech-bubble-container">
                <div className="speech-bubble">
                  <span className="typing-animation">
                    Hey! 😊 Hope you\'re well! 🌟
                  </span>
                </div>
              </div>
              <img src={meds} alt="meds" className="band-aid-emoji" />
              <img src={stethoscope} alt="stethoscope-emoji" className="stethoscope-emoji" />
              <img src={scheduletwo} alt="meds" className="scheduletwo-emoji" />
            </div>
            <div className='signup-center-container'>

              <div className='signup-center-container-head'>
                <span className="header-fisrt-title">Sign up</span>{' '}
                <span className="header-std-sub-title">
                  Sign up as{' '}
                  <span style={{ color: '#0167FF', marginLeft: '8px' }}>{selectedRole}</span>
                </span>
              </div>

              <div className="role-selection-container">
                  <div className="role-selection-grid">
                    <div
                      className={`role-card ${selectedRole === 'Patient' ? 'active-role' : ''}`}
                      onClick={() => handleRoleClick('Patient')}
                    >
                      <img src={patientRole} alt="Patient" className="role-icon" />
                      <span className="role-label">Patient</span>
                    </div>
                    <div
                      className={`role-card ${selectedRole === 'Provider' ? 'active-role' : ''}`}
                      onClick={() => handleRoleClick('Provider')}
                    >
                      <img src={doctorRole} alt="Provider" className="role-icon" />
                      <span className="role-label">Provider</span>
                    </div>
                    <div
                      className={`role-card ${selectedRole === 'Supplier' ? 'active-role' : ''}`}
                      onClick={() => handleRoleClick('Supplier')}
                    >
                      <img src={supplierRole} alt="Supplier" className="role-icon" />
                      <span className="role-label">Supplier</span>
                    </div>
                    <div
                      className={`role-card ${selectedRole === 'Corporate' ? 'active-role' : ''}`}
                      onClick={() => handleRoleClick('Corporate')}
                    >
                      <img src={corporateRole} alt="Corporate" className="role-icon" />
                      <span className="role-label">Corporate</span>
                    </div>
                  </div>
              </div>

              <form onSubmit={register} className="form-overall-container">
                <div className={`form-group form-container ${!isProvider ? 'form-container-visible' : 'form-container-hidden'}`}>
                  <label>
                    {selectedRole === 'Corporate' ? 'Corporate Name' : 'Name'}
                  </label>
                  <input
                    type="text"
                    placeholder={`Enter your ${selectedRole === 'Corporate' ? 'Corporate Name' : 'Name'}`}
                    className={` form-control-custom ${nameError ? 'is-invalid' : ''}`}
                    value={name}
                    onChange={handleNameChange}
                  />
                  {nameError && <div className="invalid-feedback">{nameError}</div>}
                </div>

                <div className="form-group mb-3">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Enter your Email"
                    className={` form-control-custom ${emailError ? 'is-invalid' : ''}`}
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>

                <div className="form-group mb-3">
                  <label>Mobile</label>
                  <div className="form-control-custom-phone-container">
                    <PhoneInput
                      country={'us'}
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className={` form-control-custom-phone ${mobileError ? 'is-invalid' : ''}`}
                      placeholder="Enter your Mobile Number"
                    />
                  </div>
                  {mobileError && <div className="invalid-feedback">{mobileError}</div>}
                </div>

                <div className="form-group mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    className={` form-control-custom ${passwordError ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>

                <button
                  type="submit"
                  className="btn  btn-custom-first"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </button>
              </form>


              <div className='or-sign-up-container'>
                <div className='or-line-container'>
                  <div className='end-line-sign-up'></div>
                  <div className='or-sign-up'>OR</div>
                  <div className='end-line-sign-up-two'></div>
                </div>
                {/* <div className='button-sign-up-container'>
                    <button className='google-button-sign-up'>                 
                      <img src={google} alt="Google" onClick={() => handleGoogleSignIn(isProvider ? 'doctor' : 'patient')} className="social-sign-up" />
                    </button> 
                    <button className='apple-button-sign-up'><img src={apple} alt='Apple' className='apple-sign-up-image'></img></button>
                </div> */}
                    
                <div className='login-option-container'>
                  <div className='account-sign-up'>Have an account?</div>
                    <Link className='login-link-signup' to="/login" >
                        Sign In
                    </Link>
                  </div>

                  {/* <div className='provider-option-container'>
                    <div className="account-sign-up-provider">
                      {isProvider ? 'Are you a patient?' : 'Are you a provider?'}
                    </div>

                    <button
                      className="provider-link-signup"
                      onClick={() => {
                        if (isProvider) {
                          handleProviderClick(); // Logic for provider
                        } else if (isPatient) {
                          handlePatientClick(); // Logic for patient
                        } else if (isSupplier) {
                          handleSupplierClick(); // Logic for supplier
                        } else if (isCorporate) {
                          handleCorporateClick(); // Logic for corporate
                        }
                      }}
                    >
                      {
                        isProvider
                        ? 'Sign Up as a Provider'
                          : isPatient
                        ? 'Sign Up as a Patient'
                          : isSupplier
                        ? 'Sign Up as a Supplier'
                          : isCorporate
                        ? 'Sign Up as a Corporate'
                          : 'Sign Up' // Default text for any unknown state
                      }
                    </button>
                  </div> */}
              </div>
            </div>
            
            <div className='smile-emoji-container-one'>
              <div className="speech-bubble-container-std">
                <div className="speech-bubble-std">
                  <span className="typing-animation-std">
                    Greetings! 👋 Book your visit <br/>today. 📅
                  </span>
                </div>
              </div>  
              <div className="handsucking">👋</div>
              <img src={doctorconsultation} alt="meds" className="consultation-emoji" />
              <img src={heartbeat} alt="meds" className="heartbeat-emoji" />
              <img src={medicalexamsvg} alt="meds" className="medicalexam-emoji" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupCard;
