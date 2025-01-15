import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { deleteForm } from '../../controllers/forms/deleteFormController';
import { BASE_URL } from '../../utils/config';
import ActivitiesForm from '../../components/Activity/ActivitiesForm';

const DleteActivity = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    }; 
    
  const { id } = useParams();
  const [activitiesData, setActivitiesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({});

  const onSubmit = async (data) => {
      const formData = new FormData();

      Object.keys(data).forEach((key) => {
        if (data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      const result = await deleteForm({
          url: `${BASE_URL}/activities/${id}/delete`,
          payload: formData,
          alertContainerId: "alertContainer",
      });

      if (result.success) {
          alert("Activity deleted successfully! Redirecting...");
          window.location.href = '/activities/locator';
      }
  };

  useEffect(() => {
    if (!id) {
        console.error("Activities ID is missing");
        return;
    }
    const fetchActivitiesData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/activities/${id}/delete`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched Data:", data);
            console.log("Activity name:", data.activity.name);
            setActivitiesData(data); 
            setFormData({
                name: data.activity.name || "",
                vicinity: data.activity.vicinity || "",
                city: data.activity.city || "",
                postcode: data.activity.postcode || "",
                phone: data.activity.phone || "",
                email: data.activity.email || "",
                website: data.activity.website || "",
                opening_hours: data.activity.opening_hours || "",
                type: data.activity.type || "",
                description: data.activity.description || "",
                latitude: data.activity.latitude || "",
                longitude: data.activity.longitude || "",
            });
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching activity data:", error);
            setIsLoading(false);
        }
    };
    fetchActivitiesData();
    }, [id, setFormData]);

    if (isLoading) {
        return <p>Loading activity data...</p>;
    };

    return (
        <>
            <ActivitiesForm
                title="Delete Activity"
                formData={formData}
                onSubmit={onSubmit}
                buttonText="Delete"
                footer={
                    <>
                        <Link to="/" onClick={handleClick} className="link">Cancel</Link>
                    </>
                }
            />
            <div id="alertContainer"></div>
        </>
    )
}

export default DleteActivity