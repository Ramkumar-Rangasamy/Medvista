import React from 'react'
import './BlogsProviderProfile.css';
import blogimg from '../Assets/blogimg.png';
const blogs = [
    {
        id: 1,
        category: 'Viral Infections',
        date: '05 June, 2024',
        readTime: '2 min read',
        title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
        description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
        author: 'Dr. Andrew Miller',
        imageUrl: blogimg,
    },
    {
        id: 2,
        category: 'Viral Infections',
        date: '05 June, 2024',
        readTime: '2 min read',
        title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
        description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
        author: 'Dr. Andrew Miller',
        imageUrl: blogimg,
    },
    {
        id: 3,
        category: 'Viral Infections',
        date: '05 June, 2024',
        readTime: '2 min read',
        title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
        description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
        author: 'Dr. Andrew Miller',
        imageUrl: blogimg,
    },
    {
        id: 4,
        category: 'Viral Infections',
        date: '05 June, 2024',
        readTime: '2 min read',
        title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
        description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
        author: 'Dr. Andrew Miller',
        imageUrl: blogimg,
    },
    {
        id: 5,
        category: 'Viral Infections',
        date: '05 June, 2024',
        readTime: '2 min read',
        title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
        description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
        author: 'Dr. Andrew Miller',
        imageUrl: blogimg,
    },
    {
        id: 6,
        category: 'Viral Infections',
        date: '05 June, 2024',
        readTime: '2 min read',
        title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
        description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
        author: 'Dr. Andrew Miller',
        imageUrl: blogimg,
    },
    {
        id: 7,
        category: 'Viral Infections',
        date: '05 June, 2024',
        readTime: '2 min read',
        title: 'Viral Infections Explained: Stages, Symptoms, and Effective Treatments',
        description: 'What is a Viral Infection? A viral infection occurs when a virus enters the body, invades healthy cells, and begins to multiply.',
        author: 'Dr. Andrew Miller',
        imageUrl: blogimg,
    },
];
const BlogsProviderProfile = () => {
    return (
        <div className="Blogs-PP-list-container">
            <h2>Blogs</h2>
            <div className="Blogs-PP-cards">
                {blogs.map((blog) => (
                    <div key={blog.id} className="Blogs-PP-card-item-container">
                        <img src={blog.imageUrl} alt="Blog" className='Blogs-PP-image' />
                        <div className="Blogs-PP-content">
                            <p className="Blogs-PP-category">{blog.category}</p>
                            <div className='Blogs-PP-meta-container'>
                                <p className="Blogs-PP-meta-content">{blog.date} </p>
                                <span className="Blogs-PP-meta-content"> • </span>
                                <p className="Blogs-PP-meta-content">{blog.readTime}</p>
                            </div>
                            <h3 className="Blogs-PP-title">{blog.title}</h3>
                            <p className="Blogs-PP-description">{blog.description}</p>
                            <button className="Blogs-PP-read-more-btn">Read More...</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BlogsProviderProfile