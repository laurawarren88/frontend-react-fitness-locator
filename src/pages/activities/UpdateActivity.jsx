import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { updateSubmitForm } from '../../controllers/forms/updateFormController';
import { BASE_URL } from '../../utils/config';
import CreateactivitiesForm from '../../components/Activity/CreateActivitiesForm';
import useForm from "../../hooks/useForm";

const UpdateActivities = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    }; 

    const { id } = useParams();
    const [initialFormData, setInitialFormData] = useState({
        name: '',
        vicinity: '',
        phone: '',
        city: '',
        email: '',
        postcode: '',
        website: '',
        opening_hours: '',
        type: '',
        description: '',
        logo: null,
        facilities_image: null,
        latitude: '',
        longitude: '',
      });

    useEffect(() => {
        const fetchActivitiesData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/activities/${id}/edit`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log("Fetched activity data:", data); // Log the fetched data
                setInitialFormData(data.activity || {}); // Ensure `activity` exists
            } catch (error) {
                console.error("Error fetching activity data:", error);
            }
        };
        fetchActivitiesData();
    }, [id]);
    
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
          window.location.href = `/activities/${id}`;
        }
      };
    
      const { formData, handleChange, handleSubmit } = useForm(initialFormData, onSubmit);

    return (
        <>
            <CreateactivitiesForm
                title="Update Activity"
                formData={initialFormData}
                onSubmit={onSubmit}
                onChange={handleChange}
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