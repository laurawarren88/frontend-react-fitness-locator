import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { updateSubmitForm } from '../../controllers/forms/updateFormController';
import { BASE_URL } from '../../utils/config';
import CreateactivitiesForm from '../../components/Activity/CreateActivitiesForm';

const UpdateActivities = () => {
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
    
        const result = await updateSubmitForm({
          url: `${BASE_URL}/activities/${id}/edit`,
          payload: formData,
          alertContainerId: "alertContainer",
        });
    
        if (result.success) {
          alert("Activity updated successfully! Redirecting...");
          window.location.href = `/activities/${id}`;
        }
      };

      useEffect(() => {
        if (!id) {
          console.error("Activities ID is missing");
          return;
      }
          const fetchActivitiesData = async () => {
              try {
                  const response = await fetch(`${BASE_URL}/activities/${id}/edit`);
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  const data = await response.json();
                  console.log("Fetched activity data:", data); 
                  console.log("Activity name:", data.activity.name);
                  setActivitiesData(data.activity); 

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
    }

    return (
        <>
            <CreateactivitiesForm
                title="Update Activity"
                formData={formData}
                onSubmit={onSubmit}
                buttonText="Update"
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

export default UpdateActivities;