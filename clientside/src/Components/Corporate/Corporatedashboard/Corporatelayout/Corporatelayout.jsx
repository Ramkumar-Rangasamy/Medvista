import React from 'react';
import './Corporatelayout.css';
import Corporatesidebar from '../Corporatesidebar/Corporatesidebar';
import Corporateheader from '../Corporateheader/Corporateheader';
import { Outlet } from 'react-router-dom';

const Corporatelayout = () => {
  return (
    <div className="Corporate-DBD-layout-container">
      <Corporatesidebar/>
      <div className="Corporate-DBD-layout-main-content">
        <Corporateheader/>
        <div className="Corporate-DBD-layout-content-area">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Corporatelayout