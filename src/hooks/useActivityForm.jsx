import { useState, useEffect } from "react";

const useActivityForm = (initialState, onSubmit) => {
    const [formData, setFormData] = useState(initialState || {});
    const [logoPreview, setLogoPreview] = useState(null);
    const [facilitiesImagePreview, setFacilitiesImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleAddressFieldChange = async (e) => {
        const { name, value } = e.target;
        // console.log("Address Field:", name, "Value:", value);
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const { name, files } = e.target;
        const file = files?.[0];
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
    
        if (file) {
            if (!validTypes.includes(file.type)) {
                alert("Invalid file type. Please select an image.");
                return;
            }
    
            const previewUrl = URL.createObjectURL(file);
            if (name === "logo") setLogoPreview(previewUrl);
            if (name === "facilities_image") setFacilitiesImagePreview(previewUrl);

            setFormData((prevState) => ({
                ...prevState,
                [name]: file,
            }));
        } else {
            alert("No file selected!");
        }
    };

    const handleSubmit = async (e) => {
        if (e.preventDefault) e.preventDefault();

        const data = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            if (value instanceof File) {
                data.append(key, value);
            } else {
                data.append(key, value);
            }
        }
        console.log("FormData to submit:", formData);
        // onSubmit(data);
        onSubmit(formData)
    };

    useEffect(() => {
        return () => {
            if (logoPreview) URL.revokeObjectURL(logoPreview);
            if (facilitiesImagePreview) URL.revokeObjectURL(facilitiesImagePreview);
        };
    }, [logoPreview, facilitiesImagePreview]);

    return { formData, handleChange, handleAddressFieldChange, handleSubmit, setFormData, handleImageChange, logoPreview, setLogoPreview, facilitiesImagePreview, setFacilitiesImagePreview };
};

export default useActivityForm;