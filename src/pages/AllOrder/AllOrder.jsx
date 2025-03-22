
// import React, { useEffect, useState } from 'react';
// import styles from './AllOrder.module.css';
// import Sidebar from '../../components/Sidebar/Sidebar';
// import Navbar from '../../components/Navbar/Navbar';

// const AllOrder = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchOrders = async () => {
//             const email = localStorage.getItem('email');
//             if (!email) {
//                 setError("User not logged in.");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 const response = await fetch(`http://localhost:3000/orders/user/${email}`);
//                 const data = await response.json();

//                 if (response.ok) {
//                     setOrders(data);
//                 } else {
//                     setError(data.message || "Failed to fetch orders.");
//                 }
//             } catch (error) {
//                 setError("Error fetching orders.");
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchOrders();
//     }, []);

//     return (
//         <div className={styles.orderContainer}>
//              <Navbar/>
//              <div className={styles.mainContent}>
//             <Sidebar /> {/* ✅ Added Sidebar */}

//             {/* ✅ Added content wrapper to prevent overlap */}
//             <div className={styles.content}>
//                 <h2>My Orders</h2>

//                 {loading ? (
//                     <p>Loading...</p>
//                 ) : error ? (
//                     <p className={styles.error}>{error}</p>
//                 ) : (
//                     orders.length > 0 ? (
//                         orders.map((order) => (
//                             <div key={order._id} className={styles.orderCard}>
//                                 <p><strong>Order ID:</strong> {order._id}</p>
//                                 <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
//                                 <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
//                                 <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
//                                 <p>
//                                     <strong>Status:</strong> 
//                                     <span className={styles[order.orderStatus.toLowerCase()]}>
//                                         {order.orderStatus}
//                                     </span>
//                                 </p>

//                                 <div className={styles.itemsList}>
//                                     <strong>Items:</strong>
//                                     {order.items.map((item, index) => (
//                                         <div key={index} className={styles.item}>
//                                             <p>{item.name} ({item.size})</p>
//                                             <p>₹{item.price} x {item.quantity}</p>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p>No orders found.</p>
//                     )
//                 )}
//             </div>
//             </div>
//         </div>
//     );
// };

// export default AllOrder;



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import styles from './AllOrder.module.css';
// import Navbar from '../../components/Navbar/Navbar';
// import Sidebar from '../../components/Sidebar/Sidebar';
 
// const AllOrder = () => {
//     const [orders, setOrders] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [userEmail, setUserEmail] = useState(localStorage.getItem('email'));
//     const navigate = useNavigate(); // Initialize navigate
 
//     useEffect(() => {
//         if (!userEmail) {
//             navigate('/login'); // Redirect to login if no user is logged in
//             return;
//         }
 
//         const fetchOrders = async () => {
//             try {
//                 setLoading(true);
//                 const response = await fetch(`http://localhost:3000/orders/user/${userEmail}`);
//                 const data = await response.json();
 
//                 if (response.ok) {
//                     setOrders(data);
//                     setError('');
//                 } else {
//                     setOrders([]);
//                     setError(data.message || "Failed to fetch orders.");
//                 }
//             } catch (error) {
//                 setOrders([]);
//                 setError("Error fetching orders.");
//                 console.error(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
 
//         fetchOrders();
//     }, [userEmail, navigate]); // Include navigate in dependencies
 
//     useEffect(() => {
//         const handleStorageChange = () => {
//             const updatedEmail = localStorage.getItem('email');
//             setUserEmail(updatedEmail); // Update state when email changes
 
//             if (!updatedEmail) {
//                 setOrders([]); // Clear orders on logout
//                 setError("User not logged in.");
//                 navigate('/login'); // Redirect to login on logout
//             }
//         };
 
//         window.addEventListener("storage", handleStorageChange);
//         return () => {
//             window.removeEventListener("storage", handleStorageChange);
//         };
//     }, [navigate]);
 
//     return (
//         <div className={styles.orderContainer}>
//             <Navbar/>
//             <div className={styles.content}>
//                 <Sidebar/>
            
//             <h2>My Orders</h2>
 
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p className={styles.error}>{error}</p>
//             ) : orders.length > 0 ? (
//                 orders.map((order) => (
//                     <div key={order._id} className={styles.orderCard}>
//                         <p><strong>Order ID:</strong> {order._id}</p>
//                         <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
//                         <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>
//                         <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
//                         <p><strong>Status:</strong> <span className={styles[order.orderStatus.toLowerCase()]}>{order.orderStatus}</span></p>
 
//                         <div className={styles.itemsList}>
//                             <strong>Items:</strong>
//                             {order.items.map((item, index) => (
//                                 <div key={index} className={styles.item}>
//                                     <p>{item.name} ({item.size})</p>
//                                     <p>₹{item.price} x {item.quantity}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>No orders found.</p>
//             )}
//             </div>
//         </div>
//     );
// };
 
// export default AllOrder;
 
 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AllOrder.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
 
const AllOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const userEmail = localStorage.getItem('email');
    const navigate = useNavigate();
 
    useEffect(() => {
        if (!userEmail) {
            navigate('/login'); // Redirect to login if no user is logged in
            return;
        }
 
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/orders/user/${userEmail}`);
                const data = await response.json();
 
                if (response.ok) {
                    setOrders(data);
                    setError('');
                } else {
                    setOrders([]);
                    setError(data.message || "Failed to fetch orders.");
                }
            } catch (error) {
                setOrders([]);
                setError("Error fetching orders.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
 
        fetchOrders();
    }, [userEmail, navigate]);
 
    // ✅ Handle Order Cancellation
    const handleCancelOrder = async (orderId) => {
        const confirmDelete = window.confirm("Are you sure you want to cancel this order?");
        if (!confirmDelete) return;
 
        try {
            const response = await fetch(`http://localhost:3000/orders/${orderId}`, {
                method: "DELETE",
            });
 
            if (response.ok) {
                setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
            } else {
                alert("Failed to cancel order.");
            }
        } catch (error) {
            console.error("Error canceling order:", error);
            alert("Error canceling order.");
        }
    };
 
    return (
        <div className={styles.orderContainer}>
            <Navbar/>
            <div className={styles.content }>
                <Sidebar/>
            
            <h2>My Orders</h2>
 
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : orders.length > 0 ? (
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
 
                        {/* ✅ Cancel Order Button */}
                        <button
                            className={styles.cancelButton}
                            onClick={() => handleCancelOrder(order._id)}
                        >
                            Cancel Order
                        </button>
                    </div>
                ))
            ) : (
                <p>No orders found.</p>
            )}
            </div>
        </div>
    );
};
 
export default AllOrder;
 
 