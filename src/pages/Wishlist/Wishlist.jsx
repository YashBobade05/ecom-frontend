// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../../CartContext/CartContext';
// import styles from './Wishlist.module.css';
// import Navbar from '../../components/Navbar/Navbar';

// const Wishlist = () => {
//   const { wishlist, addToCart, removeFromWishlist } = useCart();
//   const navigate = useNavigate();

//   const handleAddToCart = (product) => {
//     addToCart(product);
//     removeFromWishlist(product._id);
//   };

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   return (
//     <div className={styles.wishlistContainer}>
      

      
//       <h2>Your Wishlist</h2>
//       {wishlist.length === 0 ? (
//         <p>Your wishlist is empty!</p>
//       ) : (
//         <div className={styles.productGrid}>
//           {wishlist.map((product) => (
//             <div
//               key={product._id}
//               className={styles.productCard}
//               onClick={() => handleProductClick(product._id)}
//             >
//               <img src={product.images[0]} alt={product.name} className={styles.productImage} />
//               <h3>{product.name}</h3>
//               <p className={styles.rating}>{'⭐'.repeat(product.rating)}</p>
//               <p>₹{product.price}</p>
//               <div className={styles.actionButtons}>
//                 <button
//                   className={styles.removeButton}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     removeFromWishlist(product._id);
//                   }}
//                 >
//                   Remove
//                 </button>
//                 <button
//                   className={styles.addToCartButton}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleAddToCart(product);
//                   }}
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
      
//     </div>
//   );
// };

// export default Wishlist;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../CartContext/CartContext';
import styles from './Wishlist.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const Wishlist = () => {
  const { wishlist, addToCart, removeFromWishlist } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product._id);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className={styles.wishlistContainer}>
      <Navbar />  {/* ✅ Added Fixed Navbar */}

      <div className={styles.mainContent}>
        <Sidebar />  {/* ✅ Added Sidebar for consistent layout */}

        {/* Content Wrapper for Proper Spacing */}
        <div className={styles.content}>
          <h2>Your Wishlist</h2>

          {wishlist.length === 0 ? (
            <p>Your wishlist is empty!</p>
          ) : (
            <div className={styles.productGrid}>
              {wishlist.map((product) => (
                <div
                  key={product._id}
                  className={styles.productCard}
                  onClick={() => handleProductClick(product._id)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className={styles.productImage}
                  />
                  <h3>{product.name}</h3>
                  <p className={styles.rating}>{'⭐'.repeat(product.rating)}</p>
                  <p>₹{product.price}</p>

                  <div className={styles.actionButtons}>
                    <button
                      className={styles.removeButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWishlist(product._id);
                      }}
                    >
                      Remove
                    </button>
                    <button
                      className={styles.addToCartButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
