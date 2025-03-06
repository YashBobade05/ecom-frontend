import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';
import { useCart } from '../../CartContext/CartContext';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    if (location.state?.product) {
      setCheckoutItems([location.state.product]);
    } else if (location.state?.cartItems) {
      setCheckoutItems(location.state.cartItems);
    }
  }, [location.state]);

  const getTotalPrice = () => {
    return checkoutItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const handleConfirmOrder = () => {
    alert('Order placed successfully!');
    clearCart();
    setCheckoutItems([]);
    navigate('/');
  };

  const handleRemoveItem = (id) => {
    const updatedItems = checkoutItems.filter((item) => item._id !== id);
    setCheckoutItems(updatedItems);
  };

  const handleClearAll = () => {
    setCheckoutItems([]);
    clearCart();
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  if (checkoutItems.length === 0) return <p>No items to checkout.</p>;

  return (
    <div className={styles.checkoutContainer}>
      <h2>Checkout</h2>
      {checkoutItems.map((item) => (
        <div key={item._id} className={styles.checkoutItem}>
          <img src={item.images?.[0] || item.image} alt={item.name} className={styles.checkoutImage} />
          <div className={styles.checkoutDetails}>
            <h3>{item.name}</h3>
            <p>Size: {item.selectedSize || 'N/A'}</p>
            <p>Price: ₹{item.price}</p>
            <p>Quantity: {item.quantity || 1}</p>
          </div>
          <button className={styles.removeButton} onClick={() => handleRemoveItem(item._id)}>
            Remove
          </button>
        </div>
      ))}
      <div className={styles.checkoutSummary}>
        <h3>Total: ₹{getTotalPrice()}</h3>
        <div className={styles.checkoutActions}>
          <button className={styles.confirmOrderButton} onClick={handleConfirmOrder}>
            Confirm Order
          </button>
          <button className={styles.clearAllButton} onClick={handleClearAll}>
            Clear All
          </button>
          <button className={styles.viewCartButton} onClick={handleViewCart}>
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
