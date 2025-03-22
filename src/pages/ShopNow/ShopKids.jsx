import React from 'react';
import CategoryProducts from '../../components/ProductListing/CategoryProducts';
import Navbar from '../../components/Navbar/Navbar';
 
 
const ShopKids = () => {
    return (
        <>
        
              <Navbar /> {/* Add Navbar here */}
              <div style={{ marginTop: "90px" }}> 
              <CategoryProducts category="kids"  />
              </div>
            
        
    
        </>
        );
};
 
export default ShopKids;