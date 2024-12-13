import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
        <section className="bg-softWhite">

        {/* Alert container */}
        <div id="alertContainer" className="hidden"></div>

            <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">

            {/* Form Container */}
                <div className="form-container">
                    <div className="form-layout">
                        <h1 className="form-title">Register</h1>
                        
                        <form id="newUserForm" className="space-y-4 md:space-y-6">
                            <div>
                                <label className="form-label" for="username">Username</label>
                                <input type="text" name="username" className="form-input" placeholder="Username" required />
                            </div>
                            <div>
                                <label className="form-label" for="email">Email Address</label>
                                <input type="email" name="email" className="form-input" placeholder="Email" required />
                            </div>
                            <div>
                                <label className="form-label" for="password">Password</label>
                                <input type="password" name="password" className="form-input" placeholder="Password" required />
                            </div>
                            <div>
                                <label className="form-label" for="confirm_password">Confirm Password</label>
                                <input type="password" name="confirm_password" className="form-input" required />
                            </div>
                            <div className="flex items-center justify-between">
                                <Link to="/users/login" className="link">Already have an account?</Link>
                                <Link to="/users/forgot_password" className="link">Forgot Password?</Link>
                            </div>

                            <button type="submit" id="submit" className="btn-primary w-full">Sign Up</button>

                            <div className="flex items-center justify-center">
                                <Link to="/" className="link text-center">Home</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
};

export default Register;