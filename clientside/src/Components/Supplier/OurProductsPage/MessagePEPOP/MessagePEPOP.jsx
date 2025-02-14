import React, { useState } from "react";
import axios from "axios";
import "./MessagePEPOP.css";
import { IoClose } from "react-icons/io5";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const MessagePEPOP = ({ closeEditMessagePopup, supplierId }) => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    phone: "",
    email: "",
    interestedProduct: "",
    message: "",
    timeframe: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage(""); // Reset success message before new submission

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/supplier/${supplierId}/send-message`,
        formData
      );

      setSuccessMessage("Message sent successfully! Wait for a reply from the supplier.");
      setFormData({
        name: "",
        companyName: "",
        phone: "",
        email: "",
        interestedProduct: "",
        message: "",
        timeframe: "",
      }); // Clear form fields after success
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Supplier-message-popup-container">
      <div className="Supplier-popup-content">
        <div className="Supplier-popup-close-btn-container" onClick={closeEditMessagePopup}>
          <IoClose size="1.3rem" className="Supplier-popup-close-btn-icon" />
        </div>
        <h2 className="Supplier-popup-content-title">Messaging</h2>

        {error && <p className="error-message">{error}</p>}

        {/* Show success message popup when message is sent */}
        {successMessage ? (
          <div className="Supplier-popup-success-popup">
            <p>{successMessage}</p>
            <button className="Supplier-popup-success-popup-btn" onClick={closeEditMessagePopup}>
              OK
            </button>
          </div>
        ) : (
          <form className="Supplier-popup-form" onSubmit={handleSubmit}>
            <div className="Supplier-popup-form-flex-container">
              <label className="Supplier-popup-form-group-label">
                Name:
                <input
                  type="text"
                  name="name"
                  className="Supplier-popup-form-group-input"
                  placeholder="Enter your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="Supplier-popup-form-group-label">
                Email:
                <input
                  type="email"
                  name="email"
                  className="Supplier-popup-form-group-input"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>

            <div className="Supplier-popup-form-flex-container">
              <label className="Supplier-popup-form-group-label">
                Phone Number:
                <div className="Supplier-popup-form-phone-number-number">
                  <PhoneInput
                    country={"us"}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    enableSearch={true}
                    required
                  />
                </div>
              </label>

              <label className="Supplier-popup-form-group-label">
                What timeframe are you purchasing?:
                <select
                  name="timeframe"
                  className="Supplier-popup-select-box"
                  value={formData.timeframe}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Timeframe</option>
                  <option value="ASAP">ASAP</option>
                  <option value="Next 30 days">Next 30 days</option>
                  <option value="1 - 3 months">1 - 3 months</option>
                  <option value="4 - 6 months">4 - 6 months</option>
                  <option value="6 months+">6 months+</option>
                </select>
              </label>
            </div>

            <label className="Supplier-popup-form-group-label">
              Company (if relevant):
              <input
                type="text"
                name="companyName"
                className="Supplier-popup-form-full-width-group-input"
                placeholder="Enter your Company (if relevant)"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </label>

            <label className="Supplier-popup-form-group-label">
              What product/service are you interested in?
              <textarea
                name="interestedProduct"
                placeholder="Type here"
                className="Supplier-popup-form-full-width-group-textarea"
                value={formData.interestedProduct}
                onChange={handleChange}
                required
              />
            </label>

            <label className="Supplier-popup-form-group-label">
              Message
              <textarea
                name="message"
                placeholder="Type here"
                className="Supplier-popup-form-full-width-group-textarea"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            <div className="Supplier-popup-submit-button-contianer">
              <button type="submit" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default MessagePEPOP;
