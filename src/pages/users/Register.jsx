// import { Link } from 'react-router-dom';
import React from 'react';
import { Link } from 'react-router-dom'
import { submitForm } from '../../controllers/submitFormController';
import { BASE_URL } from '../../utils/config';
import Form from '../../components/Shared/Form';

const Register = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirm_password: formData.get('confirm_password'),
        };

        console.log(`${BASE_URL}/users/register`);
        const result = await submitForm({
            url: `${BASE_URL}/users/register`,
            payload,
            alertContainerId: 'alertContainer',
        });

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
                <Link to="/users/login" className="link pr-6">Already have an account?</Link>
                <Link to="/users/forgot_password" className="link">Forgot password?</Link>
            </>
        }
    />
  )
};

export default Register;