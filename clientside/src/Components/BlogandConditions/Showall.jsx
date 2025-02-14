import React, { useEffect, useState } from "react";
import "./Showall.css";
import leftArrow from "./leftArrow.png";
import rightArrow from "./rightArrow.png";
import axios from "axios";
import { IoSearch } from "react-icons/io5";
import one from "./Icons/one.png";
import two from "./Icons/two.png";
import noOne from "./Icons/NoOne.png";
import noTwo from "./Icons/NoTwo.png";
import nomore from "./Icons/Nomore.png";
import noTen from "./Icons/Noten.png";
import noThree from "./Icons/NoThree.png";
import rightone from "./Icons/rightone.png";
import righttwo from "./Icons/righttwo.png";
import goup from "./Icons/goUp.png";
import downArrow from "./Icons/downarrow.png";

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

function Showall() {
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

  const loadBlogs = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/patient/blogs`
    );
    console.log(response.data);
    if (response.data) {
      var data = response.data;
      setHastags(data.hashtags);
      setCategoryData(data.categoryCounts);
      setRecentBlog(data.recentBlogs);
      setMostReadBlog(data.mostReadBlogs);
      setTopRatedDoctors(data.topRatedDoctors);
      setBlogData(response.data);
      setTempBlog(response.data);
      setCategories(data.blogsByCategory);
      const sortedBlogs = data.featuredBlogs.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setFeaturedBlog(sortedBlogs[0]);
      setSideFeatureBlog(sortedBlogs.slice(1));
    } else {
      setBlogData([]);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? mostReadBlog.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === mostReadBlog.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div>
      {/* topblog */}
      
      <div className="top-box">
        <div
          className="featured-b"
          style={{ textAlign: "center", paddingTop: "40px" }}
        >
          BLOGS
        </div>

        <br></br>
        <br></br>

        <div className="featured-title">Featured</div>

        <div className="blog-feature">
          <div className="doc-card">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <img src={leftArrow} className="arrow" />
          </div>
          <div className="doc-card">
            <div className="card-photo">
              {mostReadBlog?.slice(0, 1)?.map((post, index) => (
                <div key={index}>
                  <div className="post-meta-show">
                    <img src={getProfileImage(post.image)} alt={post.title} />

                    {/* <span className="post-time-show">5 min read</span> */}
                    <div className="post-content-show">
                      <br></br>
                      <span className="post-author-show">
                        <b>{post.author}</b>
                      </span>
                      <h4>{post.title}</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.description?.slice(0, 100) + ".....",
                        }}
                      ></p>
                      <h6>
                        Read More{" "}
                        <span
                          style={{ color: "#FF7F50", marginLeft: "5px" }}
                        >{` ->`}</span>
                      </h6>
                      <div className="prof">
                        <div className="prof1">
                          {" "}
                          <img
                            src={getProfileImage(post.image)}
                            alt={post.title}
                            className="prof-pic"
                          />
                        </div>
                        <div>
                          <span className="prof2">{post.author}</span>
                          <br></br>
                          <span className="dat">August 20, 2024</span>
                        </div>
                      </div>
                      {/* <a href="#" className="read-more">
                Read more in 5 min <FaLongArrowAltRight />
              </a> */}

                      {/* <Link
                        to={`/blogPost/${post._id}`}
                        className="recentBlog-card-readmore"
                      >
                        Read more in 8 mins ⟶
                      </Link> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="doc-card">
            <div className="card-photo">
              {mostReadBlog?.slice(0, 1)?.map((post, index) => (
                <div key={index}>
                  <div className="post-meta-show">
                    <img src={getProfileImage(post.image)} alt={post.title} />

                    {/* <span className="post-time-show">5 min read</span> */}
                    <div className="post-content-show">
                      <br></br>
                      <span className="post-author-show">
                        <b>{post.author}</b>
                      </span>
                      <h4>{post.title}</h4>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.description?.slice(0, 100) + ".....",
                        }}
                      ></p>
                      <h6>
                        Read More{" "}
                        <span
                          style={{ color: "#FF7F50", marginLeft: "5px" }}
                        >{` ->`}</span>
                      </h6>
                      <div className="prof">
                        <div className="prof1">
                          {" "}
                          <img
                            src={getProfileImage(post.image)}
                            alt={post.title}
                            className="prof-pic"
                          />
                        </div>
                        <div>
                          <span className="prof2">{post.author}</span>
                          <br></br>
                          <span className="dat">August 20, 2024</span>
                        </div>
                      </div>
                      {/* <a href="#" className="read-more">
                Read more in 5 min <FaLongArrowAltRight />
              </a> */}

                      {/* <Link
                        to={`/blogPost/${post._id}`}
                        className="recentBlog-card-readmore"
                      >
                        Read more in 8 mins ⟶
                      </Link> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="doc-card">
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <img src={rightArrow} className="arrow" />
          </div>
        </div>
      </div>

      <div className="secondStage">
        <input
          type="text"
          placeholder="Search for Blogs..."
          style={{
            padding: "10px",
            width: "86%",
            borderRadius: "10px",
            border: "1px solid #EEEEEE",
            fontSize: "16px",
            marginTop: "30px",
            marginBottom: "20px",
            marginLeft: "6%",
            marginRight: "auto",
          }}
        />
        <span
          style={{
            fontSize: "18px",
            marginTop: "-20px",
            top: "-40px",
            left: "530px",
            marginLeft: "-30px",
          }}
        >
          <IoSearch />
        </span>
      </div>
      <div className="mid-section">
        <span className="all-posts-show">ALL POSTS</span>
        <br></br>
        <span className="sides">
          <span className="side1">
            Condition Type
            <img src={downArrow} style={{ paddingLeft: "10px" }} />
          </span>
          <span className="side1">
            All Speciality
            <img src={downArrow} style={{ paddingLeft: "10px" }} />
          </span>

          <span className="side1">
            <span style={{ paddingRight: "5px", fontSize: "14px" }}>
              Sort By
            </span>
            <span
              style={{
                border: "1px solid black",
                padding: "5px",
                borderRadius: "4px",
              }}
            >
              Relevance
              <img src={downArrow} style={{ paddingLeft: "20px" }} />
            </span>
          </span>
        </span>

        <br></br>
        <div className="all-head">
          {mostReadBlog?.slice(0, 3).map((post, index) => (
            <BlogPost key={index} post={post} />
          ))}
        </div>
        <br></br>
        <br></br>
        <br></br>

        <div className="all-head">
          {mostReadBlog?.slice(0, 3).map((post, index) => (
            <BlogPost key={index} post={post} />
          ))}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="bottom-buttons">
          <img src={one} alt="" className="buttons-next" />
          <img src={two} alt="" className="buttons-next" />
          <img src={noOne} alt="" className="buttons-next" />
          <img src={noTwo} alt="" className="buttons-next" />
          <img src={noThree} alt="" className="buttons-next" />
          <img src={nomore} alt="" className="buttons-next" />
          <img src={noTen} alt="" className="buttons-next" />
          <img src={rightone} alt="" className="buttons-next" />
          <img src={righttwo} alt="" className="buttons-next" />
        </div>
        <span className="up" onClick={scrollToTop}>
          <img src={goup} alt="" className="buttons-next" />
        </span>
      </div>
    </div>
  );
}
const BlogPost = ({ post }) => (
  <div className="all-child">
    <div className="post-meta-all">
      <img src={getProfileImage(post.image)} alt={post.title} />

      <div className="post-content-all">
        <br />
        <span className="post-author-all">
          <b>{post.author}</b>
        </span>
        <h4>{post.title}</h4>
        <p
          dangerouslySetInnerHTML={{
            __html: post.description?.slice(0, 100) + ".....",
          }}
        />
        <h6>
          Read More{" "}
          <span style={{ color: "#FF7F50", marginLeft: "5px" }}>{` ->`}</span>
        </h6>
        <div className="prof">
          <div className="prof1">
            {" "}
            <img
              src={getProfileImage(post.image)}
              alt={post.title}
              className="prof-pic"
            />
          </div>
          <span className="prof2">{post.author}</span>
          <br></br>
          <span
            className="dat"
            style={{ paddingTop: "30px", paddingLeft: "80px" }}
          >
            August 20, 2024
          </span>
        </div>
      </div>
    </div>
  </div>
);
export default Showall;
