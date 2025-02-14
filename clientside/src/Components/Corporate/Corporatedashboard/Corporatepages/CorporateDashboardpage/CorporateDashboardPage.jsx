import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CorporateDashboardpage.css';
import reviewsImg from './Assets/reviewsImg.png';
import consultationimg from './Assets/consultationimg.png';
import Newpatient from './Assets/Newpatient.png';
import experience from './Assets/Experience.png'; 
import Yourincome from './Yourincome';
import BookingRate from './BookingRate';
import { RiArrowDownSLine } from "react-icons/ri";
import { CiClock2 } from "react-icons/ci";
import { RiListView } from "react-icons/ri";
import { MdOutlinePendingActions } from "react-icons/md";
import { TbBrandBlogger } from "react-icons/tb";
import Loader from '../../../../Loader/Loader';

const DashboardPage = () => {
  const [MyInsights, setMyInsights] = useState('This Month');
  const [blogtimePeriod, setBlogtimePeriod] = useState('This Month');
  const [dashboardData, setDashboardData] = useState(null);
  const [bookingRatesCount, setBookingRatesCount] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard data from the server
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/corporate/insights`,
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
        
        setDashboardData(response.data);
        
        // Set the bookingRatesCount state to the array of counts
        if (response.data.bookingRates) {
          const counts = response.data.bookingRates.map(rate => rate.count);
          setBookingRatesCount(counts);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
  
    fetchDashboardData();
  }, [MyInsights]); // Dependency array - effect will run when MyInsights changes
  
  if (!dashboardData) {
    return <Loader/>
  ;
  }

  return (
    <div className='Corporate-DBD-main-dashboard-page'>
      <h2 className='Corporate-DBD-heading-dashboard-page'>Dashboard</h2>
      <div className='Corporate-DBD-scoll-head'>
        <div className='Corporate-DBD-gird-layout'>

          {/* My Insights */}
          <div className="Corporate-DBD-insight-patient">
            <div className='Corporate-DBD-head-common'>
              <p>My Insights</p>
              <div className="Corporate-DBD-select-container">
                <select
                  className="Corporate-DBD-select-box-common"
                  value={MyInsights}
                  onChange={(e) => setMyInsights(e.target.value)}
                >
                  <option value="This Month">This Month</option>
                  <option value="This Week">This Week</option>
                  <option value="This Year">This Year</option>
                </select>
                <RiArrowDownSLine className="Corporate-DBD-arrow-icon-filter" />
              </div>
            </div>

            {/* Insight Items */}
            <div className="Corporate-DBD-insight-item">
              <div className="Corporate-DBD-insight-img-container    Corporate-DBD-blue-color">
                <img src={Newpatient} alt="New Patients" className='Corporate-DBD-image-insight' />
              </div>
              <div className="Corporate-DBD-insight-info">
                <h4>New Patients</h4>
                <p>{dashboardData.totalPatients}</p>
              </div>
            </div>

            <div className="Corporate-DBD-insight-item">
              <div className="Corporate-DBD-insight-img-container   Corporate-DBD-dark-blue-color">
                <CiClock2 className='Corporate-DBD-image-insight text-light' />
              </div>
              <div className="Corporate-DBD-insight-info">
                <h4>Pending Requests</h4>
                <p>{dashboardData.blogsPendingRequest}</p>
              </div>
            </div>

            <div className="Corporate-DBD-insight-item">
              <div className="Corporate-DBD-insight-img-container Corporate-DBD-green-color">
                <RiListView className='Corporate-DBD-image-insight text-light' />
              </div>
              <div className="Corporate-DBD-insight-info">
                <h4>Appointments</h4>
                <p>{dashboardData.totalConsultations}</p>
              </div>
            </div>
          </div>

          {/* Your Income */}
          <div className="Corporate-DBD-income-head">
            <Yourincome />
          </div>

          {/* My Blogs */}
          <div className="Corporate-DBD-blogs-patient">
            <div className='Corporate-DBD-head-common'>
              <p>My Articles</p>
              <div className="Corporate-DBD-select-container">
                <select
                  className="Corporate-DBD-select-box-common"
                  value={blogtimePeriod}
                  onChange={(e) => setBlogtimePeriod(e.target.value)}
                >
                  <option value="This Month">This Month</option>
                  <option value="This Week">This Week</option>
                  <option value="This Year">This Year</option>
                </select>
                <RiArrowDownSLine className="Corporate-DBD-arrow-icon-filter" />
              </div>
            </div>

            {/* Blog Items */}
            <div className="Corporate-DBD-blogs-item">
              <div className="Corporate-DBD-blog-img-container Corporate-DBD-dark-blue-color">
                <TbBrandBlogger className='Corporate-DBD-dashboard-image-blogs text-light' />
              </div>
              <div className="Corporate-DBD-blogs-info">
                <h4>Total Articles</h4>
                <p>{dashboardData.totalBlogs}</p>
              </div>
            </div>

            <div className="Corporate-DBD-blogs-item">
              <div className="Corporate-DBD-blog-img-container Corporate-DBD-orange-color">
                <MdOutlinePendingActions className='Corporate-DBD-dashboard-image-blogs text-light' />
              </div>
              <div className="Corporate-DBD-blogs-info">
                <h4>Pending Articles</h4>
                <p>{dashboardData.blogsPendingRequest}</p>
              </div>
            </div>

            <div className="Corporate-DBD-blogs-item">
              <div className="Corporate-DBD-blog-img-container Corporate-DBD-green-color">
                <img src={experience} className='Corporate-DBD-blog-image' alt="Verified Blogs" />
              </div>
              <div className="Corporate-DBD-blogs-info">
                <h4>Verified Articles</h4>
                <p>{dashboardData.blogsVerified}</p>
              </div>
            </div>
          </div>

          {/* Consultation */}
          <div className="Corporate-DBD-consultation">
            <div className='Corporate-DBD-consultation-coverarea'>
              <div className='Corporate-DBD-consultation-info'>
                <p className='Corporate-DBD-consultation-count'>{dashboardData.totalConsultations}+</p>
                <p className='Corporate-DBD-consultation-label'>Consultations</p>
              </div>
              <img src={consultationimg} className='Corporate-DBD-consultation-img' alt="Consultation" />
            </div>
          </div>

          {/* Reviews */}
          <div className="Corporate-DBD-reviews">
            <div className='Corporate-DBD-reviews-coverarea'>
              <div className='Corporate-DBD-reviews-info'>
                <h2 className='Corporate-DBD-reviews-count'>{dashboardData.totalReviews}+</h2>
                <p className='Corporate-DBD-reviews-label'>Patient Reviews</p>
              </div>
              <img src={reviewsImg} className='Corporate-DBD-reviews-img' alt="Reviews" />
            </div>
          </div>

          {/* Booking Rate */}
          <div className="Corporate-DBD-booking-rate">
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

export default DashboardPage;
