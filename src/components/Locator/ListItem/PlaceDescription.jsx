import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import defaultImage from '../../../assets/images/default_gym.jpg'

const PlaceDescription = ({ place, selected, refProp }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  const [placeImage, setPlaceImage] = useState(null);
  const [placeDetails, setPlaceDetails] = useState({
    name: place?.name || 'Unknown Place',
    vicinity: place?.address || place?.vicinity || 'No address available',
    openingHours: place?.openingHours || place?.opening_hours?.weekday_text || [],
    phone: place?.phone || place?.formatted_phone_number || 'No phone number available',
    rating: place?.rating || 'No rating available',
    website: place?.website || 'No website available',
  });

  useEffect(() => {
    if (selected && refProp?.current) {
      refProp.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selected, refProp]);
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full pr-6 pb-6 rounded-lg gap-4">
      <img
        className="w-full h-full object-cover rounded-lg mb-4"
        src={placeImage || place?.photo || defaultImage}
        alt={placeDetails.name}
        onError={(e) => (e.target.src = defaultImage)}
      />
      <div className="space-y-1 font-openSans p-2 justify-center">
        <h5 className="font-oswald font-extrabold text-xl tracking-wider pb-2">{placeDetails.name}</h5>
        
        {/* Address Section */}
        <div className="flex justify-items-start items-center">
          <p className="font-medium tracking-wider mr-2 text-lg">Address:</p>
          <p className="font-extralight text-darkGray text-center">{placeDetails.vicinity}</p>
        </div>
        <div className="flex justify-items-start items-center">
          <p className="font-medium tracking-wider mr-2 text-lg">City:</p>
          <p className="font-extralight">{place?.city || 'No city available'}</p>
        </div>
        <div className="flex justify-items-start items-center">
          <p className="font-medium tracking-wider mr-2 text-lg">Postcode:</p>
          <p className="font-extralight">{place?.postcode || 'No postcode available'}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-medium tracking-wider mr-2 text-lg">Opening Hours:</p>
          <div className="font-extralight">
            {placeDetails.openingHours || <li>Not available</li>}
          </div>
        </div>
        <div className="flex justify-items-start items-center">
          <p className="font-medium tracking-wider mr-2 text-lg">Phone Number:</p>
          <p className="font-extralight">{placeDetails.phone}</p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-medium tracking-wider mr-2 text-lg">Website:</p>
          <p className="font-extralight hover:text-energeticGreen">
            {placeDetails.website !== 'No website available' ? (
              <Link to={placeDetails.website} target="_blank" rel="noopener noreferrer">
                {placeDetails.website}
              </Link>
            ) : (
              'No website available'
            )}
          </p>
        </div>
        <div className="flex flex-wrap">
          <p className="font-medium tracking-wider mr-2 text-lg">Description:</p>
          <p className="font-extralight">{place?.description || 'No description available'}</p>
        </div>
        <div className="flex flex-row justify-start items-center gap-4">
          <Link to="/activities/:id" onClick={handleClick} className="btn-primary">View Page</Link>
          <Link to="/activities/:id/edit" onClick={handleClick} className="link">Edit</Link>
          <Link to="/activities/:id/delete" onClick={handleClick} className="link">Delete</Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceDescription;