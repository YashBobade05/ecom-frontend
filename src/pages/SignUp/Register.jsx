import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log('Form data:', form);

    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Registered successfully:', data);
        navigate('/login');
      } else {
        const errorData = await response.json();
        console.error('Failed to register:', errorData);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className={styles.registerBtn}>Register</button>
      </form>

      <p>Already have an account?</p>
      <Link to="/login" className={styles.loginBtn}>Login</Link>
    </div>
  );
};

export default Register;
