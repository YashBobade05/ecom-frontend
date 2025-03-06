// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import styles from './ProductDetail.module.css';
// import { useCart } from '../../CartContext/CartContext';

// const ProductDet = () => {
//   const { productId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedSize, setSelectedSize] = useState('');
//   const { cart, addToCart } = useCart();
//   const navigate = useNavigate();

//   useEffect(() => {
//     let isMounted = true;

//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`http://localhost:3000/products/${productId}`);
//         const data = await response.json();
//         if (isMounted) {
//           console.log('Fetching product with ID:', productId);
//           console.log('Fetched product data:', data);

//           setProduct(data);
//         }
//       } catch (error) {
//         console.error('Error fetching product:', error);
//       }
//     };

//     if (productId) fetchProduct();

//     return () => {
//       isMounted = false;
//     };
//   }, [productId]);

//   const isInCart = cart.some((item) => item._id === productId && item.selectedSize === selectedSize);

//   const handleAddToCart = () => {
//     if (product && !isInCart && selectedSize) {
//       addToCart({ ...product, selectedSize });
//     }
//   };

//   const handleBuyNow = () => {
//     if (product && !isInCart && selectedSize) {
//       addToCart({ ...product, selectedSize });
//     }
//     navigate('/checkout');
//   };

//   const handleSizeSelect = (size) => {
//     setSelectedSize(size);
//   };

//   if (!product) return <p>Loading product details...</p>;

//   return (
//     <div className={styles.productDetailContainer}>
//       <div className={styles.imageGallery}>
//         {Array.isArray(product.images) && product.images.length > 0 ? (
//           product.images.map((img, index) => (
//             img ? <img key={index} src={img} alt={product.name} className={styles.productImage} loading="lazy" /> : null
//           ))
//         ) : (
//           <p>No images available</p>
//         )}
//       </div>
//       <div className={styles.productInfo}>
//         <h1 className={styles.productTitle}>{product.name}</h1>
//         <p className={styles.productSubtitle}>{product.category}</p>
//         <div className={styles.ratingSection}>
//           <span>⭐ {product.rating}</span>
//           <span>({product.totalRatings} ratings)</span>
//         </div>
//         <div className={styles.priceSection}>
//           <span className={styles.price}>₹{product.price}</span>
//           {product.originalPrice && <span className={styles.originalPrice}>₹{product.originalPrice}</span>}
//           {product.discount && <span className={styles.discount}>({product.discount} OFF)</span>}
//         </div>
//         <p className={styles.productDescription}>{product.description}</p>
//         <p>Stock: {product.stock}</p>
//         <div className={styles.sizeSelector}>
//           <p>Select Size:</p>
//           {product.sizes?.length > 0 ? (
//             product.sizes.map((size) => (
//               <button
//                 key={size}
//                 className={`${styles.sizeOption} ${selectedSize === size ? styles.selectedSize : ''}`}
//                 onClick={() => handleSizeSelect(size)}
//               >
//                 {size}
//               </button>
//             ))
//           ) : (
//             <p>No sizes available</p>
//           )}
//         </div>
//         <div className={styles.actionButtons}>
//           {isInCart ? (
//             <button className={styles.goToCartButton} onClick={() => navigate('/cart')}>Go to Cart</button>
//           ) : (
//             <button className={styles.addToCartButton} onClick={handleAddToCart} disabled={!selectedSize}>Add to Cart</button>
//           )}
//           <button className={styles.buyNowButton} onClick={handleBuyNow} disabled={!selectedSize}>Buy Now</button>
//         </div>
//         <div className={styles.productDetails}>
//           <h3>Product Details</h3>
//           <p>{product.details || 'No additional product details available.'}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDet;
