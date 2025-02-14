import React, { useState } from "react";
import "./FAQProviderProfile.css";
import faqImage from "../../../Assets/faqImage.jpg";

const FAQProviderProfile = ({ doctor }) => {
  const [activeFAQ, setActiveFAQ] = useState(null); // Track the active FAQ
  const [error, setError] = useState(null); // Handle errors


  const handleFAQClick = (index) => {
    setActiveFAQ((prevIndex) => (prevIndex === index ? null : index));
  };
  

  return (
    <section className="PP-FAQ-section">
      <h2>Frequently Asked Questions</h2>
      <div className="PP-FAQ-container">
        {error ? (
          <div className="PP-FAQ-error-message">{error}</div>
        ) : doctor ? (
          <>
            <div className="PP-FAQ-image-container">
              <img
                loading="lazy"
                src={faqImage}
                alt="FAQ illustration"
                className="PP-FAQ-image"
              />
            </div>
            <div className="PP-FAQ-content">
              {doctor?.faqs && doctor?.faqs.length > 0 ? (
                <div className="PP-FAQ-list">
                  {doctor?.faqs.map((item, index) => (
                    <div className="PP-FAQ-item" key={item._id}>
                      <div
                        className="PP-FAQ-question"
                        aria-expanded={activeFAQ === index}
                        aria-controls={`faq-answer-${index}`}
                        onClick={() => handleFAQClick(index)}
                      >
                        <span>{item.question} ?</span>
                        <span className="PP-FAQ-icon">
                          {activeFAQ === index ? "−" : "+"}
                        </span>
                      </div>

                      {activeFAQ === index && (
                        <div
                          id={`faq-answer-${index}`}
                          className="PP-FAQ-answer"
                        >
                          <p>{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p>No FAQs available for this doctor.</p>
              )}
            </div>
          </>
        ) : (
          <div className="PP-FAQ-loading-message">
            Loading Frequently Asked Questions...
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQProviderProfile;
