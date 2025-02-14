import React, { useEffect } from "react";
import "./Patientscaring.css";
import PatientCaringimg from "../Assets/patientcaringimg.png";
import tickicon from "../Assets/tickicon.png";
import Aos from "aos";
import "aos/dist/aos.css";
const PatientCaring = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className="patientcaring-container">
      <div className="patientcaring-content">
        <div className="patientcaring-image-section">
          <div className="patientcaring-image" data-aos="zoom-in" data-aos-duration="2000">
            <img src={PatientCaringimg} alt="Patient Care" />
          </div>
        </div>
        <div className="patientcaring-text-section" >
          <h1 data-aos="fade-down" data-aos-duration="2000">Helping Patients From Around The Globe</h1>
          <h2 data-aos="fade-down" data-aos-duration="2000">
            Patient <span className="patientcaring-highlight">Caring</span>
          </h2>
          <p data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
            Our goal is to deliver quality of care in a courteous, respectful,
            and compassionate manner. We hope you will allow us to care for you
            and strive to be the first and best choice for healthcare.
          </p>
          <div className="patientcaring-features">
            <div className="patientcaring-feature-item" data-aos="fade-up"
             data-aos-anchor-placement="top-bottom" data-aos-duration="2100">
              <img
                src={tickicon}
                className="patientcaring-features-tick"
                alt="Tick"
              />
              <p>Stay Updated About Your Health</p>
            </div>
            <div className="patientcaring-feature-item" data-aos="fade-up"
             data-aos-anchor-placement="top-bottom" data-aos-duration="2200">
              <img
                src={tickicon}
                className="patientcaring-features-tick"
                alt="Tick"
              />
              <p>Check Your Results Online</p>
            </div>
            <div className="patientcaring-feature-item" data-aos="fade-up"
             data-aos-anchor-placement="top-bottom" data-aos-duration="2300">
              <img
                src={tickicon}
                className="patientcaring-features-tick"
                alt="Tick"
              />
              <p>Manage Your Appointments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientCaring;
