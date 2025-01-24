import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const logoutUser = async () => {
            try {
                const response = await fetch('/api/users/logout', {
                    method: 'POST',
                    credentials: 'include', 
                });

                if (!response.ok) {
                    throw new Error('Failed to log out');
                }

                const data = await response.json();
                // console.log(data.message);
                navigate('/users/login'); 
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        logoutUser();
    }, [navigate]);

    return (
        <section className="bg-white">
            <div id="alertContainer" className="hidden"></div>
            <div className="flex flex-col items-center justify-center mx-auto h-screen">
                <div className="message-layout">
                    <h1 className="message-title">Logging Out...</h1>
                </div>
            </div>
        </section>
    );
};

export default Logout;