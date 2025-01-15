import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BASE_URL } from '../../utils/config';

const showActivity = () => {
  const { id } = useParams();
  const [activitiesData, setActivitiesData] = useState(null);

  useEffect(() => {
    if (!id) {
        console.error("Activities ID is missing");
        return;
    }
    const fetchActivitiesData = async () => {
        const response = await fetch(`${BASE_URL}/activities/${id}`);
        const data = await response.json();
        console.log("Fetched Data:", data);
        console.log("Activity name:", data.name);
        setActivitiesData(data); 
    };
    fetchActivitiesData();
}, [id]);

  if (!activitiesData) {
    return <div>Loading...</div>;  // Show loading state while fetching data
  }

  return (
    <section className="max-w-7xl mx-auto">
      <div className="title-section">
        <h1 className="h1-primary">{activitiesData.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 h-full">
        <div className="col-span-1">
          <img src={activitiesData.image} alt={activitiesData.name} className="w-full h-full object-cover" />
        </div>
        <div className="col-span-1 bg-white p-8">
          <h2 className="text-2xl font-semibold mb-4">{activitiesData.name}</h2>
          <p className="text-gray-600 mb-4">{activitiesData.description}</p>
          <p className="text-gray-600 mb-4">{activitiesData.address}</p>
          <p className="text-gray-600 mb-4">{activitiesData.phone}</p>
          <p className="text-gray-600 mb-4">{activitiesData.website}</p>
          <p className="text-gray-600 mb-4">{activitiesData.opening_hours}</p>
          <p className="text-gray-600 mb-4">{activitiesData.type}</p>
        </div>
      </div>

      <div className="mt-8">
        <Link to={`/activities/${id}/edit`} className="link">Edit</Link>
        <Link to={`/activities/${id}/delete`} className="link">Delete</Link>
      </div>
    </section>
  )
}

export default showActivity