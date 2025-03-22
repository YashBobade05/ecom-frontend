import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import ShopMen from '../pages/ShopNow/ShopMen';
import ShopWomen from '../pages/ShopNow/ShopWomen';
import ShopKids from '../pages/ShopNow/ShopKids';
import AboutUs from '../pages/AboutUs/AboutUs';
import Contact from '../pages/Contact/Contact';
import Shirt from '../pages/Product/Shirt';
import Pant from '../pages/Product/Pant';
import Tshirt from '../pages/Product/Tshirt';
import Shoes from '../pages/Product/Shoes';
import Account from '../pages/Account/Account';
import Cart from '../pages/Cart/Cart';
import Register from '../pages/SignUp/Register';
import Login from '../pages/SignUp/Login';
import Wishlist from '../pages/Wishlist/Wishlist';
// import ProductDet from '../components/ProductListing/ProductDet';
import ProductDetail from '../components/ProductListing/ProductDetail';
import Checkout from '../pages/Checkout/Checkout';
import AddressForm from '../pages/AddressForm/AddressForm';
import OrderConfirmation from '../pages/OrderConfirmation/OrderConfirmation';
import SavedAddress from '../pages/SavedAddress/SavedAddress';
import AllOrder from '../pages/AllOrder/AllOrder';
import Profile from '../pages/Profile/Profile';
// import PlaceOrder from '../components/PlaceOrder/PlaceOrder';




const AllRoutes = () => {
  return (

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs/>} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/men" element={<ShopMen/>} />
        <Route path="/women" element={<ShopWomen/>} />
        <Route path="/kids" element={<ShopKids/>} />
        <Route path="/shirt" element={<Shirt/>} />
        <Route path="/pant" element={<Pant/>} />
        <Route path="/tshirt" element={<Tshirt/>} />
        <Route path="/shoes" element={<Shoes/>} />
        <Route path="/product/:productId" element={<ProductDetail/>} />
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/address-form" element={<AddressForm/>} />
        <Route path="/order-confirmation" element={<OrderConfirmation/>} />
        <Route path="/saved-address" element={<SavedAddress/>} />
        <Route path="/orders" element={<AllOrder/>} />
        <Route path="/profile" element={<Profile/>}/>
        {/* <Route path="/place-Order" element={<PlaceOrder/>}/> */}
        


      </Routes>
  );
};

export default AllRoutes;
