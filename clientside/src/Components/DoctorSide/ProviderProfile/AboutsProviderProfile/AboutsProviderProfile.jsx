import React from 'react'
import './AboutsProviderProfile.css';

import { FaCalendar } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";
import { FaPlusCircle } from "react-icons/fa";
import { RiFileList3Fill } from "react-icons/ri";
import { MdInterpreterMode } from "react-icons/md";
import { MdCall } from "react-icons/md";
import { FaDirections } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";

import Ellipse from "../Assets/Ellipse 4153.png";
import Tickimage from '../Assets/Tick.png';
import moment from 'moment';
import { Link } from 'react-router-dom';

const AboutsProviderProfile = ({doctor}) => {
    const posts = [
      {
        author: "Zack Darma",
        timeAgo: "2 months ago",
        image: Ellipse,
        title: "Bacteria Cancer",
        description: "A detailed article about thyroid cancer.\n500+ people viewed your post...",
      },
    ];


  return (
    <div className="providers-profile-Abouts-container">
      <div className="providers-profile-Abouts-sub-content">
        <h2>About</h2>
        <p className="providers-profile-about-description">
          {doctor?.aboutMe || "No description available"}
        </p>

        <div className="providers-profile-about-date-country-container">
          <FaCalendar className="providers-profile-about-about-icons-all"/>
          {/* <p>
            {doctor?.dateOfBirth
              ? new Intl.DateTimeFormat("en-US", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(doctor.dateOfBirth))
              : "No date of birth available"}
          </p> */}
          <p>{doctor?.dateOfBirth ? moment(doctor.dateOfBirth).format("DD MMM YYYY") : "No dob available"}</p>
          <span className="providers-profile-about-one-line"></span>
          <FaMapMarkerAlt className="providers-profile-about-about-icons-all"/>
          <p>{doctor?.country || "No location available"}</p>
        </div>

        <div className="providers-profile-about-date-country-container">
          <FaAward className="providers-profile-about-about-icons-all"/>
          {doctor?.speciality?.map((speciality, index) => (
              <p key={index}>
                {speciality || "No speciality available"}
                {index < doctor.speciality.length - 1 ? ", " : ""}
              </p>
            ))}
        </div>

        <div className="providers-profile-about-date-country-container">
          <FaPlusCircle  className="providers-profile-about-about-icons-all"/>
          {doctor?.conditions?.map((condition, index) => (
            <p key={index}>
              {condition || "No conditions available"}
              {index < doctor.conditions.length - 1 ? ", " : ""}
            </p>
          ))}
        </div>

        <div className="providers-profile-about-date-country-container">
          <RiFileList3Fill className="providers-profile-about-about-icons-all" />
          <p>{doctor.treatmentApproach || "No treatment approaches"}
          </p>
        </div>

        <div className="providers-profile-about-date-country-container">
          <MdInterpreterMode className="providers-profile-about-about-icons-all"/>
          {/* <span className="providers-profile-about-one-line"></span> */}
          <span>{doctor?.consultation || "No consultation available"}</span>
        </div>

        <h2>Languages</h2>
        <div className="providers-profile-about-date-country-container">
        {doctor?.languages?.map((language, index) => (
            <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
              <img
                loading="lazy"
                src={Tickimage}
                alt=""
                style={{ width: '16px', height: '16px' }} // Adjust size as needed
              />
              <span style={{ marginRight: '5px', marginLeft: '5px', fontWeight: '500', color: '#4B5563' }}>
                {language || "No languages available"}
              </span>
              <span className="providers-profile-about-one-line"></span>
            </div>
          ))}
        </div>

      </div>
      {/* Condition Libraries */}
      {doctor?.showArticle && (
      <div className="PP-CL-container">
        <div className="PP-CL-activity-flex-head">
          <h2>Our Articles</h2>
        </div>
        <div className="PP-CL-activity-underline"></div>
        <div>
          {posts.map((post, index) => (
            <div key={index} className="PP-CL-post-card">
              <div className="PP-CL-activity-body-content">
                <p>{post.author} Posted this</p>
                <ul className="m-0">
                  <li>{post.timeAgo}</li>
                </ul>
              </div>
              <div className="PP-CL-activity-body-image-content">
                <img src={post.image} alt="post" className="post-image" />
                <div className="PP-CL-activity-body-image-content-details">
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
      )}
    </div>  
  )
}

export default AboutsProviderProfile