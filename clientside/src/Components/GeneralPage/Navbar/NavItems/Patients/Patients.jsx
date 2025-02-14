import React from 'react';

import "./Patients.css";
import Patientsfirst from "./Patient-assets/Patientsfirst.png";
import Patientssecond from "./Patient-assets/Patientssecond.png"; 
import Patientsthird1 from "./Patient-assets/Patientsthird1.png"; 
import Patientsthird2 from "./Patient-assets/Patientsthird2.png"; 
import Patientsthird3 from "./Patient-assets/Patientsthird3.png"; 

import CheckIcon from "./Patient-assets/check-icon.png"; 
import { useNavigate } from 'react-router-dom';


const Patients = () => {
  const navigate = useNavigate();

  const handleShowPopup = () => {
    navigate('/signup')
  };

    return (
      <div className="Patients-whole-container">
        {/* First Section */}
        <div className="patients-first-section">
          <div className="Patients-text-content">
              <h1 className="first-section-heading">Welcome to MedxBay<span className="Patients-highlight-text"> Your Global Healthcare Partner</span></h1>
              <p className="first-section-main-description">Navigating healthcare can be challenging, especially across different regions and healthcare systems. At MedxBay, we understand these difficulties and are here to transform your healthcare experience on a global scale. With our integrated platform, we address key challenges such as</p>
              
              {/* First Section Items */}
              <div className="patients-first-section-items">
                {/* First Item */}
                <div className="first-section-items">
                  <div className="first-section-head-item">
                    <img src={CheckIcon} alt="check" className="patients-check-icon" />
                    <h3>Difficulty Finding Trusted Providers</h3>
                  </div>
                  <div className="first-section-description">
                    <p>Whether you're seeking care locally or globally, finding reliable healthcare professionals that meet your specific needs shouldn't be a hassle.</p>
                  </div>
                </div>

                {/* Second Item */}
                <div className="first-section-items">
                  <div className="first-section-head-item">
                    <img src={CheckIcon} alt="check" className="patients-check-icon" />
                    <h3>Inconvenient Scheduling</h3>
                  </div>
                  <div className="first-section-description">
                    <p>No more dealing with time-consuming appointments and processes. MedxBay makes booking appointments easy and accessible across time zones.</p>
                  </div>
                </div>
              </div>
              {/* First Section Items second row*/}
              <div className="patients-first-section-items">
                {/* third Item */}
                <div className="first-section-items">
                  <div className="first-section-head-item">
                    <img src={CheckIcon} alt="check" className="patients-check-icon" />
                    <h3>Limited Access to Care</h3>
                  </div>
                  <div className="first-section-description">
                    <p>Patients in remote areas or those with mobility challenges can connect with healthcare providers from anywhere in the world through our advanced telemedicine services.</p>
                  </div>
                </div>

                {/* fourth Item */}
                <div className="first-section-items">
                  <div className="first-section-head-item">
                    <img src={CheckIcon} alt="check" className="patients-check-icon" />
                    <h3>Misinformation Online</h3>
                  </div>
                  <div className="first-section-description">
                    <p>With so much unverified health information available online, it's easy to feel overwhelmed. MedxBay provides access to accurate, vetted health information to guide your decisions.</p>
                  </div>
                </div>
              </div>
              {/* First Section Items third row */}
              <div className="patients-first-section-items">
                {/* fifth Item */}
                <div className="first-section-items">
                  <div className="first-section-head-item">
                    <img src={CheckIcon} alt="check" className="patients-check-icon" />
                    <h3>Coordination Gaps</h3>
                  </div>
                  <div className="first-section-description">
                    <p>Our platform ensures seamless communication and <br></br> document sharing between you and your healthcare <br></br>providers, no matter where they are, for better-coordinated <br></br>care.</p>
                  </div>
                </div>
              </div>
          </div>

          {/* First Section Image */}
          <div className="patients-image-content">
            <img src={Patientsfirst} alt="patients" className="patients-first-image" />
          </div>
        </div>

        {/* Second Section */}
        <div className="patients-second-section">
          <h1 className="second-section-heading">How MedxBay Enhances<span className="Patients-highlight-text"> Your</span><p className="Patients-highlight-text"> Global Healthcare Experience</p></h1>
          <div className="patients-second-section-area">
            <div className="patients-second-image-content">
              <img src={Patientssecond} alt="patients" className="patients-second-image" />
            </div>
            
            <div className="second-section-text-area">
              {/* Enhancements List */}
              <div className="second-section-items">
                <div className="second-section-item">
                  <h3><span className="second-section-item-number" >01</span>  <span className="second-section-item-title">Find Trusted Providers Worldwide</span></h3>
                  <p>Search for healthcare professionals based on your unique health needs, location, and preferences. Detailed profiles and patient reviews help you make informed decisions about your care.</p>
                </div>
                <div className="second-section-item">
                  <h3><span className="second-section-item-number">02</span>  <span className="second-section-item-title">Streamline Operations</span></h3>
                  <p>MedxBay’s real-time scheduling system allows you to book appointments quickly, with automated reminders and an easy-to-use dashboard to manage your care efficiently, regardless of your location.</p>
                </div>
                <div className="second-section-item">
                  <h3><span className="second-section-item-number">03</span> <span className="second-section-item-title">Access Care Anytime, Anywhere</span></h3>
                  <p>Our global telemedicine services give you the flexibility to consult with healthcare professionals from any region, providing timely, high-quality care wherever you may be.</p>
                </div>
                <div className="second-section-item">
                  <h3><span className="second-section-item-number">04</span>  <span className="second-section-item-title">Accurate Global Health Information </span></h3>
                  <p>Access our comprehensive library of thoroughly vetted health information, ensuring you make informed decisions no matter where you're located, reducing the risk of misinformation.</p>
                </div>
                <div className="second-section-item">
                  <h3><span className="second-section-item-number">05</span>  <span className="second-section-item-title">Seamless International Care Coordination</span></h3>
                  <p>MedxBay simplifies communication and document sharing between you and providers across different regions, creating a cohesive and well-coordinated global care experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
       {/* Third section */}
        <div className="patients-third-section">
          <h1 className="third-section-heading">
            Join MedxBay’s<span className="Patients-highlight-text"> Global</span>
            <p className="Patients-highlight-text"> Healthcare Network for Free!</p>
          </h1>
          <p className="third-section-description">
            At MedxBay, we believe that high-quality, accessible, and reliable healthcare should be available to everyone, everywhere. Join us today and take the first step towards a healthier, happier life—no matter where you are in the world.
          </p>
          <div className="patients-steps">
            <div className="patients-step">
              <div className="patients-step-icon">            
                <div className="patients-step-icon-number">01</div>
                <img src={Patientsthird1} alt="patients" className="Patientsthird-img" />
              </div>
              <h3>Sign Up</h3>
              <p>Create your free account in minutes, no matter where you are in the world.</p>
            </div>
            <div className="patient-curve"></div> 
            <div className="patients-step">
              <div className="patients-step-icon">
                <div className="patients-step-icon-number">02</div>
                <img src={Patientsthird2} alt="patients" className="Patientsthird-img" />
              </div>              
              <h3>Set Up Your Profile</h3>
              <p>Confirm your email (check your spam) and enter information in your profile.</p>
            </div>
            <div className="patient-curve"></div> 
            <div className="patients-step">
              <div className="patients-step-icon">
                <div className="patients-step-icon-number">03</div>
                <img src={Patientsthird3} alt="patients" className="Patientsthird-img" />
              </div>              
              <h3>Explore and Connect</h3>
              <p>Start browsing our global network of healthcare providers, book appointments, and access valuable health resources.</p>
            </div>
          </div>
        </div>

        {/* fourth section */}
        <div className="patients-fourth-section">
          <h1 className="fourth-section-heading">Ready to Transform<span className="Patients-highlight-text">  Your Global</span><p className="Patients-highlight-text"> Healthcare Experience?</p></h1>
          <p className="fourth-section-description">Sign up now to become part of a global community dedicated to making healthcare simple, accessible, and effective. Your health journey matters, and MedxBay is here to support you every step of the way—anywhere in the world.</p>
          <button className="patients-fourth-signup-button" onClick={handleShowPopup}>Sign up</button>
        </div>
      </div>
    );
};

export default Patients;
