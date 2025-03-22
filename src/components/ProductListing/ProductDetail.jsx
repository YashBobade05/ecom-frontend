import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './ProductDetail.module.css';
import { useCart } from '../../CartContext/CartContext';
import Navbar from '../Navbar/Navbar';


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('M');
  const { cart, addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products/${productId}`);
        const data = await response.json();
        if (isMounted) {
          console.log('Fetching product with ID:', productId);
          console.log('Fetched product data:', data);
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    if (productId) fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [productId]);

  const isInCart = cart.some((item) => item._id === productId);

  const handleAddToCart = () => {
    if (product && !isInCart) {
      const productWithSize = { ...product, selectedSize };
      addToCart(productWithSize);
    }
  };

  const handleBuyNow = () => {
    if (product) {
      const productWithSize = { ...product, selectedSize, quantity: 1 };
      navigate('/checkout', { state: { product: productWithSize } });
    }
  };

  if (!product) return <p>Loading product details...</p>;

  return (
    
    <div className={styles.productDetailContainer}>
      <Navbar/> 
      <div className={styles.productImages}>
        {Array.isArray(product.images) && product.images.length > 0 ? (
          product.images.map((img, index) => (
            img ? <img key={index} src={img} alt={product.name} className={styles.productImage} loading="lazy" /> : null
          ))
        ) : product.image ? (
          <img src={product.image} alt={product.name} className={styles.productImage} loading="lazy" />
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div className={styles.productInfo}>
        <h1>{product.name}</h1>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.rating}> {product.rating} ⭐{product.totalRatings && `(${product.totalRatings} ratings)`}</p>
        <p className={styles.productPrice}>₹{product.price} {product.originalPrice && <span className={styles.originalPrice}>₹{product.originalPrice}</span>} {product.discount && <span className={styles.discount}>({product.discount} OFF)</span>}</p>
        
        <div className={styles.sizeSelector}>
          <p>Select Size:</p>
          {product.sizes?.length > 0 ? (
            product.sizes.map((size) => (
              <button
                key={size}
                className={`${styles.sizeButton} ${selectedSize === size ? styles.selectedSize : ''}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))
          ) : (
            <p>No sizes available</p>
          )}
        </div>
        <div className={styles.actionButtons}>
          {isInCart ? (
            <button className={styles.goToCartButton} onClick={() => navigate('/cart')}>Go to Cart</button>
          ) : (
            <button className={styles.addToCartButton} onClick={handleAddToCart}>Add to Cart</button>
          )}
          <button className={styles.buyNowButton} onClick={handleBuyNow}>Buy Now</button>
        </div>
        <div className={styles.productDetails}>
          <h3>Product Details</h3>
          <p>{product.details || 'No additional product details available.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
