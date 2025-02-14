import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BlogDetails from "./BlogDetails";
import PostComment from "./PostComment";
import { IoIosCalendar } from "react-icons/io";
import { TbSquareRoundedArrowDown } from "react-icons/tb";
import axios from 'axios';
import Loader from "../../../../../Loader/Loader";

const BlogCard = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [activeBlog, setActiveBlog] = useState(null);
  const [blogDetails, setBlogDetails] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [blogImage, setBlogImage] = useState(null);

  // Function to convert buffer to base64
  const bufferToBase64 = (buffer) => {
    if (typeof buffer === 'string') {
      return `data:image/jpeg;base64,${buffer}`;
    } else if (buffer?.type === 'Buffer' && Array.isArray(buffer?.data)) {
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

  // Fetch blog details
  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/blogs/view/${id}`);
        const blog = response.data.blog;
        setBlogDetails(blog);

        if (blog?.image?.data) {
          const base64String = bufferToBase64(blog.image.data);
          setBlogImage(base64String);
        }
        if (blog?.profilePicture?.data) {
          const base64String = bufferToBase64(blog.profilePicture.data);
          setProfilePicture(base64String);
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    if (id) {
      fetchBlogDetails();
    }
  }, [id]);

  // Toggle blog details display
  const handleBlogClick = () => {
    setActiveBlog((prev) => (prev === id ? null : id));
  };

  // Function to truncate description
  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return `${description.slice(0, maxLength)}...`;
    }
    return description;
  };
   // Function to format the date as "20 Sep 2024"
   const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  // if (!blogDetails) {
  //   return (
  //     <div className="loader-container">
  //       <div className="loader"></div>
  //     </div>
  //   );
  // }

  return (
    <div className="Adminviewblog-blog-card-container">
      {blogDetails ? (
        <div className="Adminviewblog-blog-card-wrapper">
          <div className="Adminviewblog-blog-card-cnt">
          {activeBlog !== id && (
              <img src={blogImage || ''} alt="blog" className="Adminviewblog-blog-card-img" />
            )}
            <div className="Adminviewblog-blog-card-profileInfo-cnt">
              <div className="Adminviewblog-profileInfo-cnt">
                <img
                  src={profilePicture || ''} // Ensure the src is not null
                  alt="profile"
                  className="Adminviewblog-blog-card-profile-img"
                />
                <div className="Adminviewblog-profileInfo">
                  <h4>{blogDetails.author}</h4>
                  <p>{blogDetails.authorTitle}</p>
                </div>
              </div>
              <div className="Adminviewblog-date-info-cnt">
                <IoIosCalendar size="1.1rem" className="Adminviewblog-date-info-cnt-icon" />
                <p className="Adminviewblog-blue-text">{formatDate(blogDetails.date)}</p>
              </div>
            </div>
            <div className="Adminviewblog-blog-content-preview-cnt">
              <h4>{blogDetails.title}</h4>
               <p className="blog-preview-text" 
               dangerouslySetInnerHTML={{
                  __html: truncateDescription(blogDetails?.description,154)
                }}
                ></p>
            </div>
            <div className="Adminviewblog-readMore-cnt" onClick={handleBlogClick}>
              <h4>Read more in {blogDetails.readCount || 0} Minutes</h4>
              <TbSquareRoundedArrowDown
                size="1.3rem"
                className="Adminviewblog-readMore-cnt-icon"
              />
            </div>
            {activeBlog === id && (
              <div className="Adminviewblog-blogdetailstransition">
                <BlogDetails 
                  blog={blogDetails} 
                  blogImage={blogImage}
                  profilePicture={profilePicture}
                />
                <PostComment blogId={blogDetails._id} />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loader/>
      )}
    </div>
  );
};

export default BlogCard;
