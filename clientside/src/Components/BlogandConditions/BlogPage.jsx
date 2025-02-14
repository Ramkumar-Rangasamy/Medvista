import React, { useEffect, useState } from "react";
import "./BlogPage.css";
import { FaTag } from "react-icons/fa"; // Import the FaTag icon
import {
  FaUser,
  FaCalendarAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import profileimg from "../Assets/profileimg.png";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";
import DOMPurify from 'dompurify';

const BlogPage = () => {
  const { id } = useParams();
  const [blogPageData, setBlogPageData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  const loadData = async () => {
    console.log('came')

    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/blogs`
    );
    if (response.data) {
      var data = response.data;
      console.log(data, id)
      setRelatedBlogs(data.recentBlogs)
      setCategories(data.categories)
    }

    const blogPostresponse = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/blogs/view/${id}`
    );
    if (blogPostresponse.data) {
      var data = blogPostresponse.data;
      setBlogPageData(data.blog);
    }
  };


  useEffect(() => {
    loadData();
  }, [id]);

  function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const getProfileImage = (formData) => {
    if (formData?.data?.type === "Buffer") {
      return bufferToBase64(formData.data);
    } else if (typeof formData?.data === "string") {
      return `data:image/jpeg;base64,${formData.data}`;
    } else {
      return profileimg;
    }
  };

  const bufferToBase64 = (buffer) => {
    if (buffer?.type === "Buffer" && Array.isArray(buffer?.data)) {
      const bytes = new Uint8Array(buffer.data);
      let binary = "";
      for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return `data:image/jpeg;base64,${btoa(binary)}`;
    } else {
      console.error("Unexpected buffer type:", typeof buffer);
      return "";
    }
  };

  return (
    <div className="blog-page-container">
      <div className="blog-content">
        <div className="blog-contents">
          <h1 className="blog-title">{blogPageData?.title}</h1>
          <img
            src={`data:image/png;base64,${blogPageData?.image?.data}`}
            alt=""
            className="blog-image"
          />

<p className="blog-paragraph" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(blogPageData?.description) }} />

        </div>
        <div className="author-info-container">
          <div className="author-info-details">
            <FaUser className="info-icon" />
            <span className="info-text">{blogPageData?.author}</span>
            <FaCalendarAlt className="info-icon" />
            <span className="info-text">{formatDate(blogPageData?.date)}</span>
          </div>
          <div className="author-social-icons">
            <FaFacebookF className="social-icon" />
            <FaTwitter className="social-icon" />
            <FaInstagram className="social-icon" />
          </div>
        </div>


      </div>

      <div className="blog-sidebar">
        <div className="blog-search-bar">
          <input
            type="text"
            className="blog-search-input"
            placeholder="Search for related blogs..."
          />
          <button className="blog-search-button">Search</button>
        </div>
        <div className="blog-categories">
          <h3 className="blog-categories-title">Categories</h3>
          <ul className="blog-categories-list">
            {categories.map((val) => {
              return <li className="spacing">
                <FaTag className="category-icon" /> {val}
              </li>
            })}
          </ul>
        </div>
        <div className="blog-related-blogs">
          <h3 className="blog-heading">Related Blogs</h3>
          <div className="related-blog-card-grid">
            {relatedBlogs.filter((val) => { return val._id !== id }).map((relatedBlog, index) => (
              <div key={index} className="recentBlog-card">
                <div className="recentBlog-card-left">
                  <img
                    src={getProfileImage(relatedBlog.image)}
                    alt="Card thumbnail"
                    className="recentBlog-card-image"
                  />
                </div>
                <div className="recentBlog-card-right">
                  <div className="recentBlog-card-flex">
                    <div className="recentBlog-card-chips">
                      {relatedBlog.categories[0]}
                    </div>
                    <div className="recentBlog-card-date">
                      {moment(relatedBlog.date).format("MMM DD, YYYY")}
                    </div>
                  </div>
                  <div className="recentBlog-card-title">{relatedBlog.title}</div>


                  <Link
                    to={`/blogPost/${relatedBlog._id}`}
                    className="recentBlog-card-readmore"
                  >
                    Read more in 8 mins ⟶
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
