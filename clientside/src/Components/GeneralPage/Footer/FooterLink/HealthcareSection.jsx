import React, { useState } from 'react';  // Import useState from React
import './HealthcareSection.css';  // Create and link a CSS file for styling
import { useNavigate } from 'react-router-dom';
import tick from '../Assets/Tick.png';

const HealthcareSection = () => {
    const [selectedCard, setSelectedCard] = useState(null);  // Initialize state
    const navigate = useNavigate();
    // Function to handle card selection
    const handleCardClick = (cardIndex) => {
        setSelectedCard(cardIndex);  // Update state based on clicked card index
    };


  const  handleClick = () =>{
    window.scrollTo(0,0);
      navigate('/contact-us');
    }


    const [selectedCards, setSelectedCards] = useState(null);  // State for tracking selected card

    const handleCardClicks = (cardIndex) => {
        setSelectedCard(cardIndex);  // Update the selected card index when clicked
    };
  return (
    <div className="enp-healthcare-section">
      {/* Top Section */}
      <div className="enp-top-section">
        <div className="enp-text-content">
          <h1>Transforming Healthcare <span>for<br/> Healthcare Entities</span></h1>
          <div className='sub-health-section'> Revolutionizing how healthcare systems operate with a global, integrated approach</div>
          <p>
            As a global leader in healthcare solutions, MedxBay connects hospitals,
             clinics, pharmacies, labs,  cosmetic surgery centers, and more to a unified network that streamlines patient care and operational efficiency. Whether you're managing a large hospital system or a specialized clinic, MedxBay simplifies healthcare delivery    by integrating advanced tools tailored to meet your unique needs.
          </p>
        </div>
        <div className="enp-image-content">
          <img src="group.png" alt="Healthcare Team" />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="enp-bottom-section">
      <h2>Why MedxBay is Crucial<span className='enp-spanclass091'> for<br /> Your Organization</span></h2>
      <p className='health-section-about'>
        MedxBay is more than a healthcare platform; it's a transformative solution designed for the complexities of modern healthcare systems.By integrating cutting-edge AI technology (coming Q4) and innovative digital solutions, we enable providers to focus on what truly matters—delivering quality care.
      </p>
      <div className="enp-features-grid">
        <div
          className={`enp-feature-card ${selectedCard === 0 ? 'selected-feature' : ''}`}
          onClick={() => handleCardClick(0)}
        >
          <img src="../Gloval reach.png" alt="Global Reach" style={{ width: '40px', height: '40px', marginBottom: '20px' }} />
          <h3>Global Reach</h3>
          <p >Expand your services beyond local markets. MedxBay’s extensive network ensures that healthcare providers can attract and serve patients across regions.</p>
        </div>
        <div
          className={`enp-feature-card ${selectedCard === 1 ? 'selected-feature' : ''}`}
          onClick={() => handleCardClick(1)}
        >
          <img src="../Seamless Integration.png" alt="Seamless Integration" style={{ width: '40px', height: '40px', marginBottom: '20px' }} />
          <h3>Seamless Integration</h3>
          <p>Consolidate fragmented systems with our platform’s advanced tools for automated scheduling, billing, patient management, and more.</p>
        </div>
        <div
          className={`enp-feature-card ${selectedCard === 2 ? 'selected-feature' : ''}`}
          onClick={() => handleCardClick(2)}
        >
          <img src="../Optimized Revenue.png" alt="Optimized Revenue" style={{ width: '40px', height: '40px', marginBottom: '20px' }} />
          <h3>Optimized Revenue</h3>
          <p>Increase patient acquisition and streamline operations with targeted outreach and innovative technologies that enhance patient engagement and optimize revenue streams.</p>
        </div>
        <div
          className={`enp-feature-card ${selectedCard === 3 ? 'selected-feature' : ''}`}
          onClick={() => handleCardClick(3)}
        >
          <img src="../Collaborative Professional Network.png" alt="Collaborative Professional Network" style={{ width: '40px', height: '40px', marginBottom: '20px' }} />
          <h3>Collaborative Professional Network</h3>
          <p>Leverage our secure social network, exclusive to medical professionals, fostering collaboration, knowledge-sharing, and continuous professional development. (Launching Q4)</p>
        </div>
      </div>
    </div>


      <h1 className='enp-spanclass0916' >Key Benefits for <span className='enp-spanclass091'>Large <br/>Healthcare Systems</span></h1>
      <div className="enp-content-wrapper">

      
        {/* Left Side: Key Benefits */}
        <div className="enp-left-content">
        

          <div className="enp-benefit">
            <div className="enp-icon">
              <i className="enp-fas fa-cogs"></i> {/* Example icon (you can replace this with actual icons or images) */}
            </div>
            <div className="enp-benefit-text">
            <img src="../Expand Global Presence.png" alt="Team of Doctors" style={{ width: '40px' ,height:"40px"}} />

              <h3>Streamline Operations</h3>
              <p>
                MedxBay reduces the complexity of managing large healthcare systems by automating scheduling, telehealth billing, and administrative processes.
              </p>
            </div>
          </div>

          <div className="enp-benefit">
            <div className="enp-icon">
              <i className="enp-fas fa-globe"></i>
            </div>
            <div className="enp-benefit-text">
            <img src="../Seamless Integration.png" alt="Team of Doctors" style={{ width: '40px' ,height:"40px ", marginBottom: '10px'}} />

              <h3>Expand Global Presence</h3>
              <p>
                Our platform enhances your visibility, allowing you to attract patients from diverse regions and backgrounds, without relying on general search engines or social media.
              </p>
            </div>
          </div>

          <div className="enp-benefit">
            <div className="enp-icon">
              <i className="enp-fas fa-users"></i>
            </div>
            <div className="enp-benefit-text">
            <img src="../Connect with Specialized Audiences.png" alt="Team of Doctors" style={{ width: '40px' ,height:"40px", marginBottom: '10px'}} />

              <h3>Connect with Specialized Audiences</h3>
              <p>
                MedxBay connects your services with patients actively seeking trusted healthcare solutions in your specialized field.
              </p>
            </div>
          </div>

          <div className="enp-benefit">
            <div className="enp-icon">
              <i className="enp-fas fa-video"></i>
            </div>
            <div className="enp-benefit-text">
            <img src="../Enhanced Telehealth Solutions.png" alt="Team of Doctors" style={{ width: '40px' ,height:"40px",marginBottom:"10px"}} />

              <h3>Enhanced Telehealth Solutions</h3>
              <p>
                Offer secure video consultations and remote care, meeting the growing global demand for telehealth services.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Images Grid */}
        <div className="enp-right-content">
          <div className="enp-image-grid">
            <img className="enp-image-grid1" src="../image 247.png"  alt="Healthcare image 1" />
            <img  className="enp-image-grid2"src="../image 248.png" alt="Healthcare image 2" />
            <img className="enp-image-grid3" src="../image 249.png" alt="Healthcare image 3" />
            <img className="enp-image-grid4" src="../image 250.png" alt="Healthcare image 4" />
          </div>
        </div>
      </div>



      <div className="enp-top-section890">
        <h3>Unlock New Opportunities with Telehealth<br/> & Integrated Solutions</h3>
        <p>
          With telehealth services becoming a critical component of modern healthcare, MedxBay offers a secure, globally accessible platform<br/> for virtual consultations, remote patient monitoring, and seamless communication between providers and patients. Our integrated <br/>healthcare solutions cater to both local and global demands.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="enp-feature-cards">
            <div
                className={`enp-card ${selectedCards === 0 ? 'selected-card' : ''}`} // Apply selected-card class conditionally
                onClick={() => handleCardClicks(0)}  // Click handler
            >
                <div className="enp-icon">
                    <i className="enp-fas fa-check-circle"></i>
                </div>
                <img src={tick} alt="Team of Doctors" style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                <h3>Telehealth Integration</h3>
                <p>
                    Provide your patients with secure, accessible care through video consultations and digital follow-up tools.
                </p>
            </div>

            <div
                className={`enp-card ${selectedCards === 1 ? 'selected-card' : ''}`}
                onClick={() => handleCardClicks(1)}
            >
                <div className="enp-icon">
                    <i className="enp-fas fa-check-circle"></i>
                </div>
                <img src={tick} alt="Team of Doctors" style={{ width: '30px', height: '30px', marginBottom: '10px' }} />
                <h3>AI-Driven Engagement</h3>
                <p>
                    Enhance patient interactions with AI-powered tools that provide actionable insights, improving overall care quality. (Coming soon)
                </p>
            </div>

            <div
                className={`enp-card ${selectedCards === 2 ? 'selected-card' : ''}`}
                onClick={() => handleCardClicks(2)}
            >
                <div className="enp-icon">
                    <i className="enp-fas fa-check-circle"></i>
                </div>
                <img src={tick} alt="Team of Doctors" style={{ width: '30px', height: '30px' , marginBottom: '10px'}} />
                <h3>Blockchain-Enabled Records</h3>
                <p>
                    Ensure secure access to patient medical records with blockchain technology, allowing seamless data sharing between providers and patients across the globe. (Coming soon)
                </p>
            </div>
        </div>

      {/* Call-to-Action Buttons */}
      <div className="enp-cta-section">
        <h3>Join MedxBay's <span>Global <br/>Healthcare Network</span></h3>
        <p>
          MedxBay is your partner in delivering world-class healthcare solutions. By joining our global network, your healthcare organization will<br/><br/> benefit from cutting-edge technology, operational efficiency, and expanded patient reach.
        </p>
        <div className="enp-buttons">

          <button onClick={handleClick} className="enp-demo-btn">Schedule demo</button>
        </div>
      </div>
    </div>
  );
};

export default HealthcareSection;
