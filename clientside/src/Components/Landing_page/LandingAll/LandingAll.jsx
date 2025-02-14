import React from 'react';
import Insights from '../Insight/Insights';
import Global from '../Globalaccess/Globalaccess';
import FindBy from '../Findby/Findby';
import Redefine from '../Redefine/Redefine';
// import Nestednavbar from '../Nestednavbar/Nestednavbar';
import Hero from '../Hero/Hero';
import LogoSlider from '../LogoSlider/LogoSlider';
import Lookingfor from '../Lookingfor/Lookingfor';
import Medx from '../Medx/Medx';
import Bmsupport from '../Bmsupport/Bmsupport';
import WhoWe from '../WhoWe/WhoWe';

function LandingAll() {
  return (
    <div
      style={{
        background: ' linear-gradient(180deg, rgba(235, 242, 255, 0.3) 0%, #FFFFFF 100%)'
      }}
    >
      <Hero />
      {/* <Nestednavbar /> */}
      <Lookingfor/>
      <Global />
      <FindBy />
      <WhoWe/>
      <Redefine />
      <Medx/>
      <Bmsupport/>
      <LogoSlider />
      <Insights />
      
      {/* <TestimonialSlider /> */}
    </div>
  );
}

export default LandingAll;
