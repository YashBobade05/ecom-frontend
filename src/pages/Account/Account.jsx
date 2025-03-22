 

// import React, { useEffect, useState } from 'react';
// import styles from './Account.module.css';
// import Sidebar from '../../components/Sidebar/Sidebar';
// import Navbar from '../../components/Navbar/Navbar';

// const Account = () => {
//     const [orders, setOrders] = useState([]);

//     useEffect(() => {
//         const fetchOrders = async () => {
//             const email = localStorage.getItem('email');
//             if (!email) {
//                 console.error("No user email found in localStorage");
//                 return;
//             }

//             try {
//                 const response = await fetch(`http://localhost:3000/orders?email=${email}`);
//                 const data = await response.json();
//                 if (response.ok) {
//                     setOrders(data);
//                 } else {
//                     console.error("Failed to fetch orders:", data.error);
//                 }
//             } catch (error) {
//                 console.error("Error fetching orders:", error);
//             }
//         };

//         fetchOrders();
//     }, []);

//     return (
//         <div className={styles.accountContainer}>
            
//             <Navbar />
//             <div className={styles.mainContent}>
//             <Sidebar /> {/* ✅ Added Sidebar */}

//             {/* ✅ Added content wrapper to fix layout */}
//             <div className={styles.content}>
//                 <h2>Your Orders</h2>
//                 {orders.length > 0 ? (
//                     orders.map((order) => (
//                         <div key={order._id} className={styles.orderItem}>
//                             <p>Order ID: {order._id}</p>
//                             <p>Total Amount: ₹{order.totalAmount}</p>
//                             <p>Delivery Address: {order.deliveryAddress}</p>
//                             <h4>Items:</h4>
//                             {order.items.map((item) => (
//                                 <div key={item.productId} className={styles.item}>
//                                     <p>{item.name} - ₹{item.price} x {item.quantity}</p>
//                                     <p>Size: {item.size}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     ))
//                 ) : (
//                     <p>No orders found.</p>
//                 )}
//             </div>
//             </div>
//         </div>
//     );
// };

// export default Account;


import React from 'react';

import styles from './Account.module.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import AccountDashboard from '../../components/AccountDashboard/AccountDashboard'; // ✅ New Component

const Account = () => {
    return (
        <div className={styles.accountContainer}>
            <Navbar />
            <div className={styles.mainContent}>
                <Sidebar />
                <div className={styles.content}>
                    <h2>Account Dashboard</h2>
                    <AccountDashboard /> {/* ✅ New Component Added */}
                </div>
            </div>
        </div>
    );
};

export default Account;
