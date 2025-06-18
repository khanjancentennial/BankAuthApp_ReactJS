// src/App.jsx
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './Components/Login/loginForm';
import RegisterForm from './Components/Registration/registrationForm';
import { logout } from './Features/Auth/authSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <div>
                <h2>Welcome, {user.name}!</h2>
                <button onClick={() => dispatch(logout())}>Logout</button>
              </div>
            ) : (
              <LoginForm />
            )
          }
        />
        <Route
          path="/register"
          element={<RegisterForm />}
        />
      </Routes>
    </Router>
  );

  // return (
  //   <div>
  //     {user ? (
  //       <div>
  //         <h2>Welcome, {user.name}!</h2>
  //         <button onClick={() => dispatch(logout())}>Logout</button>
  //       </div>
  //     ) : (
  //       <LoginForm />
  //     )}
  //   </div>
  // );
}

export default App;
