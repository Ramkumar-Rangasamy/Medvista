import React, { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";
import { AiOutlineDoubleRight } from "react-icons/ai";
import axios from "axios";
import "./ourproviderspepop.css";

const OurProvidersPEPOP = ({ tempProfileData, handleSubmit, closeEditPopup,refreshProfileData }) => {
  
  const fileInputRef = useRef(null);

  // Local state to manage the form fields
  const [formData, setFormData] = useState({
    corporateName: tempProfileData.corporateName || "",
    tagline: tempProfileData.tagline || "",
    // overview: tempProfileData.overview || "",
    showConditionLibrary : tempProfileData.showConditionLibrary,
    showDoctors : tempProfileData.showDoctors,
    showReviews : tempProfileData.showReviews,
    showSpecialties : tempProfileData.showSpecialties,
    address: {
      street: tempProfileData.address.street || "",
      city: tempProfileData.address.city || "",
      state: tempProfileData.address.state || "",
      zipCode: tempProfileData.address.zipCode || "",
      country: tempProfileData.address.country || "",
    },
  });

  const [profileImage, setProfileImage] = useState(tempProfileData.profilePicture?.data);
  const [currentFile, setCurrentFile] = useState(null);

  // Handle profile image change and show preview
  const handleProfileImageChangeLocal = (event) => {
    const file = event.target.files[0];
    if (file && file !== currentFile) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      setCurrentFile(file);
    }
  };
    // Convert buffer data to Base64
    const bufferToBase64 = (buffer) => {
      if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
        const bytes = new Uint8Array(buffer.data);
        let binary = '';
        bytes.forEach(byte => binary += String.fromCharCode(byte));
        return `data:image/jpeg;base64,${btoa(binary)}`;
      }
      return '';
    };

  // Handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("location.")) {
      const locationField = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [locationField]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Submit form data, including image, via Axios
// Submit form data, including image, via Axios
const handleFormSubmit = async (e) => {
  e.preventDefault();

  // Extract address fields from formData.location
  const address = {
    street: formData.address.street,
    city: formData.address.city,
    state: formData.address.state,
    zipCode: formData.address.zipCode,
    country: formData.address.country,
  };
 
  const formDataToSend = new FormData();
  formDataToSend.append("profilePicture", currentFile);
  formDataToSend.append("corporateName", formData.corporateName);
  formDataToSend.append("tagline", formData.tagline);
  formDataToSend.append("showConditionLibrary", formData.showConditionLibrary);
  formDataToSend.append("showDoctors", formData.showDoctors);
  formDataToSend.append("showReviews", formData.showReviews);
  formDataToSend.append("showSpecialties", formData.showSpecialties);
  formDataToSend.append("address", JSON.stringify(address)); // Convert address object to JSON string
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/corporate/edit-profile`,
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true, // Make sure this is configured for session management
      }
    );
    refreshProfileData()
    alert("Profile updated successfully");
    window.location.reload();
    closeEditPopup();
  } catch (error) {
    console.error("Error updating profile:", error);
    alert("Failed to update profile");
  }
};


  // Trigger file input on icon click
  const handleEditClick = () => fileInputRef.current.click();
  const handleToggleChange = (key) => {
    setFormData((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="our-providers-edit-popup-container">
      <div className="our-providers-edit-popup-content">
        <div className="our-providers-close-btn" onClick={closeEditPopup}>
          <IoClose size="1.3rem" className="our-providers-close-icon" />
        </div>
        <h2>Basic Info</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="our-providers-profile-image-Name-container">
            <div className="our-providers-profile-image-edit-popup">
              <label>Profile Image:</label>
              <div className="our-providers-pop-image-preview-image">
                <img src={bufferToBase64(profileImage)} alt="Profile Preview" />
              </div>
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="our-providers-edit-popup-input"
                  onChange={handleProfileImageChangeLocal}
                  accept=".jpg,.jpeg,.png,.gif,.bmp,.webp"
                  style={{ display: "none" }}
                />
                <p
                  onClick={handleEditClick}
                  className="our-providers-edit-popup-add-photo-text"
                >
                  <AiFillCamera size="1.5rem" /> Add photo
                </p>
              </div>
            </div>

            <div className="our-providers-edit-popup-right-side-content">
              <label className="our-providers-edit-popup-form-label">
                Name:
                <input
                  type="text"
                  name="corporateName"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter your name"
                  value={formData.corporateName}
                  onChange={handleFieldChange}
                />
              </label>


              <label className='our-providers-edit-popup-form-label'>
              Headline:
                <div className='our-providers-edit-popup-textarea-container'>
                  <textarea
                    type="text"
                    name="tagline"
                    rows="4"
                    cols="50"
                    placeholder="Enter your location"
                    className='our-providers-edit-popup-textarea'
                    value={formData.tagline}

                    onChange={handleFieldChange}
                    />
                </div>
              </label>

              <label className="our-providers-edit-popup-form-label">
                Street :
                <input
                  type="text"
                  name="location.street"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter street"
                  value={formData.address.street}
                  onChange={handleFieldChange}
                />
              </label>

              <label className="our-providers-edit-popup-form-label">
                City:
                <input
                  type="text"
                  name="location.city"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter city"
                  value={formData.address.city}
                  onChange={handleFieldChange}
                />
              </label>

              <label className="our-providers-edit-popup-form-label">
                State:
                <input
                  type="text"
                  name="location.state"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter state"
                  value={formData.address.state}
                  onChange={handleFieldChange}
                />
              </label>

              <label className="our-providers-edit-popup-form-label">
                Country:
                <input
                  type="text"
                  name="location.country"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter country"
                  value={formData.address.country}
                  onChange={handleFieldChange}
                />
              </label>

              <label className="our-providers-edit-popup-form-label">
                Zip Code:
                <input
                  type="text"
                  name="location.zipCode"
                  className="our-providers-edit-popup-input"
                  placeholder="Enter zip code"
                  value={formData.address.zipCode}
                  onChange={handleFieldChange}
                />
              </label>

              <div className={`edit-your-profile-details-section`}>
                <div className="edit-your-profile-section-header" >
                  <h3>Doctor Profile details</h3>
                  <span>
                  </span>
                </div>
                <div className=" pl-3">

                {/* <ToggleButton
                    label="Show Specialties"
                    isChecked={formData.showSpecialties}
                    onChange={() => handleToggleChange("showSpecialties")}
                  /> */}
                  
                  <ToggleButton
                    label="Show Providers"
                    isChecked={formData.showDoctors}
                    onChange={() => handleToggleChange("showDoctors")}
                  />
                  <ToggleButton
                    label="Show Reviews"
                    isChecked={formData.showReviews}
                    onChange={() => handleToggleChange("showReviews")}
                  />
                  <ToggleButton
                    label="Show Articles"
                    isChecked={formData.showConditionLibrary}
                    onChange={() => handleToggleChange("showConditionLibrary")}
                  />
                  <p className='edop-toggle-note'>
                      *If you turn this ON, these details will be visible on the Doctor Profile.
                    </p>
                </div>

              </div>


              <button type="submit" className="our-providers-edit-popup-save-chnages">
                <AiOutlineDoubleRight /> Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
      
    </div>
  );
};
const ToggleButton = ({ label, isChecked, onChange }) => {
  return (
    <div className="our-providers-edop-toggle-container">
      <label className="our-providers-edop-toggle-switch">
        <input type="checkbox" checked={isChecked} onChange={onChange} />
        <span className="our-providers-edop-slider"></span>
      </label>
      <span className="our-providers-edop-toggle-label">{label}</span>
    </div>
  );
};
export default OurProvidersPEPOP;
