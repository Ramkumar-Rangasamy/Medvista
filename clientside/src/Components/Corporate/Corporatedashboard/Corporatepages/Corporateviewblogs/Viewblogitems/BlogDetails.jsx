import React from "react";
import Comment from "./Comment";
import PostComment from "./PostComment";  
import { IoIosCalendar } from "react-icons/io";
import { TbMessage } from "react-icons/tb";
import { LuEye } from "react-icons/lu";
import { IoLogoFacebook } from "react-icons/io5";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaTwitter } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";

function BlogDetails({ blog ,blogImage,profilePicture}) {
  console.log(blog);
  
  const comments = Array.isArray(blog.comments) ? blog.comments : [];

  // Function to format the date as "20 Sep 2024"
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };
  return (
    <div className="Adminviewblog-blog-cnt">
      <div className="Adminviewblog-blog-post-cnt">
        <h4>{blog.title}</h4>
        <div className="Adminviewblog-blog-status-info">
          <p className="Adminviewblog-read-more-text">Read more in {blog.readTime} Minutes</p>
          <div className="Adminviewblog-blog-status">
            <div className="Adminviewblog-date-info-cnt">
              <IoIosCalendar size="1.1rem" className="Adminviewblog-date-info-cnt-icon" />
              <p className="Adminviewblog-blue-text">{formatDate(blog.date)}</p>
            </div>
            <div className="Adminviewblog-date-info-cnt">
              <TbMessage size="1.1rem" className="Adminviewblog-date-info-cnt-icon"/>
              <p className="Adminviewblog-blue-text">{blog.comments.length}</p>
            </div>
            <div className="Adminviewblog-date-info-cnt">
              <LuEye size="1.1rem" className="Adminviewblog-date-info-cnt-icon"/>
              <p className="Adminviewblog-blue-text">{blog.readCount}</p>
            </div>
          </div>
        </div>

        <img
          src={blogImage ? blogImage : ""}
          alt="blog-img"
          className="Adminviewblog-blog-image"
        />
          <p className="Adminviewblog-blog-description" dangerouslySetInnerHTML={{
                  __html: blog?.description
                }}></p>
        <div className="Adminviewblog-social-reach-cnt">
          <IoLogoFacebook className="Adminviewblog-facebook-icon"/>
          <span>{blog.facebookLikes}</span>
        </div>
        <div className="Adminviewblog-blog-tags">
  {Array.isArray(blog.hashtags) && blog.hashtags.length > 0 ? (
    blog.hashtags.map((tag, index) => (
      <div key={index} className="Adminviewblog-blog-tags-content">
        <span className="Adminviewblog-blog-tags-item">#{tag}</span>
      </div>
    ))
  ) : (
    <p>No tags available</p>
  )}
</div>

      </div>
      
      <div className="Adminviewblog-blogger-details-cnt Adminviewblog-profileInfo">
        <img
          src={profilePicture ? profilePicture : ""}
          alt="profile-img"
          className="Adminviewblog-profile-img"
        />
        <h4>{blog.author}</h4>
        <p>{blog.authorTitle}</p>
        <p className="Adminviewblog-profile-bio">
          {blog.aboutMe}
        </p>
        <div className="Adminviewblog-profile-socials-cnt">
          <IoLogoFacebook className="Adminviewblog-facebook-icon"/>
          <IoLogoLinkedin className="Adminviewblog-facebook-icon"/>
          <FaTwitter className="Adminviewblog-facebook-icon"/>
          <SiInstagram className="Adminviewblog-facebook-icon"/>
        </div>
      </div>

      <div className="Adminviewblog-comments-cnt">
        <h4 className="Adminviewblog-comments-title">Comments</h4>

        <Comment comments={blog.comments} />
      </div>
    </div>
  );
}

export default BlogDetails;
