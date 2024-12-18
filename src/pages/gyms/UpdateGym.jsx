import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { submitForm } from '../../controllers/submitFormController';
import { BASE_URL } from '../../utils/config';
import CreateGymForm from '../../components/CreateGymForm';
import useForm from "../../hooks/useForm";

const UpdateGym = ({ gymId }) => {
    const [gymData, setGymData] = useState(null);

    useEffect(() => {
        const fetchGymData = async () => {
            const response = await fetch(`${BASE_URL}/gyms/${gymId}`);
            const data = await response.json();
            setGymData(data); 
        };
        fetchGymData();
    }, [gymId]);

    const initialState = gymData ? {
        business_name: gymData.business_name || "",
        address: gymData.address || "",
        city: gymData.city || "",
        postcode: gymData.postcode || "",
        phone: gymData.phone || "",
        email: gymData.email || "",
        website: gymData.website || "",
        opening_hours: gymData.opening_hours || "",
        activities: gymData.activities || "",
        facilities: gymData.facilities || "",
        // logo: gymData.logo || null,
        // facilities_image: gymData.facilities_image || null,
    } : {};

    const onSubmit = async (data) => {
        const formData = new FormData();
        // Object.keys(data).forEach((key) => {
        //     if (key === 'logo' || key === 'facilities_image') {
        //         formData.append(key, data[key]);
        //     } else {
        //         formData.append(key, data[key]);
        //     }
        // });

        const result = await submitForm({
            url: `${BASE_URL}/gyms/${gymId}`,
            payload: formData,
            alertContainerId: "alertContainer",
        });

        if (result.success) {
            alert("Gym updated successfully! Redirecting...");
            window.location.href = "/gyms";
        }
    };

    const { formData, handleChange, handleSubmit } = useForm(initialState, onSubmit);

    if (!gymData) return <div>Loading...</div>;  

    return (
        <>
            <CreateGymForm
                title="Update Gym"
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
                buttonText="Update"
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

export default UpdateGym;