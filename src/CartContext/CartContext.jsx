import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = (product) => {
    const itemExists = cart.find((item) => item._id === product._id);
    if (itemExists) {
      setCart(
        cart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item._id === id ? { ...item, quantity: quantity > 0 ? quantity : 1 } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToWishlist = (product) => {
    const itemExists = wishlist.find((item) => item._id === product._id);
    if (!itemExists) {
      setWishlist([...wishlist, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        getTotalPrice,
        wishlist,
        addToWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export const useCart = () => useContext(CartContext);
