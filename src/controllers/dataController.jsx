/**
 * 
 * @param {string} type 
 * @param {object} coordinates 
 * @param {number} radius 
 * @returns {Array} 
 */
export const getPlacesData = async (type, coordinates, radius) => {
  try {
    const response = await fetch(`/api/activities/locator?type=${type}&lat=${coordinates.lat}&lng=${coordinates.lng}&radius=${radius}`);
    console.log("API response:", response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API response:", data);

    const defaultImage = '../assets/images/default_gym.jpg';

    const generatedPlaces = data.places
      .map((element) => {
        if (!element.latitude || !element.longitude) {
          console.warn("Skipping element due to missing coordinates:", element.ID || "Unnamed Element");
          return null;
        }

        return {
          id: element.ID || `${type}-${element.latitude}-${element.longitude}`,
          name: element.name || "Unknown Name",
          address: element.vicinity || "No address available",
          city: element.city || "Unknown City",
          postcode: element.postcode || "Unknown Postcode",
          phone: element.phone || "",
          email: element.email || "",
          website: element.website || "",
          openingHours: element.opening_hours?.split(";") || [],
          type: element.type || type,
          description: element.description || "No description available",
          logo: element.logo || defaultImage,
          facilities_image: element.facilities_image || "",
          latitude: element.latitude,
          longitude: element.longitude,
          user: element.user || "",
          createdAt: element.CreatedAt || new Date().toISOString(),
          updatedAt: element.UpdatedAt || null,
          deletedAt: element.DeletedAt || null,
        };
      })
      .filter(Boolean); 

    console.log("Generated Places:", generatedPlaces);
    return generatedPlaces;
  } catch (error) {
    console.error("Error fetching activity data:", error);
    throw error;
  }
};