import React from 'react'
import { Link } from 'react-router-dom'
import { submitForm } from '../../controllers/submitFormController';
import { BASE_URL } from '../../utils/config';
import CreateGymForm from '../../components/CreateGymForm'; 
import useForm from "../../hooks/useForm";

const CreateGym = () => {
    const initialState = {
        business_name: "",
        address: "",
        city: "",
        postcode: "",
        phone: "",
        email: "",         
        website: "",      
        opening_hours: "",
        activities: "",  
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
            url: `${BASE_URL}/gyms/new`,
            payload: formData,
            alertContainerId: "alertContainer",
        });

        if (result.success) {
            alert("Gym created successfully! Redirecting...");
            window.location.href = "/gyms";
        }
    };

    const { formData, handleChange, handleSubmit } = useForm(initialState, onSubmit);

    return (
        <>
            <CreateGymForm
                title="Create Gym"
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
                buttonText="Create"
                footer={
                    <>
                        <Link to="/gyms" className="link">Cancel</Link>
                    </>
                }
            />
            <div id="alertContainer"></div>
        </>
    )
}

export default CreateGym;