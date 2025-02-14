import React from 'react';
import './LocationProviderProfile.css';
import LocationIcon from '../Assets/LocationIcon.png';
import hospitallogo from '../Assets/hospitallogo.png';
import { MdCall } from "react-icons/md";
import { FaDirections } from "react-icons/fa";

const LocationProviderProfile = ({ doctor }) => {
  const getCurrencySymbol = (currency) => {
    try {
      return new Intl.NumberFormat(undefined, { style: "currency", currency }).formatToParts(0).find(part => part.type === "currency")?.value || currency;
    } catch (error) {
      return currency; // Return the currency code if it's invalid or not found
    }
  };

  return (
    <div className="Provider-Profile-location-section">
      <h2>Locations</h2>
      {doctor?.hospitals?.map((location, index) => (
        <div className="doctor-profile-location-container" key={index}>
          <div className="doctor-profile-location-contain">
            <div className="doctor-profile-location-consult-fees-container">
              <div className="doctor-profile-location-name-image">
                <img
                  loading="lazy"
                  src={LocationIcon}
                  alt="LocationIcon"
                  style={{ width: '20px', height: '20px' }}
                />
                <h2>{location?.name || "No location available"}</h2>
              </div>
              <div className="doctor-profile-location-rupee-consult">
                <h2>{getCurrencySymbol(doctor?.doctorFeeCurrency)}{doctor?.doctorFee}</h2>
                <p>({(doctor?.consultation === 'Both' ? "In-Person & Video consultation" : doctor?.consultation) || "No consultation available"})</p>
              </div>
            </div>
            <div className="doctor-profile-location-address-details">

              <div className="Dr-p-address-details-content">
                <div className='Dr-p-address-details-image-details'>
                  <img
                    loading="lazy"
                    src={hospitallogo}
                    alt="hospitallogo"
                    className="hospital-image-dr"
                  />
                  <div className="Dr-p-address">
                    {location?.street}
                    <br />
                    {location?.city}, {location?.state}
                  </div>
                </div>
                <div className="Dr-p-address-details-call-direction">
                  <div className="Dr-p-address-details-call-direction-inside">
                    <MdCall size="1rem" />
                    <span>Call Now</span>
                  </div>
                  <div className="Dr-p-address-details-call-direction-inside">
                    <FaDirections size="1rem" />
                    <span>Get Direction</span>
                  </div>
                </div>
                <button
                  className="Dr-p-address-details-final"
                  onClick={() => window.open(location?.website, "_blank")}
                >
                  Visit website
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationProviderProfile;
