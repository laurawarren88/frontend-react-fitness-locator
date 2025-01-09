import React from 'react'
import { Link } from 'react-router-dom'
import { submitForm } from '../../controllers/newActivityFormController';
import { BASE_URL } from '../../utils/config';
import CreateActivitiesForm from '../../components/Activity/CreateActivitiesForm'; 
import useForm from "../../hooks/useForm";

const CreateActivity = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
    }; 
    
    const initialState = {
        business_name: "",
        address: "",
        city: "",
        postcode: "",
        description: "",
        rating: "",
        phone: "",
        email: "",         
        website: "",      
        opening_hours: "",
        type: "",  
        facilities: "",
        logo: null,
        facilities_image: null,
    };


    const onSubmit = async (data) => {
        const formData = new FormData();
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        Object.keys(data).forEach((key) => {
          if (key === 'logo' || key === 'facilities_image') {
            formData.append(key, data[key]);
          } else {
            formData.append(key, data[key]);
          }
        });

        const result = await submitForm({
            url: `${BASE_URL}/activities/new`,
            payload: formData,
            alertContainerId: "alertContainer",
        });

        if (result.success) {
            alert("Activity created successfully! Redirecting...");
            window.location.href = "/activities";
        }
    };

    const { formData, handleChange, handleSubmit } = useForm(initialState, onSubmit);

    return (
        <>
            <CreateActivitiesForm
                title="Create Activity"
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
                buttonText="Create"
                footer={
                    <>
                        <Link to="/activities" onClick={handleClick} className="link">Cancel</Link>
                    </>
                }
            />
            <div id="alertContainer"></div>
        </>
    )
}

export default CreateActivity;