import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  return (
    <section className="bg-softWhite">
        
            {/* Alert container */}
            <div id="alertContainer" className="hidden"></div>
            
            <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
            
            {/* Form Container */}
                <div className="form-container">
                    <div className="form-layout">
                        <h1 className="form-title">Forgot Password</h1>
            
                        <form className="space-y-4 md:space-y-6">
                            <div>
                                <label className="form-label" htmlFor="email">Email Address</label>
                                <input type="email" name="email" className="form-input" placeholder="name@company.com" required />
                            </div>
                            
                            <button type="submit" className="btn-primary w-full">Reset Password</button>
                            
                            <div className="flex items-center justify-center">
                                <Link to="/" className="link text-center">Home</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
  )
};

export default ForgotPassword;