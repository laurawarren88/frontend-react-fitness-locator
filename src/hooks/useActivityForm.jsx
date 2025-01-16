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
        const file = files[0];
        const validTypes = ["image/jpeg", "image/png", "image/gif"];
    
        if (file) {
            if (!validTypes.includes(file.type)) {
                // alert("Invalid file type. Please select an image.");
                return;
            }
    
            const previewUrl = URL.createObjectURL(file);
            if (name === "logo") {
                setLogoPreview(previewUrl);
                // console.log("Logo Preview:", logoPreview);
            } else if (name === "facilities_image") {
                setFacilitiesImagePreview(previewUrl);
            }
            
            setFormData((prevState) => ({
                ...prevState,
                [name]: file,
            }));
        }
    };

    const handleSubmit = async (e) => {
        // console.log(e);
        if (e.preventDefault) {
            e.preventDefault();
        }
        // console.log("Final formData:", formData);
        onSubmit({ ...formData });
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