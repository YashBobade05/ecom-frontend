import React, { useEffect, useState } from 'react';
import styles from './CategoryProducts.module.css';
import { Link } from 'react-router-dom';
 
const CategoryProducts = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
 
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let url = 'http://localhost:3000/products';
                // if (category) {
                //     url += `?category=${category}`; // Filter by category
                // }
                if (category && category.length > 0) {
                    const categoryQuery = Array.isArray(category)
                        ? category.map(cat => `category=${encodeURIComponent(cat)}`).join('&')
                        : `category=${encodeURIComponent(category)}`;
                    url += `?${categoryQuery}`;
                }
 
                const response = await fetch(url);
                const data = await response.json();
 
                if (response.ok) {
                    setProducts(data);
                } else {
                    setError('Failed to fetch products');
                }
            } catch (error) {
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };
 
        fetchProducts();
    }, [category]);
 
    return (
        <div className={styles.categoryContainer}>
            {/* <h2>{category.toUpperCase()}</h2> */}
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className={styles.error}>{error}</p>
            ) : (
                <div className={styles.productGrid}>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <div key={product._id} className={styles.productCard}>
                                <img src={product.images[0]} alt={product.name} className={styles.productImage} />
                                <h3>{product.name}</h3>
                                <p>₹{product.price}</p>
                                <Link to={`/product/${product._id}`}>
                                    <button>View Details</button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>No products found in this category</p>
                    )}
                </div>
            )}
        </div>
    );
};
 
export default CategoryProducts;
 