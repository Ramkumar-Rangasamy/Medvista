import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//All adminpages imported here only
import Corporatelayout from '../Corporatelayout/Corporatelayout';
import CorporateDashboardPage from '../Corporatepages/CorporateDashboardpage/CorporateDashboardPage';
import CorporateViewDoctors from '../Corporatepages/CorporateViewDoctors/CorporateViewDoctors';
import ViewInsights from '../Corporatepages/CorporateViewDoctors/ViewInsights/ViewInsights';
import ViewBooking from '../Corporatepages/CorporateViewDoctors/ViewBooking';
import ViewPatients from '../Corporatepages/CorporateViewDoctors/ViewPatients';
import CreateNewAccount from '../Corporatepages/CreateNewAccount/CreateNewAccount';



const Corporateroute = () => {
  return (
    <Routes>
      <Route path="/" element={<Corporatelayout />}>
        <Route index  path="/" element={<Navigate to="dashboard-main-page" />} />
        <Route path="/dashboard-main-page" element={<CorporateDashboardPage />} />

        <Route path="corporate-view-doctors" element={<CorporateViewDoctors />} />
        <Route path="/corporate-view-doctors/view-insights/:doctorId" element={<ViewInsights />} />
        <Route path="/corporate-view-doctors/view-bookings/:doctorId" element={<ViewBooking />} />
        <Route path="/corporate-view-doctors/view-doctors-patients/:doctorId" element={<ViewPatients/>} />
        <Route path="/create-doctors" element={<CreateNewAccount/>} />
        
      </Route>
    </Routes>
  );
};

export default Corporateroute;
