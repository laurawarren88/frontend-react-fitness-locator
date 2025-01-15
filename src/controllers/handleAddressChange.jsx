export const handleAddressChange = async (e, formData, setFormData, handleChange) => {
  const { name, value } = e.target;

  // Update the form state for the address
  handleChange(e);

  if (name === 'vicinity' || name === 'city' || name === 'postcode') {
    // Concatenate the address fields to form the full address
    const address = `${formData.vicinity}, ${formData.city}, ${formData.postcode}`;
    
    // Fetch latitude and longitude based on address
    const coordinates = await fetchCoordinates(address);
    if (coordinates) {
      setFormData((prevState) => ({
        ...prevState,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      }));
    }
  }
};

// Function to fetch latitude and longitude using Nominatim
export const fetchCoordinates = async (address) => {
    try {
      const url = new URL('https://nominatim.openstreetmap.org/search');
      const params = {
        q: address,
        format: 'json',
        limit: 1, // Limit to the first result
        addressdetails: 1, // Optional, but can provide additional address details
      };
  
      // Add the parameters to the URL
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Fitness Locator (your-email@example.com)', // Replace with your app name and email
        },
      });
  
      const data = await response.json();
      
      // Check if results exist and return the first result's coordinates
      if (data.length > 0) {
        const { lat, lon } = data[0];  // lat = latitude, lon = longitude
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      } else {
        console.error("Address not found");
        return null;
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };