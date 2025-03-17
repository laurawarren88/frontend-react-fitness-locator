// import { Link } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom'
import { submitForm } from '../../controllers/forms/loginFormController';
import Form from '../../components/Shared/Form';

const Register = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
      };

    const handleSubmit = async (e) => {
        console.log("handleSubmit called");
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password'),
        };
        console.log("payload:", payload);

        const result = await submitForm({
            url: 'http://localhost:8081/api/users/register',
            payload,
            alertContainerId: 'alertContainer',
        });
        console.log("register result:", result);
        if (result.success) {
            window.location.href = '/users/login';
        }
    };
    
  return (
    <Form
        title="Register"
        fields={[
            { label: 'Username', name: 'username', type: 'text', placeholder: 'Username' },
            { label: 'Email Address', name: 'email', type: 'email', placeholder: 'Email' },
            { label: 'Password', name: 'password', type: 'password', placeholder: 'Password' },
            { label: 'Confirm Password', name: 'confirm_password', type: 'password', placeholder: 'Confirm Password' },
        ]}
        onSubmit={handleSubmit}
        buttonText="Sign Up"
        footer={
            <>
                <Link to="/users/login" onClick={handleClick} className="link pr-6">Already have an account?</Link>
                <Link to="/users/forgot_password" onClick={handleClick} className="link">Forgot password?</Link>
            </>
        }
    />
  )
};

export default Register;