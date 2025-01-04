import React, { useState, useEffect } from 'react';

import  { getPlacesData } from '../api';

import Header from '../components/Tester/Header/Header';
import List from '../components/Tester/List/List';
import MapComponent from '../components/Tester/Map/Map';

const Tester = () => {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Use the users current location as the default coordinates
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (coordinates) {
      getPlacesData(coordinates)
        .then((data) => {
          setPlaces(data);
          setIsLoading(false);
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
              childClicked={childClicked}
              setChildClicked={setChildClicked} 
              isLoading={isLoading}
            />
          </div>

          {/* Map Information/Display */}
          <div className="col-span-8 cursor-pointer">
            <MapComponent 
              setCoordinates={setCoordinates}
              coordinates={coordinates}
              places={places}
              setChildClicked={setChildClicked}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Tester;