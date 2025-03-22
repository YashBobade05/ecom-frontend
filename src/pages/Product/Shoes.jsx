import React from 'react';
import CategoryProducts from '../../components/ProductListing/CategoryProducts';
import Navbar from '../../components/Navbar/Navbar';

 
 
const Shoes = () => {
    return (
        <>
          <Navbar /> {/* Add Navbar here */}
          <div style={{ marginTop: "90px" }}> 
            <CategoryProducts category="shoes" />
          </div>
        </>
      );
};
 
export default Shoes;