// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import styles from './ProductListing.module.css';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { useCart } from '../../CartContext/CartContext';

// const ProductListing = () => {
//   const [products, setProducts] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const navigate = useNavigate();
//   const { cart, addToCart, wishlist, addToWishlist } = useCart();

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/products');
//         const data = await response.json();
//         const filteredData = data.map(({ _id, name, price, image, rating }) => ({
//           _id,
//           name,
//           price,
//           image,
//           rating,
//         }));
//         setProducts(filteredData);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const handleProductClick = (productId) => {
//     navigate(`/product/${productId}`);
//   };

//   const handleAddToCart = (product, e) => {
//     e.stopPropagation();
//     addToCart(product);
//   };

//   const handleAddToWishlist = (product, e) => {
//     e.stopPropagation();
//     addToWishlist(product);
//   };

//   const nextSlide = () => {
//     if (currentIndex < products.length - 4) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const prevSlide = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   const isInCart = (productId) => cart.some((item) => item._id === productId);

//   const isInWishlist = (productId) => wishlist.some((item) => item._id === productId);

//   return (
//     <div className={styles.productContainer}>
//       <h2>Featured Products</h2>
//       <div className={styles.carouselWrapper}>
//         <button className={styles.navButton} onClick={prevSlide} disabled={currentIndex === 0}>
//           <FaChevronLeft />
//         </button>
//         <div className={styles.productGrid}>
//           {products.slice(currentIndex, currentIndex + 4).map((product) => (
//             <div
//               key={product._id}
//               className={styles.productCard}
//               onClick={() => handleProductClick(product._id)}
//             >
//               <img src={product.image} alt={product.name} className={styles.productImage} />
//               <h3>{product.name}</h3>
//               <p className={styles.rating}>{'⭐'.repeat(product.rating)}</p>
//               <p>₹{product.price}</p>
//               <div className={styles.actionButtons}>
//                 <button
//                   className={isInWishlist(product._id) ? styles.wishlistButtonActive : styles.wishlistButton}
//                   onClick={(e) => handleAddToWishlist(product, e)}
//                 >
//                   {isInWishlist(product._id) ? '❤️' : '♡'}
//                 </button>
//                 {isInCart(product._id) ? (
//                   <button
//                     className={styles.goToCartButton}
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       navigate('/cart');
//                     }}
//                   >
//                     Go to Cart
//                   </button>
//                 ) : (
//                   <button
//                     className={styles.addToCartButton}
//                     onClick={(e) => handleAddToCart(product, e)}
//                   >
//                     Add to Cart
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//         <button
//           className={styles.navButton}
//           onClick={nextSlide}
//           disabled={currentIndex >= products.length - 4}
//         >
//           <FaChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductListing;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductListing.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useCart } from "../../CartContext/CartContext";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { cart, addToCart, wishlist, addToWishlist } = useCart();

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        const filteredData = data.map(({ _id, name, price, images, rating }) => ({
          _id,
          name,
          price,
          images: images.length > 0 ? images : ["/placeholder.jpg"],
          rating,
        }));

        if (isMounted) setProducts(filteredData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    const productWithSize = { ...product, selectedSize: "M" }; // Set default size to "M"
    addToCart(productWithSize);
  };

  const handleAddToWishlist = (product, e) => {
    e.stopPropagation();
    addToWishlist(product);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, products.length - 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const isInCart = (productId) => cart.some((item) => item._id === productId);
  const isInWishlist = (productId) => wishlist.some((item) => item._id === productId);

  return (
    <div className={styles.productContainer}>
      <h2>Featured Products</h2>
      <div className={styles.carouselWrapper}>
        <button className={styles.navButton} onClick={prevSlide} disabled={currentIndex === 0}>
          <FaChevronLeft />
        </button>
        <div className={styles.productGrid}>
          {products.slice(currentIndex, currentIndex + 4).map((product) => (
            <div
              key={product._id}
              className={styles.productCard}
              onClick={() => handleProductClick(product._id)}
            >
              <img src={product.images[0]} alt={product.name} className={styles.productImage} />
              <h3>{product.name}</h3>
              <p className={styles.rating}>{"⭐".repeat(product.rating)}</p>
              <p>₹{product.price}</p>
              <div className={styles.actionButtons}>
                <button
                  className={isInWishlist(product._id) ? styles.wishlistButtonActive : styles.wishlistButton}
                  onClick={(e) => handleAddToWishlist(product, e)}
                >
                  {isInWishlist(product._id) ? "❤" : "♡"}
                </button>
                {isInCart(product._id) ? (
                  <button
                    className={styles.goToCartButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate("/cart");
                    }}
                  >
                    Go to Cart
                  </button>
                ) : (
                  <button className={styles.addToCartButton} onClick={(e) => handleAddToCart(product, e)}>
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <button className={styles.navButton} onClick={nextSlide} disabled={currentIndex >= products.length - 4}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ProductListing;
