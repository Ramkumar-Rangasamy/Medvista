import React from "react";
import "./Viewblogdetails.css";
import BlogCard from './Viewblogitems/BlogCard';

const Blog = () => {

  return (
    <>
        <div className="Adminviewblog-dashboard-blogs-container">
          <h2 className="Admin-view-blogs-title">View Blog</h2>
          <div className='Adminviewblog-review-scroll'>
            <div className="Adminviewblog-blogs-cnt">
              <div className="Adminviewblog-bloglist-cover">
                <div className="Adminviewblog-blog-list-cnt">
                  <BlogCard/>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Blog;
