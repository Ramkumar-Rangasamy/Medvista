import React, { useEffect, useState } from "react";
import "./blog.css";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate, useParams } from "react-router-dom";
// import DOMPurify from 'dompurify';
import Loader from "../Loader/Loader";
import profileImgAlt from '../Assets/samuel harris.jpg'

const VerifiedTick = () => (
  <div className="blogPageVerifiedTick">
    <svg
      width="20"
      height="18"
      viewBox="0 0 20 18"
      fill="#ffffff"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.16634 17.75L5.58301 15.0833L2.58301 14.4167L2.87467 11.3333L0.833008 9L2.87467 6.66667L2.58301 3.58333L5.58301 2.91667L7.16634 0.25L9.99967 1.45833L12.833 0.25L14.4163 2.91667L17.4163 3.58333L17.1247 6.66667L19.1663 9L17.1247 11.3333L17.4163 14.4167L14.4163 15.0833L12.833 17.75L9.99967 16.5417L7.16634 17.75ZM9.12467 11.9583L13.833 7.25L12.6663 6.04167L9.12467 9.58333L7.33301 7.83333L6.16634 9L9.12467 11.9583Z"
        fill="#0167FF"
      />
    </svg>
  </div>
);

const DoctorExp = () => (
  <div className="blogPageDoctorExp">
    <svg
      width="13"
      height="18"
      viewBox="0 0 13 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 13.5L6.5 14.5L7.5 18L9.5 16.5H12.5L11 12H10.5L9.5 14L7.5 13.5Z"
        fill="#FF7F50"
      />
      <path
        d="M5 13.5L6 14.5L5 18L3 16.5H0L1.5 12H2L3 14L5 13.5Z"
        fill="#FF7F50"
      />
      <path d="M6.00013 0L7.73218 2.25H4.26808L6.00013 0Z" fill="#FF7F50" />
      <path
        d="M12.9517 5.69327L10.9711 7.72789L10.4782 4.29905L12.9517 5.69327Z"
        fill="#FF7F50"
      />
      <path
        d="M7.12875 13.0365L4.98839 10.8347L8.4014 10.2419L7.12875 13.0365Z"
        fill="#FF7F50"
      />
      <path
        d="M0.14259 5.48781L2.58449 3.7464L2.25727 7.61467L0.14259 5.48781Z"
        fill="#FF7F50"
      />
      <path
        d="M9.10085 0.864811L9.68969 3.64254L6.56619 2.14464L9.10085 0.864811Z"
        fill="#FF7F50"
      />
      <path
        d="M12.5375 8.88614L9.87183 9.86429L10.91 6.55941L12.5375 8.88614Z"
        fill="#FF7F50"
      />
      <path
        d="M3.80617 12.5681L3.20797 9.7924L6.33651 11.2798L3.80617 12.5681Z"
        fill="#FF7F50"
      />
      <path
        d="M1.70318 10.5839L2.12258 7.2164L5.07976 10.2455L1.70318 10.5839Z"
        fill="#FF7F50"
      />
      <path
        d="M0.95769 2.65639L4.32959 2.54448L2.90214 5.41345L0.95769 2.65639Z"
        fill="#FF7F50"
      />
      <path
        d="M3.07921 0.751498L5.38428 2.11084L2.79576 3.41248L3.07921 0.751498Z"
        fill="#FF7F50"
      />
      <path
        d="M11.6047 2.64076L10.7493 5.34829L8.76844 2.50642L11.6047 2.64076Z"
        fill="#FF7F50"
      />
      <path
        d="M10.1405 11.6011L7.40916 10.8249L10.1921 8.76209L10.1405 11.6011Z"
        fill="#FF7F50"
      />
      <path
        d="M0.323193 8.22349L1.9928 5.95571L3.04395 8.95006L0.323193 8.22349Z"
        fill="#FF7F50"
      />
      <path
        d="M11 6.5C11 8.98528 8.98528 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5Z"
        fill="white"
      />
      <path
        d="M10 6.5C10 8.43299 8.433 10 6.5 10C4.567 10 3 8.43299 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5Z"
        fill="#FF7F50"
      />
    </svg>
  </div>
);

const DoctorSymbol = () => (
  <div className="blogPageDoctorSymbol">
    <svg
      width="14"
      height="15"
      viewBox="0 0 14 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.23327 6.93281C3.48182 6.93281 2.76115 6.6343 2.2298 6.10295C1.69845 5.5716 1.39993 4.85093 1.39993 4.09948V1.83281C1.39993 1.68252 1.45964 1.53839 1.56591 1.43212C1.67218 1.32585 1.81631 1.26615 1.9666 1.26615H2.53327C2.68356 1.26615 2.82769 1.20644 2.93396 1.10017C3.04023 0.993903 3.09993 0.849769 3.09993 0.699479C3.09993 0.54919 3.04023 0.405056 2.93396 0.298785C2.82769 0.192515 2.68356 0.132813 2.53327 0.132812H1.9666C1.51573 0.132813 1.08333 0.311919 0.76452 0.630731C0.445708 0.949543 0.266602 1.38194 0.266602 1.83281V4.09948C0.26733 4.73966 0.423439 5.3701 0.721521 5.93666C1.0196 6.50321 1.45075 6.98895 1.97793 7.35215C2.48495 7.79827 2.89606 8.34273 3.18633 8.9525C3.47661 9.56228 3.64 10.2247 3.6666 10.8995C3.6666 11.9515 4.08452 12.9604 4.82841 13.7043C5.57231 14.4482 6.58124 14.8661 7.63327 14.8661C8.68529 14.8661 9.69423 14.4482 10.4381 13.7043C11.182 12.9604 11.5999 11.9515 11.5999 10.8995V10.2535C12.1341 10.1156 12.5996 9.78755 12.9093 9.33094C13.2189 8.87433 13.3514 8.32047 13.2819 7.77318C13.2124 7.22589 12.9456 6.72273 12.5317 6.35803C12.1177 5.99333 11.585 5.79212 11.0333 5.79212C10.4816 5.79212 9.94882 5.99333 9.53487 6.35803C9.12092 6.72273 8.85418 7.22589 8.78467 7.77318C8.71515 8.32047 8.84763 8.87433 9.15726 9.33094C9.46689 9.78755 9.93243 10.1156 10.4666 10.2535V10.8995C10.4666 11.6509 10.1681 12.3716 9.63674 12.9029C9.10538 13.4343 8.38472 13.7328 7.63327 13.7328C6.88182 13.7328 6.16115 13.4343 5.6298 12.9029C5.09845 12.3716 4.79993 11.6509 4.79993 10.8995C4.82797 10.2238 4.99313 9.56093 5.28538 8.95111C5.57762 8.34128 5.99085 7.79727 6.49993 7.35215C7.02502 6.98769 7.45397 6.5014 7.75003 5.93492C8.0461 5.36845 8.20047 4.73866 8.19993 4.09948V1.83281C8.19993 1.38194 8.02083 0.949543 7.70202 0.630731C7.3832 0.311919 6.9508 0.132813 6.49993 0.132812H5.93327C5.78298 0.132813 5.63884 0.192515 5.53257 0.298785C5.4263 0.405056 5.3666 0.54919 5.3666 0.699479C5.3666 0.849769 5.4263 0.993903 5.53257 1.10017C5.63884 1.20644 5.78298 1.26615 5.93327 1.26615H6.49993C6.65022 1.26615 6.79436 1.32585 6.90063 1.43212C7.0069 1.53839 7.0666 1.68252 7.0666 1.83281V4.09948C7.0666 4.47156 6.99332 4.83999 6.85093 5.18375C6.70854 5.5275 6.49984 5.83985 6.23674 6.10295C5.97364 6.36605 5.66129 6.57475 5.31754 6.71714C4.97378 6.85953 4.60535 6.93281 4.23327 6.93281ZM11.0333 9.19948C10.7327 9.19948 10.4444 9.08008 10.2319 8.86753C10.0193 8.65499 9.89993 8.36672 9.89993 8.06615C9.89993 7.76557 10.0193 7.4773 10.2319 7.26476C10.4444 7.05222 10.7327 6.93281 11.0333 6.93281C11.3338 6.93281 11.6221 7.05222 11.8347 7.26476C12.0472 7.4773 12.1666 7.76557 12.1666 8.06615C12.1666 8.36672 12.0472 8.65499 11.8347 8.86753C11.6221 9.08008 11.3338 9.19948 11.0333 9.19948Z"
        fill="#FF7F50"
      />
    </svg>
  </div>
);

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
    return profileImgAlt;
  }
};

const Blog = () => {
  const { condition } = useParams();
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState([]);
  const [tempBlog, setTempBlog] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [hashtags, setHastags] = useState([]);
  const [recentBlog, setRecentBlog] = useState([]);
  const [mostReadBlog, setMostReadBlog] = useState([]);
  const [topRatedDoctors, setTopRatedDoctors] = useState([]);
  const [featuredBlog, setFeaturedBlog] = useState([]);
  const [sideFeatureBlog, setSideFeatureBlog] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const loadBlogs = async () => {
    try {
      // Encode the condition to handle spaces and special characters
      const encodedCondition = encodeURIComponent(condition);
      // Make the request using the encoded condition
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/patient/blogs/conditions/${encodedCondition}`,
        { withCredentials: true }
      );
      if (response.data) {
        setLoading(false);
        const data = response.data;
        console.log(data);
        

        // Set various state variables with the received data
        setHastags(data.hashtags);

        if (Array.isArray(data.blogsByCategory)) {
          setCategoryData(data.blogsByCategory);
          console.log(data.blogsByCategory);
        } else {
          setCategoryData(0); // Handle the case where no blogs are returned
        }

        setRecentBlog(data.recentBlogs);
        setMostReadBlog(data.mostReadBlogs);
        setTopRatedDoctors(data.topRatedDoctors);
        setTempBlog(response.data);
        setCategories(data.blogsByCategory);
        // Sort topPriorityBlogs by updated date
        const sortedBlogs = data.featuredBlogs.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        // setFeaturedBlog(sortedBlogs[sortedBlogs.length - 1]);
        const reversedBlogs = [...sortedBlogs].reverse(); // creates a reversed copy of the array
        setFeaturedBlog(reversedBlogs[0]); // now the first element of the reversed array is the last one from the original array

        setSideFeatureBlog(sortedBlogs);
      } else {
        setLoading(false);
        setBlogData([]);
      }
    } catch (error) {
      console.error("Error loading blogs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start", // Align the section to the start
      });
      // Apply an offset (e.g., 50px) after the smooth scroll is complete
      setTimeout(() => {
        const offset = 280;
        window.scrollBy({ top: -offset, behavior: "smooth" });
      }, 500); // Slight delay to ensure smooth scroll completes
    }
  };
  const truncateDescription = (text, wordLimit) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };
  // Filter the categoryData based on the search query
  const filteredCategories = Object.entries(categoryData).filter(([_, count]) => {
    const categoryName = count._id && count._id[0] ? count._id[0].toLowerCase() : ''; // Check if count._id[0] exists and is valid
    return categoryName.includes(searchQuery.toLowerCase()); // Filter by search query
  });
  if (loading) {
    return (
      <Loader />
    );
  }
  return (
    <>
      {/* Navbar Section with Image Background */}
      <div className="condition-banner-container">
        <h1>{condition}</h1>
        {/* <p>Content and tools to explore treatment, causes and care options for Condition libraries</p> */}
        <div className="condition-nav-tabs">
          <a href="#overview" className="active" onClick={() => scrollToSection("overview")}>Overview</a>
          {Object.entries(categoryData)
            .map(([_, count], i) => {
              const categoryName = count._id[0]; // Assuming _id holds the category name
              const sanitizedCategoryName = categoryName.replace(/\s+/g, '-').toLowerCase(); // Sanitize for valid ID

              return (
                <div key={i}>
                  <a href={`#${sanitizedCategoryName}`} onClick={() => scrollToSection(sanitizedCategoryName)}>{categoryName}</a>
                </div>
              );
            })}
          <a href="#Top-doctors" onClick={() => scrollToSection("Top-doctors")}>Top doctors</a>
          <a href="/Filters">Find a Doctor</a>
        </div>
      </div>

      <div className="blogPageOuterBox">
        <div className="blogPageBox">
          <div className="blogPageLHS">
              <h2 className="blogPageFeaturedHeading">Featured</h2>
              <div className="blogPageFeaturedBox">
                <div className="blogPageFeaturedLHS">
                  <Link to={`/blogPost/${featuredBlog._id}`} >
                    <img
                      src={getProfileImage(featuredBlog?.image)}
                      alt="Featured Img"
                    />
                  </Link>
                  <div>
                    <Link to={`/blogPost/${featuredBlog._id}`} >
                      <h2 className="Featuredblog-title">
                        {featuredBlog?.title
                          ? featuredBlog.title.length > 85
                          ? featuredBlog.title.substring(0, 85) + "..."
                          : featuredBlog.title
                          : "No Title Available"
                        }
                      </h2>
                    </Link>
                    <div className="Featuredblog-description"
                      dangerouslySetInnerHTML={{
                        __html: featuredBlog?.description
                          ? featuredBlog.description.length > 140
                            ? truncateDescription(featuredBlog.description, 20)
                            : featuredBlog.description
                          : "No Description Available",
                      }}
                    ></div>
                  </div>
                </div>
                <div className="blogPageFeaturedRHS">
                  <BlogMiniCard data={sideFeatureBlog} />
                </div>
            </div>

            {filteredCategories.slice(0, 2)
              .map(([index, count], i) => {
                const categoryName = count._id[0]; // Assuming _id holds the category name
                const sanitizedCategoryName = categoryName.replace(/\s+/g, '-').toLowerCase(); // Sanitize for valid ID
                const showAllLink = `/blogs/showAll/${condition}/${categoryName}`
                const blogCount = count.blogs.length;

                return (
                  <>
                    <div className="blogPageDefaultCardHeader">
                      <h2 className="blogPageDefaultCardHeading">{count._id}</h2>
                      {blogCount > 3 && ( // Only show the link if there are more than 2 blogs
                        <Link to={showAllLink} alt="Showall link">
                          Show All
                        </Link>
                      )}
                    </div>
                    <BlogBiggerCard
                      id={sanitizedCategoryName}
                      key={index}
                      title={count._id}
                      shorter={true}
                      data={Array.isArray(count.blogs) ? count.blogs.slice(0, 2) : []}  // Ensure value.blogs is an array
                    />
                  </>
                );
            })}

            {filteredCategories.slice(3, 4)
              .map(([index, count], i) => {
                const categoryName = count._id[0]; // Assuming _id holds the category name
                const sanitizedCategoryName = categoryName.replace(/\s+/g, '-').toLowerCase(); // Sanitize for valid ID
                const showAllLink = `/blogs/showAll/${condition}/${categoryName}`
                const blogCount = count.blogs.length;

                return (
                  <>
                    <div className="blogPageDefaultCardHeader">
                      <h2 className="blogPageDefaultCardHeading">{count._id}</h2>
                      {blogCount > 3 && ( // Only show the link if there are more than 2 blogs
                        <Link to={showAllLink} alt="Showall link">
                          Show All
                        </Link>
                      )}
                    </div>
                    <BlogBiggerCard
                      id={sanitizedCategoryName}
                      key={index}
                      title={count._id}
                      shorter={true}
                      data={Array.isArray(count.blogs) ? count.blogs.slice(0, 1) : []}  // Ensure value.blogs is an array
                    />
                  </>
                );
            })}
          </div>
          
          <div className="blogPageRHS">
            <div className="blogPageRHSContent">
              <BlogSmallCard
                title={"Recent Blog"}
                data={recentBlog.slice(0, 4)}
                blogCount={recentBlog.length}
                showAllLink={`/blogs/showAll/${condition}/${`Recent Blog`}`}
              />
              <BlogSmallCard
                title={"Most Reads"}
                data={mostReadBlog.slice(0, 3)}
                blogCount={mostReadBlog.length}
                showAllLink={`/blogs/showAll/${condition}/${`Most Reads`}`}
              />
              {/* <BlogSmallCard
                title={"Recommended Reading"}
                data={mostReadBlog.slice(0, 2)}
                showAllLink={`/blogs/showAll/${condition}/${`Recommended Reading`}`}
              /> */}
              <div className="blogPageRHS-defaultCardBox">
                <div className="blogPageRHS-defaultCardBoxHeader">
                  <div className="blogPageRHS-defaultCardBoxTitle">Tags</div>
                </div>
                <div className="blogPagetags-chips">
                  {hashtags.slice(0, 10).map((tag, index) => (
                    <div key={index} className="blogPagetags-chip">
                      <div className="blogPagetags-chip-text"> {tag._id}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>


        

        {filteredCategories.slice(-2, -1).map(([index, count], i) => {
          const categoryName = count._id[0]; // Assuming _id holds the category name
          const sanitizedCategoryName = categoryName.replace(/\s+/g, '-').toLowerCase(); // Sanitize for valid ID
          const blogs = Array.isArray(count.blogs) ? count.blogs.slice(0, 6) : [];  // Ensure count.blogs is an array
          const blogCount = count.blogs.length;
          const showAllLink = `/blogs/showAll/${condition}/${categoryName}`

          return (
            <>
              <div className="Blog-six-card-hold-container">
                <div className="Blog-six-card-container">
                  <h2>{count._id}</h2>
                  {blogCount > 5 && ( // Only show the link if there are more than 6 blogs
                    <Link to={showAllLink} alt="Showall link">
                      Show All
                    </Link>
                  )}
                </div>
                <div key={index} id={sanitizedCategoryName} className="Blog-six-card-style-flex">
                  {blogs.map((blog, idx) => {
                    // Alternate between left and right based on the blog index
                    const isEven = idx % 2 === 0;
                    return (
                      <div key={idx} className={isEven ? "blog-left" : "blog-right"}>
                        <BlogBiggerCard
                          key={idx}
                          title={count._id}
                          shorter={true}
                          data={[blog]}  // Wrap in an array since you're passing a single blog
                        />
                      </div>
                    );
                  })}
                </div>
              </div>  
            </>
          );
        })}

        <BlogDoctorCard
          title={`Top ${condition} specialists`}
          data={topRatedDoctors}
        />

        {filteredCategories.slice(-1).map(([index, count], i) => {
          const categoryName = count._id[0]; // Assuming _id holds the category name
          const sanitizedCategoryName = categoryName.replace(/\s+/g, '-').toLowerCase(); // Sanitize for valid ID
          const blogs = Array.isArray(count.blogs) ? count.blogs.slice(0, 6) : [];  // Ensure count.blogs is an array
          const blogCount = count.blogs.length;
          const showAllLink = `/blogs/showAll/${condition}/${categoryName}`

          return (
            <>
              <div className="Blog-six-card-hold-container">
                <div className="Blog-six-card-container">
                  <h2>{count._id}</h2>
                  {blogCount > 5 && ( // Only show the link if there are more than 6 blogs
                    <Link to={showAllLink} alt="Showall link">
                      Show All
                    </Link>
                  )}
                </div>
                <div key={index} id={sanitizedCategoryName} className="Blog-six-card-style-flex">
                  {blogs.map((blog, idx) => {
                    // First three cards (0, 1, 2) should go on the left, next three (3, 4, 5) on the right
                    const isLeft = idx < 3;
                    return (
                      <div key={idx} className={isLeft ? "blog-left" : "blog-right"}>
                        <BlogBiggerCard
                          key={idx}
                          title={count._id}
                          shorter={true}
                          data={[blog]} // Wrap in an array since you're passing a single blog
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          );
        })}
     
        {filteredCategories.slice(-2, -1)
          .map(([index, count], i) => {
            const categoryName = count._id[0]; // Assuming _id holds the category name
            const sanitizedCategoryName = categoryName.replace(/\s+/g, '-').toLowerCase(); // Sanitize for valid ID
            const blogCount = count.blogs.length;

            return (
              <BlogLargerCard
                id={sanitizedCategoryName}
                key={index}
                title={count._id}
                condition={condition}
                shorter={true}
                blogCount={blogCount}
                data={Array.isArray(count.blogs) ? count.blogs.slice(0, 3) : []}  // Ensure value.blogs is an array
              />
            );
          })
        }
      </div>
    </>
  );
};

const BlogBiggerCard = ({
  id,
  title,
  data,
  conditionParams,
  showAllLink = `/blogs/showAll/${conditionParams}/${title}`,
  shorter = false,
}) => {
  return (
    <div className="BlogBiggerCard-container">
      <div className="blogPageDefaultCardBox">
        {data.map((x, index) => (
          <div className="BlogBiggerCard-image-content" key={index} id={id}>
            <div className="BlogBiggerCard-image">
              {/* Wrap the image with a Link */}
              <Link to={`/blogPost/${x._id}`} alt={x?.title}>
                <img src={getProfileImage(x.image)} alt={x.title} />
              </Link>
              <div className="BlogBiggerCardAuthor">By {x.author}</div>
              <div className="BlogBiggerCardDate">
                {moment(x.date).format("MMMM DD, YYYY")}
              </div>
            </div>
            <div className="BlogBiggerCard-title-desc-container">
              {/* Wrap the title with a Link */}
              <Link to={`/blogPost/${x._id}`} alt={x?.title}>
                <div>
                  {x?.title
                    ? x.title.length > 65
                      ? `${x.title.substring(0, 50)}...`
                      : x.title
                    : "No Title Available"}
                </div>
              </Link>

              <div className="BlogBiggerCard-description">
                {x?.description ? (
                  x.description.replace(/<\/?p>/g, "").replace(/<[^>]+>/g, "").length > 220 ? (
                    x.description.replace(/<\/?p>/g, "").replace(/<[^>]+>/g, "").substring(0, 160) + "..."
                  ) : (
                    x.description.replace(/<\/?p>/g, "").replace(/<[^>]+>/g, "")
                  )
                ) : (
                  "No Description Available"
                )}
              </div>


              {/* Read more link */}
              <Link to={`/blogPost/${x._id}`} alt={x?.title} className="BlogBiggerCard-read-more">
                Read more in 10 Minutes ⟶
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogLargerCard = ({ id, title, condition, data, blogCount }) => {
  // State to control the number of visible blogs
  const [visibleBlogs, setVisibleBlogs] = useState(1);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false); // Track whether 'Load More' was clicked
  const navigate = useNavigate(); // For programmatic navigation
  // Function to handle the 'Load More' click
  const handleLoadMore = () => {
    if (!loadMoreClicked) {
      // If 'Load More' was not clicked, show 2 more blogs
      setVisibleBlogs(visibleBlogs + 1);
      setLoadMoreClicked(true); // Update the state to change button to "Show All"
    } else {
      // Redirect to show all page when 'Show All' is clicked
      navigate(`/blogs/showAll/${condition}/${title}`);
    }
  };
  return (
    <div className="BlogLargerCard-Container" id={id}>
      <h2 className="blogPageDefaultCardHeading">{title}</h2>
      <div className="BlogLargerCard-content-center">
        {data.slice(0, visibleBlogs).map((x, index) => (
          <div className="BlogLargerCard-inside" key={index}>
            <div className="BlogLargerCard-img">
              <img src={getProfileImage(x.image)} alt={x.title} />
            </div>
            <div className="BlogLargerCard-title-body">
              <div className="BlogLargerCard-main-title">
                {
                  x?.title
                  ? x.title.length > 70
                  ? `${x.title.substring(0, 70)}...`
                  : x.title
                  : "No Title Available"
                }
              </div>
              <div className="BlogLargerCard-description">
                {x?.description ? (
                  x.description.replace(/<\/?p>/g, "").length > 195 ? (
                  x.description.replace(/<\/?p>/g, "").substring(0, 190) + "..."
                  ) : (
                    x.description.replace(/<\/?p>/g, "")
                  )
                  ) : (
                  "No Description Available"
                  )
                }
              </div>
              <h3 className="BlogLargerCard-author-name">By {x.author}</h3>
              <div className="BlogLargerCard-Date-year">
                {moment(x.date).format("MMMM DD, YYYY")}
              </div>
              <Link to={`/blogPost/${x._id}`} className="BlogLargerCard-read-more">
                Read more in 10 Minutes ⟶
              </Link>
            </div>
            </div>
          ))}
        {/* Load More/Show All button */}
        {visibleBlogs && blogCount > 2 && (
          <button className="BlogLargerCard-btn" onClick={handleLoadMore}>
            {loadMoreClicked ? "Show All" : "Load more..."}
          </button>
        )}
      </div>
    </div>
  );
};

const BlogDoctorCard = ({ title, data = [], showAllLink = "http://google.com" }) => {
  return (
    <div className=" blogPage-Doctors-container" id="Top-doctors">
      <div className="blogPage-Doctors-title-head">
        <h2>{title}</h2>
      </div>

      <div className="blogPageDoctorCardBox ">
        {data.length > 0 ? (
          data.slice(0, 8).map((x, index) => (
            <div className="blogPageDoctorCard " key={index}>
              <div className="blogPageDoctorCardImgBox">
                <Link to={`/book-appointment-profile/${x._id}`}>
                  <img src={getProfileImage(x.profilePicture)} alt={x.name} />
                </Link>
                <VerifiedTick />
              </div>

              <div className="blogPageDoctorCard-content">
                <div className="blogPageDoctorCardHeader">
                  <h3 className="blogPageDoctorCardName"> {x.name}</h3>
                  <div className="blogPageDoctorCardRating">
                    <FaStar />
                    {x.rating}
                  </div>
                </div>
                <Link to={`/book-appointment-profile/${x._id}`}>
                  <div className="blogPageDoctorCardSpecialist">
                      <DoctorSymbol />
                      <p>{x.title}</p>
                  </div>
                </Link>
                <div className="blogPageDoctorCardExp">
                  <DoctorExp />
                  <p>"NO DATA" years experience</p>
                </div>
                <div className="blogPageDoctorCardDesc">
                  {x.conditions.join(" ").length > 140
                    ? `${x.conditions.join(" ").substring(0, 140)}...`
                    : x.conditions.join(" ")}
                </div>
                <Link  to={`/book-appointment-profile/${x._id}`}>
                  <button className="blogPageDoctorCardBtn">Book appointment</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div>No doctors available.</div>
        )}
      </div>
    </div>
  );
};

const BlogMiniCard = ({ data }) => {
  return (
    <>
      {data.slice(0,4).map((x, index) => {
        return (
          <div className="blogPageFeaturedRHSCard" key={index + 1}>
            <img src={getProfileImage(x.image)} alt={x.title} />
            <div>
              <div>
                <Link to={`/blogPost/${x._id}`} className="text-decoration-none text-dark">
                  {x?.title
                    ? x.title.length > 77
                      ? `${x.title.substring(0, 77)}...`
                      : x.title
                    : "No Title Available"}
                </Link>
              </div>
              <div>{moment(x.date).format("MMMM DD, YYYY")}</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

const BlogSmallCard = ({ title, data, showAllLink, blogCount }) => {
  return (
    <div className="blogPageRHS-defaultCardBox">
      <div className="blogPageRHS-defaultCardBoxHeader">
        <div className="blogPageRHS-defaultCardBoxTitle">{title}</div>
        {blogCount > 4 && ( // Only show the link if there are more than 2 blogs
          <Link to={showAllLink} alt="Showall link">
            Show All
          </Link>
        )}
      </div>
      <div className="blogPageRHS-defaultCard-grid">
        {data.map((x, index) => (
          <div key={index} className="blogPageRHS-defaultCard">
            <div className="blogPageRHS-defaultCard-left">
              <Link to={`/blogPost/${x._id}`} className="text-decoration-none text-dark">
                <img
                  src={getProfileImage(x?.image)}
                  alt={x?.title}
                  className="blogPageRHS-defaultCard-image"
                />
              </Link>
            </div>
            <div className="blogPageRHS-defaultCard-right">
              <div className="blogPageRHS-defaultCard-flex">
                <div className="blogPageRHS-defaultCard-chips">
                  <Link to={`/blogPost/${x._id}`} className="text-decoration-none text-dark">

                    {x?.categories[0]}
                  </Link>
                </div>
                <div className="blogPageRHS-defaultCard-date">
                  {moment(x?.date).format("MMM DD, YYYY")}
                </div>
              </div>
              <div className="blogPageRHS-defaultCard-title">
                <Link to={`/blogPost/${x._id}`} className="text-decoration-none text-dark">

                  {x?.title
                    ? x.title.length > 45
                      ? `${x.title.substring(0, 45)}...`
                      : x.title
                    : "No Title Available"}
                </Link>
              </div>
              <Link to={`/blogPost/${x._id}`}>
                <div className="blogPageRHS-defaultCard-readmore">
                  Read more in 10 Minutes ⟶
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
