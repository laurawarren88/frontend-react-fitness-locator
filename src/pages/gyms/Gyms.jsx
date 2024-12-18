import React, { useState } from "react";

const gyms = () => {
  const [postcode, setPostcode] = useState("");
  const [radius, setRadius] = useState("");
  const [gyms, setGyms] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:8080/gyms');
      const data = await response.json(); // Convert the response to JSON
      setGyms(data); // Assuming backend sends an array of gyms
    } catch (error) {
      console.error("Error fetching gyms:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-vibrantBlue to-energeticGreen text-white flex flex-col items-center">
      
    {/* Hero Section */}
    <header className="text-center py-12">
      <h1 className="text-4xl md:text-6xl font-bold">Find Your Fitness Spot</h1>
      <p className="mt-4 text-lg">Search gyms, classes, and fitness clubs near you.</p>
    </header>

    {/* Search Bar */}
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Enter your postcode"
        className="p-3 rounded border border-lightGray focus:outline-none focus:ring focus:ring-energeticGreen text-darkGray"
        value={postcode}
        onChange={(e) => setPostcode(e.target.value)}
      />
      <input
        type="number"
        placeholder="Radius in km"
        className="p-3 rounded border border-lightGray focus:outline-none focus:ring focus:ring-energeticGreen text-darkGray"
        value={radius}
        onChange={(e) => setRadius(e.target.value)}
      />
      <button
        onClick={handleSearch}
        className="bg-gradient-to-br from-energeticGreen to-vibrantBlue text-white py-3 px-6 rounded-lg font-bold hover:opacity-90"
      >
        Search
      </button>
    </div>

    {/* Gym Results */}
    <div className="mt-12 w-full max-w-5xl">
      {gyms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gyms.map((gym) => (
            <div
              key={gym.id}
              className="bg-white rounded-lg p-4 shadow-lg text-darkGray"
            >
              <h3 className="text-xl font-semibold">{gym.name}</h3>
              <p>{gym.address}</p>
              <p className="text-energeticGreen">Distance: {gym.distance} km</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-6">No gyms found. Try a different search.</p>
      )}
    </div>
  </div>
);
};

export default gyms