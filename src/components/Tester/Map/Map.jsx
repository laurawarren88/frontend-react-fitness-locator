import React, { useState } from 'react';
import { APIProvider, Map, Marker, AdvancedMarker } from '@vis.gl/react-google-maps';
import { GOOGLE_API_KEY, MAP_ID } from '../../../utils/config';
import defaultImage from '../../../assets/images/default_gym.jpg'

const MapComponent = ({ setCoordinates, coordinates, places }) => {
  const [placeImage, setPlaceImage] = useState(null);

  return (
    <div>
      <APIProvider apiKey={GOOGLE_API_KEY}>
        <Map
          mapId={MAP_ID}
          style={{width: '100vw', height: '100vh'}}
          defaultCenter={coordinates}
          center={coordinates}
          defaultZoom={14}
          gestureHandling={'greedy'}
          margin={[50, 50, 50, 50]}
          options={{ disableDefaultUI: true, zoomControl: true }}
          onChange={(e) => {
            setCoordinates({ lat: e.center.lat(), lng: e.center.lng() });
          }}
        >
        {places?.map((place, index) => {
        const lat = place.geometry?.location?.lat;
        const lng = place.geometry?.location?.lng;
        if (isNaN(lat) || isNaN(lng)) {
          console.error(`Invalid coordinates for place: ${place.name}`, lat, lng);
          return null; 
        }

        const position = new google.maps.LatLng(lat, lng);

            return (
              <AdvancedMarker key={index} position={position}>
                <div className="bg-white shadow-lg rounded-lg p-3 w-48">
                  <h4 className="text-sm font-semibold mb-1">{place.name}</h4>
                  <img
                    className="w-full h-20 object-cover rounded-md mb-2"
                    src={
                      place.photos && place.photos[0]
                        ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`
                        : defaultImage
                    }
                    alt={place.name}
                  />
                  <div className="text-yellow-400 text-sm">
                    {'★'.repeat(Math.floor(place.rating || 0)) +
                      '☆'.repeat(5 - Math.floor(place.rating || 0))}
                  </div>
                </div>
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>
    </div>
  )
}

export default MapComponent;