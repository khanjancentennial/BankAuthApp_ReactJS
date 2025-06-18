// src/components/LoginForm.jsx
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../Features/Auth/authSlice';
import { useState } from 'react';
import creditCard from '../../Assets/credit-cards-payment.png'; // Adjust the path to your image
import passwordIcon from '../../Assets/padlock.png'; // Adjust the path to your image
import React from 'react';
import {Link} from 'react-router-dom';
import './login.css'; // Assuming you have some styles for the form

export default function LoginForm() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ accountNumber, password }));
  };

  return (
    <div className="container">
    <form className="form" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className='input'>
        <img src={creditCard} alt='' />
        <input type="number-only"
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        inputMode="numeric"
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
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Password" 
        required />
      </div>
      <button type="submit" disabled={loading}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* <text className='text'>
      Don't have an account? <Link className='link' to="/register"> <span className='a'>Register</span> </Link>
    </text> */}
    </form>

    
    </div>
  );
}
