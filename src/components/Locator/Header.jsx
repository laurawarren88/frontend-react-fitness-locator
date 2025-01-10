import React, {useState} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { LiaSearchLocationSolid } from "react-icons/lia";

const Header = ({ setType, activityTypes, coordinates, setCoordinates, setRadius, setLeafletRadius, places, setFilteredPlaces, leafletMap }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => {
    // console.log("Autocomplete instance loaded:", autoC);
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (!autocomplete) return;
  
    const place = autocomplete.getPlace();
    if (place.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCoordinates({ lat, lng });
    } else {
      alert('Please select a valid location.');
    }
  };

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
          <div className="col-span-3">
            <select
              id="activity-type"
              name="activity-type"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-energeticGreen"
              onChange={handleTypeChange}
              required
            >
              <option value="">Select a type</option>
              {activityTypes.map((type, index) => (
                <option key={index} value={type.toLowerCase().replace(/\s+/g, '+')}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Radius Selector */}
          <div className="col-span-2">
            <select
              id="radius"
              name="radius"
              className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-energeticGreen"
              onChange={handleRadiusChange}
            >
              <option value="">Select a radius</option>
              <option value="1600">Within 1 mile</option>
              <option value="3200">Within 2 miles</option>
              <option value="4800">Within 3 miles</option>
              <option value="6400">Within 4 miles</option>
              <option value="8000">Within 5 miles</option>
            </select>
          </div>

          {/* Location Search */}
          <div className="col-span-5">
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div className="relative rounded bg-white width-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LiaSearchLocationSolid />
                </div>
                <input
                  id="location"
                  type="text"
                  name="location"
                  placeholder="Enter postcode or location"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-energeticGreen"
                  required
                />
              </div>
            </Autocomplete>
          </div>

          {/* Search Button */}
          <div className="col-span-2">
            <button type="submit" className="btn-primary w-full">
              Search
            </button>
          </div>
        </form>
    </div>
  );
};

export default Header;