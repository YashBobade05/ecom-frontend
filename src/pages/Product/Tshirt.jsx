import React from 'react';
import CategoryProducts from '../../components/ProductListing/CategoryProducts';
import Navbar from '../../components/Navbar/Navbar';
 
 
const Tshirt = () => {
    return (
        <>
          <Navbar /> {/* Add Navbar here */}
          <div style={{ marginTop: "90px" }}> 
            <CategoryProducts category="tshirt" />
          </div>
        </>
      );
};
 
export default Tshirt;