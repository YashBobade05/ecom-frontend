import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const Profile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            const email = localStorage.getItem('email');
            if (!email) {
                setError("User not logged in.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/users/profile?email=${email}`);
                const data = await response.json();

                if (response.ok) {
                    setProfile(data);
                } else {
                    setError(data.message || "Failed to fetch profile details.");
                }
            } catch (error) {
                setError("Error fetching profile details.");
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className={styles.profileContainer}>
            <Navbar />
            <div className={styles.mainContent}>
                <Sidebar />

                <div className={styles.profileContent}>
                    <h2>Profile Information</h2>

                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p className={styles.error}>{error}</p>
                    ) : (
                        <div className={styles.profileDetails}>
                            <p><strong>Name:</strong> {profile.name}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            {/* <p><strong>Phone:</strong> {profile.phone}</p> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
