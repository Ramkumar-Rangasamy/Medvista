import React, { useEffect } from "react";
  import './bmsupport.css'; 
  import Aos from "aos";
  import "aos/dist/aos.css";
  import Ribbonimg from '../Assets/Ribbonimg.png';
  import healthwoman from '../Assets/healthwoman.png';
  import { Link } from 'react-router-dom';

  const Bmsupport = () => {
    useEffect(() => {
      Aos.init();
    }, []);
    return (
      <div className="home-awareness-container-main">
        <div className="home-awareness-container">
          <div className="home-awareness-left" >
            <img 
              src={Ribbonimg} 
              alt="Breast Cancer Ribbon" 
              className="home-awareness-image" 
              data-aos="zoom-in" data-aos-duration="2000"
            />
            <div className="home-awareness-content">
              <h2 className="home-awareness-title" data-aos="fade-down" data-aos-duration="2000">BREAST CANCER <span>AWARENESS</span> </h2>
              <p className="home-awareness-text-left"  data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                Whether you're seeking information about breast cancer, exploring screening options, 
                or understanding treatment paths, Clara is here to guide you every step of the way. 
                Get trusted, clear answers to your questions, and explore options tailored to your needs—all 
                in one comforting, easy-to-use platform. Clara is here to empower you with the knowledge you 
                need to make informed decisions about your health.
              </p>
              <h3 className="home-awareness-special"  data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">Special for month of October</h3>
              <Link to='https://breast-cancer-ai-assistant.vercel.app/' target="_blank" rel="noopener noreferrer" ><button className="home-awareness-button"  data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">Try it now</button></Link>
            </div>
          </div>
          <div className="home-awareness-right">
            <div className="home-awareness-content-right">

              <h2 className="home-awareness-title-right" data-aos="fade-down" data-aos-duration="2000">MENTAL HEALTH <span>SUPPORT</span> </h2>
              <p className="home-awareness-text-right"  data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                Designed for those moments when speaking to someone feels too overwhelming. Our bot listens 
                to the tone of your voice, offering instant support tailored to your needs, helping you manage 
                stress or anxiety—no judgment, just comfort.
              </p>
              <p className="home-awareness-text-right"  data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                Whether you're feeling down, overwhelmed, or simply need to talk, our AI is here 24/7, helping 
                you process your emotions in real time. It's like having a supportive friend who understands you, 
                always ready when you're not ready for a conversation with a person.
              </p>
              <Link to='https://brainzdemoevi.vercel.app/' target="_blank" rel="noopener noreferrer"><button className="home-awareness-button"  data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">Try it now</button></Link>
            </div>  
            <img 
              src={healthwoman} 
              alt="Health Support Woman" 
              className="home-awareness-health-image" 
              data-aos="zoom-in-up" data-aos-duration="2000"
            />
            
          </div>
        </div>
      </div>
    );
  };

  export default Bmsupport;
