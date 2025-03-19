import React, { useEffect, useState } from 'react';
import styles from './SavedAddress.module.css';

const SavedAddress = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAddresses = async () => {
            const email = localStorage.getItem('email');
            if (!email) {
                setError("User not logged in.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/addresses/${email}`);
                const data = await response.json();

                if (response.ok) {
                    setAddresses(data);
                } else {
                    setError(data.message || "Failed to fetch addresses.");
                }
            } catch (error) {
                setError("Error fetching addresses.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    return (
        <div className={styles.addressContainer}>
            <h2>Saved Addresses</h2>

            {loading ? <p>Loading...</p> : error ? <p className={styles.error}>{error}</p> : (
                addresses.length > 0 ? (
                    addresses.map((address) => (
                        <div key={address._id} className={styles.addressCard}>
                            <p><strong>{address.fullName}</strong></p>
                            <p>{address.street}, {address.city}, {address.state} - {address.zipCode}</p>
                            <p>{address.country}</p>
                            <p>Phone: {address.phone}</p>
                        </div>
                    ))
                ) : (
                    <p>No saved addresses found.</p>
                )
            )}
        </div>
    );
};

export default SavedAddress;
