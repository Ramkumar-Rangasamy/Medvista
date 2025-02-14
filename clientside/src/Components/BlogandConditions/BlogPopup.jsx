import React, { useState, useEffect } from 'react';
import './BlogPopup.css';

const BlogPopup = ({ show, handleClose }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const launchDate = new Date('2024-12-31T00:00:00'); // Set the desired launch date here
    const countdownInterval = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference <= 0) {
        clearInterval(countdownInterval);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  if (!show) return null;

  return (
    <div className="blog-popup-overlay">
      <div className="blog-popup-content">
        <h2>We're Launching Soon!</h2>
        <p>Stay tuned for exciting updates and content coming your way. Thank you for your patience!</p>
        <div className="countdown-timer">
          
        </div>
        <button className="blog-popup-close-button" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default BlogPopup;
