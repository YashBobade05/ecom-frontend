import React from 'react';
import styles from './Cart.module.css';
import { useCart } from '../../CartContext/CartContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const Cart = () => {
  const { cart, removeFromCart, clearCart, updateQuantity, getTotalPrice } = useCart();
  const navigate = useNavigate();
  
  const handlePlaceOrder = () => {
    navigate('/checkout', { state: { cartItems: cart } });
  };

  return (
    <div className={styles.cartContainer}>
      <Navbar/>
      <div className={styles.container}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item._id} className={styles.cartItem}>
              <img src={item.images[0]} alt={item.name} className={styles.cartImage} />
              <div className={styles.cartDetails}>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <div className={styles.quantityControls}>
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
                <button className={styles.removeButton} onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className={styles.cartSummary}>
            <h3>Total: ₹{getTotalPrice()}</h3>
            <button className={styles.clearCartButton} onClick={clearCart}>
              Clear Cart
            </button>
            <button className={styles.placeOrderButton} onClick={handlePlaceOrder}>
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default Cart;