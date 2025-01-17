import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const showActivity = () => {

  const handleClick = () => {
    window.scrollTo(0, 0);
}; 

  const { id } = useParams();
  const [activitiesData, setActivitiesData] = useState(null);

  useEffect(() => {
    if (!id) {
        console.error("Activities ID is missing");
        return;
    }
    const fetchActivitiesData = async () => {
      try {
        const response = await fetch(`/api/activities/${id}`);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
        const data = await response.json();
        // console.log("Fetched Data:", data);
        // console.log("Activity name:", data.name);
        setActivitiesData(data); 
        } catch (error) {
          console.error("Error fetching activity data:", error);
      }
    };
    fetchActivitiesData();
}, [id]);

  if (!activitiesData) {
    return <div>Loading...</div>; 
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div className="title-section">
        <h1 className="h1-primary">{activitiesData.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="col-span-1">
        <img
        src={`/images/logos/${activitiesData.logo.split('/').pop()}`}
          alt={`${activitiesData.name} logo`}
          className="w-full h-full object-cover"
        />
        </div>
        <div className="col-span-1 bg-white p-8">
          <h2 className="text-2xl font-semibold mb-4">{activitiesData.name}</h2>
          <p className="text-gray-600 mb-4">{activitiesData.description}</p>
          <p className="text-gray-600 mb-4">{activitiesData.address}</p>
          <p className="text-gray-600 mb-4">{activitiesData.phone}</p>
          <p className="text-gray-600 mb-4">{activitiesData.website}</p>
          <p className="text-gray-600 mb-4">{activitiesData.opening_hours}</p>
          <p className="text-gray-600 mb-4">{activitiesData.type}</p>
          <p className="text-gray-600 mb-4">{activitiesData.email}</p>
          <p className="text-gray-600 mb-4">{activitiesData.postcode}</p>
          <p className="text-gray-600 mb-4">{activitiesData.city}</p>
          <p className="text-gray-600 mb-4">{activitiesData.vicinity}</p>
          <p className="text-gray-600 mb-4">{activitiesData.longitude}</p>
          <p className="text-gray-600 mb-4">{activitiesData.latitude}</p>
            <img 
              src={`/images/facilities/${activitiesData.facilities_image.split('/').pop()}`}
              alt={`${activitiesData.name} facilities`} 
              className="w-20 h-20" 
            />
        </div>
      </div>

      <div className="mt-8">
        <Link to={`/activities/${id}/edit`} onClick={handleClick} className="link">Edit</Link>
        <Link to={`/activities/${id}/delete`} onClick={handleClick} className="link">Delete</Link>
      </div>
    </section>
  )
}

export default showActivity