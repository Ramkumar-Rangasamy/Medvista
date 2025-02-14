import React, { useState, useEffect } from 'react';
import { RiSearchLine, RiArrowDownSLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Corporateviewblogs.css';

const Corporateviewblogs = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewblogs, setViewblogs] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/admin/blogs`);
                setViewblogs(response.data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        setSearchQuery(searchQuery.trim());
    };

    const handleStatusChange = (id, newStatus) => {
        setSelectedStatus(prevStatus => ({
            ...prevStatus,
            [id]: newStatus,
        }));
    };

    const confirmAndUpdateStatus = async (id) => {
        const newStatus = selectedStatus[id] || viewblogs.find(blog => blog._id === id).verificationStatus;

        try {
            await axios.post(`${process.env.REACT_APP_BASE_URL}/admin/blogs/verify/${id}`, { verificationStatus: newStatus });
            setViewblogs(prevBlogs =>
                prevBlogs.map(blog =>
                    blog._id === id ? { ...blog, verificationStatus: newStatus } : blog
                )
            );
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/admin/dashboardpage/view-detailsblog/${id}`);
    };

    const filteredviewblogs = viewblogs.filter(blog => {
        if (activeTab !== 'All' && blog.verificationStatus !== activeTab) {
            return false;
        }
        if (searchQuery && !(
            blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            blog.authorEmail.toLowerCase().includes(searchQuery.toLowerCase())
        )) {
            return false;
        }
        return true;
    });

    

    return (
        <div className="Adminview-blog">
            <h2 className='Adminview-blog-title'>Blog Management</h2>
            <div className="admin-dashboard-appointments-tabs-container">
                <div className="admin-dashboard-appointments-tabs">
                    <button className={`admin-tab ${activeTab === 'All' ? 'admin-active' : ''}`} onClick={() => setActiveTab('All')}>All</button>
                    <button className={`admin-tab ${activeTab === 'Verified' ? 'admin-active' : ''}`} onClick={() => setActiveTab('Verified')}>Verified</button>
                    <button className={`admin-tab ${activeTab === 'Pending' ? 'admin-active' : ''}`} onClick={() => setActiveTab('Pending')}>Pending</button>
                    <button className={`admin-tab ${activeTab === 'Not Verified' ? 'admin-active' : ''}`} onClick={() => setActiveTab('Not Verified')}>Not Verified</button>
                </div>
                <div className="admin-search-bar">
                    <input
                        type="text"
                        placeholder="Search for blogs"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <RiSearchLine
                        className="admin-search-bar-icon"
                        onClick={handleSearch}
                    />
                </div>
            </div>
            <div className='Adminview-blog-table-container'>
                <table className="Adminview-blog-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Change Status</th>
                            <th>View</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredviewblogs.map(({ _id, title, author, authorEmail, verificationStatus }) => (
                            <tr key={_id}>
                                <td>{title}</td>
                                <td>{author}</td>
                                <td>{authorEmail}</td>
                                <td>
                                    <span className={`status-dot ${verificationStatus.replace(' ', '-').toLowerCase()}`}></span>
                                </td>
                                <td>
                                    <div className="viewadmin-select-container">
                                        <select
                                            className={`admin-status-select ${selectedStatus[_id] || verificationStatus.replace(' ', '-').toLowerCase()}`}
                                            value={selectedStatus[_id] || verificationStatus}
                                            onChange={(e) => handleStatusChange(_id, e.target.value)}
                                        >
                                            <option value="Verified">Verified</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Not Verified">Not Verified</option>
                                        </select>
                                        <RiArrowDownSLine className="arrow-icon" />
                                    </div>
                                </td>
                                <td>
                                    <button className='Adminviewblogs-View' onClick={() => handleViewDetails(_id)}>
                         Preview
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => confirmAndUpdateStatus(_id)} className='Adminviewblogs-submit'>
                                        Submit
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Corporateviewblogs;
