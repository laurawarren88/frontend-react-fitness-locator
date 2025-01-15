import React from 'react'
import { Link } from 'react-router-dom'
import { postForm } from '../../controllers/forms/postFormController';
import { BASE_URL } from '../../utils/config';
import ActivitiesForm from '../../components/Activity/ActivitiesForm'; 
import useActivityForm from "../../hooks/useActivityForm";

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
        logo: "",
        facilities_image: "",
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
        const result = await postForm({
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

    const { formData, handleChange, handleSubmit } = useActivityForm(initialState, onSubmit);

    return (
        <>
            <ActivitiesForm
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