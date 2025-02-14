import React, { useRef, useState } from "react";
import "./ClaimProfilePopup.css";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import SubmissionPopup from "./SubmissionPopup"; // Import the popup component

const ClaimProfilePopup = ({ supplierId, handleCloseClaimPopup }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [popupData, setPopupData] = useState(null); // State to control the popup
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State to manage popup visibility

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedType = "application/pdf"; // Only allow PDF
      if (file.type !== allowedType) {
        setFileName("");
        setErrorMessage("Invalid file type. Only PDF files are allowed.");
      } else {
        setFileName(file.name);
        setErrorMessage("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Email is required.");
      return;
    }

    if (!fileName) {
      setErrorMessage("Please upload a valid PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("supplierId", supplierId); // Include supplierId
    formData.append("email", email);
    formData.append("document", fileInputRef.current.files[0]);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/supplier/claim-profile`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      // Set popup data to display success or error message
      if (response.status === 200) {
        setPopupData({
          type: "success",
          message: "Claim profile submitted successfully!",
        });
      } else {
        setPopupData({
          type: "error",
          message: response.data || "Failed to submit claim.",
        });
      }

      // Show the submission popup
      setIsPopupVisible(true);

    } catch (err) {
      console.error(err);
      setPopupData({
        type: "error",
        message: "An error occurred while submitting your claim.",
      });
      setIsPopupVisible(true); // Show the popup even if there's an error
    }
  };

  const closePopup = () => {
    // Close the submission popup first
    setIsPopupVisible(false);
    if (popupData?.type === "success") {
      // Close the claim profile popup if the submission was successful
      handleCloseClaimPopup();
    }
  };

  return (
    <>
      {isPopupVisible && (
        <SubmissionPopup
          type={popupData.type}
          message={popupData.message}
          onClose={closePopup}
        />
      )}
      <div className="Claimprofile-popup-overlay">
        <div className="Claimprofile-popup-content">
          <div className="Claimprofile-popup-close-btn" onClick={handleCloseClaimPopup}>
            <IoClose size="1.3rem" className="Claimprofile-popup-close-icon" />
          </div>
          <h2>Claim Your Profile</h2>
          <p className="Claimprofile-popup-para">
            Please confirm your details to claim this profile. Fill in the necessary
            information below:
          </p>
          <form className="Claimprofile-popup-form-container" onSubmit={handleSubmit}>
            <div className="Claimprofile-popup-input-container">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="Claimprofile-popup-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="Claimprofile-popup-upload-pdf-container">
              <label>Upload ID Proof (PDF only)</label>
              <div className="Claimprofile-popup-header-file">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="Claimprofile-popup-file-input"
                  onChange={handleFileChange}
                />
                <p className="Claimprofile-popup-file-name">
                  {fileName || "No PDF selected"}
                </p>
                <div
                  className="choose-file-Claimprofile-popup"
                  onClick={() => fileInputRef.current.click()}
                >
                  <span>Choose File</span>
                </div>
              </div>
                {errorMessage && (
                  <p style={{ color: "red", fontSize: "12px" }}>{errorMessage}</p>
                )}
            </div>

            <div className="Claimprofile-claim-popup-buttons">
              <button type="submit" className="popup-claim-btn">
                Submit Claim
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClaimProfilePopup;
