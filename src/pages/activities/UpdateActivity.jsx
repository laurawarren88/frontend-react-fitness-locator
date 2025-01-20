import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { updateForm } from '../../controllers/forms/updateFormController';
import { BASE_URL } from '../../utils/config';
import ActivitiesForm from '../../components/Activity/ActivitiesForm';

const UpdateActivities = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    }; 

    const { id } = useParams();
    const [activitiesData, setActivitiesData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({}); 
    
      const onSubmit = async (data) => {
        console.log("Submitting data:", data); 
        console.log("Data keys 1:", Object.keys(data));
        const formData = new FormData();
        console.log("Submitting form with:", formData)
        console.log("Data keys 2:", Object.keys(data));
        
        Object.keys(data).forEach((key) => {
            if (key === "logo" || key === "facilities_image") {
                if (data[key] instanceof File) {
                // if (data[key]) {
                    console.log(`Appending file field ${key}:`, data[key]);
                    formData.append(key, data[key]);
                } else if (typeof data[key] === "string" && data[key]) {
                    console.log(`Appending existing file path ${key}:`, data[key]);
                    formData.append(key, data[key]);
                } else {
                console.warn(`Unexpected value for ${key}: ${data[key]}`);
                }
            } else {
                console.log(`Appending text field ${key}:`, data[key]);
                formData.append(key, data[key]);
            }
      });
      console.log("Final form data:");
      formData.forEach((value, key) => console.log(`${key}: ${value}`));
    
      try {
        const result = await updateForm({
            url: `/api/activities/${id}/edit`,
            payload: formData,
            alertContainerId: "alertContainer",
          });
      
          if (result.success) {
            alert("Activity updated successfully! Redirecting...");
            window.location.href = `/activities/${id}`;
          }
        } catch (error) {
          console.error("Error submitting form:", error);
      }
      };

      useEffect(() => {
        if (!id) {
          console.error("Activities ID is missing");
          return;
      }
          const fetchActivitiesData = async () => {
              try {
                  const response = await fetch(`/api/activities/${id}/edit`);
                  if (!response.ok) {
                      throw new Error(`HTTP error! Status: ${response.status}`);
                  }
                  const data = await response.json();
                  // console.log("Fetched activity data:", data); 
                  // console.log("Activity name:", data.activity.type);
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
                    latitude: data.activity.latitude !== undefined ? data.activity.latitude : "",
                    longitude: data.activity.longitude !== undefined ? data.activity.longitude : "",
                    logo: data.activity.logo !== undefined ? data.activity.logo : null,
                    facilities_image: data.activity.facilities_image !== undefined ?  data.activity.facilities_image : null,
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
          <ActivitiesForm
              title="Update Activity"
              formData={formData}
              onSubmit={onSubmit}
              buttonText="Update"
              footer={
                  <>
                      <Link to={`/activities/${id}/delete`} onClick={handleClick} className="link mr-6">Delete Activity</Link>
                      <Link to={`/activities/${id}`} onClick={handleClick} className="link">Cancel</Link>
                  </>
              }
          />
           <div id="alertContainer"></div>
      </>
  )
}

export default UpdateActivities;