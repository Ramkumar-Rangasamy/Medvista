import React from 'react'
import './condition.css';
import blogimg from '../Assets/blogimg.png';
import blogauthorImage from '../Assets/blogauthorImage.png';
import moment from 'moment';
import { Link } from 'react-router-dom';


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

const getProfileImage = (formData) => {
    if (formData?.data?.type === "Buffer") {
        return bufferToBase64(formData.data);
    } else if (typeof formData?.data === "string") {
        return `data:image/jpeg;base64,${formData.data}`;
    } else {
        return blogimg;
    }
};

const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
};

const Condition = ({ blogs }) => {
    const getFormattedDate = (date) => {
        return date ? formatDate(date) : moment().format("DD MMM, YYYY");
    };
    return (
        <div className="ProductsCondition-blog-list-container">
            <h2>Our Condition</h2>
            {blogs.length === 0 ? ( // Check if blogs array is empty
                <p className="ProductsCondition-no-blogs">No Blogs Available</p>
            ) : (
                <div className="ProductsCondition-blog-cards">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="ProductsCondition-blog-card">
                            <img
                                src={getProfileImage(blog.image)}
                                alt="Blog"
                                className="ProductsCondition-blog-image"
                            />
                            <div className="ProductsCondition-blog-content">
                                <p className="ProductsCondition-blog-category">
                                    {blog.categories[0]}
                                </p>
                                <div className="ProductsCondition-blog-meta-container">
                                    <p className="ProductsCondition-blog-meta">
                                        {getFormattedDate(blog.date)}{" "}
                                    </p>
                                    <span className="ProductsCondition-blog-meta"> • </span>
                                    <p className="ProductsCondition-blog-meta">
                                        {blog.readTime}
                                    </p>
                                </div>
                                <h3 className="ProductsCondition-blog-title">{blog.title}</h3>
                                <p
                                    className="ProductsCondition-blog-description"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            blog?.description?.split(" ").length > 25
                                                ? blog?.description
                                                      ?.split(" ")
                                                      .slice(0, 25)
                                                      .join(" ") + "..."
                                                : blog?.description,
                                    }}
                                ></p>
                                <div className="ProductsCondition-blog-footer">
                                    <div className="ProductsCondition-blog-footer-img-name-container">
                                        <img
                                            src={getProfileImage(blog.authorProfilePicture)}
                                            alt="Author"
                                        />
                                        <p className="ProductsCondition-author-name">{blog.author}</p>
                                    </div>
                                    <Link to={`/blogPost/${blog._id}`}>
                                        <button className="ProductsCondition-read-more-btn">
                                            Read More...
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Condition;