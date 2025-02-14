import React from 'react';
import './layout.css';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <div className="Layout-dashboard-content-area">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
