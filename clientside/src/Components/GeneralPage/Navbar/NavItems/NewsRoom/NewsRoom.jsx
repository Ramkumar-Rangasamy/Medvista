import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for API calls
import './NewsRoom.css'; 
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { BiSolidShareAlt } from "react-icons/bi";
import { Link } from 'react-router-dom';
import Loader from '../../../../Loader/Loader';

const NewsRoom = () => {
  const [logos, setLogos] = useState([]);
  const [newsReleases, setNewsReleases] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const visibleLogosCount = 5; // Number of logos to display

  // Fetch data from backend
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/patient/news-releases`,{withCredentials:true});
        setLogos(response.data.logos);
        console.log(response.data.logos);
        setNewsReleases(response.data.newsReleases);
        console.log(response.data.newsReleases);
        
        setLoading(false); // Turn off loading when data is fetched
      } catch (err) {
        setError('Failed to fetch news data.');
        setLoading(false); // Turn off loading if error occurs
      }
    };
    fetchNewsData();
  }, []);

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
  
  const getImage = (formData) => {
    if (formData?.data?.type === "Buffer") {
      return bufferToBase64(formData.data);
    } else if (typeof formData?.data === "string") {
      return `data:image/jpeg;base64,${formData.data}`;
    } else {
      return "Loading Image";
    }
  };

  const handleNext = () => {
    if (currentIndex < logos.length - visibleLogosCount) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleLogos = logos.slice(currentIndex, currentIndex + visibleLogosCount);

  // Pagination for news cards
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 6;
  const totalPages = Math.ceil(newsReleases.length / cardsPerPage);

  const handleClick = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const currentCards = newsReleases.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

  if (loading) return <Loader/>;
  if (error) return <p>{error}</p>;

  return (
    <div className='New-rooms-container'>
      <section className="New-rooms-carousel-header">
        <h2>News<span> Room</span></h2>
        <p>Where we have been featured</p>
        <div className="New-rooms-carousel-content">
          <button className="New-rooms-carousel-arrow New-rooms-left-arrow" onClick={handlePrev} disabled={currentIndex === 0}>
            <IoIosArrowBack />
          </button>
          <div className="New-rooms-carousel-logos-head">
            {visibleLogos.map((logo, index) => (
              <div className="New-rooms-carousel-logo" key={index}>
                <img src={getImage(logo.image)} alt={logo.altText} />
              </div>
            ))}
          </div>
          <button className="New-rooms-carousel-arrow New-rooms-right-arrow" onClick={handleNext} disabled={currentIndex >= logos.length - visibleLogosCount}>
            <IoIosArrowForward />
          </button>
        </div>
      </section>

      <section className="New-rooms-card-container">
        <div className="New-rooms-card-inside-container">
          {currentCards.map((card) => (
            <div className="New-rooms-card-head" key={card._id}>
              <img src={getImage(card.image)} alt={card.title} />
              <div className="New-rooms-card-content-header">
                <div className="New-rooms-card-date-and-social">
                  <p>{new Date(card.date).toLocaleDateString()}</p>
                  <BiSolidShareAlt className='new-rooms-share-icons'/>
                </div>
                <h3 className="New-rooms-card-title">{card.title}</h3>
                <Link to={card.link} target="_blank" rel="noopener noreferrer">
                  <button>Read more</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {totalPages > 1 && (
        <section className="New-rooms-pagination">
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
  );
};

export default NewsRoom;
