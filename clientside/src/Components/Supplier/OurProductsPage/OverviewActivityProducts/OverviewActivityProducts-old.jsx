import React, { useState, useRef, useEffect } from 'react';
import "./overviewactivityproducts.css";

// Icons
import { LuPencil } from "react-icons/lu";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { AiFillCamera } from "react-icons/ai";

// Images
import Ellipse from "../Assets/Ellipse 4153.png";

// Default Image
import axios from 'axios';
import { Link } from 'react-router-dom';

const OverviewActivity = ({ overviewData, productCategories, supplierId }) => {
  const posts = [
    {
      author: "Zack Darma",
      timeAgo: "2 months ago",
      image: Ellipse,
      title: "Bacteria Cancer",
      description: "A detailed article about thyroid cancer.\n500+ people viewed your post...",
    },
  ];

  // State Management
  const [overviewText1, setOverviewText1] = useState(overviewData);
  const [specialties, setSpecialties] = useState([]); // Main view specialties
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempOverviewText1, setTempOverviewText1] = useState(overviewText1);
  const [tempSpecialties, setTempSpecialties] = useState([]); // Specialties for modal
  const [isSaving, setIsSaving] = useState(false);
  const [allSpecialties, setAllSpecialties] = useState([]);

  useEffect(() => {
    if (Array.isArray(productCategories)) {
      setSpecialties(productCategories); // Set specialties to the array of strings
    } else {
      setSpecialties([]); // Default to an empty array
    }
    const fetchCorporateDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/supplier/edit-profile`, {
          withCredentials: true,
        }
        );
        const { data } = response; // Ensure data exists
        setAllSpecialties(data?.specialties)
        if (!data) {
          throw new Error("Data property is undefined in the response");
        }
      } catch (error) {
        console.error("Error fetching corporate details:", error.message, error);
      }
    };
    fetchCorporateDetails();
  }, [productCategories]);

  // Modal Functions
  const openModal = () => {
    setTempOverviewText1(overviewText1);
    setTempSpecialties(specialties); // Ensure it's an array of objects
    setIsModalOpen(true);
    document.body.classList.add("scroll-lock");
  };


  const closeModal = () => {
    setIsModalOpen(false);
    document.body.classList.remove("scroll-lock");
  };


  // Save changes from modal
  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const updatedSpecialties = tempSpecialties;  // Convert objects to names
      // Optionally save to the backend
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/supplier/update-profile`,
        {
          overview: tempOverviewText1,
          productCategories: updatedSpecialties,
        },
        { withCredentials: true }
      );

      setSpecialties(updatedSpecialties);
      setOverviewText1(tempOverviewText1);
      alert("Overview updated successfully!");
      closeModal();

    } catch (error) {
      console.error("Error saving changes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle Specialty Selection
  const handleSpecialitiesChange = (event) => {
    const selectedSpeciality = event.target.value;
    if (selectedSpeciality && !tempSpecialties.includes(selectedSpeciality)) {
      setTempSpecialties([...tempSpecialties, selectedSpeciality]);  // Add string
    }
  };  

  // Remove Specialty
  const handleSpecialitiesRemove = (specialityToRemove) => {
    setTempSpecialties(tempSpecialties.filter((speciality) => speciality !== specialityToRemove));
  };


  return (
    <div className="our-providers-overview-activity-container">
      {/* Overview Section */}
      <div className="our-providers-overview">
        <div className="our-providers-overview-edit-icons-contains">
        {sessionStorage.getItem('userId') === supplierId && (
            <div className="our-providers-overview-edit-icons-head">
              <LuPencil className="our-providers-overview-edit-icons" onClick={openModal} />
            </div>
          )}
        </div>
        <h2>Overview</h2>
        <p>
          {overviewData && overviewData.length > 555
            ? `${overviewData.slice(0, 555)}...`
            : 'No overview available'}
        </p>

        <h2>Our Specialties</h2>
        <div className="our-providers-our-specialties-icons-container">
          {specialties.length > 0 ? (
            specialties.map((item, index) => (
              <div key={index} className="our-specialties-icons-item">
                <span>{item}</span>
              </div>
            ))
          ) : (
            <p>No specialties selected yet.</p>
          )}
        </div>
      </div>

      {/* Condition Libraries */}
      <div className="our-providers-activity-container">
        <div className="our-providers-activity-flex-head">
          <h2>Our Articles</h2>
        </div>
        <div className="our-providers-activity-underline"></div>
        <div>
          {posts.map((post, index) => (
            <div key={index} className="our-providers-post-card">
              <div className="our-providers-activity-body-content">
                <p>{post.author} Posted this</p>
                <ul className="m-0">
                  <li>{post.timeAgo}</li>
                </ul>
              </div>
              <div className="our-providers-activity-body-image-content">
                <img src={post.image} alt="post" className="post-image" />
                <div className="our-providers-activity-body-image-content-details">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-description">{post.description}</p>
                  <span className="show-more">show more</span>
                </div>
              </div>
              <h2>
                <Link to={'https://conditions.medxbay.com/'} target='_blank'>
                  Learn more...
                  <FaArrowRightLong size="1rem" className="show-all-conditions-icon" />
                </Link>
              </h2>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="our-providers-overview-modal-container fade-in">
          <div className="our-providers-overview-modal-content">
            <div className="our-providers-overview-close-btn" onClick={closeModal}>
              <IoClose size="1.3rem" className="our-providers-overview-close-icon" />
            </div>
            <h2>Edit Overview</h2>

            {/* Textarea for Overview */}
            <div className="our-providers-overview-textarea-container">
              <div className="our-providers-overview-textarea-head ">
                <textarea
                  rows="4"
                  value={tempOverviewText1}
                  placeholder="Edit the first paragraph..."
                  className="editable-textarea fade-in"
                  onChange={(e) => setTempOverviewText1(e.target.value)}
                />
              </div>
            </div>

            <h2>Our Specialties</h2>
            {/* Specialties Section */}
            <div className="edop-form-row">
              <div className="edop-form-group edop-full-width">
                <label>Specialities</label>
                <div className="tag-container">
                  {/* Display selected specialties as tags */}
                  {tempSpecialties.map((speciality, index) => (
                    <span key={index} className="tag-edit-doctor">
                      {speciality}
                      <button onClick={() => handleSpecialitiesRemove(speciality)}>x</button>
                    </span>
                  ))}

                  {/* Dropdown for adding new specialities */}
                  <select
                    value=""
                    onChange={handleSpecialitiesChange}
                    className="edit-doctor-profile-dropdown"
                  >
                    <option value="" disabled>Select Speciality</option>
                    {allSpecialties
                      .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
                      .map((specialityObj) => (
                        <option key={specialityObj._id} value={specialityObj.name}>
                          {specialityObj.name} {/* Display the name, not the object */}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>


            <div className="our-providers-specialty-edit-popup-button-container">
              <button onClick={saveChanges} disabled={isSaving} className="our-providers-specialty-edit-popup-save-chnages-button fade-in">
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverviewActivity;