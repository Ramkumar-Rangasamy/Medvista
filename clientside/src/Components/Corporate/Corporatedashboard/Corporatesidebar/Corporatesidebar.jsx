import React, { useState, useEffect } from 'react';
import './Corporatesidebar.css';
// Images for brand logo
import brandLogo from '../../Assets/brand-logo.png';

// Open and close sidebar icons
import { FaBars } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

// Sidebar item icons
import { BiSolidDashboard } from 'react-icons/bi';
import { TbUserHexagon } from "react-icons/tb";
import { RiLogoutCircleRLine } from 'react-icons/ri';


// Using Link and useLocation for active and inactive states
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Corporatesidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(localStorage.getItem('lastActiveItem') ||'/dashboard-main-page');
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  useEffect(() => {
    const setActiveItemBasedOnRoute = () => {
      let routeKey = location.pathname;
      
      if (routeKey.startsWith('/corporate/dashboardpage/corporate-view-doctors/view-insights') ||
          routeKey.startsWith('/corporate/dashboardpage/corporate-view-doctors/view-bookings') ||
          routeKey.startsWith('/corporate/dashboardpage/corporate-view-doctors/view-doctors-patients')
        ) {
        routeKey = '/corporate/dashboardpage/corporate-view-doctors'; // Ensuring the parent menu stays active
      }
    
      setActiveItem(routeKey);
      localStorage.setItem('lastActiveItem', routeKey);
    };
  
    setActiveItemBasedOnRoute();
  }, [location.pathname]);
  
  

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
    localStorage.setItem('lastActiveItem', item);
  };
  
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

  return (
    <div className={`Corporate-DBD-sidebar ${isSidebarOpen ? 'Corporate-DBD-open' : 'Corporate-DBD-closed'}`}>
      <div className="Corporate-DBD-logo-container">
        {isSidebarOpen ? (
          <>
            <img src={brandLogo} alt="Logo" className="Corporate-DBD-logo" />
            <button className="Corporate-DBD-toggle-button" onClick={toggleSidebar}>
              <FiX />
            </button>
          </>
        ) : (
          <button className="Corporate-DBD-toggle-button" onClick={toggleSidebar}>
            <FaBars />
          </button>
        )}
      </div>
      <ul className="Corporate-DBD-sidebar-menu">
        <li 
          className={`Corporate-DBD-menu-item ${activeItem === '/corporate/dashboardpage/dashboard-main-page' ? 'Corporate-DBD-active' : ''}`} 
          onMouseEnter={() => setActiveItem('/corporate/dashboardpage/dashboard-main-page')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/dashboard-main-page')}
          onClick={() => handleItemClick('/corporate/dashboardpage/dashboard-main-page')}
        >
          <Link to="/corporate/dashboardpage/dashboard-main-page" className="Corporate-DBD-menu-link">
            <div className="Corporate-DBD-sidebar-icon"><BiSolidDashboard /></div>
            <span>Dashboard</span>
          </Link>
        </li>

        <li 
          className={`Corporate-DBD-menu-item ${activeItem === '/corporate/dashboardpage/corporate-view-doctors' ? 'Corporate-DBD-active' : ''}`} 
          onMouseEnter={() => setActiveItem('/corporate/dashboardpage/corporate-view-doctors')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/dashboard-main-page')}
          onClick={() => handleItemClick('/corporate/dashboardpage/corporate-view-doctors')}
        >
          <Link to="/corporate/dashboardpage/corporate-view-doctors" className="Corporate-DBD-menu-link">
            <div className="Corporate-DBD-sidebar-icon"><TbUserHexagon /></div>
            <span>View Doctors</span>
          </Link>
        </li>

        <li 
          className={`Corporate-DBD-menu-item ${activeItem === '/corporate/dashboardpage/create-doctors' ? 'Corporate-DBD-active' : ''}`} 
          onMouseEnter={() => setActiveItem('/corporate/dashboardpage/create-doctors')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/dashboard-main-page')}
          onClick={() => handleItemClick('/corporate/dashboardpage/create-doctors')}
        >
          <Link to="/corporate/dashboardpage/create-doctors" className="Corporate-DBD-menu-link">
            <div className="Corporate-DBD-sidebar-icon"><TbUserHexagon /></div>
            <span>Create Doctors</span>
          </Link>
        </li>

     
        <li 
          className={`Corporate-DBD-menu-item ${activeItem === '/corporate/dashboardpage/logout' ? 'Corporate-DBD-active' : ''}`} 
          onMouseEnter={() => setActiveItem('/corporate/dashboardpage/logout')}
          onMouseLeave={() => setActiveItem(localStorage.getItem('lastActiveItem') || '/dashboard-main-page')}
         
        >
          <Link onClick={handleLogout} className="Corporate-DBD-menu-link">
            <div className="Corporate-DBD-sidebar-icon"><RiLogoutCircleRLine /></div>
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Corporatesidebar;
