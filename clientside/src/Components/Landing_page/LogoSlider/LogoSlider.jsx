import React, { useEffect, useState } from 'react';
import './logoslider.css'; 
// import staque from '../Assets/staque.png'; 
import Alliance from '../Assets/Alliance.png'; 
import healthwallet from '../Assets/healthwallet.png'; 
// import carer from '../Assets/carer.png'; 
import wockhardt from '../Assets/wockhardt.png';
import viihealth from '../Assets/viihealth.png';
import traverze from '../Assets/traverze.png';
import weHoldaHand from '../Assets/weHoldaHand.png';

import Aos from "aos";
import "aos/dist/aos.css";
const logos = [
  // { id: 1, src: staque, alt: 'Logo 1' },
  { id: 2, src: Alliance, alt: 'Logo 2' },

  { id: 3, src: healthwallet, alt: 'Logo 3' },

  // { id: 5, src: staque, alt: 'Logo 1' },
  { id: 6, src: Alliance, alt: 'Logo 2' },

  { id: 7, src: healthwallet, alt: 'Logo 3' },
  { id: 8, src: wockhardt, alt: 'Logo 4' },

  { id: 9, src: viihealth, alt: 'Logo 1' },
  { id: 10, src: traverze, alt: 'Logo 2' },

  { id: 11, src: weHoldaHand, alt: 'Logo 3' },

];

const LogoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === logos.length - 4 ? 0 : prevIndex + 1
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <div className="logo-slider">
        <h3 className='logo-titile'  data-aos="fade-down" data-aos-duration="2000">Our  <span>Partners </span></h3>
        <p className='logo-text-home' data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="1000">We believe that collaboration fuels innovation, 
          allowing us to deliver the ultimate value to our customers. 
          By working alongside our esteemed partners,
          we delve into new possibilities, 
          driving progress and creating lasting impact.
        </p>
        <div className="logo-track" style={{ transform: `translateX(${-currentIndex * (100 / 4)}%)` }}>
          {logos.map((logo) => (
            <div key={logo.id} className="logo-slide">
              <img src={logo.src} alt={logo.alt} />
            </div>
          ))}
        </div>
    </div>
  );
};

export default LogoSlider;
