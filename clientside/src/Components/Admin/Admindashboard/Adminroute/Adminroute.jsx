import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

//All adminpages imported here only
import Adminlayout from '../Adminlayout/Adminlayout';

import Admindashboardpage from '../Adminpages/Admindashboardpage/Admindashboardpage';

import Adminviewblogs from '../Adminpages/Adminviewblogs/Adminviewblogs';
import Viewblogsdetails from '../Adminpages/Adminviewblogs/Viewblogsdetails';

import Admincreateblog from '../Adminpages/Admincreateblog/Admincreateblog';
import AdmincreateblogSupplier from '../Adminpages/Admincreateblog/Admincreateblogforsuppliers';

import AdmindoctorProfile from '../Adminpages/AdmindoctorProfile/AdmindoctorProfile';
import Doctorprofileverification from '../Adminpages/AdmindoctorProfile/Doctorprofileverification/Doctorprofileverification';

import Adminmanagebookings from '../Adminpages/Adminmanagebookings/Adminmanagebookings';
import Bookingdetails from '../Adminpages/Adminmanagebookings/Bookingdetails/Bookingdetails';

import Adminmangepayments from '../Adminpages/Adminmanagepayments/Adminmanagepayments';
 
import Admindoctorsubscription from '../Adminpages/Admindoctorsubscription/Admindoctorsubscription';

import Admininsurance from '../Adminpages/Admininsurance/Admininsurance';


import Adminviewdoctor from '../Adminpages/Adminviewdoctor/Adminviewdoctor'; 
import Editviewdoctor from '../Adminpages/Adminviewdoctor/Editviewdoctor/Editviewdoctor';

import Adminviewpatients from '../Adminpages/Adminviewpatients/Adminviewpatients';
import Editviewpatient from '../Adminpages/Adminviewpatients/Editviewpatient/Editviewpatient';

import Adminappointments from '../Adminpages/Adminappointments/Adminappointments';
import CommissionFeeUpdate from '../Adminpages/AdminCommisionFee';


const Adminroute = () => {
  return (
    <Routes>
      <Route path="/" element={<Adminlayout />}>
        <Route index  path="/" element={<Navigate to="admindashboardpage" />} />
        <Route path="/admindashboardpage" element={<Admindashboardpage />} />
        
        <Route path="/admin-viewblog" element={<Adminviewblogs />} />
        <Route path="/view-detailsblog/:id" element={<Viewblogsdetails />} />
      
        <Route path="/admin-createblog" element={<Admincreateblog/>} />
        <Route path="/admin-createblog-supplier" element={<AdmincreateblogSupplier/>} />

        <Route path="/admin-doctorprofile" element={<AdmindoctorProfile/>} />
        <Route path="/admin-doctorprofile/admin-doctorprofile-verification/:doctorID" element={<Doctorprofileverification/>} />
        
        <Route path="/admin-doctorsubscription" element={<Admindoctorsubscription/>} />
        <Route path="/admin-CommisionFee" element={<CommissionFeeUpdate/>} />
         
        <Route path="/admin-managebookings" element={<Adminmanagebookings/>} />
        <Route path="/admin-managebookings/admin-viewbookings/:id" element={<Bookingdetails/>} />


        <Route path="/admin-managepayments" element={<Adminmangepayments/>} />
        
        <Route path="/admin-insurance" element={<Admininsurance/>} />


        <Route path="/admin-viewdoctor" element={<Adminviewdoctor/>} />
        <Route path="/admin-viewdoctor/edit-doctor/:id" element={<Editviewdoctor/>} />

        <Route path="/admin-viewpatients" element={<Adminviewpatients/>} />
        <Route path="/admin-viewpatients/edit-viewpatients/:id" element={<Editviewpatient/>} />
        <Route path="/adminappointments" element={<Adminappointments />} />
      </Route>
    </Routes>
  );
};

export default Adminroute;
