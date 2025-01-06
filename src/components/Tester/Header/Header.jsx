import React, {useState} from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { LiaSearchLocationSolid } from "react-icons/lia";

const Header = ({ setCoordinates }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (autoC) => {
    // console.log("Autocomplete instance loaded:", autoC);
    setAutocomplete(autoC);
  };

  const onPlaceChanged = () => {
    if (!autocomplete) return;
  
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      // console.error("Place has no geometry");
      return;
    }
  
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();
  
    // console.log("New coordinates:", { lat, lng });
    setCoordinates({ lat, lng });
  };

  return (
    // {/* Header Bar Container */}
    <div className='static'> 
      <div className='flex justify-between'>

        <div className='block'>
          <h1>Fitness Locator</h1>
        </div>
        
        {/* Search Element */}
        <div className='flex'>
          <div className='block'>
            <h2>Explore</h2>
          </div>

          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} >
            <div className='relative rounded bg-white width-full'>
              <div className='absolute height-full flex items-center pl-3'>
                <LiaSearchLocationSolid />
              </div>
              <input
              id="keyword"
              type="text"
              name="keyword"
              placeholder="Search for an activity"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-energeticGreen"
              required
              />
              </div>
          </Autocomplete>
        </div>
      </div>
    </div>
  )
}

export default Header