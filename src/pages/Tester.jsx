import React, { useState, useEffect } from 'react';
import { getPlacesData } from '../controllers/apiController';
import Header from '../components/Tester/Header/Header';
import List from '../components/Tester/List/List';
import MapComponent from '../components/Tester/Map/Map';

const Tester = () => {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('gym');
  const [radius, setRadius] = useState('8000');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Use the users current location as the default coordinates
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      },
      () => {
        setCoordinates({ lat: 51.5074, lng: -0.1278 }); // Default to London
      }
    );
  }, []);

  useEffect(() => {
    // console.log("useEffect triggered by:", { type, coordinates, radius });
      const fetchPlaces = async () => {
        const results = await getPlacesData(type, coordinates, radius);
        // console.log("Fetching places for:", { type, coordinates, radius });
        setPlaces(results?.filter((place) => place.name ));
        setIsLoading(false);
      };
      
      if (coordinates && type && radius && !initialized) {
      setIsLoading(true);
      setInitialized(true);
      fetchPlaces();
    }
  }, [type, coordinates, radius]);

  return (
    <>
      <section className="max-w-7xl mx-auto py-20">
        <div className="bg-energeticGreen">
          <Header setCoordinates={setCoordinates} />
          {/* <Header /> */}
        </div>
      
        <div className="grid grid-cols-12 gap-8">
          {/* List Information/Display */}
          <div className="col-span-4">
            <List 
              places={places}
              childClicked={childClicked}
              setChildClicked={setChildClicked} 
              isLoading={isLoading}
              type={type}
              setType={setType}
              radius={radius}
              setRadius={setRadius}
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