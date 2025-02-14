import React, { useState, useEffect } from 'react';
import './DoctorMainCard.css';

import VerifiedImg from '../Assets/Verified-SVG.svg';
import { RiArrowDownSLine } from "react-icons/ri";
import { BsInfoCircle } from "react-icons/bs";

import DoctorCard from './DoctorCard';
import Sponsor from './Sponsor';
import Loader from '../Loader/Loader';

const DoctorMainCard = ({ isMapExpanded, doctors = [], location, responseStatus }) => {
    const [sortOption, setSortOption] = useState('');
    const [sponsoredDoctors, setSponsoredDoctors] = useState([]);
    const [nonSponsoredDoctors, setNonSponsoredDoctors] = useState([]);
    const [loader, setLoader] = useState(true);

    // Combined pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const doctorsPerPage = 5; // Number of doctors to show per classification per page

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortDoctors = (doctors) => {
        switch (sortOption) {
            case 'highestRated':
                return [...doctors].sort((a, b) => (b.rating || 0) - (a.rating || 0));
            case 'mostReviewed':
                return [...doctors].sort((a, b) => (b.reviews.length || 0) - (a.reviews.length || 0));
            case 'priceLowToHigh':
                return [...doctors].sort((a, b) => (a.doctorFee || 0) - (b.doctorFee || 0)); // Assuming consultationFee is the price field
            default:
                return doctors;
        }
    };

    useEffect(() => {
        if (responseStatus === 'pending') {
            setLoader(true);
        }

        const sorted = sortDoctors(doctors);

        const filteredDoctors = sorted.filter(
            doctor =>
                doctor.timeSlots &&
                doctor.timeSlots.length > 0 &&
                doctor.timeSlots.some(slot => slot.status === 'free')
        );

        const sponsored = filteredDoctors.filter(
            doctor =>
                doctor.subscriptionType === 'Premium' ||
                doctor.subscriptionType === 'Enterprise'
        );
        const nonSponsored = filteredDoctors.filter(
            doctor =>
                doctor.subscriptionType !== 'Premium' &&
                doctor.subscriptionType !== 'Enterprise'
        );

        setSponsoredDoctors(sponsored);
        setNonSponsoredDoctors(nonSponsored);

        // Disable the loader if doctors are loaded
        if (filteredDoctors.length > 0 || doctors.length > 0) {
            setLoader(false);
        }
    }, [sortOption, doctors, responseStatus]);

    // Pagination logic (combined for sponsored and non-sponsored doctors)
    const indexOfLastDoctor = currentPage * doctorsPerPage;
    const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;

    const currentSponsoredDoctors = sponsoredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
    const currentNonSponsoredDoctors = nonSponsoredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);

    const totalSponsoredPages = Math.ceil(sponsoredDoctors.length / doctorsPerPage);
    const totalNonSponsoredPages = Math.ceil(nonSponsoredDoctors.length / doctorsPerPage);
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
                    <h4>{nonSponsoredDoctors.length + sponsoredDoctors.length} Provider{nonSponsoredDoctors.length + sponsoredDoctors.length > 1 ? 's' : ''} available</h4>
                    <div className='d-flex'>
                        <img src={VerifiedImg} alt="Verified" style={{ width: "26px", height: "26px" }} />
                        <p>Book appointments with minimum wait-time & verified providers details</p>
                    </div>
                </div>
            </div>
            <div className={`doctor-card-container sponsor-card ${isMapExpanded ? 'mapExpanded-sponsor-card' : ''}`}>
                <div className='row sponsored-text '>
                    <div className="col-6 d-flex">
                    <BsInfoCircle />
                    <p>Sponsored</p>
                    </div>
                    <div className={`sort-by ${isMapExpanded ? 'col-5 mapExpanded-sort-by' : 'col-6'}`}>
                        <div className="form-group">
                            <label htmlFor="sortOptions">Sort by:</label>
                            <select id="sortOptions" onChange={handleSortChange}>
                                <option value="">Select</option>
                                <option value="highestRated">Highest Rated</option>
                                <option value="mostReviewed">Most Reviewed</option>
                                <option value="priceLowToHigh">Price: Low to High</option> {/* New option */}
                            </select>
                            <RiArrowDownSLine className="arrow-icon-filter" />
                        </div>
                    </div>
                </div>
                <div>
                    {currentSponsoredDoctors.length > 0 ? (
                        currentSponsoredDoctors.map((doctor) => (
                            <Sponsor key={doctor._id} doctor={doctor} isMapExpanded={isMapExpanded} />
                        ))
                    ) : (
                        <>{loader ? <Loader /> : <p className='no-results-message'>No sponsored doctors found based on the applied filters.</p>}</>
                    )}
                </div>
            </div>
            <div className={`doctor-card-container result-card ${isMapExpanded ? 'expanded' : ''}`}>
                <p>All results</p>
                {currentNonSponsoredDoctors.length > 0 ? (
                    currentNonSponsoredDoctors.map((doctor) => (
                        <DoctorCard key={doctor._id} doctor={doctor} isMapExpanded={isMapExpanded} />
                    ))
                ) : (
                    <>{loader ? <Loader /> : <p className='no-results-message'>No doctors found based on the applied filters.</p>}</>
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
const Pagination = ({ totalPages, currentPage, paginate, nextPage, prevPage,isMapExpanded }) => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={`pagination  ${isMapExpanded ? 'mapExpanded-pagination' : ''}`}>
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
