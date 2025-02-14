import React, { useEffect } from "react";
import './medx.css';
import Lottie from 'react-lottie';
import animationData from './lottie.json';
import { Link } from 'react-router-dom';
import Aos from "aos";
import "aos/dist/aos.css";
function Medx() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  useEffect(() => {
    Aos.init();
  }, []);


  return (
    <>
    <div className='medx-entry-page-container'>
        <div className='medx-entry-page-image-container' data-aos="zoom-in" data-aos-duration="2000">
          <Lottie 
            options={defaultOptions}
            className='medx-entry-page-image'
          />
        </div>
        <div className='medx-entry-content-header'>
          <h2 data-aos="fade-up" data-aos-duration="2000">Introducing Medx AI:</h2>
          <h3 data-aos="fade-up" data-aos-duration="2000">Empowering Providers, Revolutionizing Care</h3>
          <p data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">MedxBay, in partnership with Staque.io, is transforming the future of healthcare with Medx AI. This innovative service empowers healthcare providers with AI-driven tools that streamline diagnostics, patient monitoring, and administrative workflows—allowing them to focus on what matters most: caring for patients. 
          With advanced technologies like blockchain-secured health records and Quantum Computing for precision diagnostics, Medx AI enhances the provider's role without replacing it, ensuring a smarter, more efficient healthcare system.</p>
          <Link to="https://www.medxbay.org/medxai/" target="_blank" rel="noopener noreferrer"><button className='medx-entry-button'data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">Learn more</button></Link>
        </div>
    </div>
    </>
        
     
  );
}

export default Medx;
