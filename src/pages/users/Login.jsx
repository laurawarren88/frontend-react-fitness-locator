import { Link } from 'react-router-dom';

const login = () => {
  return (
    <section className="bg-softWhite">

    {/* Alert container */}
    <div id="alertContainer" className="hidden"></div>
    
    <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
        
    {/* Form Container */}
        <div className="form-container">
            <div className="form-layout">
                <h1 className="form-title">Sign in to your account</h1>
    
                <form className="space-y-4 md:space-y-6">
                    <div>
                        <label className="form-label" for="email">Email</label>
                        <input type="email" name="email" className="form-input" placeholder="name@company.com" required />
                    </div>

                    <div>
                        <label className="form-label" for="password">Password</label>
                        <input type="password" name="password" className="form-input" placeholder="••••••••" required />
                    </div>

                    <div className="flex items-center justify-between">
                        <Link to="/users/forgot_password" className="link">Forgot password?</Link>
                    </div>

                    <button type="submit" className="btn-primary w-full">Sign in</button>
                    <div className="flex items-center justify-center">  
                        <p className="font-roborto text-sm text-darkGray">Don't have an account yet?<Link to="/users/register" className="link" data-link> Sign up</Link></p>  
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
</section>
  )
};

export default login;