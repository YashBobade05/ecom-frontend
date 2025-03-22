import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    // const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('email');
        window.location.reload(); // Refresh the page to reflect logout
    };
 
 
    return (
        <div className={styles.sidebar}>
            <button className={styles.sidebutton}><Link to="/account" className={styles.link}>Dashboard</Link></button>
            <button className={styles.sidebutton}><Link to="/orders" className={styles.link}>My Orders</Link></button>
            <button className={styles.sidebutton}><Link to="/profile" className={styles.link}>Profile</Link></button>
            <button className={styles.sidebutton}><Link to="/wishlist" className={styles.link}>Wishlist</Link></button>
            <button className={styles.sidebutton}><Link to="/saved-address" className={styles.link}>Saved Address</Link></button>
            <button className={styles.sidebutton} onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Sidebar;
