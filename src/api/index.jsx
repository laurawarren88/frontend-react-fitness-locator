import { GOOGLE_API_KEY } from "../utils/config";

const textSearchBaseUrl = "https://maps.googleapis.com/maps/api/place/textsearch/json";
const nearbySearchBaseUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

export const getPlacesData = async (type, coordinates, radius) => {
  try {
    const textSearchUrl = `${textSearchBaseUrl}?query=${type}&location=${coordinates.lat},${coordinates.lng}&key=${GOOGLE_API_KEY}`;
    const textSearchResponse = await fetch(textSearchUrl);
    const textSearchResult = await textSearchResponse.json();

    if (!textSearchResult.results || textSearchResult.status !== "OK") {
      console.warn("No results from Text Search API");
      return [];
    }

    const textSearchPlaces = textSearchResult.results;

    const nearbySearchUrl = `${nearbySearchBaseUrl}?location=${coordinates.lat},${coordinates.lng}&radius=${radius}&type=${type}&key=${GOOGLE_API_KEY}`;
    const nearbySearchResponse = await fetch(nearbySearchUrl);
    const nearbySearchResult = await nearbySearchResponse.json();

    if (!nearbySearchResult.results || nearbySearchResult.status !== "OK") {
      console.warn("No results from Nearby Search API");
      return textSearchPlaces;
    }

    const nearbySearchPlaces = nearbySearchResult.results;

    const allPlacesMap = new Map();

    [...textSearchPlaces, ...nearbySearchPlaces].forEach((place) => {
      allPlacesMap.set(place.place_id, place);
    });

    return Array.from(allPlacesMap.values());
  } catch (error) {
    console.error("Error fetching places data:", error);
    return [];
  }
};