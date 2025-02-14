import React from 'react';
import './About.css';

import Frameone from './About_Assets/Frame_one.png';
import Frametwo from './About_Assets/Frame_two.png';
import Framethree from './About_Assets/Frame_three.png';
import tickicon from './About_Assets/tickicon.png';
import Goalsdoctorprofile from './About_Assets/about_group_droctor.png';
import Patients  from './About_Assets/Patients.png';
import Providers  from './About_Assets/Providers.png';
import Suppliers  from './About_Assets/Suppliers.png';
import YuncheWilson  from './About_Assets/YuncheWilson.png';
import WilliamStenhouse  from './About_Assets/WilliamStenhouse.png';
import { SiLinkedin } from "react-icons/si";
import { Link } from 'react-router-dom';
import AmiJoy from './About_Assets/AmiJoy.png';
import RickyGallaway from './About_Assets/RickyGallaway.png';
import GillianAshcroft from './About_Assets/GillianAshcroft.png';
import MariamAwati from './About_Assets/MariamAwati.png';
import DawnnaWalton from './About_Assets/DawnnaWalton.png';
import RaeesTonse from './About_Assets/RaeesTonse.png';
// import SarahMuna from './About_Assets/SarahMuna.png';
import MagdaSnowden from './About_Assets/Magda Snowden.png';
const About = () => {
   
    const teamMembers = [
        {
            name: 'Yunche Wilson',
            title: 'Founder/CEO',
            description: ' An 18-year management consultant with extensive experience in enterprise marketing, business development, and health & wellness research.',
            image:YuncheWilson,
            link:'https://www.linkedin.com/in/yunchewilson/'
        },
        
        {
            name: 'William Stenhouse',
            title: 'Chief Strategy Officer',
            description: 'A supply chain and logistics expert with a 30+ year career, focused on building relationships between the UAE and African markets.',
            image: WilliamStenhouse,
            link:'https://www.linkedin.com/in/dr-hon-william-stenhouse-630a54140/'
        }
    ];
    const advisors = [
        {
          name: "Ami Joy",
          title: "Financial Mgmt. Strategist",
          location: "UAE",
          image: AmiJoy
        },
        {
          name: "Dr. Ricky Gallaway",
          title: "International Business Strategist",
          location: "USA",
          image: RickyGallaway
        },
        {
          name: "Gillian Ashcroft",
          title: "Philanthropist & Serial Entrepreneur",
          location: "UK",
          image: GillianAshcroft
        },
        {
          name: "Dr. Mariam Awati",
          title: "Obstetrics and Gynaecology",
          location: "Dubai Healthcare City, UAE",
          image: MariamAwati
        },
        {
          name: "Dr. Dawnna Walton",
          title: "Anesthesiologist",
          location: "Texas, USA",
          image: DawnnaWalton
        },
        {
          name: "Dr. Raees Tonse",
          title: "Oncologist",
          location: "UAE",
          image: RaeesTonse
        },
        // {
        //   name: "Dr. Sarah Muna K.",
        //   title: "Chief Operations Officer",
        //   location: "USA, Turkey & UAE",
        //   image: SarahMuna
        // },
        {
           name: "Dr. Magda Snowden",
           title: "Mentally Agile Leadership Expert",
           location: "UAE",
           image: MagdaSnowden
        }
    ];

    return (
        <> 
        <div className='about-us-main-container'>
            <section className="about-us-container">
                <div className="top-section11">
                    <div className="image-group11">
                        <div className="top-image11">
                            <img className="top-image111" src={Frameone} alt="Group of Doctors" />
                            <img className="top-image211" src={Frametwo} alt="Medical Staff" />
                        
                        </div>
                        <div className="bottom-images11">
                            <div className="image-overlay11">WE FOUNDED IN 2023 AS <br/>GLOBAL WELLNESS ALLIANCE</div>
                            <img className="top-image311" src={Framethree} alt="Senior Doctor" />
                        </div>
                    </div>

                    <div className="content-section11">
                        <h2>About us</h2>
                        <p>Welcome to MedxBay, where global healthcare innovation meets patient empowerment. Established in 2023 as Global Wellness Alliance, MedxBay has evolved into a comprehensive healthcare network that bridges the gap between conventional, holistic, and traditional healthcare practices.
                        Our platform is built to meet the rising demand for integrated health solutions and simplify the complexities of accessing trusted healthcare providers worldwide.
                        </p>
                        <h6>Our Purpose</h6>
                        <p>MedxBay is a global healthcare platform revolutionizing the healthcare experience by offering integrated solutions that support patients, providers, and medical suppliers across all stages of care. Whether you need access to specialized medical services, telehealth consultations, or holistic treatments, MedxBay ensures seamless, personalized healthcare—anywhere in the world.
                        By uniting diverse care modalities into a single digital platform, we simplify healthcare delivery, enhance outcomes, and make high-quality care accessible across borders.
                        </p>
                    </div>
                </div>
            </section>
            
            <section className='Serve-container'>
                <div className='Serve-title-head'>
                    <h2 className="regions-title11">Who We Serve</h2>
                    <p>MedxBay caters to a diverse global audience, including</p>
                </div>

                <div className="cards-grid">
                    <div className='card11'>
                        <img src={Patients} alt="Patients" />
                        <h3>Patients</h3>
                        <p>Access trusted providers and accurate health information, while enjoying a seamless, tailored healthcare journey.</p>
                        <Link to={"/patients"}>
                        <button className="learn-more-btn">Learn more</button>
                        </Link>
                    </div>

                    <div className='card11'>
                        <img src={Providers} alt="Healthcare Providers" />
                        <h3>Healthcare Providers</h3>
                        <p>Streamline operations, expand patient reach, and enhance professional collaboration, all through a unified platform.</p>
                        <Link to={"/doctor/physician"}>
                        <button className="learn-more-btn">Learn more</button>
                        </Link>
                        
                    </div>

                    <div className='card11'>
                        <img src={Suppliers} alt="Medical Suppliers" />
                        <h3>Medical Suppliers</h3>
                        <p>Connect with providers globally to introduce new products and innovations that enhance<br/> patient care.</p>
                        <button className="learn-more-btn">Coming Q4</button>
                    </div>
                </div>
            </section>

            <section className="Our-Global-Reach-container">
                <div className="Our-Global-Reach-content">
                    <h2 className="Our-Global-Reach-title">Regions we serve</h2>
                    <p className="Our-Global-Reach-description">
                        MedxBay now serves hospitals, clinics, medical groups, and other healthcare entities across regions including the Middle East, Africa, Europe and parts of South America and other expanding markets. 
                        We address the unique healthcare challenges of these regions while providing accessible, high-quality care.
                    </p>
                </div>
            </section>
            
            <section className='about-our-mission-section11'>
                <div className='about-our-mission-container'>
                    <div className='about-our-mission-content11'>
                        <h2>Our Mission and Goals</h2>
                        <p>At MedxBay, our mission is to transform healthcare globally by connecting patients, providers, and suppliers through a single, integrated platform.
                          We aim to improve health outcomes by simplifying care processes, fostering a community of informed healthcare consumers, and supporting SDG#3 – Good Health and Well-being for all.
                        </p>
                        <h3>Our goals include</h3>
                        <div className='about-our-mission-sub-flex'>
                            <div className='about-our-mission-sub-flex-card'>
                                <img src={tickicon} alt="No tickicon" />
                                <p>Delivering streamlined, integrated, patient-centric healthcare globally</p>
                            </div>
                            <div className='about-our-mission-sub-flex-card'>
                                <img src={tickicon} alt="No tickicon" />
                                <p>Empowering healthcare providers with cutting-edge tools and global patient access</p>
                            </div>
                            <div className='about-our-mission-sub-flex-card'>
                                <img src={tickicon} alt="No tickicon" />
                                <p>Expanding our global network to improve access to high-quality care across diverse regions</p>
                            </div>
                        </div>
                    </div>


                    <div className="Our-Mission-Goalsdoctorprofile" >
                     <img src={Goalsdoctorprofile} alt="Senior Doctor" />
                    </div>
                </div>
            </section>
                
            <section className="team-section">
                <h2>Meet Our Team</h2>
                <p className="team-subtitle">Our dedicated team of experts in healthcare, technology, and marketing drives MedxBay's mission forward</p>
                <div className="meet-our-team-members">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="meet-our-team-member">
                            <img src={member.image} alt={member.name} className="meet-our-team-member-image" />
                            <h3 className="meet-our-team-member-name">{member.name}</h3>
                            <p className="meet-our-team-member-title">{member.title}</p>
                            <Link to={member.link} target="_blank" rel="noopener noreferrer"> <SiLinkedin className='Linkedin-icon'/></Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="advisors-team-section">
                <h2>Meet Our Board of Advisors</h2>
                <div className="advisors-team-members">
                    {advisors.map((advisor, index) => (
                    <div className="advisors-team-member" key={index}>
                        <img src={advisor.image} alt={`Advisor ${advisor.name}`} className="advisors-team-member-image" />
                        <h3 className="advisors-team-member-name">{advisor.name}</h3>
                        <p className="advisors-team-member-title m-0">{advisor.title}</p>
                        <p className="advisors-team-member-location">{advisor.location}</p>
                    </div>
                    ))}
                </div>
            </section>
        </div>    
        </>   
    );
}

export default About;