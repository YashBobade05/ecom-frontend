// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './AddressForm.module.css';

// const AddressForm = ({ onAddressSave }) => {
//     const [userEmail, setUserEmail] = useState(''); // Store userEmail state
//     const [userName, setUserName] = useState(''); // Store userName state
//     const [address, setAddress] = useState({
//         fullName: '',
//         street: '',
//         city: '',
//         state: '',
//         zipCode: '',
//         country: '',
//         phone: ''
//     });

//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     // Retrieve user data from localStorage on mount
//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user) {
//             setUserEmail(user.email);
//             setUserName(user.name);
//         }
//     }, []);

//     const handleChange = (e) => {
//         setAddress({ ...address, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!userEmail) {
//             setMessage("User not logged in!");
//             return;
//         }

//         const addressData = { ...address, email: userEmail };

//         console.log("Sending Address Data:", addressData); // Debug log

//         try {
//             const response = await fetch("http://localhost:3000/addresses", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(addressData)
//             });

//             const data = await response.json();

//             if (!response.ok) {
//                 throw new Error(data.message || "Error saving address.");
//             }

//             setMessage(data.message || "Address saved successfully!");

//             if (onAddressSave) {
//                 onAddressSave(address);
//             }
//             console.log("Navigating with:", { address, checkoutItems });
//             navigate("/order-confirmation", { state: { address, checkoutItems } });


//         } catch (error) {
//             setMessage(error.message);
//             console.error("Fetch Error:", error);
//         }
//     };

//     return (
//         <div className={styles.addressContainer}>
//             <h2>Enter Your Address</h2>
//             {userEmail ? (
//                 <p>Logged in as: <strong>{userName} ({userEmail})</strong></p>
//             ) : (
//                 <p style={{ color: "red" }}>User not logged in</p>
//             )}
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} required />
//                 <input type="tel" name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} required />
//                 <input type="text" name="street" placeholder="Street Address" value={address.street} onChange={handleChange} required />
//                 <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} required />
//                 <input type="text" name="state" placeholder="State" value={address.state} onChange={handleChange} required />
//                 <input type="text" name="zipCode" placeholder="ZIP Code" value={address.zipCode} onChange={handleChange} required />
//                 <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleChange} required />

//                 {/* Show email, but make it read-only */}
//                 <input type="email" value={userEmail} disabled readOnly />

//                 <button type="submit">Save & Continue</button>
//             </form>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export default AddressForm;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './AddressForm.module.css';

const AddressForm = ({ onAddressSave }) => {
    const [userEmail, setUserEmail] = useState(''); // Store userEmail state
    const [userName, setUserName] = useState(''); // Store userName state
    const [checkoutItems, setCheckoutItems] = useState([]); // Store checkout items
    const [address, setAddress] = useState({
        fullName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    });

    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Retrieve user data from localStorage on mount
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserEmail(user.email);
            setUserName(user.name);
        }
        if (location.state?.checkoutItems) {
            setCheckoutItems(location.state.checkoutItems);
        }
    }, [location.state]);

    const handleChange = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userEmail) {
            setMessage("User not logged in!");
            return;
        }

        const addressData = { ...address, email: userEmail };

        console.log("Sending Address Data:", addressData); // Debug log
        
        try {
            const response = await fetch("http://localhost:3000/addresses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addressData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error saving address.");
            }

            setMessage(data.message || "Address saved successfully!");

            if (onAddressSave) {
                onAddressSave(address);
            }

            navigate("/order-confirmation", { state: { address, checkoutItems } });

        } catch (error) {
            setMessage(error.message);
            console.error("Fetch Error:", error);
        }
    };

    return (
        <div className={styles.addressContainer}>
            <h2>Enter Your Address</h2>
            {userEmail ? (
                <p>Logged in as: <strong>{userName} ({userEmail})</strong></p>
            ) : (
                <p style={{ color: "red" }}>User not logged in</p>
            )}
            <form onSubmit={handleSubmit}>
                <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone Number" value={address.phone} onChange={handleChange} required />
                <input type="text" name="street" placeholder="Street Address" value={address.street} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={address.city} onChange={handleChange} required />
                <input type="text" name="state" placeholder="State" value={address.state} onChange={handleChange} required />
                <input type="text" name="zipCode" placeholder="ZIP Code" value={address.zipCode} onChange={handleChange} required />
                <input type="text" name="country" placeholder="Country" value={address.country} onChange={handleChange} required />

                {/* Show email, but make it read-only */}
                <input type="email" value={userEmail} disabled readOnly />

                <button type="submit">Save & Continue</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddressForm;

