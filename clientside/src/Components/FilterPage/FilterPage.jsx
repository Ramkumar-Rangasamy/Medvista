import React, { useEffect, useState } from 'react';
import DoctorMainCard from './DoctorMainCard';
import Filter from './Filter';
import './FilterPage.css';
import MapContainer from './Mapcontainer';
import { fetchFromPatient } from '../Api';
import { useSearch } from '../GeneralPage/Context/context';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IoClose } from "react-icons/io5";

const FilterPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [doctors, setDoctors] = useState([]);
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
    languages: [],
    gender: '',
    hospital: "",
    availability: '',
    dateAvailability: '',
    consultation: ''
  });

  const { searchData } = useSearch();

  useEffect(() => {
    if (searchData.doctors) {
      setDoctors(searchData.doctors);
      setFilters(prevFilters => ({
        ...prevFilters,
        what: searchData.what || '',
        where: searchData.where || ''
      }));
    } else if (searchData.error) {
      console.error(searchData.error);
    }
  }, [searchData]);

  const fetchDoctors = async () => {
    try {
      const response = await fetchFromPatient('/doctors');

      // console.log('Response from backend:', response);

      if (response && Array.isArray(response.doctors)) {
        setDoctors(response.doctors);
        setDoc(response.doctors);
        setResponseStatus(response.status === 200 ? "Success" : "Failed");

        const extractedLocations = response.uniqueLocations.map(location => ({
          lat: location.lat,
          lng: location.lng,
          hospitalName: location.hospitalName,
          city: location.city,
          doctorName: location.doctorName,
          doctorTitle: location.doctorTitle,
          doctorImage: location.doctorImage || '/path/to/default/profile/pic.png',
          doctorId: location.doctorId,
          subscriptionType: location.subscriptionType
        }));

        setLocations(extractedLocations);
        // console.log('Unique Locations:', extractedLocations);
      } else {
        setLocations([]);
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
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
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

  const handleLocationClick = (doctorId) => {
    if (doctorId) {
      const filtered = doctors.filter(doctor => doctor._id === doctorId);
      setDoctors(filtered);
    } else {
      fetchDoctors();
    }
  };

  const filterDoctors = (doctors) => {
    if (!Array.isArray(doctors)) {
      return [];
    }    
    return doctors.filter((doctor) => {
      const getStringValue = (value) => (typeof value === 'string' ? value.toLowerCase().replace(" ", "") : '');

      const country = getStringValue(doctor.country || '');
      const state = getStringValue(doctor.state || '');
      const speciality = (doctor.speciality.length > 0 ? doctor.speciality : []).map(getStringValue);
      const city = getStringValue(doctor.city || '');
      const gender = getStringValue(doctor.gender || '');
      const treatmentApproach = getStringValue(doctor.treatmentApproach || '');
      const hospital = doctor.hospitals.length > 0 ? doctor.hospitals.map(hospital => getStringValue(hospital.name)) : [];
      const availability = getStringValue(doctor.availability || '');
      const doctorConditions = (doctor.conditions || []).map(getStringValue);
      const doctorLanguages = (doctor.languages || []).map(getStringValue);
      const consultation = getStringValue(doctor.consultation || '');
      const doctorDates = (doctor.timeSlots || []).map((slot) => new Date(slot.date).toISOString().split('T')[0]);
      const filterDate = filters.dateAvailability ? new Date(filters.dateAvailability).toISOString().split('T')[0] : null;

      const matchesCountry = !filters.country || country === getStringValue(filters.country);
      const matchesState = !filters.state || state === getStringValue(filters.state);
      const matchesCity = !filters.city || city === getStringValue(filters.city);
      const matchesSpeciality = !filters.speciality || speciality.includes(getStringValue(filters.speciality));
      const matchesGender = !filters.gender || gender === getStringValue(filters.gender);
      const matchesTreatmentApproach = !filters.treatmentApproach || treatmentApproach === getStringValue(filters.treatmentApproach);
      const matchesHospital = !filters.hospital || hospital.includes(getStringValue(filters.hospital));
      const matchesAvailability = !filters.availability || availability === getStringValue(filters.availability);
      const matchesConditions = filters.conditions.length === 0 || filters.conditions.every(condition => doctorConditions.includes(getStringValue(condition)));
      const matchesLanguages = filters.languages.length === 0 || filters.languages.every(language => doctorLanguages.includes(getStringValue(language)));
      const matchesConsultation = !filters.consultation || consultation === getStringValue(filters.consultation);
      const matchesDateAvailability = !filterDate || doctorDates.includes(filterDate);

      return (
        matchesCountry &&
        matchesState &&
        matchesCity &&
        matchesSpeciality &&
        matchesGender &&
        matchesTreatmentApproach &&
        matchesHospital &&
        matchesAvailability &&
        matchesConditions &&
        matchesLanguages &&
        matchesConsultation &&
        matchesDateAvailability
      );
    });
  };

  // const filteredDoctors = filterDoctors(doctors);
  const filteredDoctors = doctors.length === 0 ? filterDoctors(doc) : filterDoctors(doctors); 

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
            <div className={`doctorMainCard-edit ${isMapExpanded ? 'col-4' : 'col-12 col-lg-6'}`}>
              <DoctorMainCard isMapExpanded={isMapExpanded} doctors={filteredDoctors} location={locations} responseStatus={responseStatus} />
            </div>
            <div className={`map-edit d-none d-lg-block ${isMapExpanded ? 'col-5 mt-4' : 'col-3'}`}>
              <MapContainer
                expanded={isMapExpanded}
                searchInput={searchInput}
                onExpandToggle={handleMapExpandToggle}
                onSearchInputChange={handleSearchInputChange}
                onSearchButtonClick={handleSearchButtonClick}
                onResetClick={handleResetClick}
                uniqueLocations={locations}
                onClickOutside={handleMapClose}
                onLocationClick={handleLocationClick}
              />
            </div>
          </div>
      </div>
    </>
  );
};

export default FilterPage;
