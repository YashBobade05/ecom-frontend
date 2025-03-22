import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AccountDashboard.module.css';

const AccountDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.dashboardContainer}>
            <div className={styles.card} onClick={() => navigate('/orders')}>
                My Orders
            </div>
            <div className={styles.card} onClick={() => navigate('/profile')}>
                Profile
            </div>
            <div className={styles.card} onClick={() => navigate('/wishlist')}>
                Wishlist
            </div>
            <div className={styles.card} onClick={() => navigate('/saved-address')}>
                Saved Address
            </div>
        </div>
    );
};

export default AccountDashboard;
