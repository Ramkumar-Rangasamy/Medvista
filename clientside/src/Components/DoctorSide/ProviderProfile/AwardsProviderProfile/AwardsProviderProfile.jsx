import React from "react";
import "./AwardsProviderProfile.css";
import Awardcup from "../Assets/Awardcup.png";

const AwardsProviderProfile = ({doctor}) => {

  return (
    <div className="Awards-PP-container">
      <h2>Awards</h2>
      <div className="Awards-PP-contain">
        {doctor?.awards.map((award, index) => (
          <div className="Awards-PP-item" key={index}>
            <img
              loading="lazy"
              src={Awardcup}
              alt="award-image"
              className="Awards-PP-icon"
            />
            <p className="Awards-PP-desi">{award}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AwardsProviderProfile;
