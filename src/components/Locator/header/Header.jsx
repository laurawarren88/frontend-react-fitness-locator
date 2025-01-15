import React from 'react'
import SearchBox from './searchBox';
import activityTypes from '../../../utils/activityTypes';

const Header = ({ setType, activityTypes, coordinates, setCoordinates, setRadius, setLeafletRadius, places, setFilteredPlaces, leafletMap }) => {

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType(selectedType);
    
    if (places.length > 0) {
        const filtered = places.filter(place => 
            place.type.toLowerCase() === selectedType.toLowerCase()
        );
        setFilteredPlaces(filtered);
    }
  };

  const handleRadiusChange = (e) => {
    const newRadius = parseInt(e.target.value);
    setRadius(newRadius);
  
    if (coordinates && leafletMap) {
      setLeafletRadius(leafletMap, coordinates, newRadius);
    }
  };

  return (
    // {/* Header Bar Container */}
    <div className="max-w-7xl mx-auto static bg-white p-6 m-6 rounded-lg border border-gray-300 shadow-lg"> 
      
      {/* Title Section */}
      <div className="title-section pb-8">
        <h1 className="h1-primary">Find your Fitness</h1>
      </div>

      {/* Search Bar */}
      <form className="grid grid-cols-12 gap-4 items-center">
          {/* Activity Type Dropdown */}
          <div className="col-span-4">
            <select
              id="activity-type"
              name="activity-type"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-energeticGreen"
              onChange={handleTypeChange}
              required
            >
              <option value="">Select a type</option>
              {activityTypes.map((type, index) => (
                <option key={index} value={type.key}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          {/* Radius Selector */}
          <div className="col-span-3">
            <select
              id="radius"
              name="radius"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-energeticGreen"
              onChange={handleRadiusChange}
            >
              <option value="1600">Within 1 mile</option>
              <option value="3200">Within 2 miles</option>
              <option value="4800">Within 3 miles</option>
              <option value="6400">Within 4 miles</option>
              <option value="8000">Within 5 miles</option>
            </select>
          </div>

          {/* Location Search */}
          <SearchBox 
            setCoordinates={setCoordinates}
            setPlaces={() => {}}
          />
        </form>
      </div>
  );
};

export default Header;