import React, { useState, useEffect } from 'react';
import { GOOGLE_API_KEY } from '../../utils/config';
import defaultImage from '../../assets/images/default_gym.jpg'

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
            `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=name,rating,formatted_phone_number,website,opening_hours,formatted_address&key=${GOOGLE_API_KEY}`
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
    <div>
      <img
        className="w-full h-80 object-cover"
        src={placeImage || place?.photo || defaultImage}
        alt={placeDetails.name}
        onError={(e) => (e.target.src = defaultImage)}
      />
      <div>
        <h5 className="border-b-4">{placeDetails.name}</h5>
        <div className="flex">
          <p>Address: </p>
          <p className="border-b-4">{placeDetails.address}</p>
        </div>
        <div className="flex">
          <p>City: </p>
          <p className="border-b-4">{place?.city || 'No city available'}</p>
        </div>
        <div className="flex">
          <p>Postcode: </p>
          <p className="border-b-4">{place?.postcode || 'No postcode available'}</p>
        </div>
        <div className="flex">
          <p>Opening Hours: </p>
          <div className="border-b-4">
          <ul>
            {/* {openingHours.length > 0 ? openingHours.map((day, i) => <li key={i}>{day}</li>) : <li>Not available</li>} */}
            {placeDetails.openingHours || <li>Not available</li>}
          </ul>
          </div>
        </div>
        <div className="flex">
          <p>Phone Number: </p>
          <p className="border-b-4">{placeDetails.phone}</p>
        </div>
        <div className="flex">
          <p>Rating: </p>
          <div className="text-yellow-400 text-sm">
            {'★'.repeat(Math.floor(placeDetails.rating || 0)) +
              '☆'.repeat(5 - Math.floor(placeDetails.rating || 0))}
          </div>
        </div>
        <div className="flex">
          <p>Website: </p>
          <p className="border-b-4">
            {placeDetails.website !== 'No website available' ? (
              <a href={placeDetails.website} target="_blank" rel="noopener noreferrer">
                {placeDetails.website}
              </a>
            ) : (
              'No website available'
            )}
          </p>
        </div>
      </div>
    </div>
  );
};


export default PlaceDescription;