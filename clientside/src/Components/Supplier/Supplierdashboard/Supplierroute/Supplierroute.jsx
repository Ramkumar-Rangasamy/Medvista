import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//All adminpages imported here only
import Supplierlayout from '../Supplierlayout/Supplierlayout';

import SupplierDashboardPage from '../Supplierpages/SupplierDashboardpage/SupplierDashboardPage';

import Supplierviewblogs from '../Supplierpages/Supplierviewblogs/Supplierviewblogs';
import Viewblogsdetails from '../Supplierpages/Supplierviewblogs/Viewblogsdetails';

const Corporateroute = () => {
  return (
    <Routes>
      <Route path="/" element={<Supplierlayout />}>
        <Route index  path="/" element={<Navigate to="SupplierDashboardPage" />} />
        <Route path="/SupplierDashboardPage" element={<SupplierDashboardPage />} />
        
        <Route path="/Supplier-viewblog" element={<Supplierviewblogs />} />
        <Route path="/view-detailsblog/:id" element={<Viewblogsdetails />} />
      </Route>
    </Routes>
  );
};

export default Corporateroute;
