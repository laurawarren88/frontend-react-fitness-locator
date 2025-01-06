import React, { useRef, useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker } from '@vis.gl/react-google-maps';
import { GOOGLE_API_KEY, MAP_ID } from '../../../utils/config';
import defaultImage from '../../../assets/images/default_gym.jpg';
import markerIconDefault from '../../../assets/images/fitnesstracker.png';
import markerIconHighlighted from '../../../assets/images/fitnesstracker-highlighted.png';

const MapComponent = ({ setCoordinates, coordinates, places, childClicked, setChildClicked }) => {
  const mapRef = useRef();
  const [hoveredPlace, setHoveredPlace] = useState(null);

  useEffect(() => {
    if (mapRef.current && places?.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        bounds.extend({
          lat: Number(place.geometry?.location?.lat),
          lng: Number(place.geometry?.location?.lng)
        });
      });
      // console.log("Map Places:", places);
      // console.log("Latitude:", place.geometry?.location?.lat);
      // console.log("Longitude:", place.geometry?.location?.lng);
      mapRef.current.fitBounds(bounds);
    }
  }, [places]);

  const handleCenterChange = () => {
    if (mapRef.current) {
      const center = mapRef.current.getCenter();
      const radius = mapRef.current.getBounds()
        ? google.maps.geometry.spherical.computeDistanceBetween(
            center,
            mapRef.current.getBounds().getNorthEast()
          )
        : 8000;

      const sw = mapRef.current.getBounds().getSouthWest();
      const ne = mapRef.current.getBounds().getNorthEast();

      setCoordinates((prev) => {
        const isSame = prev.lat === center.lat() && prev.lng === center.lng();
        if (!isSame) {
          setBounds({ ne, sw });
          return {
            lat: center.lat(),
            lng: center.lng(),
            radius: Math.floor(radius)
          };
        }
        return prev;
      });
    }
  };

  return (
    <div className="h-full w-full">
      <APIProvider apiKey={GOOGLE_API_KEY}>
        <Map
          mapId={MAP_ID}
          style={{width: '100%', height: '100vh'}}
          defaultCenter={coordinates}
          defaultZoom={14}
          margin={[50, 50, 50, 50]}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            draggable: true,
            scrollwheel: true,
            gestureHandling: 'greedy',
          }}
          onLoad={(map) => (mapRef.current = map)}
          onCenterChanged={handleCenterChange}
        >

          {places?.map((place, index) => {
            // console.log("Marker position:", {
            //   lat: Number(place.geometry?.location?.lat),
            //   lng: Number(place.geometry?.location?.lng),
            // });
            const lat = Number(place.geometry?.location?.lat);
            const lng = Number(place.geometry?.location?.lng);
            
            if (isNaN(lat) || isNaN(lng)) return null;

            const isActive = childClicked === index || hoveredPlace === index;

            return (
              <AdvancedMarker
                key={index}
                position={{ lat, lng }}
                onMouseEnter={() => setHoveredPlace(index)}
                onMouseLeave={() => setHoveredPlace(null)}
                onClick={() => {
                  setChildClicked(index);
                  const element = document.getElementById(`place-${index}`);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
              >
                <div style={{
                  cursor: 'pointer',
                  transform: childClicked === index ? 'scale(1.2)' : 'scale(1)',
                  transition: 'transform 0.3s ease'
                }}>
                  <img
                    src={isActive ? markerIconHighlighted : markerIconDefault}
                    alt="marker"
                    style={{
                      width: isActive ? '60px' : '50px',
                      height: isActive ? '60px' : '50px',
                    }}
                  />
                  {isActive && (
                    <div className="absolute bg-white shadow-lg rounded-lg p-3 w-48">
                      <h4 className="text-sm font-semibold mb-1">{place.name}</h4>
                      <img
                        className="w-full h-20 object-cover rounded-md mb-2"
                        src={
                          place.photos?.[0]
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
                  )}
                </div>
              </AdvancedMarker>
            );
          })}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;