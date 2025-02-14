import React from 'react';
import './adminlayout.css';
import Adminsidebar from '../Adminsidebar/Adminsidebar'
import Adminheader from '../Adminheader/Adminheader'
import { Outlet } from 'react-router-dom';

const Adminlayout = () => {
  return (
    <div className="dashboard-container">
      <Adminsidebar/>
      <div className="main-content">
        <Adminheader/>
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Adminlayout