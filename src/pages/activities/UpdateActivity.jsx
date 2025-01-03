import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { submitForm } from '../../controllers/submitFormController';
import { BASE_URL } from '../../utils/config';
import CreateactivitiesForm from '../../components/CreateActivitiesForm';
import useForm from "../../hooks/useForm";

const UpdateActivities = ({ activitiesId }) => {
    const [activitiesData, setActivitiesData] = useState(null);

    useEffect(() => {
        const fetchActivitiesData = async () => {
            const response = await fetch(`${BASE_URL}/activities/${activitiesId}`);
            const data = await response.json();
            setActivitiesData(data); 
        };
        fetchActivitiesData();
    }, [activitiesId]);

    const initialState = Data ? {
        business_name: activitiesData.business_name || "",
        address: activitiesData.address || "",
        city: activitiesData.city || "",
        postcode: activitiesData.postcode || "",
        phone: activitiesData.phone || "",
        email: activitiesData.email || "",
        website: activitiesData.website || "",
        opening_hours: activitiesData.opening_hours || "",
        activities: activitiesData.activities || "",
        facilities: activitiesData.facilities || "",
        // logo: activitiesData.logo || null,
        // facilities_image: activitiesData.facilities_image || null,
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
            url: `${BASE_URL}/activities/${activitiesId}`,
            payload: formData,
            alertContainerId: "alertContainer",
        });

        if (result.success) {
            alert("Activity updated successfully! Redirecting...");
            window.location.href = "/activities";
        }
    };

    const { formData, handleChange, handleSubmit } = useForm(initialState, onSubmit);

    if (!activitiesData) return <div>Loading...</div>;  

    return (
        <>
            <CreateactivitiesForm
                title="Update Activity"
                formData={formData}
                onSubmit={handleSubmit}
                onChange={handleChange}
                buttonText="Update"
                footer={
                    <>
                        <Link to="/activities" className="link">Cancel</Link>
                    </>
                }
            />
            <div id="alertContainer"></div>
        </>
    )
}

export default UpdateActivities;