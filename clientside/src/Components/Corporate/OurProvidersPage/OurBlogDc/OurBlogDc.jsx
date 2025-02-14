import React from 'react'
import './ourblogdc.css';
import blogimg from '../Assets/blogimg.png';
import blogauthorImage from '../Assets/blogauthorImage.png';
import moment from 'moment';
import { Link } from 'react-router-dom';
// const blogs = [
//     {
//       id: 1,
//       category: 'Viral Infections',
//       date: '05 June, 2024',
//       readTime: '2 min read',
//       title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
//       description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
//       author: 'Dr. Andrew Miller',
//       imageUrl: blogimg,
//       authorImage: blogauthorImage,
//     },
//     {
//         id: 2,
//         category: 'Viral Infections',
//         date: '05 June, 2024',
//         readTime: '2 min read',
//         title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
//         description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
//         author: 'Dr. Andrew Miller',
//         imageUrl: blogimg,
//         authorImage: blogauthorImage,
//       },
//       {
//         id: 3,
//         category: 'Viral Infections',
//         date: '05 June, 2024',
//         readTime: '2 min read',
//         title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
//         description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
//         author: 'Dr. Andrew Miller',
//         imageUrl: blogimg,
//         authorImage: blogauthorImage,
//     },
//     {
//         id: 4,
//         category: 'Viral Infections',
//         date: '05 June, 2024',
//         readTime: '2 min read',
//         title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
//         description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
//         author: 'Dr. Andrew Miller',
//         imageUrl: blogimg,
//         authorImage: blogauthorImage,
//     },
//     {
//         id: 5,
//         category: 'Viral Infections',
//         date: '05 June, 2024',
//         readTime: '2 min read',
//         title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
//         description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
//         author: 'Dr. Andrew Miller',
//         imageUrl: blogimg,
//         authorImage: blogauthorImage,
//     },
//     {
//         id: 6,
//         category: 'Viral Infections',
//         date: '05 June, 2024',
//         readTime: '2 min read',
//         title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
//         description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
//         author: 'Dr. Andrew Miller',
//         imageUrl: blogimg,
//         authorImage: blogauthorImage,
//     },
//     {
//         id: 7,
//         category: 'Viral Infections',
//         date: '05 June, 2024',
//         readTime: '2 min read',
//         title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
//         description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
//         author: 'Dr. Andrew Miller',
//         imageUrl: blogimg,
//         authorImage: blogauthorImage,
//     },
// ];

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


const OurBlogDc = ({blogs}) => {
    const getFormattedDate = (date) => {
        return date ? formatDate(date) : moment().format("DD MMM, YYYY");
    };
    return (
    <div className="OurBlogDc-blog-list-container">
        <h2>Our Articles</h2>
        {blogs.length === 0 ? (
                <div className="noDoctorsMessage">
                    <p>No doctors available at the moment.</p>
                </div>
            ) : (
                <div className="OurBlogDc-blog-cards">
                    {blogs.map((blog,index) => (
                        <div key={blog.id || index} className="OurBlogDc-blog-card">
                            <img src={getProfileImage(blog.image)} alt="Blog" className='OurBlogDc-blog-image' />
                            <div className="OurBlogDc-blog-content">
                                <p className="OurBlogDc-blog-category">{blog.conditions[0]}</p>
                                <div className='OurBlogDc-blog-meta-container'>
                                    <p className="OurBlogDc-blog-meta">{getFormattedDate(blog.date)} </p>
                                    <span className="OurBlogDc-blog-meta"> • </span>
                                    <p className="OurBlogDc-blog-meta">{blog.readTime ||  "2 min read"}</p>
                                </div>
                                <h3 className="OurBlogDc-blog-title">{blog.title?.split(" ").slice(0, 5).join(" ") + "..."}</h3>
                                <p className="OurBlogDc-blog-description" 
                                    dangerouslySetInnerHTML={{
                                        __html: (blog?.description?.split(" ").slice(0, 25).join(" ") + "...")
                                    }}></p>
                                <div className="OurBlogDc-blog-footer">
                                    <div className='OurBlogDc-blog-footer-img-name-container'>
                                        <img src={getProfileImage(blog.authorId.profilePicture)} alt="Author" />
                                        <p className="OurBlogDc-author-name">{blog.authorId.name}</p>
                                    </div>
                                    <Link to={`/blogPost/${blog._id}`}>
                                    <button className="OurBlogDc-read-more-btn">Read More...</button>
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

export default OurBlogDc;