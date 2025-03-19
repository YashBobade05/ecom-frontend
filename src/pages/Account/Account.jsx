import React, { useEffect, useState } from 'react';
import styles from './Account.module.css';
import { Link } from 'react-router-dom';

const Account = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const email = localStorage.getItem('email');
            if (!email) {
                console.error("No user email found in localStorage");
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/orders?email=${email}`);
                const data = await response.json();
                if (response.ok) {
                    setOrders(data);
                } else {
                    console.error("Failed to fetch orders:", data.error);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className={styles.accountContainer}>
            <div className={styles.sidebar}>
                <button>Dashboard</button>
                <button><Link to="/orders">My Orders</Link></button>
                <button>Profile</button>
                <button><Link to="/wishlist">Wishlist</Link></button>
                <button><Link to="/edit-address">Edit Address</Link></button>
                <button><Link to="/saved-address">Saved Address</Link></button>
                <button>Logout</button>
            </div>

            <div className={styles.content}>
                <h2>Your Orders</h2>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className={styles.orderItem}>
                            <p>Order ID: {order._id}</p>
                            <p>Total Amount: ₹{order.totalAmount}</p>
                            <p>Delivery Address: {order.deliveryAddress}</p>
                            <h4>Items:</h4>
                            {order.items.map((item) => (
                                <div key={item.productId} className={styles.item}>
                                    <p>{item.name} - ₹{item.price} x {item.quantity}</p>
                                    <p>Size: {item.size}</p>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default Account;

// import React, { useEffect, useState } from "react";

// const Account = () => {
//     const [orders, setOrders] = useState([]);
//     const userEmail = localStorage.getItem("email"); // ✅ Get user email from localStorage

//     useEffect(() => {
//         const fetchOrders = async () => {
//             if (!userEmail) {
//                 console.error("No user email found in localStorage");
//                 return;
//             }

//             try {
//                 const response = await fetch(`http://localhost:3000/orders/user/${userEmail}`);
                
//                 const data = await response.json();

//                 if (response.ok) {
//                     setOrders(data);
//                 } else {
//                     console.error(data.message || "Failed to fetch orders");
//                 }
//             } catch (error) {
//                 console.error("Error fetching orders:", error);
//             }
//         };

//         fetchOrders();
//     }, [userEmail]);

//     return (
//         <div>
//             <h2>Your Orders</h2>
//             {orders.length === 0 ? (
//                 <p>No orders found</p>
//             ) : (
//                 <ul>
//                     {orders.map((order) => (
//                         <li key={order._id}>
//                             <p>Order ID: {order._id}</p>
//                             <p>Total Amount: ${order.totalAmount}</p>
//                             <p>Delivery Address: {order.deliveryAddress}</p>
//                             <ul>
//                                 {order.items.map((item) => (
//                                     <li key={item.productId}>
//                                         {item.name} - {item.size} x {item.quantity} (${item.price})
//                                     </li>
//                                 ))}
//                             </ul>
//                         </li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default Account;

