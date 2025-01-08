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
            url: `${BASE_URL}/users/forgot_password`,
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
//     <section className="bg-softWhite">
        
//             {/* Alert container */}
//             <div id="alertContainer" className="hidden"></div>
            
//             <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
            
//             {/* Form Container */}
//                 <div className="form-container">
//                     <div className="form-layout">
//                         <h1 className="form-title">Forgot Password</h1>
            
//                         <form className="space-y-4 md:space-y-6">
//                             <div>
//                                 <label className="form-label" htmlFor="email">Email Address</label>
//                                 <input type="email" name="email" className="form-input" placeholder="name@company.com" required />
//                             </div>
                            
//                             <button type="submit" className="btn-primary w-full">Reset Password</button>
                            
//                             <div className="flex items-center justify-center">
//                                 <Link to="/" className="link text-center">Home</Link>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </section>
//   )
// };

export default ForgotPassword;