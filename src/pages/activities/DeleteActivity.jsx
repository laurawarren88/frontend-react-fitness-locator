import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { deleteSubmitForm } from '../../controllers/forms/deleteFormController';
import { BASE_URL } from '../../utils/config';
import CreateactivitiesForm from '../../components/Activity/CreateActivitiesForm';
import useForm from "../../hooks/useForm";

const DleteActivity = () => {
  const { id } = useParams();
  const [activitiesData, setActivitiesData] = useState(null);
  const [formData, setFormData] = useState({});

  const onSubmit = async (data) => {
      const formData = new FormData();

      Object.keys(formData).forEach((key) => {
          formData.append(key, data[key]);
      });

      const result = await deleteSubmitForm({
          url: `${BASE_URL}/activities/${id}/edit`,
          payload: formData,
          alertContainerId: "alertContainer",
      });

      if (result.success) {
          alert("Activity updated successfully! Redirecting...");
          window.location.href = '/activities/locator';
      }
  };

  useEffect(() => {
    if (!id) {
        console.error("Activities ID is missing");
        return;
    }
    const fetchActivitiesData = async () => {
        const response = await fetch(`${BASE_URL}/activities/${id}/delete`);
        const data = await response.json();
        console.log("Fetched Data:", data);
        console.log("Activity name:", data.activity.name);
        setActivitiesData(data); 
    };
    fetchActivitiesData();
}, [id]);

useEffect(() => {
  if (activitiesData) {
      setFormData({
          name: activitiesData.activity.name || "",
          vicinity: activitiesData.activity.vicinity || "",
          city: activitiesData.activity.city || "",
          postcode: activitiesData.activity.postcode || "",
          phone: activitiesData.activity.phone || "",
          email: activitiesData.activity.email || "",
          website: activitiesData.activity.website || "",
          opening_hours: activitiesData.activity.opening_hours || "",
          type: activitiesData.activity.type || "",
          description: activitiesData.activity.description || "",
      });
  }
}, [activitiesData]);

const { formData: formValues, handleChange, handleSubmit } = useForm(formData, onSubmit);

    if (!activitiesData || !activitiesData.activity) return <div>Loading...</div>;  

    return (
      <>
          <CreateactivitiesForm
              title="Update Activity"
              formData={formData}
              onSubmit={handleSubmit}
              onChange={handleChange}
              buttonText="Delete"
              footer={
                  <>
                      <Link to="/" className="link">Cancel</Link>
                  </>
              }
          />
          <div id="alertContainer"></div>
      </>
  )
}

export default DleteActivity