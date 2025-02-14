import React, { useState, useEffect } from 'react';
import './hero.css'; 

import Aos from "aos";
import "aos/dist/aos.css";

import doctorImage from '../../Assets/doctorImage.png';
import downarrowimage from '../../Assets/dwon.gif';
import { HiOutlineLocationMarker } from "react-icons/hi";
import { IoMdSearch } from "react-icons/io";
import { getNames, getCode } from 'country-list';
import countries from 'i18n-iso-countries';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSearch } from '../../GeneralPage/Context/context';
import Navbar from '../../GeneralPage/Navbar/Navbar';
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

const Hero = () => {
    const navigate = useNavigate();
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const { setSearchData } = useSearch();

    useEffect(() => {
        const countriesList = getNames().map(country => {
            const alpha2Code = getCode(country);
            const alpha3Code = countries.alpha2ToAlpha3(alpha2Code);

            // Map "ARE" to "UAE"
            const displayValue = alpha3Code === 'ARE' ? 'UAE' : alpha3Code;

            return {
                value: displayValue,
                label: country,
                fullLabel: country
            };
        });
        setLocations(countriesList);
        setSelectedLocation(countriesList.find(c => c.value === 'UAE'));
        // setSelectedLocation(selectedOption);
    }, []);

    const handleLocationChange = (event) => {
        const selectedValue = event.target.value;
        const selectedOption = locations.find(location => location.value === selectedValue);
        setSelectedLocation(selectedOption);
    };

  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [whereOptions, setWhereOptions] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [filteredSpecialities, setFilteredSpecialities] = useState([]);
  const [filteredConditions, setFilteredConditions] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showWhatOptions, setShowWhatOptions] = useState(false);
  const [showWhereOptions, setShowWhereOptions] = useState(false);

  useEffect(() => {
    populateWhatOptions(); // Fetch all options on load
    populateWhereOptions();
  }, []);

  const populateWhatOptions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/what-options`, { withCredentials: true });
      const { specialities, conditions, doctors } = response.data;
      setSpecialities(specialities);
      setConditions(conditions);
      setDoctors(doctors);
      setFilteredSpecialities(specialities);
      setFilteredConditions(conditions);
      setFilteredDoctors(doctors);
    } catch (error) {
      console.error('Error fetching what options:', error);
    }
  };

  const handleWhatInput = async (event) => {
    const query = event.target.value.toLowerCase();
    setWhat(query);

    if (!query) {
      setFilteredSpecialities(specialities);
      setFilteredConditions(conditions);
      setFilteredDoctors(doctors);
      setShowWhatOptions(true);
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/what-options?search=${encodeURIComponent(query)}`, { withCredentials: true });
      const { specialities: newSpecialities = [], conditions: newConditions = [], doctors: newDoctors = [] } = response.data;

      setFilteredSpecialities(newSpecialities.filter(speciality => speciality.toLowerCase().includes(query)));
      setFilteredConditions(newConditions.filter(condition => condition.toLowerCase().includes(query)));
      setFilteredDoctors(newDoctors.filter(doctor => doctor.name.toLowerCase().includes(query)));
      setShowWhatOptions(true);
    } catch (error) {
      console.error('Error fetching filtered options:', error);
    }
  };

  const handleWhatSelect = (option) => {
    setWhat(option);
    setShowWhatOptions(false);
  };
  const populateWhereOptions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/where-options`, { withCredentials: true });
      const data = response.data;
      const { cities, states, countries } = data;
      setWhereOptions([...cities, ...states, ...countries]);
    } catch (error) {
      console.error('Error fetching where options:', error);
    }
  };
  // const handleWhereSelect = (option) => {
  //   setWhere(option);
  //   setShowWhereOptions(false);
  // };

  const searchDoctors = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/search-doctors?what=${what}&where=${where}`, { withCredentials: true });
      const doctors = response.data;

      if (doctors && doctors.length > 0) {
        console.log('Navigating with:', { doctors, what, where });
        setSearchData({ doctors, what, where });
        navigate('/Filters');
      } else {
        console.log('No doctors found');
        // Navigate to a different page or show a message
        navigate('/Filters', { state: {doctors,what, where } });
      }
    } catch (error) {
      console.error('Error fetching doctors:', error);
      // Handle error (e.g., show a message to the user)
      navigate('/Filters', { state: { error: 'An error occurred while searching for doctors. Please try again later.' } });
    }
  };

  const handleSubmit = (e)=>{
    e.preventDefault();
    searchDoctors();
  }

  const handleFocusWhat = () => setShowWhatOptions(true);

  const renderDropdownItems = () => {
    let hasItems = false;
    return (
      <ul className="dropdown-list what-dropdown">
        {filteredSpecialities.length > 0 && (
          <>
            <li className="dropdown-item disabled">Specialities </li>
            {filteredSpecialities.map((speciality, index) => (
              <li key={index} className="dropdown-item" onClick={() => handleWhatSelect(speciality)}>
                {speciality}
              </li>
            ))}
            {hasItems = true}
          </>
        )}
        {filteredConditions.length > 0 && (
          <>
            <li className="dropdown-item disabled" >Conditions :</li>
            {filteredConditions.map((condition, index) => (
              <li key={index} className="dropdown-item" onClick={() => handleWhatSelect(condition)}>
                {condition}
              </li>
            ))}
            {hasItems = true}
          </>
        )}
        {filteredDoctors.length > 0 && (
          <>
            <li className="dropdown-item disabled"  style={{color:"orange"}}>Doctors :</li>
            {filteredDoctors.map((doctor, index) => (
              <li key={index} className="dropdown-item" onClick={() => handleWhatSelect(doctor.name)}>
                {doctor.name}
              </li>
            ))}
            {hasItems = true}
          </>
        )}
        {!hasItems && <li className="dropdown-item disabled">No results found</li>}
      </ul>
    );
  };

  useEffect(() => {
    Aos.init();
  }, []);

    return (
        <>  
           <div className='hero-head '>
              <Navbar/>
              <div className='container-fluid'>
                <div className='hero-content d-flex row  align-items-center'>
                    <div className="col-md-6 col-12 hero-item">
                        <h5 data-aos="fade-right"data-aos-duration="2000">Be Your Own Health Advocate</h5>
                        <h1 data-aos="fade-left" data-aos-duration="2000" className="hero-title">Find the<span>  Best Providers</span> <br /> Based On Your Condition</h1>
                        <div className='search-box'>
                            <div className="custom-select-wrapper">
                                <HiOutlineLocationMarker className="icon-loc-src"/>
                                <select
                                    onChange={handleLocationChange}
                                    value={selectedLocation ? selectedLocation.value : 'UAE'}
                                >
                                    {locations.map(location => (
                                        <option key={location.value} value={location.value}>
                                            {selectedLocation && selectedLocation.value === location.value ? location.value : location.fullLabel}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='simple-line'></div>
                            <div className="search">
                            <IoMdSearch className="icon-loc-src" />
                            <input
                              type="text"
                              className="search-input"
                              id="what"
                              value={what}
                              onChange={handleWhatInput}
                              placeholder="Search Providers"
                              onFocus={handleFocusWhat}
                              onBlur={() => setTimeout(() => setShowWhatOptions(false), 200)}
                              autoComplete="off"
                            />
                            {showWhatOptions && renderDropdownItems()}
                            <div className='simple-line-small'></div>
                            <div className="outer">
                              <button className="search-button" onClick={handleSubmit}>
                                Find My Provider
                              </button>
                            </div>
                          </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-12 text-center" data-aos="fade-up" data-aos-anchor-placement="bottom-bottom" data-aos-duration="2000">
                        <div className='image-division'>
                            <div className="ecg-container">
                                <svg viewBox="0 0 100 50" className="ecg-line">
                                    <polyline className="" points="0,25 10,25 15,13 20,35 25,25 33,25 40,7 47,40 53,25 65,25 68,15 74,35 80,25 95,25" />
                                    <polyline className="line" points="0,25 10,25 15,13 20,35 25,25 33,25 40,7 47,40 53,25 65,25 68,15 74,35 80,25 100,25" />
                                </svg>
                            </div>
                            <img src={doctorImage} alt="Doctors" className="hero-image"/>
                            <div className="layout"></div> 
                        </div> 
                    </div>
                </div>
                </div>
                <div className='example-delete-downarrow'>
                 <img src={downarrowimage} alt='Noimage'/>
                </div>
              
           </div>
        </>
    );
};

export default Hero;
