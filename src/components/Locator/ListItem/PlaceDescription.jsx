import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import defaultImage from '../../../assets/images/default_gym.jpg'

const PlaceDescription = ({ place, selected, refProp }) => {
  const [placeImage, setPlaceImage] = useState(null);
  const [placeDetails, setPlaceDetails] = useState({
    name: place?.name || 'Unknown Place',
    address: place?.address || place?.vicinity || 'No address available',
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
  
  useEffect(() => {
    if (place?.place_id) {
      const fetchPlaceDetails = async () => {
        try {
          const response = await fetch(
            // `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,rating,formatted_phone_number,website,opening_hours,formatted_address&key=${GOOGLE_API_KEY}`
          );
          const data = await response.json();

          if (data.status === 'OK') {
            const details = data.result;
            setPlaceDetails({
              name: details.name || place?.name || 'Unknown Place',
              address: details.formatted_address ||  place.address || place?.vicinity || 'No address available',
              openingHours: details.opening_hours?.weekday_text || place?.opening_hours?.weekday_text || place?.openingHours  || [],
              phone: details.formatted_phone_number || place?.formatted_phone_number || place.phone || 'No phone number available',
              rating: details.rating || place?.rating || 'No rating available',
              website: details.website || place?.website || 'No website available',
            });
          } else {
            console.error('Error fetching place details:', data.status);
          }
        } catch (error) {
          console.error('Error fetching place details:', error);
        }
      };

      fetchPlaceDetails();
    }
  }, [place]);

  const formatOpeningHours = (hours) => {
    if (Array.isArray(hours)) {
      return hours.map((day) =>
        day
          .replace('Monday:', 'Mon:')
          .replace('Tuesday:', 'Tue:')
          .replace('Wednesday:', 'Wed:')
          .replace('Thursday:', 'Thu:')
          .replace('Friday:', 'Fri:')
          .replace('Saturday:', 'Sat:')
          .replace('Sunday:', 'Sun:')
      );
    }
    return []; 
  };

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
          <p className="font-extralight text-darkGray text-center">{placeDetails.address}</p>
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
            {/* {openingHours.length > 0 ? openingHours.map((day, i) => <li key={i}>{day}</li>) : <li>Not available</li>} */}
            {placeDetails.openingHours || <li>Not available</li>}
          </div>
        </div>
        <div className="flex justify-items-start items-center">
          <p className="font-medium tracking-wider mr-2 text-lg">Phone Number:</p>
          <p className="font-extralight">{placeDetails.phone}</p>
        </div>
        <div className="flex justify-items-start items-center">
          <p className="font-medium tracking-wider mr-2 text-lg">Rating:</p>
          <div className="justify-center text-center text-energeticGreen text-2xl">
            {'★'.repeat(Math.floor(placeDetails.rating || 0)) +
              '☆'.repeat(5 - Math.floor(placeDetails.rating || 0))}
          </div>
        </div>
        <div className="flex flex-wrap">
          <p className="font-medium tracking-wider mr-2 text-lg">Website:</p>
          <p className="font-extralight hover:text-energeticGreen">
            {placeDetails.website !== 'No website available' ? (
              <a href={placeDetails.website} target="_blank" rel="noopener noreferrer">
                {placeDetails.website}
              </a>
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
          <Link to="/activities/:id" className="btn-primary">View Page</Link>
          <Link to="/activities/:id/edit" className="link">Edit</Link>
          <Link to="/activities/:id/delete" className="link">Delete</Link>
        </div>
      </div>
    </div>
  );
};

export default PlaceDescription;