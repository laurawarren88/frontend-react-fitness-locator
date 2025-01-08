import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import fitnessIcon from '../../assets/images/fitnesstracker.png';
import highlightedFitnessIcon from '../../assets/images/fitnesstracker-highlighted.png';

const LeafletMap = ({coordinates, places, setChildClicked}) => {
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
      if (!coordinates) return;

      const map = L.map('leaflet-map', {
        center: [coordinates.lat, coordinates.lng],
        zoom: 13,
      });

      // Standard Map
      // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   maxZoom: 19,
      //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      // }).addTo(map);

      L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
        minZoom: 10,
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // You are here marker
      // L.marker([coordinates.lat, coordinates.lng], { icon: defaultIcon })
      // .addTo(map)
      // .bindPopup('You are here!');

      const markerCluster = L.markerClusterGroup();
      const bounds = L.latLngBounds();

      places.forEach((place, index) => {
        const lat = place.geometry?.location?.lat || place.latitude;
        const lng = place.geometry?.location?.lng || place.longitude;
  
        if (lat && lng) {
          const marker = L.marker([lat, lng], { icon: defaultIcon }).bindPopup(
            `<b>${place.name}</b><br>${place.address}`
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
  
      return () => {
        map.remove();
      };
    }, [coordinates, places, setChildClicked]);

  return (
    <div
        id="leaflet-map"
        className="h-screen w-full rounded-xl shadow-md"
    />
  )
};

export default LeafletMap;