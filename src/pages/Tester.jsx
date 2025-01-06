import React, { useState, useEffect } from 'react';
import { getPlacesData } from '../controllers/apiController';
import Header from '../components/Locator/Header';
import List from '../components/Locator/List';
import MapComponent from '../components/Locator/Map';

const Tester = () => {
  const [places, setPlaces] = useState([]);
  const [childClicked, setChildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('');
  const [radius, setRadius] = useState('8000');

  const activityTypes = [
    'Gyms',
    'Personal Trainers',
    'Leisure Centers',
    'Sports Clubs',
    'Yoga Studios',
    'Pilates Studios',
    'Crossfit Boxes',
    'Fitness Bootcamps',
    'Health Clubs',
    'Running Tracks',
    'Dance Studios',
    'Martial Arts',
    'Swimming Pools',
    'Basketball Courts',
    'Tennis Courts',
    'Golf Courses',
    'Skiing/Snowboarding Centers',
    'Cycling Routes',
    'Hiking Trails',
    'Rock Climbing Centers',
    'Spa and Wellness Centers',
    'Boxing Gyms',
    'Cycling Studios',
    'Rowing Centers',
    'Horse Riding Centers',
    'Meditation Centers',
  ];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => setCoordinates({ lat: latitude, lng: longitude }),
      () => setCoordinates({ lat: 51.5074, lng: -0.1278 }) // Default to London
    );
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      const results = await getPlacesData(type, coordinates, radius);
      setPlaces(results?.filter((place) => place.name));
      setIsLoading(false);
    };

    if (coordinates && type) {
      setIsLoading(true);
      fetchPlaces();
    }
  }, [type, coordinates, radius]);

  return (
    <>
      <section className="max-w-7xl mx-auto py-20">

        {/* Search Component */}
        <div className="">
        <Header
          setCoordinates={setCoordinates}
          setType={setType}
          setRadius={setRadius}
          activityTypes={activityTypes}
        />
        </div>
      
        <div className="grid grid-cols-12 gap-8">
          {/* List Information/Display */}
          <div className="col-span-4">
            <List 
              places={places}
              type={type}
              setType={setType}
              radius={radius}
              setRadius={setRadius}
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