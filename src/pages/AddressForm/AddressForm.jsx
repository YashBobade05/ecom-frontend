

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import styles from './AddressForm.module.css';
// import Navbar from '../../components/Navbar/Navbar';

// const AddressForm = ({ onAddressSave }) => {
//     const [userEmail, setUserEmail] = useState(''); // Store userEmail state
//     const [userName, setUserName] = useState(''); // Store userName state
//     const [checkoutItems, setCheckoutItems] = useState([]); // Store checkout items
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
//     const location = useLocation();

//     // Retrieve user data from localStorage on mount
//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (user) {
//             setUserEmail(user.email);
//             setUserName(user.name);
//         }
//         if (location.state?.checkoutItems) {
//             setCheckoutItems(location.state.checkoutItems);
//         }
//     }, [location.state]);

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

//             navigate("/order-confirmation", { state: { address, checkoutItems } });

//         } catch (error) {
//             setMessage(error.message);
//             console.error("Fetch Error:", error);
//         }
//     };

//     return (
//         <div className={styles.addressContainer}>
//             <Navbar/>
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
import Navbar from '../../components/Navbar/Navbar';
 
const AddressForm = ({ onAddressSave }) => {
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [addresses, setAddresses] = useState([]); // Store multiple addresses
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(0); // Track selected address
    const [newAddress, setNewAddress] = useState(false); // Track new address mode
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
 
    // Default empty address format
    const emptyAddress = {
        fullName: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: ''
    };
    const [address, setAddress] = useState(emptyAddress);
 
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUserEmail(user.email);
            setUserName(user.name);
            fetchAddresses(user.email);
        }
        if (location.state?.checkoutItems) {
            setCheckoutItems(location.state.checkoutItems);
        }
    }, [location.state]);
 
    // Fetch saved addresses for the logged-in user
    const fetchAddresses = async (email) => {
        try {
            const response = await fetch(`http://localhost:3000/addresses/${email}`);
            const data = await response.json();
 
            if (response.ok && data.length > 0) {
                setAddresses(data);
                setAddress(data[0]); // Pre-fill first saved address
            }
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };
 
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
 
    const handleAddressSelect = (index) => {
        setSelectedAddressIndex(index);
        setAddress(addresses[index]);
        setNewAddress(false);
    };
 
    return (
        <div className={styles.addressContainer}>
            <Navbar/>
            <h2>Enter Your Address</h2>
            {userEmail ? (
                <p>Logged in as: <strong>{userName} ({userEmail})</strong></p>
            ) : (
                <p style={{ color: "red" }}>User not logged in</p>
            )}
 
            {/* Dropdown to select saved addresses */}
            {addresses.length > 0 && (
                <div>
                    <label>Select a saved address:</label>
                    <select value={selectedAddressIndex} onChange={(e) => handleAddressSelect(e.target.value)}>
                        {addresses.map((addr, index) => (
                            <option key={index} value={index}>
                                {addr.street}, {addr.city}, {addr.state}, {addr.zipCode}
                            </option>
                        ))}
                    </select>
                </div>
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
 
            {/* Option to add a new address */}
            <button className={styles.addNewAdd} onClick={() => {
                setNewAddress(true);
                setAddress(emptyAddress);
            }}>
                Add New Address
            </button>
 
            {message && <p>{message}</p>}
        </div>
    );
};
 
export default AddressForm;