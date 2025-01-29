import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { isAdmin } from '../../controllers/isAdmin';
import isActivityUser from '../../controllers/isActivityUser';

const ShowActivity = () => {
  const handleClick = () => window.scrollTo(0, 0);

  const { id } = useParams();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [isActivityOwner, setIsActivityOwner] = useState(false);
  const [activitiesData, setActivitiesData] = useState(null);

  useEffect(() => {
    setIsAdminUser(isAdmin());
  }, []);

  useEffect(() => {
    const checkOwnership = async () => {
      if (activitiesData) {
        const ownerStatus = await isActivityUser(id);
        setIsActivityOwner(ownerStatus);
      }
    };
    checkOwnership();
  }, [activitiesData, id]);

  useEffect(() => {
    if (!id) {
      console.error('Activity ID is missing');
      return;
    }
    const fetchActivitiesData = async () => {
      try {
        const response = await fetch(`/api/activities/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setActivitiesData(data);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      }
    };
    fetchActivitiesData();
  }, [id]);

  if (!activitiesData) {
    return (
      <div className="loading-container">
        <div className="loading-layout">
          <h2 className="loading-title">Loading Activity...</h2>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      <div className="title-section">
        <h1 className="h1-primary">{activitiesData.name}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="col-span-1">
          <img
            src={`/images/logos/${activitiesData.logo.split('/').pop()}`}
            alt={`${activitiesData.name} logo`}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="col-span-1 bg-white rounded-lg shadow-lg p-6">
          <h2 className="h2-primary">{activitiesData.name}</h2>
          <p className="p-primary mb-4">Created By: {activitiesData.user.username}</p>
          <div className="space-y-2">
            <p className="p-primary">{activitiesData.description}</p>
            <p className="p-primary">Address: {activitiesData.address}</p>
            <p className="p-primary">Phone: {activitiesData.phone}</p>
            <p className="p-primary">Website: <a href={activitiesData.website} target="_blank" rel="noopener noreferrer" className="link">{activitiesData.website}</a></p>
            <p className="p-primary">Opening Hours: {activitiesData.opening_hours}</p>
            <p className="p-primary">Type: {activitiesData.type}</p>
            <p className="p-primary">Email: {activitiesData.email}</p>
            <p className="p-primary">Postcode: {activitiesData.postcode}</p>
            <p className="p-primary">City: {activitiesData.city}</p>
            <p className="p-primary">Vicinity: {activitiesData.vicinity}</p>
            <p className="p-primary">Coordinates: {activitiesData.latitude}, {activitiesData.longitude}</p>
          </div>
          <img
            src={`/images/facilities/${activitiesData.facilities_image.split('/').pop()}`}
            alt={`${activitiesData.name} facilities`}
            className="w-full h-48 object-cover rounded-lg shadow-md mt-4"
          />
        </div>
      </div>
      {(isActivityOwner || isAdminUser) && (
        <div className="flex justify-end space-x-4 mt-6">
          <Link to={`/activities/${id}/edit`} onClick={handleClick} className="btn-primary">
            Edit
          </Link>
          <Link to={`/activities/${id}/delete`} onClick={handleClick} className="btn-secondary">
            Delete
          </Link>
        </div>
      )}
    </section>
  );
};

export default ShowActivity;