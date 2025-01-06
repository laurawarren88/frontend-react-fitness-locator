import { GOOGLE_API_KEY } from "../utils/config";

// Haversine formula to calculate distance in meters between two coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => (degree * Math.PI) / 180;
  const R = 6371000; // Radius of the Earth in meters

  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
};

const textSearchBaseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";

export const getPlacesData = async (type, coordinates, radius) => {
  try {
    // Fetch places from the Text Search API
    const textSearchUrl = `${textSearchBaseUrl}?query=${type}&location=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`;
    const textSearchResponse = await fetch(textSearchUrl);
    const textSearchResult = await textSearchResponse.json();

    if (!textSearchResult.results || textSearchResult.status !== "OK") {
      console.warn("No results from Text Search API");
      return [];
    }

    // Filter results based on the specified radius
    const filteredPlaces = textSearchResult.results.filter((place) => {
      const placeLat = place.geometry.location.lat;
      const placeLng = place.geometry.location.lng;

      const distance = calculateDistance(
        coordinates.lat,
        coordinates.lng,
        placeLat,
        placeLng
      );

      return distance <= Number(radius);
    });
    console.log("Radius:", radius);
    console.log("Filtered Places:", filteredPlaces);
    return filteredPlaces;
  } catch (error) {
    console.error("Error fetching places data:", error);
    return [];
  }
};