import React from 'react'
import { submitForm } from '../../controllers/submitFormController';
import { BASE_URL } from '../../utils/config';
import Form from '../../components/Shared/Form';
import useForm from "../../hooks/useForm";

const CreateGym = () => {
    const initialState = {
        business_name: "",
        address: "",
        city: "",
        postcode: "",
        Phone: "",
	    Email: "",         
	    Website: "",      
	    Opening_hours: "",
	    Activities: "",  
	    Facilities: "",    
    };

    const onSubmit = async (data) => {
        const result = await submitForm({
            url: `${BASE_URL}/gyms/new`,
            payload: data,
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
        <Form
            title="Create Gym"
            fields={[
                { label: "Business Name", name: "business_name", type: "text", placeholder: "Business Name" },
                { label: "Address", name: "address", type: "text", placeholder: "Address" },
                { label: "City", name: "city", type: "text", placeholder: "City" },
                { label: "Postcode", name: "postcode", type: "text", placeholder: "Postcode" },
                { label: "Phone", name: "phone", type: "text", placeholder: "Phone Number" },
                { label: "Email", name: "email", type: "text", placeholder: "Email Address" },
                { label: "Website", name: "website", type: "text", placeholder: "Website" },
                { label: "Opening_hours", name: "opening_hours", type: "text", placeholder: "Opening Hours" },
                { label: "Activities", name: "activities", type: "text", placeholder: "Activities" },
                { label: "Facilities", name: "facilities", type: "text", placeholder: "Facilities" },
            ]}
            formData={formData}
            onSubmit={handleSubmit}
            onChange={handleChange}
            buttonText="Create"
            footer={
                <>
                    <a href="/gyms" className="link">Cancel</a>
                </>
            }
        />
    
        <div id="alertContainer"></div>
    </>
    
  )
}

export default CreateGym;