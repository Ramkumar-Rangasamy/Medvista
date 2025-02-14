import React, { useEffect, useState } from 'react';
import './filter.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { RiArrowDownSLine } from "react-icons/ri";
import { FiCalendar, FiSearch } from "react-icons/fi";
import { useSearch } from '../GeneralPage/Context/context';

const Filter = ({ onFilterChange, initialFilters }) => {
    const [doctors, setDoctors] = useState([]);
    const [formData, setFormData] = useState({
        ...initialFilters,
        what: '',
        where: '',
        country: '',
        state: '',
        city: '',
        treatmentApproach : "",
        speciality: '',
        languages: [],
        gender: '',
        hospital: '',
        availability: '',
        dateAvailability: '',
        consultation: '',
        conditions: [],
        sortOption: ''
    });
    const { setSearchData } = useSearch();
    const [dropdownData, setDropdownData] = useState({
        countries: [],
        states: [],
        cities: [],
        specialities: [],
        conditions: [],
        languages: [],
        hospitals: [],
    });
    const [conditionSearch, setConditionSearch] = useState('');
    const [languageSearch, setLanguageSearch] = useState('');

    const filteredConditions = dropdownData.conditions.filter(condition =>
        condition.toLowerCase().includes(conditionSearch.toLowerCase())
    );

    const filteredLanguages = dropdownData.languages.filter(language =>
        language.toLowerCase().includes(languageSearch.toLowerCase())
    );
    useEffect(() => {
        populateDropdowns();
        populateSearchFieldsFromUrl();
        searchDoctors();
    }, []);
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            searchDoctors();
            onFilterChange(formData);
            return () => clearTimeout(delayDebounceFn);
        }, 300); // 300ms debouncereturn() =>clearTimeout(delayDebounceFn);
    }, [formData, onFilterChange]);
    const populateDropdowns = async () => {
        await populateCountryDropdown();
        await populateStateDropdown();
        await populateCityDropdown();
        await populateSpecialityDropdown();
        await populateConditionsDropdown();
        await populateLanguagesDropdown();
        await populateHospitalDropdown();
    };
    const populateCountryDropdown = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/countries`);
            const countries = await response.json();
            setDropdownData((prev) => ({
                ...prev,
                countries,
            }));
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };
    const populateStateDropdown = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/states`);
            const states = await response.json();
            setDropdownData((prev) => ({
                ...prev,
                states,
            }));
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };
    const populateCityDropdown = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/cities`);
            const cities = await response.json();
            setDropdownData((prev) => ({
                ...prev,
                cities,
            }));
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };
    const populateSpecialityDropdown = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/specialities`);
            const specialities = await response.json();
            setDropdownData((prev) => ({
                ...prev,
                specialities,
            }));
        } catch (error) {
            console.error('Error fetching specialities:', error);
        }
    };
    const populateConditionsDropdown = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/conditions`);
            const conditions = await response.json();
            setDropdownData((prev) => ({
                ...prev,
                conditions,
            }));
        } catch (error) {
            console.error('Error fetching conditions:', error);
        }
    };
    const populateLanguagesDropdown = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/languages`);
            const languages = await response.json();
            setDropdownData((prev) => ({
                ...prev,
                languages,
            }));
        } catch (error) {
            console.error('Error fetching languages:', error);
        }
    };
    const populateHospitalDropdown = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/auth/hospitals`);
            const hospitals = await response.json();
            setDropdownData((prev) => ({
                ...prev,
                hospitals,
            }));
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        }
    };
    const populateSearchFieldsFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        setFormData((prev) => ({
            ...prev,
            what: urlParams.get('what') || '',
            where: urlParams.get('where') || '',
        }));
    };
    const handleInputChange = (e) => {
        const { id, value, selectedOptions } = e.target;

        // Handle date format conversion if needed
        if (id === 'dateAvailability') {
            const formattedDate = new Date(value).toISOString().split('T')[0]; // YYYY-MM-DD format
            setFormData((prevData) => ({
                ...prevData,
                [id]: formattedDate,
            }));
        } else if (id === 'conditions' || id === 'languages') {
            const options = Array.from(selectedOptions).map(option => option.value);
            setFormData((prevData) => ({
                ...prevData,
                [id]: options,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [id]: value,
            }));
        }

        setSearchData({ doctors: [] });
        searchDoctors();
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;
        setFormData(prev => {
            const updatedArray = checked
                ? [...prev[name], value]
                : prev[name].filter(item => item !== value);

            onFilterChange({ ...prev, [name]: updatedArray });
            return {
                ...prev,
                [name]: updatedArray
            };
        });
        setSearchData({ doctors: [] })
    };
    const searchDoctors = async () => {
        const query = new URLSearchParams(formData).toString();
        const url = `${process.env.REACT_APP_BASE_URL}/auth/search-doctors?${query}`;

        try {
            const response = await fetch(url);
            const doctors = await response.json();
            setDoctors(doctors);

        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const resetFilters = () => {
        const resetData = {
            what: '',
            where: '',
            country: '',
            state: '',
            city: '',
            speciality: '',
            languages: [],
            gender: '',
            hospital: '',
            availability: '',
            dateAvailability: '',
            consultation: '',
            conditions: [],
            sortOption: ''
        };
        setFormData(resetData);
        onFilterChange(resetData);
        searchDoctors();
        setSearchData({ doctors: [] })
        setConditionSearch(''); // Reset condition search
        setLanguageSearch(''); // Reset language search
    };
    



    return (
        <div>
            {/* <div className="search-container">
        <label htmlFor="what">What:</label>
        <input type="text" id="what" placeholder="Search by name or speciality" value={formData.what} onChange={handleInputChange} />

        <label htmlFor="where">Where:</label>
        <input type="text" id="where" placeholder="Search by location" value={formData.where} onChange={handleInputChange} />

        <button onClick={searchDoctors}>Search</button>

        <label htmlFor="sortOptions">Sort by:</label>
        <select id="sortOptions" onChange={sortDoctors} value={formData.sortOption}>
          <option value="">Select</option>
          <option value="highestRated">Highest Rated</option>
          <option value="mostReviewed">Most Reviewed</option>
        </select>
      </div> */}
            <div className='sidebar-filter'>
                <div className='filter-heading-reset'>
                    <h5>Filter</h5>
                    <button onClick={resetFilters}>
                        <i className="bi bi-arrow-counterclockwise" /> Reset Filter
                    </button>
                </div>
                <div className="select-container-filter">
                    <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <select id="country" onChange={handleInputChange} value={formData.country}>
                            <option value="">Select Country</option>
                            {dropdownData.countries.map(country => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />

                    </div>
                </div>
                <div className="select-container-filter">
                    <div className="form-group">
                        <label htmlFor="state">Province/State:</label>
                        <select id="state" onChange={handleInputChange} value={formData.state}>
                            <option value="">Select </option>
                            {dropdownData.states.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />

                    </div>
                </div>
                <div className="select-container-filter">
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <select id="city" onChange={handleInputChange} value={formData.city}>
                            <option value="">Select City</option>
                            {dropdownData.cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />

                    </div>
                </div>
                <div className="select-container-filter">
                    <div className="form-group">
                        <label htmlFor="city">Treatment approach:</label>
                        <select id="treatmentApproach" onChange={handleInputChange} value={formData.treatmentApproach}>
                            <option value="">Select Treatment</option>
                            <option value={'conventional'}>Conventional</option>
                            <option value={'holistic'}>Holistic</option>
                            <option value={'traditional'}>Traditional </option>
                            <option value={'speciality'}>Speciality </option>
                            {/* {dropdownData.cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))} */}
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />

                    </div>
                </div>
                <div className="select-container-filter">
                    <div className="form-group">
                        <label htmlFor="speciality">Speciality:</label>
                        <select id="speciality" onChange={handleInputChange} value={formData.speciality}>
                            <option value="">Select Speciality</option>
                            {dropdownData.specialities.map(speciality => (
                                <option key={speciality} value={speciality}>{speciality}</option>
                            ))}
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />

                    </div>
                </div>
                <div className="select-container-filter">
                    <div className="form-group">
                        <label htmlFor="dateAvailability">Date Availability:</label>
                        <input className='filter-date-style' type="date" id="dateAvailability" onChange={handleInputChange} value={formData.dateAvailability} min={new Date().toISOString().split('T')[0]} />
                        <FiCalendar className="custom-calendar-icon" />
                    </div>
                </div>
                <div className="select-container-filter">
                    <div className="form-group">
                        <label>Conditions:</label>
                        <div className="filter-search-container">
                            <input
                                type="text"
                                placeholder="Search Conditions"
                                value={conditionSearch}
                                onChange={(e) => setConditionSearch(e.target.value)}
                                className="filter-search-bar"
                            />
                            <FiSearch className="filter-search-icon" />
                        </div>
                        <div className="checkbox-group scrollable-container">
                            {filteredConditions.length > 0 ? (
                                filteredConditions.map((condition, index) => (
                                    condition && (
                                        <div key={condition} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                id={`condition-${condition}`}
                                                name="conditions"
                                                value={condition}
                                                checked={formData.conditions ? formData.conditions.includes(condition) : false}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor={`condition-${condition}`} className="checkbox-label">
                                                {condition}
                                            </label>
                                        </div>
                                    )
                                ))
                            ) : (
                                <p>No conditions available</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="select-container-filter">
                    <div className="form-group">
                        <label>Language Spoken:</label>
                        <div className="filter-search-container">
                        <input
                            type="text"
                            placeholder="Search Languages"
                            value={languageSearch}
                            onChange={(e) => setLanguageSearch(e.target.value)}
                            className="filter-search-bar"
                        />
                        <FiSearch className="filter-search-icon" />
                        </div>
                        <div className="checkbox-group scrollable-container">
                            {filteredLanguages.length > 0 ? (
                                filteredLanguages.map(language => (
                                    language && (
                                        <div key={language} className="checkbox-item">
                                            <input
                                                type="checkbox"
                                                id={`language-${language}`}
                                                name="languages"
                                                value={language}
                                                checked={formData.languages ? formData.languages.includes(language) : false}
                                                onChange={handleCheckboxChange}
                                            />
                                            <label htmlFor={`language-${language}`} className="checkbox-label">
                                                {language}
                                            </label>
                                        </div>
                                    )
                                ))
                            ) : (
                                <p>No languages available</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="select-container-filter">
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <select id="gender" onChange={handleInputChange} value={formData.gender}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            {/* <option value="Other">Other</option> */}
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />
                    </div>
                </div>
                <div className="select-container-filter">
                    <div className="form-group">
                        <label htmlFor="hospital">Hospital:</label>
                        <select id="hospital" name="hospital" value={formData.hospital} onChange={handleInputChange}>
                            <option value="">Select Hospital</option>
                            {dropdownData.hospitals.map(hospital => (
                                <option key={hospital} value={hospital}>{hospital}</option>
                            ))}
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />
                    </div>
                </div>

                <div className="select-container-filter">
                    <div className="form-group">

                        <label htmlFor="availability">Availability:</label>
                        <select id="availability" onChange={handleInputChange} value={formData.availability}>
                            <option value="">Select Availability</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />

                    </div>
                </div>
                <div className="select-container-filter">
                    <div className="form-group">
                        <label htmlFor="consultation">Consultation Type:</label>
                        <select id="consultation" onChange={handleInputChange} value={formData.consultation}>
                            <option value="">Select Consultation</option>
                            <option value="In-person">In-person</option>
                            <option value="video call">Video call</option>
                            <option value="Both">Both</option>
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Filter;
