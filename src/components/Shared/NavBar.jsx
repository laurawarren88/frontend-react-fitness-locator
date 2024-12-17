import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/fitnessTracker.png'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const navLink = ({ isActive }) => isActive 
  ? 'font-roborto py-2 px-3 mr-2 bg-vibrantBlue text-lightGray rounded'
  : 'font-roborto py-2 px-3 mr-2 text-darkGray rounded hover:bg-vibrantBlue';

  const specialNavLink = ({ isActive }) => isActive 
  ? 'font-roborto py-2 px-3 mr-2 bg-vibrantBlue rounded text-lightGray'
  : 'font-roborto btn-primary';

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    // <!-- overall nav -->
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-colors duration-300">
      {/* <!-- container --> */}
      <div className="max-w-7xl mx-auto px-4">
        {/* <!-- Creating space between left side and right side --> */}
        <div className="flex justify-between">
          {/* <!-- left size --> */}
          <div className="flex items-center space-x-1">
            <div>
              <Link to="/" className="flex items-center py-3 px-3" onClick={closeMobileMenu}>
                <img src={logo} alt="logo" className="h-12 w-14" />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <NavLink to="/" className={navLink}>Home</NavLink>
              <NavLink to="/gyms/new" className={navLink}>Create Gym</NavLink>
              <NavLink to="/blog" className={navLink}>Blog</NavLink>
            </div>
          </div>
          {/* <!-- right side --> */}
          <div className="hidden md:flex items-center space-x-1">  
            <div className="auth-public">
              <NavLink to="/users/login" className={navLink}>Login</NavLink>
              <NavLink to="/users/register" className={specialNavLink}>Register</NavLink>
            </div>
            <div className="auth-private hidden">
              <NavLink to="/users/logout" className={navLink}>Logout</NavLink>
              <NavLink to="/profile" className={specialNavLink}>Profile</NavLink>
            </div>
          </div>
          {/* <!-- mobile menu button --> */}
          <div className="md:hidden flex items-center">
            <button className="text-darkGray focus:outline-none" onClick={toggleMenu}>
            {isMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden font-roborto text-center text-darkGray transform transition-transform 
        ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
        <NavLink to="/" className="block py-2 px-4 rounded hover:bg-lightGray transition-colors mx-auto w-fit" onClick={closeMobileMenu}>Home</NavLink>
        <NavLink to="/about" className="block py-2 px-4 rounded hover:bg-lightGray transition-colors mx-auto w-fit" onClick={closeMobileMenu}>About</NavLink>
        <NavLink to="/blog" className="block py-2 px-4 rounded hover:bg-lightGray transition-colors mx-auto w-fit" onClick={closeMobileMenu}>Blog</NavLink>
      </div>
    </nav>  
  )
}

export default Navbar