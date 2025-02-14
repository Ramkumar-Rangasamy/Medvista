import React, { useEffect } from "react";
import './whowe.css';
import Patients  from '../Assets/Patients.png';
import Providers  from '../Assets/Providers.png';
import Suppliers  from '../Assets/Suppliers.png';
import {Link} from 'react-router-dom'
import Aos from "aos";
import "aos/dist/aos.css";
const WhoWe = () => {
    useEffect(() => {
        Aos.init();
      }, []);
  return (
   

    <section className='Serve-container'>
                <div className='Serve-title-head'>
                    <h2 className="regions-title11 border-0" data-aos="fade-down" data-aos-duration="3000">Who We Serve</h2>
                    <p data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">MedxBay caters to a diverse global audience, including</p>
                </div>

                <div className="cards-grid">
                    <div className='card11' data-aos="zoom-in-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                        <img src={Patients} alt="Patients" />
                        <h3>Patients</h3>
                        <p>Access trusted providers and accurate health information, while enjoying a seamless, tailored healthcare journey.</p>
                        <Link to={"/patients"}>
                        <button className="learn-more-btn">Learn more</button>
                        </Link>
                    </div>

                    <div className='card11' data-aos="zoom-in-down" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                        <img src={Providers} alt="Healthcare Providers" />
                        <h3>Healthcare Providers</h3>
                        <p>Streamline operations, expand patient reach, and enhance professional collaboration, all through a unified platform.</p>
                        <Link to={"/doctor/physician"}>
                        <button className="learn-more-btn">Learn more</button>
                        </Link>
                        
                    </div>

                    <div className='card11'data-aos="zoom-in-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">
                        <img src={Suppliers} alt="Medical Suppliers" />
                        <h3>Medical Suppliers</h3>
                        <p>Connect with providers globally to introduce new products and innovations that enhance<br/> patient care.</p>
                        <button className="learn-more-btn">Coming Q4</button>
                    </div>
                </div>
            </section>
 
  )
}

export default WhoWe