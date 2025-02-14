import React, { useState, useEffect } from 'react';
import './manageAppointments.css';
import { useLocation } from 'react-router-dom';
import { RiSearchLine } from 'react-icons/ri';
import { FaStar } from "react-icons/fa6";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const ManageAppointments = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.includes('add-review') ? 'Completed' : 'All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleAppointments, setVisibleAppointments] = useState(6);
  const [bookings, setBookings] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [reviewModalIsOpen, setReviewModalIsOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState({ rating: 0, reviewText: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // Effect to update active tab when the route changes
  useEffect(() => {
    if (location.pathname.includes('add-review')) {
      setActiveTab('Completed');
    } else {
      setActiveTab('All');
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/bookings`, { withCredentials: true });
        console.log('Fetched bookings response:', response.data); 
        if (Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
        } else {
          console.error('Expected an array for bookings data');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

 
  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'accepted':
        return 'green';
      case 'waiting':
        return 'orange';
      case 'rejected':
        return 'red';
      case 'completed':
        return 'blue';
      default:
        return 'gray'; 
    }
  };


  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const getFilteredAppointments = () => {
    let filtered = bookings;
    // Apply status filter based on active tab
    switch (activeTab) {
      case 'Upcoming':
        filtered = filtered.filter(booking => booking.status === 'accepted' && new Date(booking.date) >= new Date());
        break;
      case 'Completed':
        filtered = filtered.filter(booking => booking.status === 'completed');
        break;
      case 'Cancelled':
        filtered = filtered.filter(booking => booking.status === 'rejected');
        break;
      case 'All':
      default:
        break;
    }

    // apply search filter based on doctor name
    if (searchQuery) {
      filtered = filtered.filter(booking => 
        booking.doctor && booking.doctor?.name.toLowerCase().includes(searchQuery)
      );
    }
    return filtered;
  };

  const filteredBookings = getFilteredAppointments();

  const toggleAppointmentsVisibility = () => {
    setVisibleAppointments(prev => (prev === 5 ? filteredBookings.length : 5));
  };

  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setModalIsOpen(false);
  };

  const openReviewModal = (appointment) => {
    setSelectedAppointment(appointment);
    setReviewModalIsOpen(true);
  };

  const closeReviewModal = () => {
    setSelectedAppointment(null);
    setReviewModalIsOpen(false);
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm({ ...reviewForm, [name]: value });
  };

  const handleRatingChange = (rating) => {
    setReviewForm({ ...reviewForm, rating });
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(reviewForm);
  
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/patient/review/${selectedAppointment.doctor._id}/${selectedAppointment._id}`,
        reviewForm,
        { withCredentials: true }
      );
  
      console.log('Review submitted:', response.data);
  
      toast.info('Review submitted successfully!', {
        className: 'toast-center',
        autoClose: 5000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: () => closeReviewModal() 
      });
      
    } catch (error) {
      console.error('Error submitting review:', error);
  
      toast.info('Failed to submit review. Please try again.', {
        className: 'toast-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  const StarRating = ({ rating, onChange, starCount }) => {
    const handleClick = (index) => {
      onChange(index + 1);
    };
    useEffect(() => {
      validateForm();
    }, [reviewForm]);
  
    const validateForm = () => {
      const { reviewText, rating } = reviewForm;
      const specialCharRegex = /[^A-Za-z0-9\s,."()]/;
      const consecutiveSpacesRegex = /\s{3,}/;
  
      if (/\d/.test(reviewText)) {
        setErrorMessage('Comments cannot contain numbers');
        setIsSubmitDisabled(true);
        return;
      }
      if (specialCharRegex.test(reviewText)) {
        setErrorMessage('Comments cannot contain special characters');
        setIsSubmitDisabled(true);
        return;
      }
      if (consecutiveSpacesRegex.test(reviewText)) {
        setErrorMessage('Comments cannot contain more than 2 consecutive spaces');
        setIsSubmitDisabled(true);
        return;
      }
  

      if (!reviewText.trim()) {
        setErrorMessage('Comments cannot be empty');
        setIsSubmitDisabled(true);
        return;
      }
      if (!rating || rating === 0) {
        setErrorMessage('Please select a rating before submitting.');
        setIsSubmitDisabled(true);
        return;
      }

      setErrorMessage('');
      setIsSubmitDisabled(false);
    };
  
    return (
      <div className="star-rating">
        {[...Array(starCount)].map((_, index) => (
          <span
            key={index}
            className={`star ${rating > index ? 'filled' : ''}`}
            onClick={() => handleClick(index)}
          >
            <FaStar/>
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="appointments-container">
      <h2>My Appointments</h2>
      <div className="tabs-container">
        <div className="tabs">
          <button className={`tab ${activeTab === 'All' ? 'active' : ''}`} onClick={() => setActiveTab('All')}>All</button>
          <button className={`tab ${activeTab === 'Upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('Upcoming')}>Upcoming</button>
          <button className={`tab ${activeTab === 'Completed' ? 'active' : ''}`} onClick={() => setActiveTab('Completed')}>Completed</button>
          <button className={`tab ${activeTab === 'Cancelled' ? 'active' : ''}`} onClick={() => setActiveTab('Cancelled')}>Cancelled</button>
        </div>
        <div className="user-search-bar">
          <input
            type="text"
            placeholder="Search for doctor..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <RiSearchLine className="user-search-bar-icon" />
        </div>
      </div>
      <div className="appointments-table-container">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(filteredBookings) && filteredBookings.length > 0 ? (
              filteredBookings.slice(0, visibleAppointments).map(({ _id, doctor, date, time, status, consultationType, hospital, meetingLink }) => (
                <tr key={_id}>
                  <td>{doctor ? doctor?.name : 'N/A'}</td>
                  <td>{new Date(date).toLocaleDateString()}</td>
                  <td>{time}</td>
                  <td><span className={`status-dot ${getStatusClass(status)}`}></span></td>
                  <td>
                    {activeTab === 'Completed' ? (
                      <button className="add-review-button mr-2" onClick={() => openReviewModal({ _id, doctor, date, time, status, consultationType, hospital, meetingLink })}>
                        Add Review
                      </button>
                    ) : (
                      <button className="view-button" onClick={() => openModal({ _id, doctor, date, time, status, consultationType, hospital, meetingLink })}>
                        View Appointment
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredBookings.length > 5 && (
        <button className="view-all-button" onClick={toggleAppointmentsVisibility}>
          {visibleAppointments === 5 ? 'View All' : 'View Less'}
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Appointment Details"
        className="view-appointment-modal"
        overlayClassName="custom-overlay"
      >
        <div className="appointment-modal-content ">
          <h2>Appointment Details</h2>
          {selectedAppointment ? (
            <>
              <p><strong>Doctor:</strong> {selectedAppointment?.doctor?.name}</p>
              <p><strong>Date:</strong> {new Date(selectedAppointment.date).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {selectedAppointment.time}</p>
              <p><strong>Status:</strong> {selectedAppointment.status}</p>
              {selectedAppointment.consultationType === 'In-person' ? (
                <div>
                  <strong>Doctor Location:</strong>
                  <br />
                  <ul className='list-unstyled'>
                    <li><b> Hospital Name : </b>{selectedAppointment?.hospital?.name}</li>
                    <li><b> Location : </b>{selectedAppointment?.hospital?.location?.country} , 
                      {selectedAppointment?.hospital?.location?.state} , 
                      {selectedAppointment?.hospital?.location?.city},
                      {selectedAppointment?.hospital?.location?.street},
                      {selectedAppointment?.hospital?.location?.zip}
                      </li>
                      {/* // <li>
                      //   {hospital.street}, {hospital.city}, {hospital.state}, {hospital.country}
                      // </li> */}
                      
                  </ul>
                </div>
              ) : (
                <p><strong>Meeting Link:</strong> <a href={selectedAppointment?.meetingLink} target="_blank" rel="noopener noreferrer">Join Meeting</a></p>
              )}
            </>
          ) : (
            <p>No appointment selected.</p>
          )}
          <button onClick={closeModal} className="close-modal-button">Close</button>
        </div>

      </Modal>

      <Modal
        isOpen={reviewModalIsOpen}
        onRequestClose={closeReviewModal}
        contentLabel="Add Review"
        className="review-custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="review-modal-content">
          {selectedAppointment ? (
            <>
              <h2>Add Review for {selectedAppointment?.doctor?.name}</h2>
              <form onSubmit={handleReviewSubmit}>
                <div>
                  <label>
                    Rating:
                    <StarRating
                      rating={reviewForm.rating}
                      onChange={handleRatingChange}
                      starCount={5}
                    />
                  </label>
                </div>
                <div>
                  <label>
                    Comments:
                    <textarea
                      name="reviewText"
                      id="reviewText"
                      value={reviewForm.reviewText}
                      onChange={handleReviewChange}
          
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                  </label>
                </div>
                <button
                  type="submit"
                  className="submit-review-button"
                  disabled={isSubmitDisabled} 
                >
                  Submit Review
                </button>              
                <button type="button" onClick={closeReviewModal} className="close-modal-button">
                Close
                </button>
              </form>
            </>
          ) : (
            <p>No appointment selected.</p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ManageAppointments;