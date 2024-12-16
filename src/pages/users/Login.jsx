import React from 'react';
import { submitForm } from '../../controllers/authController';
import { BASE_URL } from '../../utils/config';
import AuthForm from '../../components/Shared/authForm';

const Login = () => {
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
            localStorage.setItem('currentUser', JSON.stringify({ id: user._id }));
            window.location.href = `/profile/${user._id}`;
        }
    };

  return (
    <AuthForm
        title="Sign in to your account"
        fields={[
            { label: 'Email', name: 'email', type: 'email', placeholder: 'name@company.com' },
            { label: 'Password', name: 'password', type: 'password', placeholder: '••••••••' },
        ]}
        onSubmit={handleSubmit}
        buttonText="Sign In"
        footer={
            <>
                <a href="/users/forgot_password" className="link">Forgot password?</a>
            </>
        }
    />
  )
};

export default Login;