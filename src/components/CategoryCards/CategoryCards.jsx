import React from "react";
import styles from "./CategoryCards.module.css";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Shirts",
    products: "230 Products",
    image: "/assets/shirt.png", // Add correct image path
    link: "/shirt", // Future route
  },
  {
    name: "Jeans",
    products: "320 Products",
    image: "/assets/pant.png",
    link: "/pant",
  },
  {
    name: "T-shirts",
    products: "320 Products",
    image: "/assets/tshirt.png",
    link: "/tshirt",
  },
  {
    name: "Shoes",
    products: "320 Products",
    image: "/assets/shoes.png",
    link: "/shoes",
  },
];

const CategoryCards = () => {
  return (
    <div className={styles.categorySection}>
      <h2 className={styles.heading}>Top Categories</h2>
      <p className={styles.subheading}>
        Select Your Favorite Categories And Purchase
      </p>
      <div className={styles.categoryContainer}>
        {categories.map((category) => (
          <Link to={category.link} key={category.name} className={styles.card}>
            <img src={category.image} alt={category.name} className={styles.image} />
            <div className={styles.spacing}><h3>{category.name}</h3>
            <p>{category.products}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;
