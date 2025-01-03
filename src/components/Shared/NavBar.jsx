import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { getCookie } from '../../utils/fetchCookie';
import logo from '../../assets/images/fitnessTracker.png'
import { FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const navLink = ({ isActive }) => isActive 
  ? 'font-poppins py-2 px-3 mr-2 bg-vibrantBlue text-lightGray rounded'
  : 'font-poppins py-2 px-3 mr-2 text-darkGray rounded hover:bg-vibrantBlue';

  const specialNavLink = ({ isActive }) => isActive 
  ? 'font-poppins py-2 px-3 mr-2 bg-vibrantBlue rounded text-lightGray'
  : 'font-poppins btn-primary';

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMobileMenu = () => setIsMenuOpen(false);

  const token = getCookie('access_token');
  const isLoggedIn = !!token;

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userId = currentUser ? currentUser.id : null;

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
              <NavLink to="/activities/locator" className={navLink}>Locator</NavLink>
            </div>
          </div>
          {/* <!-- right side --> */}
          <div className="hidden md:flex items-center space-x-1"> 
          {!isLoggedIn ? ( 
            <div>
              <NavLink to="/users/login" className={navLink}>Login</NavLink>
              {userId && (
                  <NavLink to={"/users/register"} className={specialNavLink}>Register</NavLink>
                )}
            </div>
             ) : (
            <div>
              <NavLink to="/users/logout" className={navLink}>Logout</NavLink>
              <NavLink to={`/users/profile/${userId}`} className={specialNavLink}>Profile</NavLink>
            </div>
            )}
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
      <div className={`md:hidden font-poppins text-center text-darkGray transform transition-transform 
        ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>
        <NavLink to="/" className="block py-2 px-4 rounded hover:bg-lightGray transition-colors mx-auto w-fit" onClick={closeMobileMenu}>Home</NavLink>
        <NavLink to="/activities" className="block py-2 px-4 rounded hover:bg-lightGray transition-colors mx-auto w-fit" onClick={closeMobileMenu}>Activities</NavLink>
        <NavLink to="/activities/locator" className="block py-2 px-4 rounded hover:bg-lightGray transition-colors mx-auto w-fit" onClick={closeMobileMenu}>Locator</NavLink>
      </div>
    </nav>  
  )
}

export default Navbar