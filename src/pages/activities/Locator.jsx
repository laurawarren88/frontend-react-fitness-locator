import React, { useState, useEffect } from 'react';
import { getPlacesData } from '../../controllers/apiController';
import activityTypes  from '../../utils/activityTypes';
import Header from '../../components/Locator/Header';
import List from '../../components/Locator/List';
import MapComponent from '../../components/Locator/Map';
import LeafletMap from '../../components/Locator/LeafletMap';

const Tester = () => {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('');
  const [radius, setRadius] = useState('8000');
  const [useMockData, setUseMockData] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => setCoordinates({ lat: latitude, lng: longitude }),
      () => setCoordinates({ lat: 51.5074, lng: -0.1278 }) // Default to London
    );
  }, []);

  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     const results = await getPlacesData(type, coordinates, radius);
  //     setPlaces(results?.filter((place) => place.name));
  //     setIsLoading(false);
  //   };

  //   if (coordinates && type) {
  //     setIsLoading(true);
  //     fetchPlaces();
  //   }
  // }, [type, coordinates, radius]);

  useEffect(() => {
    if (!coordinates || !type) return;
  
    setIsLoading(true);

    const fetchPlaces = async () => {
      try {
        const results = await getPlacesData(type, coordinates, radius, useMockData);
        // console.log("Locator fetched results 1:", results); 
        setPlaces(results);
      } catch (error) {
        console.error('Error fetching places:', error);
        setError(error);
        } finally {
          setIsLoading(false);
          }
      }
        // console.log("Locator Fetched results 2:", places);
        // console.log("Coordinates in LeafletMap:", coordinates);
        fetchPlaces();
  }, [coordinates, type, radius, useMockData]);

  const handleTypeChange = (e) => setType(e.target.value);
  const handleRadiusChange = (e) => setRadius(e.target.value);
  const handleMockToggle = () => setUseMockData((prev) => !prev); 

  return (
      <section className="max-w-7xl mx-auto py-20">
        <div className="toggle">
          <label>
            <input
              type="checkbox"
              checked={useMockData}
              onChange={() => setUseMockData(!useMockData)}
            />
            Use Mock Data
          </label>
        </div>

        {/* Search Component */}
        <Header
          setCoordinates={setCoordinates}
          setType={setType}
          setRadius={setRadius}
          activityTypes={activityTypes}
        />

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full gap-6">
          <List
            places={places}
            // type={type}
            // setType={setType}
            // radius={radius}
            // setRadius={setRadius}
            childClicked={childClicked}
            setChildClicked={setChildClicked}
            // isLoading={isLoading}
          />
          {useMockData ? (
            <LeafletMap 
              coordinates={coordinates}
              places={places}
              setChildClicked={setChildClicked}
            />
          ) : ( 
            <MapComponent
              setCoordinates={setCoordinates}
              coordinates={coordinates}
              places={places}
              setChildClicked={setChildClicked}
            />
          )}
        </div>
    </section>
  );
};

export default Tester;