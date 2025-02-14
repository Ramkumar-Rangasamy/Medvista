import React, { useEffect } from "react";
import './Globalaccess.css'; 
import Globalaccessone from '../Assets/globalaccess-image-one.png';
import Globalaccesssecond from '../Assets/globalaccess-image-second.png';
import Globalaccessthird from '../Assets/globalaccess-image-third.png';
import Globalaccessfour from '../Assets/globalaccess-image-four.png';
import Aos from "aos";
import "aos/dist/aos.css";
function  Globalaccess() {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="healthcare-section">
      <div className="images-section">
        <div className="image-row" data-aos="zoom-in" data-aos-duration="2000">
          <img src={Globalaccessone} alt="Doctor team" className="image-item" />
          <img src={Globalaccesssecond} alt="Consultation" className="image-item" />
        </div>
        <div className="image-row" data-aos="zoom-in-up" data-aos-duration="2000">
          <img src={Globalaccessthird} alt="Healthcare massage" className="image-item" />
          <img src={Globalaccessfour} alt="Bandage care" className="image-item" />
        </div>
      </div>

      <div className="text-section">
        <h2 data-aos="fade-down" data-aos-duration="2000">Global access to <span className="highlight">Integrated care</span></h2>
        <p data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
          MedxBay is a global healthcare platform revolutionizing the healthcare experience by offering integrated solutions that support patients, providers, and medical suppliers across all stages of care. Whether you need access to specialized medical services, telehealth consultations, or holistic treatments, MedxBay ensures seamless, personalized healthcare—anywhere in the world.
          By uniting diverse care modalities into a single digital platform, we simplify healthcare delivery, enhance outcomes, and make high-quality care accessible across borders.
        </p>
      </div>
    </div>
  );
}

export default Globalaccess;