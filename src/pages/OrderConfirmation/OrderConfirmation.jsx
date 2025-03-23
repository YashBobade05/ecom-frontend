

import React, { useEffect, useState } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import styles from "./OrderConfirmation.module.css";
 
const OrderConfirmation = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const [checkoutItems, setCheckoutItems] = useState([]);

    const { address } = location.state || {};

    const [isOrderPlaced, setIsOrderPlaced] = useState(false);
 
    useEffect(() => {

        const storedItems = sessionStorage.getItem("checkoutItems");

        if (!location.state?.checkoutItems && storedItems) {

            setCheckoutItems(JSON.parse(storedItems));

        } else {

            setCheckoutItems(location.state?.checkoutItems || []);

        }

    }, [location.state]);
 
    const getTotalPrice = () => {

        return checkoutItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

    };
 
    // 🔹 Function to Handle Payment & Order Placement

    const placeOrder = async () => {

        const email = localStorage.getItem("email");

        if (!email || !address || checkoutItems.length === 0) {

            alert("⚠️ Missing user email, address, or cart items.");

            return;

        }
 
        const orderData = {

            email,

            totalAmount: getTotalPrice(),

            deliveryAddress: `${address.fullName}, ${address.phone}, ${address.street}, ${address.city}, ${address.state} `,

            items: checkoutItems.map((item) => ({

                productId: item._id,

                name: item.name,

                price: item.price,

                quantity: item.quantity || 1,

                size: item.selectedSize || "M",

            })),

        };
 
        try {

            // 🔹 Step 1: Create an order on the backend

            const response = await fetch("http://localhost:3000/payments/create-order", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json",

                },

                body: JSON.stringify({ amount: orderData.totalAmount }), // No need to convert to paisa here

            });
 
            const data = await response.json();

            if (!response.ok) {

                alert(`❌ Error: ${data.error}`);

                return;

            }
 
            // 🔹 Step 2: Open Razorpay Payment Modal

            const options = {

                key: "rzp_test_OmFHyuluktmNa9", // Replace with actual key

                amount: data.amount,

                currency: "INR",

                name: "Smart Shopping",

                description: "Order Payment",

                order_id: data.orderId,

                handler: async function (paymentResponse) {

                    // 🔹 Step 3: Save Payment & Order in Backend

                    const verifyResponse = await fetch("http://localhost:3000/payments/store-order", {

                        method: "POST",

                        headers: {

                            "Content-Type": "application/json",

                        },

                        body: JSON.stringify({

                            razorpay_order_id: paymentResponse.razorpay_order_id,

                            razorpay_payment_id: paymentResponse.razorpay_payment_id,

                            orderData,

                        }),

                    });
 
                    const verifyData = await verifyResponse.json();

                    if (verifyResponse.ok) {

                        alert("🎉 Payment Successful! Order Placed.");

                        setIsOrderPlaced(true);

                        sessionStorage.removeItem("checkoutItems");

                    } else {

                        alert(`❌ Order Storage Failed: ${verifyData.error}`);

                    }

                },

                prefill: {

                    name: address.fullName,

                    email: email,

                    contact: address.phone,

                },

                theme: {

                    color: "#3399cc",

                },

            };
 
            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.error("🚨 Error during payment:", error);

            alert("❌ Payment failed. Please try again.");

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

                    💳 Pay & Place Order
</button>

            ) : (
<button className={styles.goHomeButton} onClick={() => navigate("/")}>

                    🏠 Go to Homepage
</button>

            )}
</div>

    );

};
 
export default OrderConfirmation;

 