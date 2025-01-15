import React, { useState, useEffect } from 'react';
import { LiaSearchLocationSolid } from "react-icons/lia";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

const transformNominatimData = (places) => {
    return places.map((place) => ({
        id: place.place_id,
        name: place.display_name || "Unknown Name",
        vicinity: place.display_name || "No address available",
        city: place.address.city || place.address.borough || place.address.village || "Unknown City",
        postcode: place.address.postcode || "Unknown Postcode",
        latitude: parseFloat(place.lat),
        longitude: parseFloat(place.lon),
    }));
  };
  
const SearchBox = ({ setCoordinates }) => {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchText.length >= 3) {
        handleSearch();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchText]);

  const handleSearch = () => {
    const queryParams = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
      limit: 5,
    };
    const queryString = new URLSearchParams(queryParams).toString();

    fetch(`${NOMINATIM_BASE_URL}${queryString}`)
      .then((response) => response.json())
      .then((result) => {
        const transformedData = transformNominatimData(result);
        setListPlace(transformedData);
      })
      .catch((err) => console.log("Error: ", err));
  };

    const handlePlaceSelect = (latitude, longitude, place) => {
        if (!latitude || !longitude) {
        console.error("Invalid coordinates:", { latitude, longitude });
        return;
        }

        const addressFields = {
        vicinity: place.vicinity || place.name,
        city: place.city || place.address.city || place.address.borough || place.address.village,
        postcode: place.postcode || place.address.postcode,
        };
    
        setCoordinates({ lat: parseFloat(latitude), lng: parseFloat(longitude) }, addressFields);
        setSearchText(""); 
        setListPlace([]); 
    };

  return (
    <>
        <div className="col-span-5">
            <div className="relative rounded bg-white w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <LiaSearchLocationSolid />
                </div>
                <input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="Enter postcode or location"
                    className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-energeticGreen"
                    value={searchText}
                    onChange={(event) => setSearchText(event.target.value)}
                />

                {/* Display List of Places as dropdown */}
                {listPlace.length > 0 && searchText && (
                    <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto">
                        {listPlace.map((place) => (
                            <li
                                key={place.id}
                                onClick={() => handlePlaceSelect(place.latitude, place.longitude, place)}
                                className="cursor-pointer p-2 z-50 hover:bg-lightGray"
                            >
                                {place.name}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    </>
  );
};

export default SearchBox;