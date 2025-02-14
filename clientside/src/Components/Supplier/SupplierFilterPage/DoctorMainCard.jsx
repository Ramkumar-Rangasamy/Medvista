import React, { useState, useEffect } from 'react';
import './SupplierMainCard.css';

import VerifiedImg from '../../Assets/Verified-SVG.svg';

import { BsInfoCircle } from "react-icons/bs";
import { RiArrowDownSLine } from "react-icons/ri";

import DoctorCard from './DoctorCard';
import Loader from '../../Loader/Loader';

const DoctorMainCard = ({ isMapExpanded, suppliers, location, responseStatus }) => {
    const [sortOption, setSortOption] = useState('');
    const [sponsoredDoctors, setSponsoredDoctors] = useState([]);
    const [nonSponsoredDoctors, setNonSponsoredDoctors] = useState([]);
    const [loader, setLoader] = useState(true);

    // Combined pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const suppliersPerPage = 5; // Number of suppliers to show per classification per page

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortDoctors = (suppliers) => {
        if (!Array.isArray(suppliers)) return [];
        switch (sortOption) {
            case 'highestRated':
                return [...suppliers].sort((a, b) => (b.rating || 0) - (a.rating || 0));
            case 'mostReviewed':
                return [...suppliers].sort((a, b) => (b.totalReviews || 0) - (a.totalReviews || 0));
            case 'followersLowtoHigh':
                return [...suppliers].sort((a, b) => (a.followers?.length || 0) - (b.followers?.length || 0));
            default:
                return suppliers;
        }
    };

    useEffect(() => {
        const sorted = sortDoctors(suppliers || []);
        setSponsoredDoctors(sorted);
        setNonSponsoredDoctors(sorted);
        setLoader(!(sorted?.length || suppliers?.length));
    }, [sortOption, suppliers, responseStatus]);

    // Pagination logic (combined for sponsored and non-sponsored suppliers)
    const indexOfLastDoctor = currentPage * suppliersPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - suppliersPerPage;

    const currentSponsoredDoctors = Array.isArray(sponsoredDoctors) ? sponsoredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor) : [];
    const currentNonSponsoredDoctors = nonSponsoredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const totalSponsoredPages = Math.ceil(sponsoredDoctors.length / suppliersPerPage);
    const totalNonSponsoredPages = Math.ceil(nonSponsoredDoctors.length / suppliersPerPage);
    const totalPages = Math.max(totalSponsoredPages, totalNonSponsoredPages);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container px-3">
            <div className="row doctor-main-card">
                <div className={`col-12 ${isMapExpanded ? 'mapExpanded-doc-card-header' : 'doc-card-header'}`}>
                    <h4>{nonSponsoredDoctors.length} Medical Supplier{nonSponsoredDoctors.length > 1 ? 's' : ''} available</h4>
                    <div className='d-flex'>
                        <img src={VerifiedImg} alt="Verified" style={{ width: "26px", height: "26px" }} />
                        <p>Book appointments with minimum wait-time & verified Medical Supplier details</p>
                    </div>
                </div>
            </div>
            <div className={`doctor-card-container sponsor-card ${isMapExpanded ? 'mapExpanded-sponsor-card' : ''}`}>
                <div className='row sponsored-text '>
                    <div className="col-6 d-flex">
                        <BsInfoCircle />
                        {/* <p>Sponsored</p> */}
                <p>All results</p>

                    </div>
                    <div className={`sort-by ${isMapExpanded ? 'col-5 mapExpanded-sort-by' : 'col-6'}`}>
                        <div className="form-group">
                            <label htmlFor="sortOptions">Sort by:</label>
                            <select id="sortOptions" onChange={handleSortChange}>
                                <option value="">Select</option>
                                <option value="highestRated">Highest Rated</option>
                                <option value="mostReviewed">Most Reviewed</option>
                                <option value="followersLowtoHigh">Followers: Low to High</option> {/* New option */}
                            </select>
                            <RiArrowDownSLine className="arrow-icon-filter" />
                        </div>
                    </div>
                </div>
                {/* <div>
                    {currentSponsoredDoctors.length > 0 ? (
                        currentSponsoredDoctors.map((supplier) => (
                            <Sponsor key={supplier._id} supplier={supplier} isMapExpanded={isMapExpanded} />
                        ))
                    ) : (
                        <>{loader ? <Loader /> : <p className='no-results-message'>No sponsored supplier found based on the applied filters.</p>}</>
                    )}
                </div> */}
            </div>
            <div className={`doctor-card-container result-card ${isMapExpanded ? 'expanded' : ''}`}>
                {currentNonSponsoredDoctors.length > 0 ? (
                    currentNonSponsoredDoctors.map((supplier) => (
                        <DoctorCard key={supplier._id} supplier={supplier} isMapExpanded={isMapExpanded} />
                    ))
                ) : (
                    <>{loader ? <Loader /> : <p className='no-results-message'>No supplier found based on the applied filters.</p>}</>
                )}
                {/* Combined Pagination */}
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    paginate={setCurrentPage}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    isMapExpanded={isMapExpanded}
                />
            </div>
        </div>
    );
};

// Pagination component
const Pagination = ({ totalPages, currentPage, paginate, nextPage, prevPage, isMapExpanded }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={`pagination`}>
            <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="pagination-button prev"
            />
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`pagination-button ${number === currentPage ? 'active' : ''}`}
                >
                    {number}
                </button>
            ))}
            <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="pagination-button next"
            />
        </div>
    );
};

export default DoctorMainCard;
