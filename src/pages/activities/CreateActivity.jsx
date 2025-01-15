import React from 'react'
import { Link } from 'react-router-dom'
import { submitForm } from '../../controllers/forms/submitFormController';
import { BASE_URL } from '../../utils/config';
import CreateActivitiesForm from '../../components/Activity/CreateActivitiesForm'; 
import useCreateActivityForm from "../../hooks/useCreateActivityForm";

const CreateActivity = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    }; 
    
    const initialState = {
        name: "",
        vicinity: "",
        city: "",
        postcode: "",
        phone: "",
        email: "",         
        website: "",      
        opening_hours: "",
        type: "",  
        description: "",
        latitude: "",
        longitude: "",
    };


    const onSubmit = async (data) => {
        console.log("Submitting data:", data); 
        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            if (key === 'logo' || key === 'facilities_image') {
                if (data[key]) {
                    formData.append(key, data[key]);
                }
            } else {
                formData.append(key, data[key]);
            }
        });
        console.log("FormData content:", Array.from(formData.entries()));
    try{
        const result = await submitForm({
            url: `${BASE_URL}/activities/new`,
            payload: formData,
            alertContainerId: "alertContainer",
        });

        if (result.success) {
            // alert("Activity created successfully! Redirecting...");
            window.location.href = `/activities/${result.data.activities.id}`;
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
    };

    const { formData, handleChange, handleSubmit } = useCreateActivityForm(initialState, onSubmit);

    return (
        <>
            <CreateActivitiesForm
                title="Create Activity"
                formData={formData}
                onSubmit={onSubmit}
                onChange={handleChange}
                buttonText="Create"
                footer={
                    <>
                        <Link to="/home" onClick={handleClick} className="link">Cancel</Link>
                    </>
                }
            />
            <div id="alertContainer"></div>
        </>
    )
}

export default CreateActivity;