import React from 'react';
import { Link } from 'react-router-dom'
import { submitForm } from '../../controllers/forms/submitFormController';
import { BASE_URL } from '../../utils/config';
import Form from '../../components/Shared/Form';

const Login = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
      };
      
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            email: formData.get('email'),
            password: formData.get('password'),
        };

        const result = await submitForm({
            url: `${BASE_URL}/users/login`,
            payload,
            alertContainerId: 'alertContainer',
        });

        if (result.success) {
            const { user } = result.data;
            console.log(user._id);
            localStorage.setItem('currentUser', JSON.stringify({ id: user._id }));
            window.location.href = `/users/profile/${user._id}`;
            window.scrollTo(0, 0);
        }
    };

  return (
    <Form
        title="Sign in to your account"
        fields={[
            { label: 'Email', name: 'email', type: 'email', placeholder: 'name@company.com' },
            { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
        ]}
        onSubmit={handleSubmit}
        buttonText="Sign In"
        footer={
            <>
                <Link to="/users/forgot_password" onClick={handleClick} className="link">Forgot password?</Link>
            </>
        }
    />
  )
};

export default Login;