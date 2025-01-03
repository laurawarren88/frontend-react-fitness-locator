import React, { useState } from "react";
import { Link } from 'react-router-dom';

const LocatorPage = () => {
    const [viewMode, setViewMode] = useState("card"); 

    const activityTypes = [
        "Gyms",
        "Personal Trainers",
        "Leisure Centers",
        "Sports Clubs",
        "Yoga Studios",
        "Pilates Studios",
        "Crossfit Boxes",
        "Fitness Bootcamps",
        "Health Clubs",
        "Running Tracks",
        "Dance Studios",
        "Martial Arts",
        "Swimming Pools",
        "Basketball Courts",
        "Tennis Courts",
        "Golf Courses",
        "Skiing/Snowboarding Centers",
        "Cycling Routes",
        "Hiking Trails",
        "Rock Climbing Centers",
        "Spa and Wellness Centers",
        "Boxing Gyms",
        "Cycling Studios",
        "Rowing Centers",
        "Horse Riding Centers",
        "Meditation Centers",
      ];

  return (
    <>
    {/* Quick finder section */}
    <section className="max-w-7xl mx-auto py-8">
        <div className="title-section">
          <h1 className="h1-primary">Quick Locator</h1>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mt-8">
        {activityTypes.slice(0, 10).map((item, index) => (
            <button key={index} className="btn-primary w-full">
              {item}
            </button>
          ))}
        </div>
    </section>
            
    {/* Main search function */}
    <section className="max-w-7xl mx-auto py-8">
        <div className="title-section pb-8">
            <h1 className="h1-primary">Find your Fitness</h1>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-lg">
            <form className="grid grid-cols-12 gap-4 justify-center items-center font-poppins">
            {/* Activity Type Dropdown */}
                <div className="col-span-3">
                    <select
                    id="activity-type"
                    name="activity-type"
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-energeticGreen"
                    required
                    >
                    <option value="">Select a type</option>
                    {activityTypes.map((type, index) => (
                        <option key={index} value={type}>
                        {type}
                        </option>
                    ))}
                    </select>
                </div>

                {/* Keyword Search */}
                <div className="col-span-4">
                    <input
                    id="keyword"
                    type="text"
                    name="keyword"
                    placeholder="Search for an activity"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-energeticGreen"
                    required
                    />
                </div>

                {/* Location Search */}
                <div className="col-span-4">
                    <input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="Enter postcode or location"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-energeticGreen"
                    required
                    />
                </div>

                {/* Search Button */}
                <div className="col-span-1 text-center">
                    <button
                    type="submit"
                    className="btn-primary"
                    >
                    Search
                    </button>
                </div>
            </form>
        </div>
    </section>

    {/* Banner section */}
    <section className="max-w-7xl mx-auto bg-vibrantBlue/65 text-white py-12 text-center">
        <h1 className="font-oswald text-3xl font-semibold">Join our ever growing number of users to find your next fitness journey</h1>
        <p className="font-poppins mt-4 text-lg">From gyms to personal trainers, sports clubs and outdoor activities - Discover 10,000+ fitness options across the UK</p>
        <Link to="/activities" className="btn-primary mt-6 inline-block px-6 py-3 bg-vibrantBlue text-white font-semibold rounded-lg">Search</Link>
    </section>

    {/* results */}
    <section className="max-w-7xl mx-auto py-8">
        <div className="title-section pb-8">
            <h1 className="h1-primary">Results</h1>
        </div>

        <div className="flex">
          {/* Filter Sidebar */}
          <div className="w-1/4">
            <div className="bg-white">
            <div className="flex space-x-4">
              <button
                onClick={() => setViewMode("card")}
                className={`btn-primary ${viewMode === "card" ? "bg-darkGray" : ""}`}
              >
                Card View
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`btn-primary ${viewMode === "map" ? "bg-darkGray" : ""}`}
              >
                Map View
              </button>
            </div>

            <div className="pt-8 pr-8">
              <h3 className="font-oswald font-bold pb-4">Filter Results</h3>
              <div>
                <label className="font-poppins block mb-2">Activity Type</label>
                <select className="w-full font-poppins p-2 border rounded">
                  <option value="">Select Type</option>
                  {activityTypes.map((type, index) => (
                    <option key={index} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-poppins block mb-2 mt-4">Location</label>
                <input type="text" placeholder="Enter location" className="w-full font-poppinss p-2 border rounded" />
              </div>
            </div>
          </div>
        </div>

          {/* Results Main Container */}
          <div className="w-3/4 space-y-8">
            {viewMode === "card" ? (
              <div className="card-container space-y-8">
                {/* Card Results (example) */}
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="card flex p-4 border rounded-lg bg-white">
                    <div className="w-1/3">
                      <img
                        src="https://via.placeholder.com/150"
                        alt="Place"
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="w-2/3 pl-6">
                      <h3 className="font-oswald font-bold text-xl mb-2">Business Title</h3>
                      <p className="font-openSans text-sm mb-2">Location: Placeholder</p>
                      <p className="font-openSans text-xs mb-3 text-gray-500">Description of the business...</p>
                      <div className="flex justify-start gap-4">
                        <Link to="" className="btn-primary w-24 text-center">
                          View
                        </Link>
                        <Link to="" className="link">Edit</Link>
                        <Link to="" className="link">Delete</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="map-view flex justify-center">
                {/* Placeholder for Map View */}
                <div className="w-3/4 h-96 bg-gray-200 rounded-lg"></div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default LocatorPage;