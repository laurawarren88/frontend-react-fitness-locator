export const handleAddressChange = async (e, formData, setFormData, handleChange) => {
  const { name } = e.target;

  handleChange(e);

  if (name === 'vicinity' || name === 'city' || name === 'postcode') {
    const address = `${formData.vicinity}, ${formData.city}, ${formData.postcode}`;
    
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

export const fetchCoordinates = async (address) => {
    try {
      const url = new URL('https://nominatim.openstreetmap.org/search');
      const params = {
        q: address,
        format: 'json',
        limit: 1, 
        addressdetails: 1, 
      };
  
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Fitness Locator (your-email@example.com)', 
        },
      });
  
      const data = await response.json();
      
      if (data.length > 0) {
        const { lat, lon } = data[0];
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