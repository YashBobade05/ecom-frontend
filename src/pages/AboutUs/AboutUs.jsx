import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './AboutUs.module.css';

const AboutUs = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.mainContent}>
                {/* <Sidebar /> */}
                <div className={styles.content}>
                    <h1>About Us</h1>
                    <p>Welcome to <strong>Smart Shopping</strong>, your one-stop destination for premium products at unbeatable prices.</p>
                    <h2>Our Mission</h2>
                    <ul>
                        <li>✅ High-quality products curated with care</li>
                        <li>✅ A seamless and user-friendly shopping experience</li>
                        <li>✅ Secure payment options with fast delivery</li>
                        <li>✅ Dedicated customer support for all your needs</li>
                    </ul>
                    <h2>Why Choose Us?</h2>
                    <p>🌟 Wide Range of Products<br/>🚚 Fast & Reliable Delivery<br/>🛡️ Secure Transactions<br/>🤝 Customer-Centric Approach</p>
                    <p>Thank you for choosing <strong>Smart Shopping</strong> — where quality meets trust!</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;