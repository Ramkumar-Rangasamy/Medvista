import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewInsights.css';
import ProfileImage from '../../CorporateDashboardpage/Assets/doctor-holder-image.png';
import reviewsImg from '../../CorporateDashboardpage/Assets/reviewsImg.png';
import consultationimg from '../../CorporateDashboardpage/Assets/consultationimg.png';
import Newpatient from '../../CorporateDashboardpage/Assets/Newpatient.png';

import Yourincome from './YourIncome';
import BookingRate from './BookingRate';

import { TbSquareArrowLeft } from "react-icons/tb";
import { FaUserInjured } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoIosMail } from 'react-icons/io';
import { RiArrowDownSLine } from "react-icons/ri";
import { CiClock2 } from "react-icons/ci";
import { RiListView } from "react-icons/ri";
import Loader from '../../../../../Loader/Loader';
import { useNavigate, useParams } from 'react-router-dom';

const getProfileImage = (profilePicture) => profilePicture || ProfileImage;

const ViewInsights = () => {
  const [MyInsights, setMyInsights] = useState('This Month');
  const [dashboardData, setDashboardData] = useState(null);
  const [bookingRatesCount, setBookingRatesCount] = useState([]);
  const {doctorId} = useParams();
  const [doctor,setDoctor] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard data from the server
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/corporate/doctor/insights/${doctorId}`,
          {
            params: {
              'booking-filter': 
                MyInsights === 'This Month' ? 'month' : 
                MyInsights === 'This Week' ? 'week' : 
                MyInsights === 'This Year' ? 'year' : 'all',
            },
            withCredentials: true,
          }
        );
        setDashboardData(response?.data?.insights);
        setDoctor(response?.data?.doctor)
        
        // Set the bookingRatesCount state to the array of counts
        if (response?.data?.bookingRates) {
          const counts = response.data.bookingRates.map(rate => rate.count);
          setBookingRatesCount(counts);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
  
    fetchDashboardData();
  }, [MyInsights,doctorId]); // Dependency array - effect will run when MyInsights changes
  

  const data = {
    totalPatients: 120,
    totalFilledDoctor: 30,
    totalPostedDoctor: 50,
    totalUnreadAppointments: 5,
  };

  const handleView = () => {
    navigate(`/book-appointment-profile/${doctorId}`)
  };

  if (!dashboardData) {
    return <Loader/>;
  }

  return (
    <div className='Corporate-DIS-main-dashboard-page'>
      <div className='Corporate-DIS-bk-hg-container'>
        <TbSquareArrowLeft className="C-DIS-bk-arrow" onClick={() => window.history.back()} />
        <h2 className='Corporate-DIS-heading-dashboard-page'>View Doctor Insights</h2>
      </div>
      <div className='Corporate-DIS-scoll-head'>
        <div className='Corporate-DIS-gird-layout'>

          {/* My Insights */}
          <div className="Corporate-DIS-insight-patient">
            <div className='Corporate-DIS-head-common'>
              <p>My Insights</p>
              <div className="Corporate-DIS-select-container">
                <select
                  className="Corporate-DIS-select-box-common"
                  value={MyInsights}
                  onChange={(e) => setMyInsights(e.target.value)}
                >
                  <option value="This Month">This Month</option>
                  <option value="This Week">This Week</option>
                  <option value="This Year">This Year</option>
                </select>
                <RiArrowDownSLine className="Corporate-DIS-arrow-icon-filter" />
              </div>
            </div>

            {/* Insight Items */}
            <div className="Corporate-DIS-insight-item">
              <div className="Corporate-DIS-insight-img-container    Corporate-DIS-blue-color">
                <img src={Newpatient} alt="New Patients" className='Corporate-DIS-image-insight' />
              </div>
              <div className="Corporate-DIS-insight-info">
                <h4>New Patients</h4>
                <p>{dashboardData.totalPatients}</p>
              </div>
            </div>

            <div className="Corporate-DIS-insight-item">
              <div className="Corporate-DIS-insight-img-container   Corporate-DIS-dark-blue-color">
                <CiClock2 className='Corporate-DIS-image-insight text-light' />
              </div>
              <div className="Corporate-DIS-insight-info">
                <h4>Pending Requests</h4>
                <p>{dashboardData.waitingAppointmentsCount}</p>
              </div>
            </div>

            <div className="Corporate-DIS-insight-item">
              <div className="Corporate-DIS-insight-img-container Corporate-DIS-green-color">
                <RiListView className='Corporate-DIS-image-insight text-light' />
              </div>
              <div className="Corporate-DIS-insight-info">
                <h4>Appointments</h4>
                <p>{dashboardData.totalConsultations}</p>
              </div>
            </div>
          </div>

          {/* Your Income */}
          <div className="Corporate-DIS-income-head">
            <Yourincome />
          </div>

          {/* view profiles */}
          <div className="Corporate-DIS-profiles-head">
            <img src={getProfileImage(doctor.profilePicture)} className='Corporate-DIS-profiles-imgage' alt="Doctor Profile" />
            <h2 className='Corporate-DIS-name-head'>{doctor.name}</h2>
            <p className='Corporate-DIS-subtitle'>{doctor.title}</p>
            <div className='Corporate-DIS-dashboardprofile-logo'>
              <div className='Corporate-DIS-content-background'>
                <div className='Corporate-DIS-logo-background'>
                  <FaUserInjured className='Corporate-DIS-profiles-icons' size='1.3rem' />
                </div>
                <p className='Corporate-DIS-logo-name'>Patients</p>
                <p className='Corporate-DIS-logo-count'>{data.totalPatients}</p>
              </div>
              <div className='Corporate-DIS-content-background'>
                <div className='Corporate-DIS-logo-background'>
                  <BsCheckCircleFill className='Corporate-DIS-profiles-icons' size='1.3rem' />
                </div>
                <p className='Corporate-DIS-logo-name'>Doctor</p>
                <p className='Corporate-DIS-logo-count'>{data.totalFilledDoctor}/{data.totalPostedDoctor}</p>
              </div>
              <div className='Corporate-DIS-content-background'>
                <div className='Corporate-DIS-logo-background'>
                  <IoIosMail className='Corporate-DIS-profiles-icons' size='1.5rem' />
                </div>
                <p className='Corporate-DIS-logo-name'>Appointments</p>
                <p className='Corporate-DIS-logo-count'>{data.totalUnreadAppointments}</p>
              </div>
            </div>
            <div className='Corporate-DIS-button-profiles'>
              <button onClick={handleView}>View Profile</button>
            </div>
          </div>

          {/* Consultation */}
          <div className="Corporate-DIS-consultation">
            <div className='Corporate-DIS-consultation-coverarea'>
              <div className='Corporate-DIS-consultation-info'>
                <p className='Corporate-DIS-consultation-count'>{dashboardData.totalConsultations}+</p>
                <p className='Corporate-DIS-consultation-label'>Consultations</p>
              </div>
              <img src={consultationimg} className='Corporate-DIS-consultation-img' alt="Consultation" />
            </div>
          </div>

          {/* Reviews */}
          <div className="Corporate-DIS-reviews">
            <div className='Corporate-DIS-reviews-coverarea'>
              <div className='Corporate-DIS-reviews-info'>
                <h2 className='Corporate-DIS-reviews-count'>{dashboardData.totalReviews}+</h2>
                <p className='Corporate-DIS-reviews-label'>Patient Reviews</p>
              </div>
              <img src={reviewsImg} className='Corporate-DIS-reviews-img' alt="Reviews" />
            </div>
          </div>

          {/* Booking Rate */}
          <div className="Corporate-DIS-booking-rate">
            <BookingRate 
              bookingRates={bookingRatesCount} 
              MyInsights={MyInsights}
              setMyInsights={setMyInsights}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewInsights