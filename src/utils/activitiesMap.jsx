/**
 * Transforms raw place data into a standardised format.
 * @param {object} element
 * @param {string} type - The type of place (e.g., "gym", "yoga").
 * @returns {object|null} A formatted place object.
 */
const activitiesMap = (element, type) => {
  const defaultImage = '../assets/images/default_gym.jpg'; 

  if (!element.lat || !element.lon) {
    console.warn("Skipping element due to missing coordinates:", element.id || "Unnamed Element");
    return null;
  }
  
  const latitude = element.lat;
  const longitude = element.lon;

  // console.log('Activities Map:', place);
  // console.log('Mapped Place:', { latitude, longitude });
  
  const formattedPlace = {
    id: element.id || `${type}-${latitude}-${longitude}`,
    name: element.tags?.name || "Unknown Name",
    address:
      element.tags?.["addr:street"] ||
      element.tags?.["addr:full"] ||
      "No address available",
    city: element.tags?.["addr:city"] || "Unknown City",
    postcode: element.tags?.["addr:postcode"] || "Unknown Postcode",
    phone: element.tags?.["contact:phone"] || "",
    email: element.tags?.["contact:email"] || "",
    website: element.tags?.["contact:website"] || "",
    openingHours: element.tags?.["opening_hours"]?.split(";") || [],
    typeId: type,
    type,
    description:
      element.tags?.["amenity"] ||
      element.tags?.["sport"] ||
      "No description available",
    photo: defaultImage, 
    facilities_image: "",
    rating: 0, 
    latitude,
    longitude,
    createdAt: new Date().toISOString(),
    updatedAt: null,
    deletedAt: null,
  };

  // console.log('Formatted Place:', formattedPlace);
  return formattedPlace;
};

export default activitiesMap;