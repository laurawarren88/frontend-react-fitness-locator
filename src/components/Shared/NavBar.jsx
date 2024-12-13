import React from 'react'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/Picture 1.png'

const Navbar = () => {
  const navLink = ({ isActive }) => isActive 
  ? 'font-roborto py-2 px-3 mr-2 bg-lightGray text-deepBlue rounded'
  : 'font-roborto py-2 px-3 mr-2 text-darkGray';

  const specialNavLink = ({ isActive }) => isActive 
  ? 'font-roborto py-2 px-3 mr-2 bg-deepBlue rounded text-lightGray'
  : 'font-roborto btn-primary';

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
              <Link to="/" className="flex items-center py-3 px-3">
                <img src={logo} alt="logo" className="h-12 w-14" />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-3">
              <NavLink to="/" className={navLink}>Home</NavLink>
              <NavLink to="/about" className={navLink}>About</NavLink>
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
            <button className="text-gray-500 focus:outline-none">
            <i className='fas-fa-times fas-fa-bars text-xl'></i>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className='md:hidden bg-black/75 text-center'>
        <NavLink to="/" className="font-roborto block py-2 px-4 text-sm text-gray-500 hover:bg-gray-700">Home</NavLink>
        <NavLink to="/about" className="font-roborto block py-2 px-4 text-sm text-gray-500 hover:bg-gray-700">About</NavLink>
        <NavLink to="/blog" className="font-roborto block py-2 px-4 text-sm text-gray-500 hover:bg-gray-700">Blog</NavLink>
      </div>
    </nav>  
  )
}

export default Navbar