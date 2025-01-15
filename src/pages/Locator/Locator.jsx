import React, { useState, useEffect } from 'react';
import { getPlacesData } from '../../controllers/mockdataController';
import activityTypes  from '../../utils/activityTypes';
import Header from '../../components/Locator/Header/Header';
import List from '../../components/Locator/ListItem/List';
import LeafletMap from '../../components/Locator/MockMap/LeafletMap';

const Locator = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [leafletMap, setLeafletMap] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('');
  const [radius, setRadius] = useState('1600');
  const [useMockData, setUseMockData] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude, accuracy } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
        setRadius(accuracy); 
      },
      () => setCoordinates({ lat: 51.5074, lng: -0.1278 }) // Default to London
    );
  }, []);

  useEffect(() => {
    if (places.length > 0) {
        setFilteredPlaces(places);
    }
  }, [places]);

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

  const setLeafletRadius = (map, center, radius) => {
    if (map && center && radius) {
      map.eachLayer((layer) => {
        if (layer instanceof L.Circle) {
          map.removeLayer(layer);
        }
      });
      L.circle([center.lat, center.lng], { radius }).addTo(map);
    }
  };

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
          setType={setType}
          activityTypes={activityTypes}
          setCoordinates={setCoordinates}
          setRadius={setRadius}
          setLeafletRadius={setLeafletRadius}
          places={places}
          setPlaces={setPlaces}
          setFilteredPlaces={setFilteredPlaces}
          leafletMap={leafletMap}
        />

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full gap-6">
          <List
            places={places}
            childClicked={childClicked}
            setChildClicked={setChildClicked}
            isLoading={isLoading}
          />
          {useMockData ? (
            <LeafletMap 
              coordinates={coordinates}
              radius={radius}
              places={filteredPlaces}
              setChildClicked={setChildClicked}
              setLeafletMap={setLeafletMap}
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

export default Locator;