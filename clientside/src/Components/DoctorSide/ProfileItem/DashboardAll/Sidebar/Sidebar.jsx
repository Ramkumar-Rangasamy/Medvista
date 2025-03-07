import React, { useState, useEffect } from 'react';
import './sidebar.css';
import { FaBars } from 'react-icons/fa';
import { PiStorefrontBold } from "react-icons/pi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CgList } from "react-icons/cg";
import { FiX } from 'react-icons/fi';
import { RiInboxLine } from 'react-icons/ri';
import { TbStar } from 'react-icons/tb';
import { PiUserListBold } from "react-icons/pi";
import { ImBlogger2 } from 'react-icons/im';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import brandLogo from '../Assets/brand-logo-2.png';
import Verifypopup from './Verifypopup';

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname);
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isVerified, setIsVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subscriptionType, setSubscriptionType] = useState('Free'); 
  const [isTrialExpired, setIsTrialExpired] = useState(false); 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchDoctorDetails = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/doctor/profile/update`,
        { withCredentials: true }
      );
      const doctorData = response.data;
  

      if (doctorData.doctor.verified === 'Verified') {
        setIsVerified(true);
        setIsModalOpen(false); 
      } else {
        setIsVerified(false);
        setIsModalOpen(true); 
      }
  
      const isSubscribed = doctorData.doctor.subscriptionType !== 'Free';
      setSubscriptionType(doctorData.doctor.subscriptionType || 'Free'); 

      const currentDate = new Date();
      const trialEndDate = new Date(doctorData.doctor.trialEndDate);
      const trialExpired = currentDate > trialEndDate;
  
      if (isSubscribed || !trialExpired) {
        setIsTrialExpired(false);
      } else {
        setIsTrialExpired(true);
        setIsModalOpen(true);
      }
  
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };
  

  const navigate = useNavigate();
  const handleLogout = () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/auth/logout`, { withCredentials: true })
      .then(() => {
        sessionStorage.clear();
        window.location.href = 'https://medxbay.com'; // Redirect to the desired URL
        // window.location.reload();
      })
      .catch(error => {
        console.error('Error during logout:', error);
      });
  };

  useEffect(() => {
    setActiveItem(location.pathname);
    fetchDoctorDetails();
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleClick = () => {
    if (isTrialExpired) {
      navigate('/SubscriptionPlans'); 
    } else {
      navigate('/edit/profile/doctor'); 
    }
  };
  const handleClickProfile = () => {
    if (isTrialExpired) {
      navigate('/doc-profile'); 
    }
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
      <div className="logo-container">
        {isSidebarOpen ? (
          <>
            <img src={brandLogo} alt="Logo" className="logo" />
            <button className="toggle-button" onClick={toggleSidebar}>
              <FaBars />
            </button>
          </>
        ) : (
          <button className="toggle-button" onClick={toggleSidebar}>
            <FiX />
          </button>
        )}
      </div>
      <ul className={`sidebar-menu ${!isVerified || isTrialExpired? 'disabled' : ''}`}>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/start-dashboard' ? 'active' : ''}`}
          onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/start-dashboard')}
          onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to={isVerified && !isTrialExpired? "/doctorprofile/dashboardpage/start-dashboard" : "#"} className="menu-link">
            <div className="sidebar-icon"><PiStorefrontBold size='1.1rem' /></div>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/manage' ? 'active' : ''}`}
          onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/manage')}
          onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to={isVerified && !isTrialExpired ? "/doctorprofile/dashboardpage/manage" : "#"} className="menu-link">
            <div className="sidebar-icon"><CgList /></div>
            <span>My Appointments</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/schedule' ? 'active' : ''}`}
          onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/schedule')}
          onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to={isVerified && !isTrialExpired ? "/doctorprofile/dashboardpage/schedule" : "#"} className="menu-link">
            <div className="sidebar-icon"><FaRegCalendarAlt /></div>
            <span>My Schedule</span>
          </Link>
        </li>
        {/* Other menu items */}
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/patient' ? 'active' : ''}`}
          onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/patient')}
          onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to={isVerified && !isTrialExpired ? "/doctorprofile/dashboardpage/patient" : "#"} className="menu-link">
            <div className="sidebar-icon"><PiUserListBold /></div>
            <span>My Patient</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/inbox' ? 'active' : ''}`}
          onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/inbox')}
          onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to={isVerified  && !isTrialExpired? "/doctorprofile/dashboardpage/inbox" : "#"} className="menu-link">
            <div className="sidebar-icon"><RiInboxLine /></div>
            <span>Inbox</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/reviews' ? 'active' : ''} ${subscriptionType === 'Free' ? 'disabled' : ''}`}
          onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/reviews')}
          onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to={subscriptionType !== 'Free' && !isTrialExpired? "/doctorprofile/dashboardpage/reviews" : "#"} className="menu-link">
          <div className="sidebar-icon"><TbStar /></div>
            <span>Reviews</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/blog' ? 'active' : ''} ${subscriptionType === 'Free' ? 'disabled' : ''}`}
          onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/blog')}
          onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link to={subscriptionType !== 'Free' && !isTrialExpired? "/doctorprofile/dashboardpage/blog" : "#"} className="menu-link">
            <div className="sidebar-icon"><ImBlogger2 /></div>
            <span>Blog</span>
          </Link>
        </li>
        <li className={`menu-item ${activeItem === '/doctorprofile/dashboardpage/Logout' ? 'active' : ''}`}
          onMouseEnter={() => setActiveItem('/doctorprofile/dashboardpage/Logout')}
          onMouseLeave={() => setActiveItem(location.pathname)}
        >
          <Link onClick={handleLogout} className="menu-link">
            <div className="sidebar-icon"><RiLogoutCircleRLine /></div>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
      <Verifypopup isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className='verify-popup-doctor'>
          <h1>{isTrialExpired ? '🔔 Trial Expired' : '🛸 Welcome to Medxbay!'}</h1>
          <p>{isTrialExpired ? 'Your trial period has ended.' : 'You’re almost there! 🌟'}</p>
          <p>{isTrialExpired ? 'Please upgrade to continue using our platform.' : 'Just a few quick details and you’ll unlock your full dashboard.'}</p>
          <div className='row '>
          <button className="submitbtn" onClick={handleClick}>
      {isTrialExpired ? 'Upgrade Now' : 'Enter Details'}
    </button>
    {isTrialExpired && (
    <button className="submitbtn-trial" onClick={handleClickProfile}>
     Edit Profile

    </button>
    )}
    </div>
        </div>
      </Verifypopup> 
    </div>
  );
};

export default Sidebar;

