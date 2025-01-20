import activitiesMap from "../utils/activitiesMap";

export const getPlacesData = async (type, coordinates, radius) => {
  const allActivities = generatedPlaces(type, coordinates, radius);
  return allActivities.map((place) => activitiesMap(place, type));
};