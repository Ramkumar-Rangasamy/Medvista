import React, { useEffect, useState } from 'react';
import './FilterPage.css';

import DoctorMainCard from './DoctorMainCard';
import Filter from './Filter';
import { fetchFromPatient } from '../../Api';
import { useSearch } from '../../GeneralPage/Context/context';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { IoClose } from "react-icons/io5";

const FilterPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [suppliers, setSuppliers] = useState([]);
  const [doc, setDoc] = useState([]);
  const [locations, setLocations] = useState([]);
  const [responseStatus, setResponseStatus] = useState();
  const [filters, setFilters] = useState({
    what: '',
    where: '',
    country: '',
    state: '',
    city: '',
    companyName: "",
  });

  const { searchData } = useSearch();

  useEffect(() => {
    if (searchData.suppliers) {
      setSuppliers(searchData.suppliers);
      setFilters(prevFilters => ({
        ...prevFilters,
        what: searchData.what || '',
        where: searchData.where || ''
      }));
    } else if (searchData.error) {
      console.error(searchData.error);
    }
  }, [searchData]);

  const fetchSuppliers = async () => {
    try {
      const response = await fetchFromPatient('/all-suppliers');
      if (response && Array.isArray(response.suppliers)) {
        setSuppliers(response.suppliers);
        setDoc(response.suppliers);
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
        setSuppliers({})
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
      console.error('Error fetching suppliers:', error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
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

  const handleLocationClick = (supplierId) => {
    if (supplierId) {
      const filtered = suppliers.filter(supplier => supplier._id === supplierId);
      setSuppliers(filtered);
    } else {
      fetchSuppliers();
    }
  };

  const filterSuppliers = (suppliers) => {
    if (!Array.isArray(suppliers)) {
      return [];
    }
    console.log(suppliers);

    return suppliers.filter((supplier) => {
      const getStringValue = (value) => (typeof value === 'string' ? value.toLowerCase().replace(" ", "") : '');

      const country = getStringValue(supplier?.address?.country || '');
      const state = getStringValue(supplier?.address?.state || '');
      const city = getStringValue(supplier?.address?.city || '');
      const companyName = getStringValue(supplier?.companyName || '');

      const matchesCountry = !filters.country || country === getStringValue(filters.country);
      const matchesState = !filters.state || state === getStringValue(filters.state);
      const matchesCity = !filters.city || city === getStringValue(filters.city);
      const matchesSupplier = !filters.companyName || companyName.includes(getStringValue(filters.companyName));

      return (
        matchesCountry &&
        matchesState &&
        matchesCity &&
        matchesSupplier
      );
    });
  };

  // const filteredSuppliers = filterSuppliers(suppliers);
  const filteredSuppliers = suppliers.length === 0 ? filterSuppliers(doc) : filterSuppliers(suppliers);
  // console.log(suppliers);


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
            <DoctorMainCard isMapExpanded={isMapExpanded} suppliers={filteredSuppliers}
              //  location={locations} 
              responseStatus={responseStatus} />
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
