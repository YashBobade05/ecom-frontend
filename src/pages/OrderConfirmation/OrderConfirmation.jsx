import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './OrderConfirmation.module.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [checkoutItems, setCheckoutItems] = useState([]);
    const { address } = location.state || {};
    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    useEffect(() => {
        const storedItems = sessionStorage.getItem('checkoutItems');
        if (!location.state?.checkoutItems && storedItems) {
            setCheckoutItems(JSON.parse(storedItems));
        } else {
            setCheckoutItems(location.state?.checkoutItems || []);
        }

        const email = localStorage.getItem("email"); // Debugging: Checking if email is set in localStorage
        console.log("🚀 Current localStorage email:", email);
    }, [location.state]);

    const getTotalPrice = () => {
        return checkoutItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
    };

    const placeOrder = async () => {
        const email = localStorage.getItem("email");
        console.log("🔍 Fetched email from localStorage:", email); // Debugging

        if (!email || !address || checkoutItems.length === 0) { // Added this check to prevent missing data
            alert("⚠️ Missing user email, address, or cart items.");
            return;
        }

        const orderData = {
            email,
            totalAmount: getTotalPrice(),
            deliveryAddress: `${address.fullName}, ${address.phone}, ${address.street}, ${address.city}, ${address.state} - ${address.zip}`,
            items: checkoutItems.map(item => ({
                productId: item._id, // Make sure this matches your product schema
                name: item.name,
                price: item.price,
                quantity: item.quantity || 1,
                size: item.selectedSize || "M" // Defaulting size to "M" if not provided
            }))
        };

        console.log("📝 Order Data:", orderData);

        try {
            const response = await fetch("http://localhost:3000/orders", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            });

            const data = await response.json();
            if (response.ok) {
                alert("🎉 Order placed successfully!");
                setIsOrderPlaced(true);
                sessionStorage.removeItem("checkoutItems");
            } else {
                console.error("❌ Order Error:", data.error); // Re-enabled error logging for better debugging
                alert(`❌ Error: ${data.error}`);
            }
        } catch (error) {
            console.error("🚨 Error placing order:", error);
            alert("❌ Failed to place order. Please try again later.");
        }
    };

    return (
        <div className={styles.confirmationContainer}>
            <h2>🎉 Order Confirmation</h2>
           

            <div className={styles.addressBox}>
                <h3>📍 Shipping Address</h3>
                {address ? (
                    <div>
                        <p><strong>Name:</strong> {address.fullName}</p>
                        <p><strong>Phone:</strong> {address.phone}</p>
                        <p><strong>Street:</strong> {address.street}</p>
                        <p><strong>City:</strong> {address.city}, {address.state} </p>
                    </div>
                ) : (
                    <p>❌ No address provided</p>
                )}
            </div>

            <div className={styles.orderDetails}>
                <h3>🛒 Order Summary</h3>
                {checkoutItems.length > 0 ? (
                    <>
                        {checkoutItems.map((item) => (
                            <div key={item._id} className={styles.orderItem}>
                                <img src={item.images?.[0] || item.image} alt={item.name} className={styles.orderImage} />
                                <div className={styles.orderInfo}>
                                    <h4>{item.name}</h4>
                                    <p> Price: ₹{item.price}</p>
                                    <p> Quantity: {item.quantity || 1}</p>
                                    <p> Size: {item.selectedSize || "M"}</p>
                                </div>
                            </div>
                        ))}
                        <div className={styles.totalAmount}>
                            <h3>Total Amount: ₹{getTotalPrice()}</h3>
                        </div>
                    </>
                ) : (
                    <p>❌ No items found in order.</p>
                )}
            </div>

            {!isOrderPlaced ? (
                <button className={styles.placeOrderButton} onClick={placeOrder}>
                     Place Order
                </button>
            ) : (
                <button className={styles.goHomeButton} onClick={() => navigate('/')}>
                    🏠 Go to Homepage
                </button>
            )}
        </div>
    );
};

export default OrderConfirmation;
