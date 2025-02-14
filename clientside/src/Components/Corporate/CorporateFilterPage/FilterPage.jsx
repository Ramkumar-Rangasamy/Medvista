import React, { useEffect, useState } from 'react';
import './FilterPage.css';

import DoctorMainCard from './DoctorMainCard';
import Filter from './Filter';
import { fetchFromPatient } from '../../Api';
import { useSearch } from '../../GeneralPage/Context/context';

import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoClose } from "react-icons/io5";

const FilterPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [corporates, setCorporates] = useState([]);
  const [doc, setDoc] = useState([]);
  const [locations, setLocations] = useState([]);
  const [responseStatus, setResponseStatus] = useState();
  const [filters, setFilters] = useState({
    what: '',
    where: '',
    country: '',
    state: '',
    city: '',
    speciality: '',
    conditions: [],
    languagesSpoken: [],
    corporateName: "",
  });

  const { searchData } = useSearch();

  useEffect(() => {
    if (searchData.corporates) {
      setCorporates(searchData.corporates);
      setFilters(prevFilters => ({
        ...prevFilters,
        what: searchData.what || '',
        where: searchData.where || ''
      }));
    } else if (searchData.error) {
      console.error(searchData.error);
    }
  }, [searchData]);

  const fetchcorporates = async () => {
    try {
      const response = await fetchFromPatient('/corporate-list');
      // console.log('Response from backend:', response);
      if (response && Array.isArray(response.corporates)) {
        setCorporates(response.corporates);
        setDoc(response.corporates);
        setResponseStatus(response.status === 200 ? "Success" : "Failed");

        // const extractedLocations = response.uniqueLocations.map(location => ({
        //   lat: location.lat,
        //   lng: location.lng,
        //   hospitalName: location.hospitalName,
        //   city: location.city,
        //   doctorName: location.doctorName,
        //   doctorTitle: location.doctorTitle,
        //   doctorImage: location.doctorImage || '/path/to/default/profile/pic.png',
        //   doctorId: location.doctorId,
        //   subscriptionType: location.subscriptionType
        // }));

        // setLocations(extractedLocations);
        // console.log('Unique Locations:', extractedLocations);
      } else {
        // setLocations([]);
        setCorporates({})
      }
      if (response.status === 200) {
        setResponseStatus("Success");
      }
      else if (response.status === 500) {
        setResponseStatus("Failed");
      }
      else {
        setResponseStatus("Pending");
      }
    } catch (error) {
      console.error('Error fetching corporates:', error);
    }
  };

  useEffect(() => {
    fetchcorporates();
  }, []);

  const toggleFilterCanvas = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleMapExpandToggle = () => {
    setIsMapExpanded(!isMapExpanded);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setFilters((prevFilters) => ({ ...prevFilters, what: searchInput }));
  };

  const handleFilterChange = (filterData) => {
    setFilters(filterData);
  };

  const handleResetClick = () => {
    setIsMapExpanded(false);
    setSearchInput('');

  };

  const handleMapClose = () => {
    setIsMapExpanded(false);
  };

  const handleLocationClick = (corporateId) => {
    if (corporateId) {
      const filtered = corporates.filter(corporate => corporate._id === corporateId);
      setCorporates(filtered);
    } else {
      fetchcorporates();
    }
  };

  const filtercorporates = (corporates) => {
    if (!Array.isArray(corporates)) {
      return [];
    }
    return corporates.filter((corporate) => {
      const getStringValue = (value) => (typeof value === 'string' ? value.toLowerCase().replace(" ", "") : '');

      const country = getStringValue(corporate?.address?.country || '');
      const state = getStringValue(corporate?.address?.state || '');
      const city = getStringValue(corporate?.address?.city || '');
      const speciality = (corporate?.corporateSpecialties?.length > 0 ? corporate.corporateSpecialties : []).map(getStringValue);
      const corporateName = getStringValue(corporate?.corporateName || '');
      const corporateConditions = (corporate.conditions || []).map(getStringValue);
      const corporateLanguages = (corporate.languagesSpoken || []).map(getStringValue);

      const matchesCountry = !filters.country || country === getStringValue(filters.country);
      const matchesState = !filters.state || state === getStringValue(filters.state);
      const matchesCity = !filters.city || city === getStringValue(filters.city);
      const matchesSpeciality = !filters.speciality || speciality.includes(getStringValue(filters.speciality));
      const matchesCorporate = !filters.corporateName || corporateName.includes(getStringValue(filters.corporateName));
      const matchesConditions = filters.conditions.length === 0 || filters.conditions.every(condition => corporateConditions.includes(getStringValue(condition)));
      const matchesLanguages = filters.languagesSpoken.length === 0 || filters.languagesSpoken.every(language => corporateLanguages.includes(getStringValue(language)));

      return (
        matchesCountry &&
        matchesState &&
        matchesCity &&
        matchesSpeciality &&
        matchesCorporate &&
        matchesConditions &&
        matchesLanguages
      );
    });
  };

  // const filteredcorporates = filtercorporates(corporates);
  const filteredcorporates = corporates.length === 0 ? filtercorporates(doc) : filtercorporates(corporates);
  // console.log(corporates);


  return (
    <>
      <div className='container-fluid mt-lg-5'>
        <div className='filterpage-container'>
          <button onClick={toggleFilterCanvas} className="filterpage-hamburger btn btn-primary my-3 d-lg-none">
            <FontAwesomeIcon icon={faFilter} />
          </button>

          <div className={`filterpage-offcanvas ${isFilterOpen ? 'filterpage-offcanvas-show' : ''}`}>
            <button className="filterpage-offcanvas-close btn-close" onClick={toggleFilterCanvas}><IoClose /></button>
            <Filter onFilterChange={handleFilterChange} initialFilters={filters} />
            <div className='d-flex justify-content-center '>
              <button className="btn btn-primary" onClick={toggleFilterCanvas}>Apply filters</button>
            </div>
          </div>
        </div>

        <div className='filterpage-parent d-flex flex-column flex-lg-row'>
          <div className="filter-edit col-12 col-lg-3">
            <Filter onFilterChange={handleFilterChange} initialFilters={filters} />
          </div>
          <div className={`doctorMainCard-edit col-12 col-lg-6`}>
            <DoctorMainCard isMapExpanded={isMapExpanded} corporates={filteredcorporates} responseStatus={responseStatus} />
          </div>
          <div className={`map-edit d-none d-lg-block ${isMapExpanded ? 'col-5 mt-4' : 'col-3'}`}>
            {/* <MapContainer
                expanded={isMapExpanded}
                searchInput={searchInput}
                onExpandToggle={handleMapExpandToggle}
                onSearchInputChange={handleSearchInputChange}
                onSearchButtonClick={handleSearchButtonClick}
                onResetClick={handleResetClick}
                // uniqueLocations={locations}
                onClickOutside={handleMapClose}
                onLocationClick={handleLocationClick}
              /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPage;
