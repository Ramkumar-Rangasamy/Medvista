import React, { useEffect } from "react";
import "./Redefine.css";
import IHS from "../Assets/IHS.png";
import patientEHR from "../Assets/patientEHR.png";
import Support from "../Assets/Support.png";
import Telemedicine from "../Assets/Telemedicine.png";

import Aos from "aos";
import "aos/dist/aos.css";

const Redefine = () => {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="redefine-wellness-container">
      <div className="redefine-wellness-content">
        <div className="redefine-left-section">
          <h1 data-aos="fade-down" data-aos-duration="3000">We are <span className="redefine-highlight">Redefining <br /> Wellness</span></h1>
          <p data-aos="zoom-in-up" data-aos-duration="2000">
            At MedxBay, we believe healthcare should be empowering, accessible,
            and deeply personal. That’s why we’re transforming the way care is
            delivered—connecting patients, providers, and medical suppliers in
            one global ecosystem. Our platform gives patients control over their
            health journey like never before, from managing their own electronic
            health records (EHR) to accessing life-changing care across
            hospitals, clinics, surgeries, wellness spas, and more.
          </p>
          <p data-aos="zoom-in-up" data-aos-duration="2000">
            Whether you need expert advice, a second opinion, or ongoing
            support, we are your healthcare partner at every stage—from
            diagnosis to recovery and beyond. With secure telemedicine,
            personalized care, and a focus on prevention, MedxBay is more than
            just a platform; we are here to give you peace of mind and a
            community that cares.
          </p>
        </div>
        <div className="redefine-right-section">
          <div
            className="redefine-card"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
          >
            <div className="redefine-card-icon">
              <img src={patientEHR} alt="" className="redefine-card-image" />
            </div>
            <div className="redefine-card-content">
              <h3>Patient-Controlled EHR</h3>
              <p>
                Patients manage their own health records with full control over
                data access and sharing for a more empowered and personalized
                healthcare experience.
              </p>
            </div>
          </div>
          <div
            className="redefine-card"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="redefine-card-icon">
              <img src={IHS} alt="" className="redefine-card-image" />
            </div>
            <div className="redefine-card-content">
              <h3>Integrated Healthcare Services</h3>
              <p>
                MedxBay connects patients to hospitals, labs, surgeries,
                wellness spas, offering comprehensive and streamlined care
                options.
              </p>
            </div>
          </div>
          <div
            className="redefine-card"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="1000"
          >
            <div className="redefine-card-icon">
              <img src={Telemedicine} alt="" className="redefine-card-image" />
            </div>
            <div className="redefine-card-content">
              <h3>Telemedicine & Remote Care</h3>
              <p>
                Secure telemedicine services make accessing care easy and
                efficient, allowing patients to consult with healthcare
                professionals from anywhere in the world.
              </p>
            </div>
          </div>
          <div
            className="redefine-card"
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="2000"
          >
            <div className="redefine-card-icon">
              <img src={Support} alt="" className="redefine-card-image" />
            </div>
            <div className="redefine-card-content">
              <h3>Support for Healthcare Providers</h3>
              <p>
                Our global network fosters professional collaboration, offering
                support for providers alongside a growing patient care community
                with more innovations on the horizon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Redefine;
