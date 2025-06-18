// src/components/LoginForm.jsx
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../Features/Auth/authSlice';
import { useState } from 'react';
import passwordIcon from '../../Assets/padlock.png';
import creditCard from '../../Assets/credit-cards-payment.png' // Adjust the path to your image
import React from 'react';
import {Link} from 'react-router-dom';
import './registration.css'; // Assuming you have some styles for the form

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ accountNumber, password, confirmPassword }));
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (accountNumber.length !== 16) {
      alert("Account Number must be 16 digits");
      return;
    }
  };

  return (
    <div className="container">
    <form className="form" onSubmit={handleSubmit}>
      <h1>Registration</h1>
      <div className='input'>
        <img src={creditCard} alt='' />
        <input type="number-only"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        inputMode="numeric"
        pattern="[0-9]*" 
        value={accountNumber} 
        onChange={(e) => setAccountNumber(e.target.value)} 
        placeholder="Account Number / debit card number" 
        minLength={16}
        maxLength={16}
        required />
      </div>
      <div className='input'>
        <img src={passwordIcon} alt='' />
        <input 
        type="password" 
        pattern='^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d](?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$'
        title="Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required />
      </div>
      <div className='input'>
        <img src={passwordIcon} alt='' />
        <input 
        type="password" 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        placeholder="Confirm Password" 
        required />
      </div>
      <button type="submit" disabled={loading}>Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <text className='text'>
      Already have an account? <Link to="/login">Login</Link>
    </text>
    </form>
    
    </div>
  );
}
