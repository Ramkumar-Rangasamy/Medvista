import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom';
import './profileroutes.css'; // Ensure this file exists
import ProfileLayout from './Layout/ProfileLayout';
import ManageAppointments from './RoutePages/ManageAppointments/ManageAppointments';
import Profileedit from './RoutePages/ProfileEdit/Profileedit';
import Inbox from '../DoctorSide/ProfileItem/Inbox/Inbox';
import Prescriptions from './RoutePages/Prescriptions/Prescriptions';
import Notification from './RoutePages/Notification/Notification';
import Nestednavbar from '../GeneralPage/Nestednavbar/Nestednavbar';
import Footer from '../GeneralPage/Footer/Footer';

const ProfileRoutes = () => {
  return (
    <div className='profile-content-background-color'>
      <Routes>
        <Route path="/userprofile" element={[<Nestednavbar/>,<ProfileLayout/>,<Footer/>]}>
          <Route index element={<Navigate to="edit/profile" />} />
          <Route path="manage/appointments" element={<ManageAppointments /> } />
          <Route path="add-review" element={<ManageAppointments /> } />
          <Route path="edit/profile" element={<Profileedit />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="prescription" element={<Prescriptions />} />
          <Route path="notification" element={<Notification />} />
        </Route>
      </Routes>
    </div>
  );
};

export default ProfileRoutes;
