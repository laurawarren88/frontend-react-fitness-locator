import { generateMockPlaces } from "../utils/mockPlaces";
import activitiesMap from "../utils/activitiesMap";

export const getPlacesData = async (type, coordinates, radius, useMockData = false) => {
  if (useMockData) {
    console.log("Using mock data for places.");
    const mockPlaces = generateMockPlaces(type, coordinates, radius); 
    // console.log("Mock Places from api controller:", mockPlaces);
    return mockPlaces.map((place) => activitiesMap(place, type)); 
  }
};