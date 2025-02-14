
import React, { useEffect, useState } from 'react';
import Comment from "./Comment";
import { IoIosCalendar } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { LuEye } from "react-icons/lu";
import { FaEdit } from "react-icons/fa";  
import { IoLogoFacebook, IoLogoLinkedin } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";
import moment from "moment";
import profileImage from "../../../Assets/profileimg.png";
import axios from 'axios';
import EditBlog from './EditBlog';

const bufferToBase64 = (buffer) => {
  if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
    const bytes = new Uint8Array(buffer.data);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/jpeg;base64,${btoa(binary)}`;
  } else {
    console.error('Unexpected buffer type:', typeof buffer);
    return '';
  }
};

function BlogDetails({ blog }) {
  console.log(blog);

  const getProfileImage = (formData) => {
    if (formData?.data?.type === 'Buffer') {
      return bufferToBase64(formData.data);
    } else if (typeof formData?.data === 'string') {
      return `data:image/jpeg;base64,${formData.data}`;
    } else {
      return profileImage;
    }
  };

  const [showAddNewBlog, setShowAddNewBlog] = useState(false);

  const [blogData, setBlogData] = useState([]);
  const [tempBlog, setTempBlog] = useState([]);
  const [reletedPost, setReletedPost] = useState([]);
  const [tags, setTags] = useState([]);
  const [mostReads, setMostReads] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleAddClick = () => {
    setShowAddNewBlog(true);
  };

  const handleCancel = () => {
    setShowAddNewBlog(false);
  };

  const loadBlogs = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/doctor/profile/blogs`,
        { withCredentials: true }
      );
      if (response.data) {
        setBlogData(response.data.blogs);
        setTempBlog(response.data.blogs);
      } else {
        setBlogData([]);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error loading blogs:", error);
      setBlogData([]);
    }
  };

  const loadPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/doctor/blogs`,
        { withCredentials: true }
      );
      if (response.data) {
        const data = response.data;
        setReletedPost(data?.relatedPosts);
        setCategories(data?.categoryCountMap);
        setMostReads(data?.mostReadBlogs);
        setTags(data?.hashtagCountMap);
      } else {
        setReletedPost([]);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error", error);
      setReletedPost([]);
    }
  };

  useEffect(() => {
    loadBlogs();
    loadPosts();
  }, []);

  const handleData = (data) => {
    setTempBlog(data);
  };

  const handleTags = (selectedTag) => {
    const filteredBlogs = blogData.filter(blog =>
      blog.hashtags && blog.hashtags.includes(selectedTag)
    );
    setTempBlog(filteredBlogs);
  };

  const handleCategories = (c) => {
    const filteredBlogs = blogData.filter(blog =>
      blog.categories && blog.categories.includes(c)
    );
    setTempBlog(filteredBlogs);
  };

  return (
    <>
      {showAddNewBlog ? (
        <EditBlog 
          blog={blog} 
          onCancel={handleCancel} 
          loadBlogs={loadBlogs}
        />
      ) : (
        <div className="blog-cnt">
          <div className="blog-post-cnt">
            <h4>{blog.title}</h4>
            <div className="blog-status-info">
              <p className="read-more-text">Read more in 8 Minutes</p>
              <div className="blog-status">
                <div className="date-info-cnt">
                  <IoIosCalendar size="1.1rem" className="date-info-cnt-icon" />
                  <p className="blue-text">{moment(blog.date).format('DD MMM YYYY')}</p>
                </div>
                <div className="date-info-cnt">
                  <TbMessage size="1.1rem" className="date-info-cnt-icon"/>
                  <p className="blue-text">{blog.comments.length}</p>
                </div>
                <div className="date-info-cnt">
                  <LuEye size="1.1rem" className="date-info-cnt-icon"/>
                  <p className="blue-text">{blog.readCount}</p>
                </div>
                <div className="date-info-cnt">
                  <FaEdit 
                    size="1.1rem" 
                    className="date-info-cnt-icon" 
                    onClick={handleAddClick}
                    style={{ cursor: "pointer" }} 
                  />
                  <p className="blue-text"></p>
                </div>
              </div>
            </div>
            
            <img
              src={getProfileImage(blog.image)}
              alt="blog-img"
              className="blog-image"
            />
            <p
              className="blog-description"
              dangerouslySetInnerHTML={{ __html: blog.description }}
            ></p>
            
            <div className="blog-tags">
              {blog.hashtags.map((e) => (
                <div key={e} className="blog-tags-content">
                  <span className="blog-tags-item">{e}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="blogger-details-cnt profileInfo">
            <img
              src={getProfileImage(blog.profilePicture)}
              alt="profile-img"
              className="profile-img"
            />
            <h4>{blog.author}</h4>
            <p>{blog.authorTitle}</p> 
            <p className="profile-bio">
              {/* {author.aboutMe} */}
            </p>
            <div className="profile-socials-cnt">
              <IoLogoFacebook className="facebook-icon"/>
              <IoLogoLinkedin className="facebook-icon"/>
              <FaTwitter className="facebook-icon"/>
              <SiInstagram className="facebook-icon"/>
            </div>
          </div>
          
          <div className="comments-cnt">
            <h4 className="comments-title">Comments</h4>
            <Comment comment={blog.comments}/>
          </div>
        </div>
      )}
    </>
  )
}

export default BlogDetails;
