import { Link } from 'react-router-dom';
import Form from '../../components/Shared/Form';

const ForgotPassword = () => {
    const handleClick = () => {
        window.scrollTo(0, 0);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const payload = {
            email: formData.get('email'),
        };

        const result = await submitForm({
            url: '/api/users/forgot_password',
            payload,
            alertContainerId: 'alertContainer',
        });

        if (result.success) {
            window.location.href = '/';
        }
    };

  return (
        <Form
        title="Forgot Password"
        fields={[
                { label: 'Email', name: 'email', type: 'email', placeholder: 'name@company.com' },
            ]}
            onSubmit={handleSubmit}
            buttonText="Reset Password"
            footer={
                <>
                    <Link to="/" onClick={handleClick} className="link">Home</Link>
                </>
            }
        />
    );
};

export default ForgotPassword;