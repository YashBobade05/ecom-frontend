import React, { useEffect, useState } from 'react';
import styles from './AllOrder.module.css';

const AllOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            const email = localStorage.getItem('email');
            if (!email) {
                setError("User not logged in.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/orders/user/${email}`);
                const data = await response.json();

                if (response.ok) {
                    setOrders(data);
                } else {
                    setError(data.message || "Failed to fetch orders.");
                }
            } catch (error) {
                setError("Error fetching orders.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className={styles.orderContainer}>
            <h2>My Orders</h2>

            {loading ? <p>Loading...</p> : error ? <p className={styles.error}>{error}</p> : (
                orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order._id} className={styles.orderCard}>
                            <p><strong>Order ID:</strong> {order._id}</p>
                            <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
                            <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                            <p><strong>Status:</strong> <span className={styles[order.orderStatus.toLowerCase()]}>{order.orderStatus}</span></p>

                            <div className={styles.itemsList}>
                                <strong>Items:</strong>
                                {order.items.map((item, index) => (
                                    <div key={index} className={styles.item}>
                                        <p>{item.name} ({item.size})</p>
                                        <p>₹{item.price} x {item.quantity}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No orders found.</p>
                )
            )}
        </div>
    );
};

export default AllOrder;
