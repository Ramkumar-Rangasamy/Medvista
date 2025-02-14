import React, { useEffect, useRef, useState } from 'react';
import './mapcontainer.css';
import { IoSearch } from "react-icons/io5";
import { RiArrowDownSLine } from "react-icons/ri";

const MapContainer = ({
    expanded,
    searchInput,
    onExpandToggle,
    onSearchInputChange,
    onSearchButtonClick,
    onResetClick,
    uniqueLocations,
    onClickOutside,
    onLocationClick
}) => {
    const [mapLoaded, setMapLoaded] = useState(false);
    const mapRef = useRef(null);
    const apiKey = 'AIzaSyApr-nSbv28HGFJxddFfjhtNM-xtF2YfMA';

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mapRef?.current && !mapRef.current.contains(event.target)) {
                onClickOutside();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClickOutside]);

    const loadGoogleMapsScript = () => {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src*="maps.googleapis.com"]`)) {
                resolve(window.google.maps);
                return;
            }

            if (window.google && window.google.maps) {
                resolve(window.google.maps);
                return;
            }

            window.initMap = () => {
                if (window.google && window.google.maps) {
                    resolve(window.google.maps);
                } else {
                    reject(new Error('Google Maps API not loaded'));
                }
            };

            const script = document.createElement('script');
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&v=weekly&libraries=geometry`;
            script.async = true;
            script.defer = true;
            script.onerror = (error) => {
                reject(error);
            };
            document.head.appendChild(script);
        });
    };

    useEffect(() => {
        loadGoogleMapsScript()
            .then((googleMaps) => {
                setMapLoaded(true);
                if (uniqueLocations && Array.isArray(uniqueLocations)) {
                    initMap(googleMaps);
                } else {
                    console.warn('uniqueLocations is not available or not an array');
                }
            })
            .catch((error) => {
                console.error('Error loading Google Maps:', error);
            });
    }, [uniqueLocations]);

    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    position => {
                        resolve({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    },
                    error => {
                        alert('Location access is required to show your position on the map. Please enable location services in your browser settings.');
                        reject(error);
                    }
                );
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    };

    const calculateDistance = (googleMaps, userLocation, targetLocation) => {
        if (!userLocation || !targetLocation || !userLocation.lat || !userLocation.lng || !targetLocation.lat || !targetLocation.lng) {
            return null;
        }

        const userLatLng = new googleMaps.LatLng(userLocation.lat, userLocation.lng);
        const targetLatLng = new googleMaps.LatLng(targetLocation.lat, targetLocation.lng);
        return googleMaps.geometry.spherical.computeDistanceBetween(userLatLng, targetLatLng);
    };

    const createCircularImage = (imageUrl, borderColor, callback) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const size = Math.min(img.width, img.height);
            const borderWidth = 50;
    
            canvas.width = size + borderWidth * 2; 
            canvas.height = size + borderWidth * 2; 
    
            ctx.fillStyle = borderColor; 
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, (size + borderWidth) / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
    
            ctx.beginPath();
            ctx.arc(canvas.width / 2, canvas.height / 2, size / 2, 0, Math.PI * 2); 
            ctx.closePath();
            ctx.clip();
    
            ctx.drawImage(img, borderWidth, borderWidth, size, size); 
            callback(canvas.toDataURL());
        };
        img.src = imageUrl;
    };
    
    const initMap = async (googleMaps) => {
        if (!googleMaps) {
            console.error('Google Maps API not loaded');
            return;
        }
    
        let userLocation;
        const defaultCenter = { lat: 20.5937, lng: 78.9629 };
        const map = new googleMaps.Map(document.getElementById('map'), {
            zoom: 12,
            center: defaultCenter
        });
    
        try {
            userLocation = await getUserLocation();
            const userMarker = new googleMaps.Marker({
                position: userLocation,
                map: map,
                title: 'Your Location',
                icon: {
                    url: '/marker2.png',
                    scaledSize: new googleMaps.Size(90, 90) 
                }
            });
    
            const userInfoWindow = new googleMaps.InfoWindow({
                content: 'You are here'
            });
    
            userMarker.addListener('click', () => {
                userInfoWindow.open(map, userMarker);
            });
    
            map.setCenter(userLocation);
            map.setZoom(13);
    
        } catch (error) {
            console.error('Error getting user location:', error);
            map.setCenter(defaultCenter);
        }
    
        if (uniqueLocations && Array.isArray(uniqueLocations)) {
            uniqueLocations.forEach(location => {
                if (!location.lat || !location.lng) {
                    console.error('Location data is incomplete:', location);
                    return;
                }
    
                const position = { lat: location.lat, lng: location.lng };
                const markerColor = location.subscriptionType === 'Premium' ? '#FF7F50' :
                                    location.subscriptionType === 'Standard' ? '#0067FF' : '#808080';
    
                createCircularImage(location.doctorImage, markerColor, (circularImage) => {
                    const marker = new googleMaps.Marker({
                        position: position,
                        map: map,
                        title: 'Free Time Slot Location',
                        icon: {
                            url: circularImage,
                            scaledSize: new googleMaps.Size(55, 55)
                        }
                    });
                    const infoWindow = new googleMaps.InfoWindow({
                        content: `
                        <div style="font-family: Arial, sans-serif; max-width: 180px; background: #F4F7FC; padding: 8px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                            <div style="text-align: center; margin-bottom: 8px;">
                                <strong style="font-size: 14px; color: #2c3e50;">Dr. ${location.doctorName}</strong>
                                <br>
                                <span style="font-size: 12px; color: #7f8c8d;">${location.doctorTitle}</span>
                            </div>
                            <div style="font-size: 10px; color: #34495e; margin-bottom: 10px;">
                                <strong>${location.hospitalName}</strong>  <br>
                                <strong>Distance:</strong> ${(calculateDistance(googleMaps, userLocation, position) / 1000).toFixed(2)} km
                            </div>
                            <div style="text-align: center; margin-top: 6px;">
                                <button class="clear-selection" style="color: white; background: #2980b9; border: none; border-radius: 4px; padding: 5px 4px; cursor: pointer; font-size: 11px; transition: background 0.3s ease;">
                                    Clear Selection
                                </button>
                                <br>
                                <a href="https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${location.lat},${location.lng}" target="_blank" class="view-directions" style="color: #2980b9; text-decoration: none; font-size: 11px; transition: color 0.3s ease; margin-top: 4px; display: inline-block;">
                                    View Directions
                                </a>
                            </div>
                        </div>
                        `,
                        disableAutoPan: false,
                        closeBoxURL: "",
                    });
                    
                    marker.addListener('click', () => {
                        infoWindow.open(map, marker);
                    });
    
                    marker.addListener('click', () => {
                        onLocationClick(location.doctorId);
                    });
    
                    googleMaps.event.addListener(infoWindow, 'domready', () => {
                        const clearButton = document.querySelector('.clear-selection');
                        if (clearButton) {
                            clearButton.onclick = () => {
                                onLocationClick(null);
                                infoWindow.close(); 
                            };
                        }
                    });
    
                    marker.setMap(map);
                });
            });
        } else {
            console.error('uniqueLocations is not properly defined:', uniqueLocations);
        }
    };
    

    const handleContainerClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div className='map-container-edit' onClick={handleContainerClick} ref={mapRef}>
            <div className={`${expanded ? 'mapExpanded-mapHead' : 'mapHead'}`}>
                <div className={`mapContainer ${expanded ? 'expanded' : ''}`}>
                    <div className={` map-sort-by ${expanded ? '' : 'mapExpanded-sort-by'}`}>
                        <div className="map-form-group">
                            <label htmlFor="sort">Sort By</label>
                            <select id="sort">
                                <option value="relevance" className='custom-option'>Relevance</option>
                                <option value="distance" className='custom-option'>Distance</option>
                                <option value="rating" className='custom-option'>Rating</option>
                            </select>
                            <RiArrowDownSLine className="map-arrow-icon-filter" />
                        </div>
                    </div>
                    {mapLoaded ? (
                        <div id="map" style={{ height: '100vh', width: '100%' }}></div>
                    ) : (
                        <div>Loading map...</div>
                    )}
                    {expanded ? null : (
                        <div className="searchButtonContainer">
                            <button className="searchButton" onClick={onExpandToggle}>
                                Show on Map <IoSearch />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapContainer;
