// import React, { useState } from 'react';
// import styles from './Navbar.module.css';
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   return (
//     <nav className={styles.navbar}>
//       <img className={styles.logo} src='./assets/navlogo.png' alt='Logo' /> 
//       <ul className={styles.navLinks}>
//         <li><Link to="/wishlist"><img className={styles.fav} src='./assets/heart 5.png' alt='Favourite' /></Link></li>
//         <li><Link to="/AboutUs">About Us</Link></li>
//         <li><Link to="/contact">Contact Us</Link></li>
//         <li><Link to="/cart">Cart</Link></li>
//         <li><Link to="/account">Account</Link></li>
//         <li className={styles.dropdown} onClick={toggleDropdown}>
//           SignUp
//           {isDropdownOpen && (
//             <ul className={styles.dropdownMenu}>
//               <li><Link to="/register">Register</Link></li>
//               <li><Link to="/login">Login</Link></li>
//             </ul>
//           )}
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;



import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUserName(userData.name); // Assuming 'name' is the key in the stored user object
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('user');
    setUserName(''); // Clear userName from state
    window.location.reload(); // Refresh the page after logout
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/">
    <img className={styles.logo} src='/assets/navlogo.png' alt='Logo' />
</Link>
      <ul className={styles.navLinks}>
        <li><Link to="/wishlist"><img className={styles.fav} src='/assets/heart 5.png' alt='Favourite' /></Link></li>
        <li><Link to="/AboutUs">About Us</Link></li>
        <li><Link to="/contact">Contact Us</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/account">Account</Link></li>
        {userName ? (
          <li className={styles.dropdown} onClick={toggleDropdown}>
            {userName}
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><button  className={styles.logout} onClick={handleLogout}>Logout</button></li>
              </ul>
            )}
          </li>
        ) : (
          <li className={styles.dropdown} onClick={toggleDropdown}>
            SignUp
            {isDropdownOpen && (
              <ul className={styles.dropdownMenu}>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
