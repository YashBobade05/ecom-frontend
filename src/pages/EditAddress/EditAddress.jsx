import { useEffect, useState } from "react";

const EditAddress = ({ userEmail }) => {
    const [addressData, setAddressData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    // Fetch address details
    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const response = await fetch(`http://localhost:3000/addresses/${userEmail}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch address");
                }
                const data = await response.json();
                if (data.length === 0) {
                    throw new Error("No address found");
                }
                setAddressData(data[0]); // Assuming only one address per user
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userEmail) {
            fetchAddress();
        }
    }, [userEmail]);

    // Update address in the backend
    const handleUpdate = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setError(null);

        try {
            const response = await fetch("http://localhost:3000/addresses/update", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addressData),
            });

            if (!response.ok) {
                throw new Error("Failed to update address");
            }

            setSuccessMessage("Address updated successfully!");
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div>
            <h2>Edit Address</h2>
            {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            <form onSubmit={handleUpdate}>
                <label>Full Name:</label>
                <input
                    type="text"
                    value={addressData.fullName}
                    onChange={(e) => setAddressData({ ...addressData, fullName: e.target.value })}
                    required
                />

                <label>Street:</label>
                <input
                    type="text"
                    value={addressData.street}
                    onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
                    required
                />

                <label>City:</label>
                <input
                    type="text"
                    value={addressData.city}
                    onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                    required
                />

                <label>State:</label>
                <input
                    type="text"
                    value={addressData.state}
                    onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                    required
                />

                <label>Zip Code:</label>
                <input
                    type="text"
                    value={addressData.zipCode}
                    onChange={(e) => setAddressData({ ...addressData, zipCode: e.target.value })}
                    required
                />

                <label>Country:</label>
                <input
                    type="text"
                    value={addressData.country}
                    onChange={(e) => setAddressData({ ...addressData, country: e.target.value })}
                    required
                />

                <label>Phone:</label>
                <input
                    type="text"
                    value={addressData.phone}
                    onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                    required
                />

                <button type="submit">Update Address</button>
            </form>
        </div>
    );
};

export default EditAddress;
