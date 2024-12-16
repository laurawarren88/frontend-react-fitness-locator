import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/fetchCookie";
import useFetchUser from "../../hooks/useFetchUser";
import ErrorMessage from "../../components/Shared/ErrorMessage";
import LoadingMessage from "../../components/Shared/LoadingMessage";

const Profile = () => {
    const { id } = useParams();
    const token = getCookie('access_token')

    if (!token) {
      useNavigate("/login");
      return <ErrorMessage message="You are not authenticated. Please log in." />;
    }
  
    const { user, error } = useFetchUser(id, token);
  
    if (error) {
      return <ErrorMessage message={error} />;
    }
  
    if (!user && !error) {
      return <LoadingMessage message="Loading Profile..." />;
    }
  
    const isAdminUser = user?.isAdmin;

    return (
        <section className="bg-softWhite min-h-screen py-20">
          <div className="max-w-7xl mx-auto px-4">
            {/* Heading Section */}
            <div className="title-section mb-16">
              <h1 className="h1-primary">
                {isAdminUser ? "Admin Dashboard" : "Your Reading Journey"}
              </h1>
              <p className="font-oswald text-2xl text-darkGray mt-4">
                Welcome, {user.username}
              </p>
            </div>
    
            {isAdminUser ? (
              <AdminControls navigate={useNavigate} />
            ) : (
              <UserControls navigate={useNavigate} />
            )}
          </div>
        </section>
      );
    };
    
    const AdminControls = ({ navigate }) => (
      <div className="bg-white rounded-lg shadow-lg p-8 border border-deepBlue/20">
        <h2 className="font-oswald text-2xl text-darkGray mb-8 pb-4 border-b border-deepBlue/30">
          Admin Controls
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <button className="btn-primary text-center" onClick={() => navigate("/")}>
            Home Page
          </button>
          <button className="btn-secondary text-center" onClick={() => navigate("/books/new")}>
            Add a new book
          </button>
          <button className="btn-secondary text-center" onClick={() => navigate("/books")}>
            Manage Books
          </button>
          <button className="btn-secondary text-center" onClick={() => navigate("/reviews")}>
            Manage Reviews
          </button>
        </div>
      </div>
    );
    
    const UserControls = ({ navigate }) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-deepBlue/20">
          <h2 className="font-oswald text-xl text-darkGray mb-4">Quick Actions</h2>
          <button className="btn-primary block text-center mb-4" onClick={() => navigate("/")}>
            Home Page
          </button>
          <button className="btn-secondary block text-center mb-4" onClick={() => navigate("/reviews")}>
            Leave a review
          </button>
        </div>
    
        <div className="bg-white rounded-lg shadow-lg p-8 border border-deepBlue/20">
          <h2 className="font-oswald text-xl text-darkGray mb-4">Discover Books</h2>
          <p className="font-roborto text-lightGray mb-4">Let's find your next literary adventure!</p>
          <button className="btn-secondary block text-center mb-4" onClick={() => navigate("/books")}>
            Browse All Books
          </button>
        </div>
    
        <div className="bg-white rounded-lg shadow-lg p-8 border border-deepBlue/20 md:col-span-2">
          <h2 className="font-oswald text-xl text-deepBlue mb-4">Looking for Something Specific?</h2>
          <p className="font-roborto text-lightGray mb-4">
            Use our search feature to find exactly what you want.
          </p>
          <button className="btn-secondary block text-center" onClick={() => navigate("/books/search")}>
            Search for a book
          </button>
        </div>
      </div>
    );
    
    export default Profile;