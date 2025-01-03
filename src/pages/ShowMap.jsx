import React, { useState, useEffect } from 'react';
import image from '../assets/images/fitnesstracker.png';
import { GOOGLE_API_KEY, MAP_ID } from '../utils/config';
import { APIProvider, Map, Marker, AdvancedMarker } from '@vis.gl/react-google-maps';
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from "@reach/combobox";
import "@reach/combobox/styles.css";

const ShowMap = () => {
    const [position, setPosition] = useState({ lat: 51.481583, lng: -3.179090 });
    const [address, setAddress] = useState(null);
    const [places, setPlaces] = useState([]);
    const [type, setType] = useState('gym'); // Default to gym for search

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setPosition({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
            });
        }
    }, []);

    useEffect(() => {
        if (position) {
            fetchGymLocations();
        }
    }, [position, type]); // Include type in dependency array

    const fetchGymLocations = async () => {
        try {
            console.log("Fetching gyms at:", position);
            const response = await fetch(`/activities/showMap?lat=${position.lat}&lng=${position.lng}&type=${type}`);
            const data = await response.json();
            if (response.ok) {
                setPlaces(data.activities);
            } else {
                console.error('Error fetching gym locations:', data.error);
            }
        } catch (error) {
            console.error('Error fetching gym locations:', error);
        }
    };

    const handleSelect = async (address) => {
        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            setPosition({ lat, lng });
            setAddress(address);
        } catch (error) {
            console.error("Error fetching geolocation:", error);
        }
    };

    return (
        <div className="p-20">
            {/* Places autocomplete */}
            <div className="flex justify-center mx-auto p-6 bg-white rounded-lg">
                <PlacesAutocomplete handleSelect={handleSelect} />
            </div>

            {/* Type selection */}
            <div className="flex justify-center mx-auto p-6">
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)} // Update the type when selected
                    className="p-2 rounded border"
                >
                    <option value="gym">Gym</option>
                    <option value="yoga">Yoga Studio</option>
                    <option value="pilates">Pilates Studio</option>
                    <option value="health">Health Club</option>
                    {/* Add more options as needed */}
                </select>
            </div>

            {/* Map */}
            <div className="h-[600px] relative">
                <APIProvider apiKey={GOOGLE_API_KEY} libraries={['places']}>
                    <Map zoom={9} center={position} mapId={MAP_ID}>
                        {/* Custom Icon Pin */}
                        <AdvancedMarker>
                            <Marker
                                position={position}
                                icon={{
                                    url: image,
                                    scaledSize: new window.google.maps.Size(50, 50),
                                    anchor: new window.google.maps.Point(25, 50),
                                }}
                            />
                        </AdvancedMarker>

                        {/* Display places */}
                        {places.map((place, index) => (
                            <Marker
                                key={index}
                                position={{ lat: place.Lat, lng: place.Lng }}
                                onClick={() => {
                                    setPosition({ lat: place.Lat, lng: place.Lng });
                                    setAddress(place.Vicinity);
                                }}
                            />
                        ))}
                    </Map>
                </APIProvider>
            </div>
        </div>
    );
};

const PlacesAutocomplete = ({ handleSelect }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    return (
        <Combobox onSelect={handleSelect} className="w-full">
            <ComboboxInput
                value={value}
                onChange={(e) => setValue(e.target.value)}
                disabled={!ready}
                className="w-full p-2 rounded border border-darkGray focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search an address"
            />
            <ComboboxPopover>
                <ComboboxList>
                    {status === "OK" &&
                        data.map(({ place_id, description }) => (
                            <ComboboxOption key={place_id} value={description} />
                        ))}
                </ComboboxList>
            </ComboboxPopover>
        </Combobox>
    );
};

export default ShowMap;