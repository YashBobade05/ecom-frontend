import React from 'react';
import styles from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ProductCard from '../../components/ProductListing/ProductListing';
import HeroBanner from '../../components/HeroBanner/HeroBanner';
import BrandLogos from '../../components/BrandLogos/BrandLogos';
import CategoryCards from '../../components/CategoryCards/CategoryCards';
import Footer from '../../components/Footer/Footer';
import ProductListing from '../../components/ProductListing/ProductListing';

const Home = () => {

  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <HeroBanner/> 
      <ProductListing/>
      <BrandLogos/>
      <CategoryCards/>
      <Footer/>
    </div>
  );
};

export default Home;


// import React from 'react';
// import styles from './Home.module.css';
// import Navbar from '../../components/Navbar/Navbar';
// import ProductCard from '../../components/ProductCard/ProductCard';
// import HeroBanner from '../../components/HeroBanner/HeroBanner';
// import BrandLogos from '../../components/BrandLogos/BrandLogos';
// import CategoryCards from '../../components/CategoryCards/CategoryCards';
// import Footer from '../../components/Footer/Footer';

// const Home = () => {
//   const featuredProducts = [
//     { id: 1, name: 'Denim Shirt', price: '₹999', rating: 5 },
//     { id: 2, name: 'T-shirt for Women', price: '₹999', rating: 5 },
//     { id: 3, name: 'Blue Shirt', price: '₹999', rating: 5 },
//     { id: 4, name: 'Light Blue Shirt', price: '₹999', rating: 5 }
//   ];

//   return (
//     <div className={styles.homeContainer}>
//       <Navbar />
//       <HeroBanner/> 
//       <BrandLogos/>
//       <CategoryCards/>
//       <section className={styles.featuredProducts}>
//         <h3>Featured Products</h3>
//         <div className={styles.productsGrid}>
//           {featuredProducts.map(product => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       </section>
//       <Footer/>
//     </div>
//   );
// };

// export default Home;