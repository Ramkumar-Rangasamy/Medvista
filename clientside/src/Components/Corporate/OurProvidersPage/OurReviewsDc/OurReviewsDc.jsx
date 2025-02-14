import React, { useState } from "react";
import "./ourreviewsdc.css";
import { PiStarBold } from "react-icons/pi";
import moment from "moment"; // Import Moment.js
import Rectangle1 from "../Assets/Rectangle 34624566.png";
import Rectangle2 from "../Assets/Rectangle 34624569.png";
import Rectangle3 from "../Assets/Rectangle 34624571.png";

const OurReviewsDc = ({ patientReviews, doctorReviews }) => {
  // Convert buffer data to Base64
  const bufferToBase64 = (buffer) => {
    if (buffer?.type === "Buffer" && Array.isArray(buffer?.data)) {
      const bytes = new Uint8Array(buffer.data);
      let binary = "";
      bytes.forEach((byte) => (binary += String.fromCharCode(byte)));
      return `data:image/jpeg;base64,${btoa(binary)}`;
    }
    return "";
  };

  return (
    <div className="OurReviewsDc-review-container">
      <h2>Our Reviews</h2>
      <div className="OurReviewsDc-review-card-box">
        {patientReviews.map((review,index) => (
          <div key={review.id || index} className="OurReviewsDc-review-card">
            <div className="OurReviewsDc-review-avatar">
              <img
                src={bufferToBase64(review.patientId.profilePicture.data)}
                alt={review.name}
              />
              <p>{review.name}</p>
            </div>
            <div className="OurReviewsDc-review-content">
              <div className="OurReviewsDc-review-header-container">
                <div className="OurReviewsDc-review-header">
                  <div className="OurReviewsDc-review-rating">
                    {[...Array(5)].map((_, i) => (
                      <PiStarBold
                        key={i}
                        size="1rem"
                        color={i < review.rating ? "orange" : "#ddd"}
                      />
                    ))}
                  </div>
                  <p className="OurReviewsDc-review-date m-0">
                    {moment(review.createdAt).format("MMMM Do YYYY, h:mm A")}
                  </p>
                </div>
                <p className="OurReviewsDc-review-text">{review.reviewText && review.reviewText.length > 205 
    ? `${review.reviewText.slice(0, 205)}...` 
    : review.reviewText || 'No review available'}</p>

              </div>
            </div>
          </div>
        ))}
        {doctorReviews.map((review,index) => (
          <div key={review.id || index} className="OurReviewsDc-review-card">
            <div className="OurReviewsDc-review-avatar">
              <img
                src={bufferToBase64(review.doctorId.profilePicture.data)}
                alt={review.name}
              />
              <p>{review.name}</p>
            </div>
            <div className="OurReviewsDc-review-content">
              <div className="OurReviewsDc-review-header-container">
                <div className="OurReviewsDc-review-header">
                  <div className="OurReviewsDc-review-rating">
                    {[...Array(5)].map((_, i) => (
                      <PiStarBold
                        key={i}
                        size="1rem"
                        color={i < review.rating ? "orange" : "#ddd"}
                      />
                    ))}
                  </div>
                  <p className="OurReviewsDc-review-date m-0">
                    {moment(review.createdAt).format("MMMM Do YYYY, h:mm A")}
                  </p>
                </div>
                <p className="OurReviewsDc-review-text">{review.reviewText && review.reviewText.length > 205 
    ? `${review.reviewText.slice(0, 205)}...` 
    : review.reviewText || 'No review available'}</p>              
    </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurReviewsDc;
