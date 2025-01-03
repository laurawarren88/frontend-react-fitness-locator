import React from "react";
import { GOOGLE_API_KEY } from "../utils/config";

const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';

export const getPlacesData = async (coordinates) => {
const options = {
    location: `${coordinates.lat},${coordinates.lng}`,
    radius: '1500',
    type: 'gym',
};

    try {
      const url = `${baseUrl}?location=${options.location}&radius=${options.radius}&type=${options.type}&key=${GOOGLE_API_KEY}`;
      const response = await fetch(url);
  
      if (!response.ok) {
        throw new Error(`Error fetching places data: ${response.statusText}`);
      }
  
      const result = await response.json();
      return result.results; 
    } catch (error) {
      console.error("Error fetching places data:", error);
      return []; 
    }
  };