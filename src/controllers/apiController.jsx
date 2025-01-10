import { GOOGLE_API_KEY } from "../utils/config";
import { generateMockPlaces } from "../utils/mockPlaces";
import activitiesMap from "../utils/activitiesMap";

/**
 * @param {string} type 
 * @param {{lat: number, lng: number}} coordinates 
 * @param {string} radius
 * @param {boolean} useMockData
 * @returns {Promise<Place[]>} 
 */

const textSearchBaseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";

export const getPlacesData = async (type, coordinates, radius, useMockData = false) => {
  if (useMockData) {
    console.log("Using mock data for places.");
    const mockPlaces = generateMockPlaces(type, coordinates, radius); 
    // console.log("Mock Places from api controller:", mockPlaces);
    return mockPlaces.map((place) => activitiesMap(place, type)); 
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
      console.error("Places API Error:", data.status, data.error_message);
      setIsLoading(false);
      return [];
    }

    return data.results.map((place) => activitiesMap(place, type));
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