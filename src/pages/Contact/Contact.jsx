import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Contact.module.css';

const Contact = () => {
    return (
        <div className={styles.container}>
            <Navbar />
            <div className={styles.mainContent}>
                {/* <Sidebar /> */}
                <div className={styles.content}>
                    <h1>Contact Us</h1>
                    <p>We’re here to help! Whether you have questions about your order, product details, or simply want to share feedback — our team is just a message away.</p>
                    <h2>Get in Touch</h2>
                    <p>📧 <strong>Email:</strong> support@smartshopping.com</p>
                    <p>📞 <strong>Phone:</strong> +91 123456789</p>
                    <p>📍 <strong>Address:</strong> 123, Business Park, Mumbai, Maharashtra, India</p>
                    <h2>Customer Support Hours</h2>
                    <p>🕒 Monday - Friday: 9:00 AM to 6:00 PM</p>
                    <p>🕒 Saturday: 10:00 AM to 4:00 PM</p>
                </div>
            </div>
        </div>
    );
};

export default Contact;
