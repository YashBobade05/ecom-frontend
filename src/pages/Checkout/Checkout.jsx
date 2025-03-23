// import React, { useEffect, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import styles from './Checkout.module.css';
// import { useCart } from '../../CartContext/CartContext';
// import { RxCross2 } from "react-icons/rx";

// const Checkout = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { clearCart } = useCart();
//   const [checkoutItems, setCheckoutItems] = useState([]);

//   useEffect(() => {
//     if (location.state?.product) {
//       setCheckoutItems([location.state.product]);
//     } else if (location.state?.cartItems) {
//       setCheckoutItems(location.state.cartItems);
//     }
//   }, [location.state]);

//   const getTotalPrice = () => {
//     return checkoutItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
//   };

//   const handleConfirmOrder = () => {
//     // alert('Order placed successfully!');
//     // clearCart();
//     // setCheckoutItems([]);
//     // navigate('/');
//     navigate('/final-checkout', { state: { checkoutItems } });
//   };

//   const handleRemoveItem = (id) => {
//     const updatedItems = checkoutItems.filter((item) => item._id !== id);
//     setCheckoutItems(updatedItems);
//   };

//   const handleClearAll = () => {
//     setCheckoutItems([]);
//     clearCart();
//   };

//   const handleViewCart = () => {
//     navigate('/cart');
//   };

//   if (checkoutItems.length === 0) return <p>No items to checkout.</p>;

//   return (
//     <div className={styles.checkoutContainer}>
//        <div className={styles.shoppingCart} style={{ position: 'sticky', top: 0, background: '#fff', zIndex: 1000 }}>
//         <h2>Shopping Cart</h2>
//         <button className={styles.clearAllButton} onClick={handleClearAll}>
//           <RxCross2 />
//         </button>
//       </div>
//       <div className={styles.productList}>
//         <div className={styles.scrollableProducts}>
//           {checkoutItems.map((item) => (
//             <div key={item._id} className={styles.checkoutItem}>
//               <img src={item.images?.[0] || item.image} alt={item.name} className={styles.checkoutImage} />
//               <div className={styles.checkoutDetails}>
//                 <h3>{item.name}</h3>
//                 <p>Size: {item.selectedSize || 'N/A'}</p>
//                 <p>₹{item.price}</p>
//                 <p>Quantity: {item.quantity || 1}</p>
//               </div>
//               <button className={styles.removeButton} onClick={() => handleRemoveItem(item._id)}>
//                 <RxCross2 />
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className={styles.fixedCheckoutActions}>
//         <div className={styles.checkoutSummary}>
//           <span>Subtotal:</span>
//           <span>₹{getTotalPrice()}</span>
//         </div>
//         <button className={styles.viewCartButton} onClick={handleViewCart}>
//           View Cart
//         </button>
//         <button className={styles.confirmOrderButton} onClick={handleConfirmOrder}>
//           Checkout
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Checkout;




import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Checkout.module.css';
import { useCart } from '../../CartContext/CartContext';
import { RxCross2 } from "react-icons/rx";
import Navbar from '../../components/Navbar/Navbar';

 
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
 
  // Navigate to AddressForm page
  const handleCheckout = () => {
    navigate('/address-form', { state: { checkoutItems } });
  };
 
  if (checkoutItems.length === 0) return <p>No items to checkout.</p>;
 
  return (
    <div className={styles.checkoutContainer}>
    <Navbar/>
      <div className={styles.shoppingCart} style={{ position: 'sticky', top: 80, background: '#fff', zIndex: 1000 }}>
        <h2>Shopping Cart</h2>
        <button className={styles.clearAllButton} onClick={handleClearAll}>
          <RxCross2 />
        </button>
      </div>
 
      <div className={styles.productList}>
        <div className={styles.scrollableProducts}>
          {checkoutItems.map((item) => (
            <div key={item._id} className={styles.checkoutItem}>
              <img src={item.images?.[0] || item.image} alt={item.name} className={styles.checkoutImage} />
              <div className={styles.checkoutDetails}>
                <h3>{item.name}</h3>
                <p>Size: {item.selectedSize || 'N/A'}</p>
                <p>₹{item.price}</p>
                <p>Quantity: {item.quantity || 1}</p>
              </div>
              <button className={styles.removeButton} onClick={() => handleRemoveItem(item._id)}>
                <RxCross2 />
              </button>
            </div>
          ))}
        </div>
      </div>
 
      {/* Checkout Actions */}
      <div className={styles.fixedCheckoutActions}>
        <div className={styles.checkoutSummary}>
          <span>Subtotal:</span>
          <span>₹{getTotalPrice()}</span>
        </div>
        <button className={styles.viewCartButton} onClick={handleViewCart}>
          View Cart
        </button>
        <button className={styles.confirmOrderButton} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};
 
export default Checkout;