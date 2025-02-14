import React from "react";
import "./AcceptedInsurancesPP.css";

const bufferToBase64 = (logo) => {
  const buffer = logo.data;
  const contentType = logo.contentType;

  if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
    const bytes = new Uint8Array(buffer.data);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:${contentType};base64,${btoa(binary)}`;
  } else {
    console.error('Unexpected buffer type:', typeof buffer);
    return '';
  }
};

const getBaseImage = (logo) => {
  const base64String = bufferToBase64(logo);
  return base64String;
};

const AcceptedInsurancesPP = ({ insurances }) => {
  return (
    <div className="Accepted-Insurances-PP-container">
      <h2>Accepted Insurances</h2>
      <div className="Accepted-Insurances-PP-image-direction">
        {insurances.map((i) => (
          <div className="Accepted-Insurances-PP-item" key={i._id}>
            <img
              loading="lazy"
              src={getBaseImage(i.logo)}
              alt="insurance-logo"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcceptedInsurancesPP;
