import React, { useState, useEffect } from 'react';
import './BlogCarousel.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import moment from 'moment';
import profileimg from "../Assets/profileimg.png";
import { RiArrowDownSLine } from "react-icons/ri";
import Loader from '../Loader/Loader';

const BlogCarousel = () => {
  const [blogData, setBlogData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { condition, category } = useParams();
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 2;

  // Fetch blog data based on the condition and category
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(false);

      let apiUrl;

    // Ensure 'condition' or 'category' is defined
    // if (!condition) {
    //   console.error("Condition is undefined or empty");
    //   setLoading(false);
    //   return;
    // }
       // Handle different API calls based on category
    switch (category.toLowerCase()) {
      case 'recent blog':
        apiUrl = `${process.env.REACT_APP_BASE_URL}/patient/blogs/conditions/${encodeURIComponent(condition)}/recent-blogs`; // Update with actual route for recent blogs
        break;

      case 'most reads':
        apiUrl = `${process.env.REACT_APP_BASE_URL}/patient/blogs/conditions/${encodeURIComponent(condition)}/most-read-blogs`; // Update with actual route for most reads
        break;

      // case 'recommended reading':
      //   apiUrl = `${process.env.REACT_APP_BASE_URL}/patient/blogs/conditions/${encodeURIComponent(condition)}/recommended-blogs`; // Update with actual route for recommended reading
      //   break;

      default:
        // Fallback for conditions with spaces (e.g., diseases)
        apiUrl = `${process.env.REACT_APP_BASE_URL}/patient/blogs/conditions/${encodeURIComponent(condition)}/category/${category}`;
        break;
    }
      try {
        const response = await axios.get(apiUrl, { withCredentials: true });
        setBlogData(response.data.blogs || []); // Ensure to use response.data.blogs as per your backend structure
        console.log(response.data.blogs);
        setLoading(false);

        
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);

      }
    };
    fetchBlogs();
  }, [condition, category]); // Also include category in the dependency array

 // Filter blogData based on search term
 const filteredBlogs = blogData.filter((blog) =>
  blog.title?.toLowerCase().includes(searchTerm?.toLowerCase())
);

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem); // Updated to reflect current items based on pagination

  const handlePrev = () => {
    setCurrentIndex(currentIndex === 0 ? blogData.length - itemsPerPage : currentIndex - itemsPerPage);
  };

  const handleNext = () => {
    setCurrentIndex((currentIndex + itemsPerPage) % blogData.length);
  };

  const visibleCards = filteredBlogs.slice(currentIndex, currentIndex + itemsPerPage);

  const truncateDescription = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
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
  
  const getProfileImage = (formData) => {
    if (formData?.data?.type === "Buffer") {
      return bufferToBase64(formData.data);
    } else if (typeof formData?.data === "string") {
      return `data:image/jpeg;base64,${formData.data}`;
    } else {
      return "Loading Image";
    }
  };
  const handleClick = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  if (loading) {
    return (
      <Loader/>
    );
  }
  return (
    <>
    <div className='ShowAll-Container-main'>

    <div className=' container ShowAll-Container1'>
      <div className="featured-b" style={{ textAlign: 'center', paddingTop: '40px' }}>{condition}</div>
      <br />
      <br />
      <div className="featured-title">Featured</div>

      <div className="carousel-container67">
        <button className="carousel-btn-prev prev" onClick={handlePrev}>
        <RiArrowDownSLine className="arrow-icon-filter" />
          
        </button>

        <div className="cards-wrapper">
          {visibleCards.map((card) => (
            <div key={card.id} className="card">
              <div className="BlogCarousel-card-content">
                <div className='card-image04-div'>
                <img src={getProfileImage(card.image)} alt={card.title} className="card-image04" />
                </div>
                  
                <div className="text-content">
                  <h5>{card.title}</h5>
                  <h6>{card.subtitle}</h6>
                  <p
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(card?.description)
                          ? card.description.length > 140
                            ? DOMPurify.sanitize(truncateDescription(card.description, 20))
                            : DOMPurify.sanitize(card.description)
                          : "No Description Available",
                      }}
                    ></p>
                  <Link className="read-more-btn" to={`/blogPost/${card._id}`} >Read More →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-btn-next next" onClick={handleNext}>
        <RiArrowDownSLine className="arrow-icon-filter" />

        </button>
      </div>
    </div>

      <div className='showAll-second-container'>
        <div className='container'>


    {/* Search and Filters */}
<div className="blog-search">
  <input 
    type="text" 
    placeholder="Search for condition libraries..." 
    className="blogCarousel-search-input" 
    value={searchTerm} 
    onChange={(e) => setSearchTerm(e.target.value)} 
  />
  <div className="filters">
    <div className="featured-title">ALL POSTS</div>
    <div className="filter-dropdowns">
      {/* <div className="select-wrapper">
        <select className="filter-dropdown">
          <option>Condition Type</option>
        </select>
        <RiArrowDownSLine className="arrow-icon-filter" />
      </div>
      <div className="select-wrapper">
        <select className="filter-dropdown">
          <option>All Specialties</option>
        </select>
        <RiArrowDownSLine className="arrow-icon-filter" />
      </div> */}
      <div className="select-wrapper">
        <select className="filter-dropdown">
          <option defaultValue>Sort By: Relevance</option>
          <option>Latest</option>
          <option>Oldest</option>
          {/* Add more options */}
        </select>
        <RiArrowDownSLine className="arrow-icon-filter" />
      </div>
    </div>
  </div>
</div>

      {/* Paginated Blog List */}
      <div className="paginated-list-container67">
        <div className="card-container67">
          {currentItems.map((item) => (
            <div key={item.id} className="cards98">
              <Link className="" to={`/blogPost/${item._id}`} >
              <img src={getProfileImage(item.image)} alt={item.title} className="card-image67" />
              </Link>
              <div className="card-content67">
              <Link className="text-decoration-none" to={`/blogPost/${item._id}`} >
                <span className="category67">{category}</span>
                </Link>

                <Link className="read-more67 text-decoration-none" to={`/blogPost/${item._id}`} >
                <h5 className='card-content67-title'>{item.title}</h5>
                </Link>
                <p
                  className="description67"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.description)
                      ? item.description.length > 140
                        ? DOMPurify.sanitize(truncateDescription(item.description, 20))
                        : DOMPurify.sanitize(item.description)
                      : "No Description Available",
                  }}
                ></p>
                <Link className="read-more67" to={`/blogPost/${item._id}`} >Read More <span>→</span></Link>
                <div className="author-details67">
                  <span><img src={getProfileImage(item.image)} alt="Author" className="author-image67" /></span>
                  <span className='author-details67-title'>{item.author}</span>
                  <span className="date67">{moment(item.date).format("MMMM DD, YYYY")}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination new  */}
        {totalPages > 1 && (
  <section className="New-rooms-pagination pb-3">
    <button className="New-rooms-prev" onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
      Prev
    </button>
    <button className={currentPage === 1 ? "New-rooms-page New-rooms-active" : "New-rooms-page"} onClick={() => handleClick(1)}>
      1
    </button>
    {currentPage > 3 && <p className="New-rooms-dots">...</p>}
    {currentPage > 2 && (
      <button className="New-rooms-page" onClick={() => handleClick(currentPage - 1)}>
        {currentPage - 1}
      </button>
    )}
    {currentPage !== 1 && currentPage !== totalPages && (
      <button className="New-rooms-page New-rooms-active">{currentPage}</button>
    )}
    {currentPage < totalPages - 1 && (
      <button className="New-rooms-page" onClick={() => handleClick(currentPage + 1)}>
        {currentPage + 1}
      </button>
    )}
    {currentPage < totalPages - 2 && <p className="New-rooms-dots">...</p>}
    <button className={currentPage === totalPages ? "New-rooms-page New-rooms-active" : "New-rooms-page"} onClick={() => handleClick(totalPages)}>
      {totalPages}
    </button>
    <button className="New-rooms-next" onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
      Next
    </button>
  </section>
)}
      </div>
      </div>

      </div>
    </div>

    </>
  );
};

export default BlogCarousel;
