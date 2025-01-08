import { GOOGLE_API_KEY } from "../utils/config";
import { generateMockPlaces } from "../utils/mockPlaces";

/**
 * Fetches data from the API based on type, coordinates, and radius.
 * @param {string} type 
 * @param {{lat: number, lng: number}} coordinates 
 * @param {string} radius 
 * @returns {Promise<Place[]>} 
 */

const textSearchBaseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";

export const getPlacesData = async (type, coordinates, radius, useMockData = false) => {
  if (useMockData) {
    console.log("Using mock data for places.");
    return generateMockPlaces(type, coordinates, 20); // Generate 20 mock places dynamically
  }

  try {
    const url = new URL(textSearchBaseUrl);
    url.search = new URLSearchParams({
      query: type,
      location: `${coordinates.lat},${coordinates.lng}`,
      radius,
      key: GOOGLE_API_KEY,
    });
    
    const response = await fetch(url);
    const data = await response.json();
  
    if (!data || data.status !== 'OK') {
      console.warn(`API returned status: ${data?.status || "No status"}`);
      return [];
    }
  
    return data.results.map((place) => ({
      id: place.place_id,
      name: place.name || "Unknown Place",
      address: place.vicinity || "No address available",
      city: place.plus_code?.compound_code.split(',')[1]?.trim() || "Unknown City",
      postcode: place.plus_code?.compound_code.split(',')[2]?.trim() || "Unknown Postcode",
      description: place.types?.join(', ') || "No description available",
      typeId: type,
      type: type,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    }));
  } catch (error) {
    console.error("Error fetching places data:", error);
    return [];
  }
};

// import { GOOGLE_API_KEY } from "../utils/config";

// const calculateDistance = (lat1, lon1, lat2, lon2) => {
//   const toRadians = (degree) => (degree * Math.PI) / 180;
//   const R = 6371000; // Radius of the Earth in meters

//   const dLat = toRadians(lat2 - lat1);
//   const dLon = toRadians(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos(toRadians(lat1)) *
//       Math.cos(toRadians(lat2)) *
//       Math.sin(dLon / 2) ** 2;
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return R * c;
// };

// const textSearchBaseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";

// export const getPlacesData = async (type, coordinates, radius) => {
//   try {
//     const textSearchUrl = `${textSearchBaseUrl}?query=${type}&location=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`;
//     const textSearchResponse = await fetch(textSearchUrl);
//     const textSearchResult = await textSearchResponse.json();

//     if (!textSearchResult.results || textSearchResult.status !== "OK") {
//       console.warn("No results from Text Search API");
//       return [];
//     }

//     const filteredPlaces = textSearchResult.results.filter((place) => {
//       const placeLat = place.geometry.location.lat;
//       const placeLng = place.geometry.location.lng;

//       const distance = calculateDistance(
//         coordinates.lat,
//         coordinates.lng,
//         placeLat,
//         placeLng
//       );

//       return distance <= Number(radius);
//     });
//     // console.log("Radius:", radius);
//     // console.log("Filtered Places:", filteredPlaces);
//     return filteredPlaces;
//   } catch (error) {
//     console.error("Error fetching places data:", error);
//     return [];
//   }
// };