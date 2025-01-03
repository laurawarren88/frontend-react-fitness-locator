import React, { useState, useEffect } from 'react';

import  { getPlacesData } from '../api';

import Header from '../components/Tester/Header/Header';
import List from '../components/Tester/List/List';
import MapComponent from '../components/Tester/Map/Map';

const Tester = () => {
  const [places, setPlaces] = useState([]);

  const [coordinates, setCoordinates] = useState(null);

  // Use the users current location as the default coordinates
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    if (coordinates) {
      getPlacesData(coordinates)
        .then((data) => {
          setPlaces(data);
        });
    }
  }, [coordinates]); 

  return (
    <>
      <section className="max-w-7xl mx-auto py-20">
        <div className="bg-energeticGreen">
          <Header />
        </div>
      
        <div className="grid grid-cols-12 gap-8">
          {/* List Information/Display */}
          <div className="col-span-4">
            <List 
              places={places}
            />
          </div>

          {/* Map Information/Display */}
          <div className="col-span-8">
            <MapComponent 
              setCoordinates={setCoordinates}
              coordinates={coordinates}
              places={places}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Tester;