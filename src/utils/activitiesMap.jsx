/**
 * Transforms raw place data from the Google Places API into the desired format.
 * @param {object} place - A place object returned by the Google Places API.
 * @param {string} type - The type of place (e.g., "gym", "yoga").
 * @returns {object|null} A formatted place object.
 */
const activitiesMap = (place, type) => {
  const defaultImage = '../assets/images/default_gym.jpg'; 

  if (!place.geometry?.location && !place.latitude && !place.longitude) {
    console.warn('Skipping place due to missing geometry:', place.name || 'Unnamed Place');
    return null;
  }
  
  const latitude = place.geometry?.location?.lat || place.latitude;
  const longitude = place.geometry?.location?.lng || place.longitude;
  
  if (!latitude || !longitude) {
    console.warn('Skipping place due to missing coordinates:', place.name || 'Unnamed Place');
    return null;
  }

  // console.log('Activities Map:', place);
  // console.log('Mapped Place:', { latitude, longitude });
  
  const formattedPlace = {
    id: place.place_id || `${type}-${latitude}-${longitude}`,
    name: place.name || "Unknown Name",
    address: place.vicinity || place.address || "No address available",
    city: place.city || place.plus_code?.compound_code.split(',')[1]?.trim() || "Unknown City",
    postcode: place.postcode || place.plus_code?.compound_code.split(',')[2]?.trim() || "Unknown Postcode",
    phone: place.phone || '',
    email: place.email || '',
    website: place.website || '',
    openingHours: place.openingHours || [],
    typeId: type,
    type,
    description: place.description || place.types?.join(', ') || "No description available",
    photo: place.photo || defaultImage,
    facilities_image: place.facilities_image || '',
    rating: place.rating || 0,
    latitude,
    longitude,
    createdAt: place.createdAt || new Date().toISOString(),
    updatedAt: place.updatedAt || null,
    deletedAt: place.deletedAt || null,
  };

  // console.log('Formatted Place:', formattedPlace);
  return formattedPlace;
};

export default activitiesMap;