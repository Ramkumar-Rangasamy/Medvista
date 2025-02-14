import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "./profilelayout.css";
import profileimg from "../../Assets/profileimg.png";
import axios from "axios";

import { BsCardHeading } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { MdOutlineInbox } from "react-icons/md";
import { LiaFileAltSolid } from "react-icons/lia";
import { FaRegStar } from "react-icons/fa";
import { LuBell } from "react-icons/lu";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";

const ProfileLayout = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profileImage: profileimg,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/patient/profile`, {
        withCredentials: true,
      })
      .then((response) => {
        const { patient } = response.data;

        // Log the response data to check what's being received
        console.log("Fetched user data:", response.data);

        const profileImageData = patient.profilePicture
          ? `data:image/jpeg;base64,${patient.profilePicture.data}` // Update the prefix if the image is not JPEG
          : profileimg;

        setUserData({
          name: patient.name,
          email: patient.email,
          profileImage: profileImageData,
        });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleLogout = () => {
    axios
    .post(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      withCredentials: true,
    })
    .then(() => {
      sessionStorage.clear();
      navigate("https://medxbay.com");
    })
    .catch((error) => {
      console.error("Error during logout:", error);
    });
  };

  return (
    <div className="layout-profile">
      <h1>User Profile</h1>
      <div className="container-profile-head">
        <div className="profile-card">
          <div className="profile-content">
            <img
              src={userData.profileImage}
              className="profileimg"
              alt="Profile"
            />
            <div className="hold-content">
              <p className="name">{userData.name}</p>
              <p className="email">{userData.email}</p>
            </div>
          </div>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="manage/appointments"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <BsCardHeading size="1rem" />
                  <span>Manage Appointments</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="edit/profile"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <FiUser size="1rem" />
                  <span>My Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="inbox"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <MdOutlineInbox size="1rem" />
                  <span>Inbox</span>
                  <IoIosArrowForward />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="prescription"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <LiaFileAltSolid size="1rem" />
                  <span>Prescriptions</span>
                  <IoIosArrowForward />
                </NavLink>
              </li>
              <li>
                <NavLink  
                  to="add-review" 
                  className={({ isActive }) => (isActive ? 'active' : '')}>
                  <FaRegStar size='1rem' />
                  <span>Add Review</span>
                  <IoIosArrowForward />
                </NavLink>
              </li> 
              <li>
                <NavLink
                  to="notification"
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <LuBell size="1rem" />
                  <span>Notification</span>
                  <IoIosArrowForward />
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="logout"
                  onClick={handleLogout}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  <RiLogoutCircleRLine size="1.2rem" />
                  <span>Log Out</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <div className="outlet-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
