import React, { useState, useEffect } from "react";

//style.css;
import "./Findby.css";

//using navigated
import { useNavigate } from "react-router-dom";

//Aos Animation 
import Aos from "aos";
import "aos/dist/aos.css";

//Search bar using here 
import { useSearch } from '../../GeneralPage/Context/context';

// SPECIALITY
import doctorimg from "../Assets/doctorimg.png";
import labimg from "../Assets/labimg.png";
import heartbeat from "../Assets/heartbeatimg.png";
import MRIimg from "../Assets/MRIimg.png";
import puzzleimg from "../Assets/puzzleimg.png";
import teethimg from "../Assets/teethimg.png";
import testtubeimg from "../Assets/testtubeimg.png";
import xrayimg from "../Assets/xrayimg.png";

// CONDITION
import HeartDisease from "../Assets/Heart-Disease.png";
import SkinDisease from "../Assets/Skin-Disease.png";
import BloodConditions from "../Assets/Blood-Conditions.png";
import Cancer from "../Assets/Cancer.png";
import Chronicpain from "../Assets/Chronic-pain.png";
import Diabetes from "../Assets/Diabetes.png";
import EyeHealth from "../Assets/Eye-Health.png";
import HIVAIDS from "../Assets/HIV-AIDS.png";
import axios from "axios";

const FindBy = () => {
  const [isSpeciality, setIsSpeciality] = useState(true);
  const { setSearchData } = useSearch();
  const navigate = useNavigate(); // useNavigate for redirection

  const handleToggle = () => {
    setIsSpeciality(!isSpeciality);
  };

  useEffect(() => {
    Aos.init();
  }, []);

  // Define the speciality and condition card data
  const specialityCards = [
    { name: "Dentistry", img: teethimg },
    { name: "Primary Care", img: doctorimg },
    { name: "Cardiology", img: heartbeat },
    { name: "MRI Resonance", img: MRIimg },
    { name: "Blood Test", img: testtubeimg },
    { name: "Psychologist", img: puzzleimg },
    { name: "Laboratory", img: labimg },
    { name: "X-Ray", img: xrayimg },
  ];

  const conditionCards = [
    { name: "Heart Disease", img: HeartDisease },
    { name: "Skin Disease", img: SkinDisease },
    { name: "Blood Conditions", img: BloodConditions },
    { name: "Cancer", img: Cancer },
    { name: "Chronic Pain", img: Chronicpain },
    { name: "Diabetes", img: Diabetes },
    { name: "Eye Health", img: EyeHealth },
    { name: "HIV/AIDS", img: HIVAIDS },
  ];



  const handleCardClick = async (name) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/search-doctors?what=${name}&where=${" "}`, { withCredentials: true });
      const doctors = response.data;

      console.log('Navigating with:', { doctors, name });
      if (doctors && doctors.length > 0) {
        setSearchData({ doctors, name });
        navigate('/Filters');
      } else {
        console.log('No doctors found');
        // Navigate to a different page or show a message
        navigate('/Filters', { state: {doctors,name } });
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      // Handle error (e.g., show a message to the user)
      navigate('/Filters', { state: { error: 'An error occurred while searching for doctors. Please try again later.' } });
    }
  };

  return (
    <div className="findby-section">
      <h3 className="findby-heading"  data-aos="fade-down" data-aos-duration="2000">Find By :</h3>
      <div className="findby-category-toggle" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
        <span className={`findby-toggle-option ${isSpeciality ? "active" : ""}`}>SPECIALITY</span>
        <div className="findby-toggle-switch" onClick={handleToggle}>
          <div className={`findby-switch-indicator ${isSpeciality ? "left" : "right"}`}></div>
        </div>
        <span className={`findby-toggle-option ${!isSpeciality ? "active" : ""}`}>CONDITION</span>
      </div>

      {/* Render cards based on the toggle state */}
      <div className="findby-card-container" data-aos="fade-up" data-aos-anchor-placement="top-center" data-aos-duration="2000">
        {(isSpeciality ? specialityCards : conditionCards).map((card, index) => (
          <div
            key={index}
            className="findby-card"
            onClick={() => handleCardClick(card.name)} // Trigger redirection on card click
          >
            <img src={card.img} alt={card.name} className="findby-card-icon" />
            <div className="findby-card-text">{card.name}</div>
          </div>
        ))}
      </div>

      <div className="findby-view-all-container" data-aos="fade-up" data-aos-duration="1000">
        <button className="findby-view-all-btn" onClick={() => navigate('/Filters')}>View all</button>
      </div>
    </div>
  );
};

export default FindBy;
