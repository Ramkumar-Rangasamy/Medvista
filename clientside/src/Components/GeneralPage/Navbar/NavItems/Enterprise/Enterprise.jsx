import React from 'react';
import './Enterprise.css';
import { useNavigate } from 'react-router-dom';
import doctorGroupImage from './Assets/enterprisefirstimg.png';
import Secondsectionimg1 from './Assets/enpsecondsectionimg1.png';
import Secondsectionimg2 from './Assets/enpsecondsectionimg2.png';
import Secondsectionimg3 from './Assets/enpsecondsectionimg3.png';
import Secondsectionimg4 from './Assets/enpsecondsectionimg4.png';
import enterprisethirdimg from './Assets/enterprisethirdimg.png';
import thirdsectionimg1 from './Assets/enpthirdsectionimg1.png';
import thirdsectionimg2 from './Assets/enpthirdsectionimg2.png';
import thirdsectionimg3 from './Assets/enpthirdsectionimg3.png';
import thirdsectionimg4 from './Assets/enpthirdsectionimg4.png';
import fourthsectionimg1 from './Assets/enpfourthsectionimg1.png';


const Enterprise = () => {

  const navigate = useNavigate();

  const  handleClick = () =>{
    window.scrollTo(0,0);
      navigate('/contact-us');
    }
    
  return (
    <div className="enterprise-whole-container-section">
      <div className='enterprise-firstsection-area' >
      <div className="enterprise-firstsection-content">
        <h1>
          Transforming Healthcare <span className="enterprise-section-highlight">for <br/>Healthcare Entities</span>
        </h1>
        <p className="enterprise-firstsection-subtitle">
          Revolutionizing how healthcare systems operate with a global,<br/> integrated approach
        </p>
        <p className="enterprise-firstsection-description">
          As a global leader in healthcare solutions, MedxBay connects hospitals, clinics, pharmacies, labs, cosmetic surgery centers, and more to a unified network that streamlines patient care and operational efficiency. Whether you're managing a large hospital system or a specialized clinic, MedxBay simplifies healthcare delivery by integrating advanced tools tailored to meet your unique needs.
        </p>
      </div>
      <div className="enterprise-firstsection-image">
        <img src={doctorGroupImage} alt="Group of doctors" className="enterprisefirst-image-style" />
      </div>
    </div>
     
      {/* Second Section */}
      <div className="enterprise-secondsection">
        <h2>
          Why MedxBay is Crucial <br/><span className="enterprise-section-highlight">for Your Organization</span>
        </h2>
        <p className="enterprise-secondsection-subtitle">
          MedxBay is more than a healthcare platform; it's a transformative solution designed for the complexities of modern healthcare systems. By integrating cutting-edge AI technology (coming Q4) and innovative digital solutions, we enable providers to focus on what truly matters—delivering quality care.
        </p>
        <div className="enterprise-gridcard-container">
          <div className="enterprise-gridcard-section">
            <div className="enterprise-gridcard-icon"><img src={Secondsectionimg1} className='enterprise-gridcard-icon-img'/></div>
            <h3>Global Reach</h3>
            <p>
              Expand your services beyond local markets. MedxBay's extensive network ensures that healthcare providers can attract and serve patients across regions.
            </p>
          </div>
          <div className="enterprise-gridcard-section">
            <div className="enterprise-gridcard-icon"><img src={Secondsectionimg2} className='enterprise-gridcard-icon-img'/></div>
            <h3>Seamless Integration</h3>
            <p>
              Consolidate fragmented systems with our platform’s advanced tools for automated scheduling, billing, patient management, and more.
            </p>
          </div>
          <div className="enterprise-gridcard-section">
            <div className="enterprise-gridcard-icon"><img src={Secondsectionimg3} className='enterprise-gridcard-icon-img'/></div>
            <h3>Optimized Revenue</h3>
            <p>
              Increase patient acquisition and streamline operations with targeted outreach and innovative technologies that enhance patient engagement and optimize revenue streams.
            </p>
          </div>
          <div className="enterprise-gridcard-section">
            <div className="enterprise-gridcard-icon"><img src={Secondsectionimg4} className='enterprise-gridcard-icon-img'/></div>
            <h3>Collaborative Professional Network</h3>
            <p>
              Leverage our secure social network, exclusive to medical professionals, fostering collaboration, knowledge-sharing, and continuous professional development. (Launching Q4)
            </p>
          </div>
        </div>
      </div>

      {/* third section */}

      <div className="enterprise-thirdsection-container">
  <h2 className="enterprise-thirdsection-heading">
    Key Benefits <span className="enterprise-section-highlight">for Large <br /> Healthcare Systems</span>
  </h2>
  <div className="enterprise-thirdsection-content-area">

  <div className="enterprise-grid-section">
    <div className="enterprise-benefit-card">
      <div className="enterprise-benefit-icon"><img src={thirdsectionimg1} className='enterprise-benefit-icon-img'/></div>
      <h3>Streamline Operations</h3>
      <p>
        MedxBay reduces the complexity of managing large healthcare systems by automating scheduling, telehealth billing, and administrative processes.
      </p>
    </div>
    <div className="enterprise-benefit-card">
      <div className="enterprise-benefit-icon"><img src={thirdsectionimg2} className='enterprise-benefit-icon-img'/></div>
      <h3>Expand Global Presence</h3>
      <p>
        Our platform enhances your visibility, allowing you to attract patients from diverse regions and backgrounds, without relying on general search engines or social media.
      </p>
    </div>
    <div className="enterprise-benefit-card">
      <div className="enterprise-benefit-icon"><img src={thirdsectionimg3} className='enterprise-benefit-icon-img'/></div>
      <h3>Connect with Specialized Audiences</h3>
      <p>
        MedxBay connects your services with patients actively seeking trusted healthcare solutions in your specialized field.
      </p>
    </div>
    <div className="enterprise-benefit-card">
      <div className="enterprise-benefit-icon"><img src={thirdsectionimg4} className='enterprise-benefit-icon-img'/></div>
      <h3>Enhanced Telehealth Solutions</h3>
      <p>
        Offer secure video consultations and remote care, meeting the growing global demand for telehealth services.
      </p>
    </div>
  </div>
    <div className="enterprise-benefit-image">
      <img src={enterprisethirdimg} alt="Healthcare interaction" />
    </div>
  </div>
</div>

{/* Fourth Section */}
<div className="enterprise-fourthsection">
<div className="enterprise-fourthsection2">

  <h2 className="enterprise-fourthsection-heading">
    Unlock New Opportunities with Telehealth <br/> & Integrated Solutions
  </h2>
  <p className="enterprise-fourthsection-description">
    With telehealth services becoming a critical component of modern healthcare, MedxBay offers a secure, globally accessible platform for virtual consultations, remote patient monitoring, and seamless communication between providers and patients. Our integrated healthcare solutions cater to both local and global demands.
  </p>
  <div className="enterprise-fourthsection-cards" >
    <div className="enterprise-fourthsection-card" tabindex="0">
      <div className="enterprise-fourthsection-icon"><img src={fourthsectionimg1} className='enterprise-fourthsection-img'/></div>
      <h3 className="enterprise-fourthsection-title">Telehealth Integration</h3>
      <p className="enterprise-fourthsection-card-description">
        Provide your patients with secure, accessible care through video consultations and digital follow-up tools.
      </p>
    </div>
    <div className="enterprise-fourthsection-card" tabindex="0">
      <div className="enterprise-fourthsection-icon" ><img src={fourthsectionimg1} className='enterprise-fourthsection-img'/></div>
      <h3 className="enterprise-fourthsection-title">AI-Driven Engagement</h3>
      <p className="enterprise-fourthsection-card-description">
        Enhance patient interactions with AI-powered tools that provide actionable insights, improving overall care quality. (Coming soon)
      </p>
    </div>
    <div className="enterprise-fourthsection-card" tabindex="0">
      <div className="enterprise-fourthsection-icon"><img src={fourthsectionimg1} className='enterprise-fourthsection-img'/></div>
      <h3 className="enterprise-fourthsection-title">Blockchain-Enabled Records</h3>
      <p className="enterprise-fourthsection-card-description">
        Ensure secure access to patient medical records with blockchain technology, allowing seamless data sharing between providers and patients across the globe. (Coming soon)
      </p>
    </div>
  </div>
</div>
</div>

{/* Fifth Section */}
<div className="enterprise-fifthsection">
  <h2 className="enterprise-fifthsection-heading">
    Join MedxBay’s <span className="enterprise-section-highlight">Global <br/>
    Healthcare Network</span>
  </h2>
  <p className="enterprise-fifthsection-description">
    MedxBay is your partner in delivering world-class healthcare solutions. By joining our global network, your healthcare organization will benefit from cutting-edge technology, operational efficiency, and expanded patient reach.
  </p>
  <div className="enterprise-fifthsection-buttons">
    {/* <button className="enterprise-button enterprise-signup-button">Signup now</button> */}
    <button className="enterprise-button enterprise-demo-button" onClick={handleClick}>Schedule demo</button>
  </div>
</div>


</div>
  );
};

export default Enterprise;
