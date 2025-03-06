import React, { useState, useEffect } from 'react';
import styles from './HeroBanner.module.css';
import { useNavigate } from 'react-router-dom';

const banners = [
  {
    id: 1,
    title: 'Latest Trending',
    subtitle: 'Fashion Wear',
    description: 'Last call for up to 50% off',
    buttonText: 'SHOP NOW',
    backgroundColor: '#FFDA8A',
    image: './assets/man-portrait 1.png',
    path: '/men'
  },
  {
    id: 2,
    title: 'New Arrivals',
    subtitle: 'Women Fashion',
    description: 'Last call for up to 50% off',
    buttonText: 'SHOP NOW',
    backgroundColor: '#928AFF',
    image: './assets/fitness-curly-girl-holding-sports-bag 1.png',
    path: '/women'
  },
  {
    id: 3,
    title: 'New Trending',
    subtitle: 'Kids Fashion',
    description: 'Last call for up to 50% off',
    buttonText: 'SHOP NOW',
    backgroundColor: '#FF8A8C',
    image: './assets/kid-studio-shoot-wearing-casual-adorable-white-background 1.png',
    path: '/kids'
  }
];

const HeroBanner = () => {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { title, subtitle, description, buttonText, backgroundColor, image, path } = banners[current];
  const handleShopNow = () => {
    navigate(path);
  };

  return (
    <div className={styles.banner} style={{ backgroundColor }}>
      <div className={styles.bannerContent}>
        <h3>{title} </h3>
        <h2><span>{subtitle}</span></h2>
        <p>{description}</p>
        <button className={styles.shopNowButton} onClick={handleShopNow}>{buttonText}</button>
      </div>
      <img className={styles.Herologo} src={image} alt={subtitle} />
    </div>
  );
};

export default HeroBanner;
