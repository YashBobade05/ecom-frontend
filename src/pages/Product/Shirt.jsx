import React from "react";
import Navbar from "../../components/Navbar/Navbar"; // Import Navbar component
import CategoryProducts from "../../components/ProductListing/CategoryProducts";

const Shirt = () => {
  return (
    <>
      <Navbar /> {/* Add Navbar here */}
      <div style={{ marginTop: "90px" }}> 
        <CategoryProducts category="shirt" />
      </div>
    </>
  );
};

export default Shirt;
