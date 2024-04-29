import React, { useState, useEffect } from 'react';
import Navbar from './Navbar'


function Profile() {
    // State hook for an array of objects
    const [profileData, setProfileData] = useState("");

    // Function to fetch data from the server using async/await
    const fetchData = async () => {
        try {
            // Send a GET request to the server
            const response = await fetch('https://signup-login-1.onrender.com/profile', {
                method: 'GET',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Check if the response is OK (status code 200-299)
            if (!response.ok) {
                throw new Error('Failed to fetch profile data');
            }

            // Await the parsing of the response as JSON
            const data = await response.json();

            // Set the state with the array of objects received from the server
            setProfileData(data);

            // Log the data for debugging
            console.log(data);
        } catch (error) {
            // Handle any errors that occur during the fetch
            console.error('Error fetching profile data:', error);
        }
    };

    // Use the fetchData function in the useEffect hook
    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array means the effect runs once on mount

    return (
        <div>
            <Navbar />
            {profileData ? (
                <div>
                    <h1>Username: {profileData.username}</h1>
                <h1>Email: {profileData.email}</h1>
                </div>
                
            ) : (
                <h1>You are not logged in</h1>
            )}
        </div>
    );
    
}

export default Profile;
