import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SupplierDashboardpage.css';
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
  // const [dashboardData, setDashboardData] = useState(null);
  // const [bookingRatesCount, setBookingRatesCount] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch dashboard data from the server
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/supplier/insights`,
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
        // setDashboardData(response.data);
        
        // Set the bookingRatesCount state to the array of counts
        if (response.data.bookingRates) {
          const counts = response.data.bookingRates.map(rate => rate.count);
          // setBookingRatesCount(counts);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
  
    fetchDashboardData();
  }, [MyInsights]); // Dependency array - effect will run when MyInsights changes
  
    // Static data
    const dashboardData = {
      blogsPendingRequest: 1,
      blogsVerified: 16,
      bookingFilter: "month",
      bookingRates: [],
      corporateId: "6731a71eb4a03c2ba3451b78",
      linkedDoctors: [
        { doctorId: 1, name: "Dr. John Doe", specialty: "Cardiology" },
        { doctorId: 2, name: "Dr. Jane Smith", specialty: "Neurology" },
      ],
      totalBlogs: 17,
      totalConsultations: 6,
      totalDoctors: 2,
      totalPatients: 3,
      totalPremiumDoctors: 1,
      totalReviews: 16,
    };
    
  
    const bookingRatesCount = dashboardData.bookingRates || []; // Default to empty array if bookingRates is undefined

  if (!dashboardData) {
    return <Loader/>
  ;
  }

  return (
    <div className='admin-main-dashboard-page'>
      <h2 className='admin-heading-dashboard-page'>Dashboard</h2>
      <div className='admin-dashboard-scoll-head'>
        <div className='admin-dashboard-gird-layout'>

          {/* My Insights */}
          <div className="admin-insight-patient">
            <div className='admin-dashboard-head-common'>
              <p>My Insights</p>
              <div className="admin-select-container">
                <select
                  className="admin-select-box-common"
                  value={MyInsights}
                  onChange={(e) => setMyInsights(e.target.value)}
                >
                  <option value="This Month">This Month</option>
                  <option value="This Week">This Week</option>
                  <option value="This Year">This Year</option>
                </select>
                <RiArrowDownSLine className="arrow-icon-filter" />
              </div>
            </div>

            {/* Insight Items */}
            <div className="admin-insight-item">
              <div className="admin-insight-img-container admin-blue-color">
                <img src={Newpatient} alt="New Patients" className='admin-image-insight' />
              </div>
              <div className="admin-insight-info">
                <h4>Total Customers</h4>
                <p>{dashboardData.totalPatients}</p>
              </div>
            </div>

            <div className="admin-insight-item">
              <div className="admin-insight-img-container admin-dark-blue-color">
                <CiClock2 className='admin-image-insight text-light' />
              </div>
              <div className="admin-insight-info">
                <h4>Pending Orders</h4>
                <p>{dashboardData.blogsPendingRequest}</p>
              </div>
            </div>

            <div className="admin-insight-item">
              <div className="admin-insight-img-container admin-green-color">
                <RiListView className='admin-image-insight text-light' />
              </div>
              <div className="admin-insight-info">
                <h4>Completed Orders</h4>
                <p>{dashboardData.totalConsultations}</p>
              </div>
            </div>
          </div>

          {/* Your Income */}
          <div className="admin-income-head">
            <Yourincome />
          </div>

          {/* My Blogs */}
          <div className="admin-dashboard-blogs-patient">
            <div className='admin-dashboard-head-common'>
              <p>My Blogs</p>
              <div className="admin-select-container">
                <select
                  className="admin-select-box-common"
                  value={blogtimePeriod}
                  onChange={(e) => setBlogtimePeriod(e.target.value)}
                >
                  <option value="This Month">This Month</option>
                  <option value="This Week">This Week</option>
                  <option value="This Year">This Year</option>
                </select>
                <RiArrowDownSLine className="admin-arrow-icon-filter" />
              </div>
            </div>

            {/* Blog Items */}
            <div className="admin-dashboard-blogs-item">
              <div className="admin-blog-img-container admin-dark-blue-color">
                <TbBrandBlogger className='admin-dashboard-image-blogs text-light' />
              </div>
              <div className="admin-dashboard-blogs-info">
                <h4>Total Blogs</h4>
                <p>{dashboardData.totalBlogs}</p>
              </div>
            </div>

            <div className="admin-dashboard-blogs-item">
              <div className="admin-blog-img-container admin-orange-color">
                <MdOutlinePendingActions className='admin-dashboard-image-blogs text-light' />
              </div>
              <div className="admin-dashboard-blogs-info">
                <h4>Pending Blogs</h4>
                <p>{dashboardData.blogsPendingRequest}</p>
              </div>
            </div>

            <div className="admin-dashboard-blogs-item">
              <div className="admin-blog-img-container admin-green-color">
                <img src={experience} className='admin-dashboard-blog-image' alt="Verified Blogs" />
              </div>
              <div className="admin-dashboard-blogs-info">
                <h4>Verified Blogs</h4>
                <p>{dashboardData.blogsVerified}</p>
              </div>
            </div>
          </div>

          {/* Consultation */}
          <div className="admin-consultation">
            <div className='admin-consultation-coverarea'>
              <div className='admin-consultation-info'>
                <p className='admin-consultation-count'>{dashboardData.totalConsultations}+</p>
                <p className='admin-consultation-label'>Products</p>
              </div>
              <img src={consultationimg} className='admin-consultation-img' alt="Consultation" />
            </div>
          </div>

          {/* Reviews */}
          <div className="admin-reviews">
            <div className='admin-reviews-coverarea'>
              <div className='admin-reviews-info'>
                <h2 className='admin-reviews-count'>{dashboardData.totalReviews}+</h2>
                <p className='admin-reviews-label'>Customer Reviews</p>
              </div>
              <img src={reviewsImg} className='admin-reviews-img' alt="Reviews" />
            </div>
          </div>

          {/* Booking Rate */}
          <div className="admin-booking-rate">
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
