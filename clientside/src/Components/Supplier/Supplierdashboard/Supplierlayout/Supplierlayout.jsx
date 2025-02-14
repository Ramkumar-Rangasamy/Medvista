import React from 'react';
import './Supplierlayout.css';
import Suppliersidebar from '../Suppliersidebar/Suppliersidebar'
import Supplierheader from '../Supplierheader/Supplierheader'
import { Outlet } from 'react-router-dom';

const Corporatelayout = () => {
  return (
    <div className="dashboard-container">
      {/* <Suppliersidebar/> */}
      <div className="main-content">
        {/* <Supplierheader/> */}
        <div className="content-area">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Corporatelayout