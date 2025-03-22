import React from 'react';
import CategoryProducts from '../../components/ProductListing/CategoryProducts';
import Navbar from '../../components/Navbar/Navbar';


 
 
const ShopMen = () => {
 
    return (
    <>
    
          <Navbar /> {/* Add Navbar here */}
          <div style={{ marginTop: "90px" }}> 
          <CategoryProducts category={["Mens", "shirt"]}  />
          </div>
        
    

    </>
    );
};
 
export default ShopMen;