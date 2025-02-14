import React, { useEffect,useRef,useState} from 'react';
import './doctorphysician.css';
import GlobalPartner from './DoctorPhysician-assets/image 259.png';
import differentdoctorimage from './DoctorPhysician-assets/Image123.png';
import cardone from './DoctorPhysician-assets/Fragmented Systems.png';
import cardtwo from './DoctorPhysician-assets/Administrative Burden.png';
import cardthree from './DoctorPhysician-assets/Limited Patient Reach.png';
import cardfour from './DoctorPhysician-assets/Inefficient Patient Management.png';
import check from './DoctorPhysician-assets/tickicon.png';
import Frameone from './DoctorPhysician-assets/Frame 1597884238.png';
import Frametwo from './DoctorPhysician-assets/Frame 1597884241.png';
import Framethree from './DoctorPhysician-assets/Frame 1597884245.png';
import cardfive from './DoctorPhysician-assets/our vision.png';
import creativeimage from './DoctorPhysician-assets/Mask group.png';
import plansone from './DoctorPhysician-assets/Enhanced AI Capabilities.png';
import planstwo from './DoctorPhysician-assets/Expanded Telehealth Services.png';
import plansthree from './DoctorPhysician-assets/Global Expansion.png';
import plansfour from './DoctorPhysician-assets/Comprehensive Health Records.png';
import plansfive from './DoctorPhysician-assets/Health and Wellness Events.png';
// import LoginCard from '../../../../Authentication/Login/login';
// import SignupCard from '../../../../Authentication/Signup/signup';
import { useNavigate } from 'react-router-dom';
const DoctorPhysician = () => {
    const revealedCardsRef = useRef(new Set()); // To track revealed cards
    const handleClick = () =>{
      window.scrollTo(0,0);
    };
    const navigate = useNavigate();
  
    const handleShowPopup = () => {
        navigate('/signup')
        // setShowPopup(true);
      };    
      const [showPopup, setShowPopup] = useState(false);
    const [isRegisterClicked, setIsRegisterClicked] = useState(false);
    const [isSignInClicked, setIsSignInClicked] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const handleCloseLoginPopup = () => setShowLoginPopup(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
  
    const handleCloseLoginCard = () => {
      setIsRegisterClicked(false);
    };
    const handleSignInClick = () => {
      setIsSignInClicked(true);
      setIsRegisterClicked(false);
    };
    const handleCloseRegister = () => {
      setShowPopup(false);
    };
    const handleShowLogin = () => {
      setShowLoginPopup(true);
    };
    const handleClosePopup = () => setShowPopup(false);
  
    const handleShowRegister = () => {
      setShowPopup(true);
    };
    const handleLogin = (role) => {
      sessionStorage.setItem('loggedIn', 'true');
      sessionStorage.setItem('role', role);
  
      setIsLoggedIn(true);
      setUserRole(role);
      setIsSignInClicked(false); 
      setIsRegisterClicked(false); 
      handleCloseLoginPopup(); 
      handleClosePopup(); 
    };
  
  return (
    <>
        <div className='GlobalPartner-healthcare-conatiner'>
            <section className="healthcare-section-one">
                <div className="healthcare-content-one">
                    <h1>Your Global Partner<span> in <br/> Transforming Healthcare</span></h1>
                    <p>
                    At MedxBay, we recognize the evolving demands placed on healthcare providers worldwide.
                    From administrative overload and fragmented systems to the challenge of expanding your
                    reach across borders, these pressures can pull focus away from what truly matters—
                    delivering exceptional care. MedxBay is here to simplify these challenges and empower you
                    with a global platform designed to streamline your operations, expand your practice, and
                    elevate patient care on an international scale.
                    </p>
                </div>
                <div className="healthcare-image-one">
                <img src={GlobalPartner} alt="Healthcare professionals" />
                </div>
            </section>

            <section className="healthcare-section-two">
                <div className="healthcare-image-two ">
                <img src={differentdoctorimage} alt="Healthcare professionals" />
                </div>
                <div className="healthcare-content-two">
                    <h1>Revolutionizing <span>Healthcare <br/> Globally, Together</span></h1>
                    <p>
                    In a rapidly shifting healthcare landscape, MedxBay is built with you in mind. As the healthcare
                    sector becomes more interconnected, we address the strain of managing cross-regional operations,
                    administrative complexity, and patient engagement. With MedxBay, you are no longer navigating
                    these challenges alone. Our global platform empowers you to focus on what you do best: delivering
                    world-class care to your patients.
                    </p>
                </div>
            </section>

            <section className="challenges-container">
                <div className='challenges-heading'>
                    <h2>Addressing <span className="highlight">Global <br/> Healthcare Challenges</span></h2>
                    <p>We’ve crafted MedxBay to tackle the key challenges faced by healthcare <br/>providers across the globe:</p>
                </div>
                <div className="cards-container">
                    
                    <div className='cards-head-global'>
                        <div className="cards-items-global">
                            <img src={cardone} alt="Fragmented Systems" />
                            <h3>Fragmented Systems</h3>
                            <p>Eliminate the need for juggling disjointed systems for billing, scheduling, and records. 
                            MedxBay centralizes these into one intuitive global system, reducing errors and simplifying your workflow.
                            </p>
                        </div>

                        <div className="cards-items-global-all">
                            <img src={cardtwo} alt="Administrative Burden" />
                            <h3>Administrative Burden</h3>
                            <p>From automated appointment scheduling to integrated billing and payment processing,
                            our platform drastically reduces the time spent on manual tasks, allowing you to focus more on patient care.
                            </p>
                        </div>
                    </div>
                    
                    <div className='cards-head-global'>
                        <div className="cards-items-global-all">
                            <img src={cardthree} alt="Limited Patient Reach" />
                            <h3>Limited Patient Reach</h3>
                            <p>With enhanced global online presence and targeted outreach, 
                            MedxBay helps you connect with a broader patient base across multiple regions.
                            </p>
                        </div>

                        <div className="cards-items-global-all">
                            <img src={cardfour} alt="Inefficient Patient Management" />
                            <h3>Inefficient Patient Management</h3>
                            <p>Never miss an opportunity with integrated tools for appointment scheduling,
                            secure communication, and patient follow-up that keep your patients engaged—wherever they are in the world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        <section className='physician-timeline-container'>
    <h1>How MedxBay Helps<span>You Connect,<br/>Earn, and Grow Globally</span></h1> 
    <div className="physician-timeline-container-sub">
        {/* Timeline Item 1 */}
        <div className="physician-timeline-item physician-timeline-left">
            <div className="physician-timeline-number">01</div>
            <div className="physician-timeline-image">
                <img src={Frameone} alt="Connect" />
            </div>
            <div className="physician-timeline-content">
                <h2>CONNECT</h2>
                <div className="physician-timeline-points">
                    
                    <div className="physician-timeline-point">
                        <div className='physician-timeline-point-title-icon'>
                            <img src={check} alt="check orange color" />
                            <h4>With Patients</h4>
                        </div>
                        <p>Enhance your visibility globally through comprehensive online profiles, telehealth services, and easy-to-use communication tools that build patient trust and confidence.</p>  
                    </div>
                    
                    <div className="physician-timeline-point">
                        <div className='physician-timeline-point-title-icon'>
                            <img src={check} alt="check orange color" />
                            <h4>With Colleagues</h4>
                        </div>
                        <p>Collaborate with providers from around the world, share best practices, and stay informed on the latest medical advancements through a global network of peers.</p>
                    </div>
                    
                    <div className="physician-timeline-point">
                        <div className='physician-timeline-point-title-icon'>
                            <img src={check} alt="check orange color" />
                            <h4>With Industry Leaders</h4>
                        </div>
                        <p>Engage with medical suppliers and access the latest global technologies and innovations to elevate your practice.</p>  
                    </div>
                </div>
            </div>
        </div>

        {/* Timeline Item 2 */}
        <div className="physician-timeline-item physician-timeline-right">
            <div className="physician-timeline-number">02</div>
            <div className="physician-timeline-image physician-left-image">
                <img src={Frametwo} alt="Earn" />
            </div>
            <div className="physician-timeline-content">
                <h2>EARN</h2>
                <div className="physician-timeline-points">
                    
                    <div className="physician-timeline-point">
                        <div className='physician-timeline-point-title-icon'>
                            <img src={check} alt="check orange color" />
                            <h4>Expand Your Global Reach</h4>
                        </div>
                        <p>Our platform helps you reach patients worldwide through detailed profiles and targeted global outreach, increasing bookings and revenue opportunities across regions.</p>
                    </div>

                    <div className="physician-timeline-point">
                        <div className='physician-timeline-point-title-icon'>
                            <img src={check} alt="check orange color" />
                            <h4>Automate Operations</h4>
                        </div> 
                        <p>Free yourself from administrative burdens with tools that automate scheduling, billing, and patient management, reducing operational costs and increasing efficiency.</p>
                    </div>
            
                    <div className="physician-timeline-point">
                        <div className='physician-timeline-point-title-icon'>
                            <img src={check} alt="check orange color" />
                            <h4>Embrace Global Technologies</h4>
                        </div>   
                        <p>MedXBay connects you with cutting-edge medical devices, pharmaceuticals, and systems that enhance your capabilities and streamline international procurement.</p> 
                    </div>
                </div>
            </div>
        </div>

        {/* Timeline Item 3 */}
        <div className="physician-timeline-item physician-timeline-left">
            <div className="physician-timeline-number">03</div>
            <div className="physician-timeline-image physician-right-image">
                <img src={Framethree} alt="Grow" />
            </div>
            <div className="physician-timeline-content">
                <h2>GROW</h2>
                <div className="physician-timeline-points">
                    
                    <div className="physician-timeline-point">
                        <div className='physician-timeline-point-title-icon'>
                            <img src={check} alt="check orange color" />
                            <h4>Improve Patient Engagement</h4>
                        </div>  
                        <p>Our AI-powered insights and feedback tools allow you to connect meaningfully with patients worldwide, enhancing care without overextending your team.</p>   
                    </div>
                    
                    <div className="physician-timeline-point">
                        <div className='physician-timeline-point-title-icon'>
                            <img src={check} alt="check orange color" />
                            <h4>Expand Your Expertise</h4>
                        </div>  
                        <p>Share your knowledge with a global audience through our condition library, international forums, and stay up-to-date with global medical advancements.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</div>

        <div>
            <section className="provider-community-section">
                <div className="provider-community-header">
                    <h2>Our Global Provider <br/>Community</h2>
                    <p>MedxBay welcomes healthcare providers from around the world, offering a unified <br/> platform for</p>
                </div>
                <div className="provider-cards-container">
                    <div className="provider-card">
                        <div className="card-number">01</div>
                        <h3>Conventional Medicine Providers</h3>
                        <p>Practitioners of evidence-based, modern medical practices operating in hospitals and clinics across various regions.</p>
                    </div>
                    <div className="provider-card ">
                        <div className="card-number">02</div>
                        <h3>Holistic Medicine <br/>Providers</h3>
                        <p>Focused on whole-person care, emphasizing the connection between mind, body, and spirit, and promoting overall wellness.</p>
                    </div>
                    <div className="provider-card ">
                        <div className="card-number">03</div>
                        <h3>Specialty Providers</h3>
                        <p>Experts delivering advanced care in specialized fields, providing precise treatments for specific conditions.</p>
                    </div>
                    <div className="provider-card ">
                        <div className="card-number">04</div>
                        <h3>Traditional Medicine<br/> Providers</h3>
                        <p>Practitioners of long-established, culturally rooted medical practices, preserving and promoting ancient healthcare systems across regions.</p>
                    </div>
                </div>
            </section>  
        </div> 
        
        <div className='GlobalPartner-healthcare-conatiner'>  
            <section className="healthcare-platform">
                <div className="healthcare-platform-title-head">
                    <h1>A Versatile, <span className="highlight">Global<br/> Platform</span></h1>
                    <p>Modularity offers healthcare providers worldwide a range <br/> of tools to enhance their practices.</p>
                    
                    <div className="features-list">
                        
                        <div className='features-list-flex'>
                            <div className="feature-item">
                                <div className="feature-text">
                                    <img src={check} alt="Check icon"/>
                                    <h4>Patient Management</h4>
                                </div>
                                <p>Streamline global patient scheduling, billing, and communication.</p>
                            </div>
                            
                            <div className="feature-item">
                                <div className="feature-text">
                                    <img src={check} alt="Check icon"/>
                                    <h4>Professional Network</h4>
                                </div>
                                <p>Connect with international peers and industry experts (Coming Q4).</p>
                            </div>
                            
                            <div className="feature-item">
                                <div className="feature-text">
                                    <img src={check} alt="Check icon"/>
                                    <h4>Continuing Education</h4>
                                </div>
                                <p>Access international resources and forums to stay updated on globalmedical trends (Coming Q4).</p>
                            </div>
                        </div>
                    
                        <div className='features-list-flex'>
                            <div className="feature-item">
                                <div className="feature-text">
                                    <img src={check} alt="Check icon"/>
                                    <h4>Telehealth Services</h4>
                                </div>
                                <p>Offer remote consultations across borders, extending your reach globally.</p>
                            </div>
                        
                            <div className="feature-item">
                                <div className="feature-text">
                                    <img src={check} alt="Check icon"/>
                                    <h4>Market and Grow</h4>
                                </div>
                                <p>Leverage our global tools to attract and retain patients, enhancing
                                    your practice's visibility and reputation across multiple regions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="image-section">
                    <img src={creativeimage} alt="Creative representation" className="creative-image" />
                </div>
            </section>

            <section className="healthcare-section-two">
                <div className="healthcare-image-two  sm-order-2">
                <img src={cardfive} alt="Healthcare professionals" />
                </div>
                <div className="healthcare-content-two sm-order-1">
                    <h1>Our Vision</h1>
                    <p className='Empowering-color'>Simplifying Global Healthcare, Empowering Providers</p>
                    <div className='Empowering-para'>
                        <p>At MedxBay, we envision a future where healthcare providers across the world work smarter, not harder. By offering advanced tools that streamline operations and foster international collaboration,
                        we help you achieve better patient outcomes and grow your practice globally.
                        </p>
                        <p>Whether you're a specialist, a holistic practitioner, or part of a larger healthcare system, MedxBay is designed to meet your needs today—and scale with you tomorrow. From blockchain-based health records to a global network of peers and patients,
                        we are building a platform that connects you to the future of healthcare.
                        </p>
                    </div>
                </div>
            </section>

            <section className="plans-section">
                <div className="plans-head">
                    <div className='plans-sub-head'>
                        <div className="plans-header">
                            <h2>Our Future <span className="highlight">Plans <br/> Include </span></h2>
                        </div>
                        <div className="plan-card">
                            <div className='plan-card-flex'>
                                <img src={plansone} alt="Enhanced AI Capabilities" className="plan-img"/>
                                <h3>Enhanced AI Capabilities</h3>
                            </div>
                            <p>Expanding our AI-driven tools to further streamline global operations and improve patient care.</p>
                        </div>
                        <div className="plan-card">
                            <div className='plan-card-flex'>
                                <img src={planstwo} alt="Expanded Telehealth Services" className="plan-img"/>
                                <h3>Expanded Telehealth Services</h3>
                            </div>
                            <p>Enhancing telehealth functionalities to cater to a broader patient base worldwide.</p>
                        </div>
                    </div>

                    <div className='plans-sub-head'>
                        <div className="plan-card">
                            <div className='plan-card-flex'>
                                <img src={plansthree} alt="Global Expansion" className="plan-img"/>
                                <h3>Global Expansion</h3>
                            </div>
                            <p>Building a truly global healthcare network to connect providers and patients across every continent.</p>
                        </div>
                        <div className="plan-card">
                            <div className='plan-card-flex'>
                                <img src={plansfour} alt="Comprehensive Health Records" className="plan-img"/>
                                <h3>Comprehensive Health Records</h3>
                            </div>
                            <p>Offering integrated health records for seamless cross-border data management and care coordination via the blockchain.</p>
                        </div>
                        <div className="plan-card">
                            <div className='plan-card-flex'>
                                <img src={plansfive} alt="Health and Wellness Events" className="plan-img"/>
                                <h3>Health and Wellness Events</h3>
                            </div>
                            <p>Hosting global events to connect providers with patients and promote healthcare education.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='global-network-container'>
                <div className='global-network-heading'>
                    <h1>Ready to Join <span> Our Global<br/>Network?</span></h1>
                    <p>Together, we can transform healthcare delivery worldwide. Join MedxBay today and be part of shaping the future of global healthcare—
                    <br/> one patient, one provider, one innovation at a time.
                    </p>
                    <button onClick={handleShowPopup}>Register now</button>
                </div>
            
            </section> 
            {/* <SignupCard 
                show={showPopup} 
                handleClose={handleClosePopup}
                 openLoginModal={handleShowLogin}/> */}
                        {/* <LoginCard 
          show={showLoginPopup} 
          handleClose={handleCloseLoginPopup} 
          openRegisterModal={handleShowRegister} 
          handleLogin={handleLogin}
        /> */}

        </div> 
    </>          
  )
}

export default DoctorPhysician   