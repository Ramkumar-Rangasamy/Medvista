import React, { useState, useEffect } from 'react';
import './lookingfor.css';
import AestheticIcon from '../Assets/lookingaesthetic.png'; 
import HospitalIcon from '../Assets/lookingclinic.png';
import ProviderIcon from '../Assets/lookingdoc.png'; 
import LabsIcon from '../Assets/lookinglab.png'; 
import MedicalStoreIcon from '../Assets/lookingmedical.png';
import SurgeryIcon from '../Assets/lookingsurgery.png';
import Aos from "aos";
import "aos/dist/aos.css";

const Lookingfor = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const items = [
    { name: 'Providers', icon: ProviderIcon },
    { name: 'Labs', icon: LabsIcon },
    { name: 'Hospital / Clinic', icon: HospitalIcon },
    { name: 'Medical store', icon: MedicalStoreIcon },
    { name: 'Aesthetic', icon: AestheticIcon },
    { name: 'Surgery', icon: SurgeryIcon },
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="looking-container">
      <h2  data-aos="fade-down" data-aos-duration="2000">You may be <span className="looking-highlight">looking for</span></h2>
      <p  className="looking-content" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">Discover, compare, and book healthcare services, wellness treatments, or buy products <br/>from a wide range of providers (hospitals, spas, clinics) worldwide.<br/>COMING Q1 2025</p>
      <div className="looking-card-container" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
        {items.map((item, index) => (
          <div
          
            key={index}
            className="looking-card"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img src={item.icon} alt={item.name} className="looking-card-icon" />
            <p className="looking-card-text">{item.name}</p>
          </div>
        ))}
        {/* Default underline */}
        <div className="looking-container-underline"></div>
        {/* Hover underline */}
        <div
          className="looking-container-underline-hover"
          style={{
            width: hoveredIndex !== null ? `calc(100% / ${items.length})` : '0',
            left: hoveredIndex !== null ? `calc(100% / ${items.length} * ${hoveredIndex})` : '0',
            backgroundColor: hoveredIndex !== null ? 'rgba(1, 103, 255, 1)' : 'transparent',
          }}
        />
      </div>
    </div>
  );
};

export default Lookingfor;
