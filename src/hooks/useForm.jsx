import { useState } from "react";

const useForm = (initialState, onSubmit) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            setFormData((prev) => ({ ...prev, [name]: files[0] })); 
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return { formData, handleChange, handleSubmit };
};

export default useForm;