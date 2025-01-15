import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import youAreHereLocationIcon from '../../../assets/images/youarehere.png';
import fitnessIcon from '../../../assets/images/fitnesstracker.png';
import highlightedFitnessIcon from '../../../assets/images/fitnesstracker-highlighted.png';

const LeafletMap = ({coordinates, radius, places, setChildClicked, setLeafletMap}) => {
  var youAreHereIcon = L.icon({
      iconUrl: youAreHereLocationIcon,
      iconSize: [32, 40],
      iconAnchor: [15, 35],
      popupAnchor: [0, -32],
  });

  var defaultIcon = L.icon({
      iconUrl: fitnessIcon,
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -48],
  });

  const highlightedIcon = L.icon({
    iconUrl: highlightedFitnessIcon,
    iconSize: [60, 60],
    iconAnchor: [30, 60],
    popupAnchor: [0, -60],
  });

  useEffect(() => {
    if (!coordinates || !places) {
      // console.log("Missing required props:", { coordinates, places });
      return;
    }

    // console.log("Updating map with:", {
    //   coordinates,
    //   radius,
    //   placesCount: places.length
    // });

      const map = L.map('leaflet-map', {
        center: [coordinates.lat, coordinates.lng],
        zoom: 13,
      });

      setLeafletMap(map);

      L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
        minZoom: 5,
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // You are here marker
      L.marker([coordinates.lat, coordinates.lng], { icon: youAreHereIcon })
      .addTo(map)
      .bindPopup('You are here!');

      const zoomLevel = Math.max(13, Math.min(18, 13 + Math.log(radius) / Math.log(2))); 
      map.setZoom(zoomLevel);

      const markerCluster = L.markerClusterGroup();
      let circleLayer;

      const updateMarkers = () => {
        markerCluster.clearLayers();
        const bounds = L.latLngBounds();

        places.forEach((place, index) => {
          const lat = place.geometry?.location?.lat || place.latitude;
          const lng = place.geometry?.location?.lng || place.longitude;

        if (lat && lng) {
          // console.log("Number of places:", places.length);
          // console.log("Place:", place);
          // console.log("Coordinates:", lat, lng);
          const marker = L.marker([lat, lng], { icon: defaultIcon }).bindPopup(
            `<b>${place.name}</b><br>
            ${place.address}<br>
            ${place.postcode}<br>
            ${'★'.repeat(Math.floor(place.rating || 0)) +
              '☆'.repeat(5 - Math.floor(place.rating || 0))}`
          );

          marker.on('mouseover', () => {
            marker.setIcon(highlightedIcon);
            marker.openPopup(); 
          });

          marker.on('mouseout', () => {
            marker.setIcon(defaultIcon);
            marker.closePopup(); 
          });

          marker.on('click', () => {
            setChildClicked(index);
          });

          markerCluster.addLayer(marker); 
          bounds.extend([lat, lng]); 
        }
      });

      map.addLayer(markerCluster);
      if (bounds.isValid()) {
        map.fitBounds(bounds);
      }
      };
  
      const updateCircle = () => {
        if (circleLayer) {
          map.removeLayer(circleLayer);
        }

      circleLayer = L.circle([coordinates.lat, coordinates.lng], {
        radius,
        color: '',
        fillColor: '#28A745', 
        fillOpacity: 0.15,
      }).addTo(map);
      };

      map.setView([coordinates.lat, coordinates.lng], map.getZoom());
    
      updateCircle();
      updateMarkers();
    
      return () => {
        map.remove();
      };
    }, [coordinates, radius, places, setChildClicked, setLeafletMap]);

  return (
    <div
        id="leaflet-map"
        className="h-[70vh] z-20 w-full rounded-xl shadow-md"
    />
  )
};

export default LeafletMap;