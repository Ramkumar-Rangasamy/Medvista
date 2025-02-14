import React from "react";
import { IoCheckmarkCircle, IoCloseCircle } from "react-icons/io5";
import "./SubmissionPopup.css";

const SubmissionPopup = ({ type, message, onClose }) => {
  return (
    <div className="SubmissionPopup-overlay">
      <div className={`SubmissionPopup-content ${type}`}>
        {type === "success" ? (
          <IoCheckmarkCircle size="3rem" color="#007bff" />
        ) : (
          <IoCloseCircle size="3rem" color="#FF7F50" />
        )}
        <h2>{type === "success" ? "Success" : "Error"}</h2>
        <p>{message}</p>
        <button className="SubmissionPopup-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default SubmissionPopup;
