import { useState } from "react";
import { handleAddressChange } from "../controllers/handleAddressChange";

const useForm = (initialState, onSubmit) => {
    const [formData, setFormData] = useState(initialState);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log("Updating field:", name, "Value:", files ? files[0] : value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: files ? files[0] : value,
        }));
    };

    const handleAddressFieldChange = async (e) => {
        const { name, value } = e.target;
        console.log("Address Field:", name, "Value:", value);
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        console.log(e);
        if (e.preventDefault) {
            e.preventDefault();
        }
        console.log("Final formData:", formData); // Add a log here to check the state
        onSubmit({ ...formData });
    };

    return { formData, handleChange, handleAddressFieldChange, handleSubmit };
};

export default useForm;