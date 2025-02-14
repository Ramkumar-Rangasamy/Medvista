import React, { useEffect, useState } from 'react';
import './filter.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { RiArrowDownSLine } from "react-icons/ri";
import { useSearch } from '../../GeneralPage/Context/context';
import axios from 'axios';

const Filter = ({ onFilterChange, initialFilters }) => {
    // const [doctors, setDoctors] = useState([]);
    const [filters, setFilters] = useState({});
    const [formData, setFormData] = useState({
        ...initialFilters,
        what: '',
        where: '',
        country: '',
        state: '',
        city: '',
        companyName: "",
    });
    const { setSearchData } = useSearch();
    const [dropdownData, setDropdownData] = useState({
        countries: [],
        states: [],
        cities: [],
        suppliers: [],
    });

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onFilterChange(formData);
            return () => clearTimeout(delayDebounceFn);
        }, 300); // 300ms debouncereturn() =>clearTimeout(delayDebounceFn);
    }, [formData, onFilterChange]);

    const fetchsuppliers = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/supplier/all-suppliers`, { withCredentials: true });
            // Map or validate data as needed            
            setFilters({
                countries: data.countries || [],
                states: data.states || [],
                cities: data.cities || [],
                suppliers: data.suppliers || [],
            });
        } catch (error) {
            console.error('Error fetching suppliers:', error);
        }
    };

    useEffect(() => {
        fetchsuppliers();
        // populateDropdowns();
        populateSearchFieldsFromUrl();
    }, []);
    // Update dropdownData when filters state changes
    useEffect(() => {
        setDropdownData({
            countries: filters.countries || [],
            states: filters.states || [],
            cities: filters.cities || [],
            suppliers: filters.suppliers || [],
        });
    }, [filters]);

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
        if (id === 'conditions' || id === 'languages') {
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
        setSearchData({ suppliers: [] });
    };

    const handleCheckboxChange = (e) => {
        const { name, value, checked } = e.target;

        setFormData((prev) => {
            const updatedArray = checked
                ? [...(prev[name] || []), value]
                : (prev[name] || []).filter((item) => item !== value);

            const newFormData = { ...prev, [name]: updatedArray };

            onFilterChange(newFormData); // Trigger callback with updated formData
            return newFormData;
        });

        setSearchData({ suppliers: [] });
    };
    const resetFilters = () => {
        const resetData = {
            what: '',
            where: '',
            country: '',
            state: '',
            city: '',
            suppliers: "",
        };
        setFormData(resetData);
        onFilterChange(resetData);
        setSearchData({ suppliers: [] })
    };
    return (
        <div>
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
                            <option value="">Select</option>
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
                {/* <div className="select-container-filter">
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
                </div> */}

                {/* <div className="select-container-filter">
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
                                                name="languagesSpoken"
                                                value={language}
                                                checked={formData.languagesSpoken ? formData.languagesSpoken.includes(language) : false}
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
                </div> */}
                {/* <div className="select-container-filter">
                    <div className="form-group">
                        <label htmlFor="hospital">suppliers:</label>
                        <select id="companyName" name="companyName" value={formData.companyName} onChange={handleInputChange}>
                            <option value="">Select Corporate</option>
                            {dropdownData.suppliers.map(supplier => (
                                <option key={supplier._id} value={supplier.companyName}>{supplier.companyName}</option>
                            ))}
                        </select>
                        <RiArrowDownSLine className="arrow-icon-filter" />
                    </div>
                </div> */}
            </div>

        </div>
    );
};

export default Filter;
