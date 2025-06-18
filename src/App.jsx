// src/App.jsx
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './Components/Login/loginForm';
import RegisterForm from './Components/Registration/registrationForm';
import { logout } from './Features/Auth/authSlice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import setUserFromStorage from './Features/Auth/authSlice'; // Import the action to
import React from 'react';

function App() {
 const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // --- Crucial for Microfrontend Navigation After Login ---
  useEffect(() => {
    // On component mount, check if user data exists in localStorage
    // (e.g., if user refreshed the page while on login MF and was already logged in)
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser && !user) { // Only set if Redux state is empty but localStorage has data
      try {
        dispatch(setUserFromStorage(JSON.parse(storedUser)));
      } catch (e) {
        console.error("Error parsing stored user data:", e);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
      }
    }

    // This useEffect watches the 'user' state from Redux.
    // When 'user' becomes truthy (meaning a successful login occurred),
    // it dispatches the custom event to the main-app.
    if (user) {
      console.log('Login MF: User logged in, dispatching navigation event to /dashboard');
      const event = new CustomEvent('app:navigate', {
        detail: {
          path: '/dashboard',
          user: user // Optionally pass user data to the main app if needed
        },
        bubbles: true,
        composed: true
      });
      window.dispatchEvent(event);
    }
  }, [user, dispatch]); // Re-run effect when 'user' state changes or dispatch changes

  // The login-mf will ONLY render its internal routes.
  // The 'Welcome, {user.name}!' message will NOT be shown by the login-mf.
  // Instead, the main-app will navigate to the dashboard-mf, which will
  // then display the user's welcome message if needed.
  return (
    <Router> {/* Set basename for React Router. It means /login is the root for this MF's internal routes */}
      <Routes>
        <Route
          path="/login"
          element={<LoginForm />} // Always show LoginForm if not navigating away
        />
        <Route
          path="/register"
          element={<RegisterForm />}
        />
        {/* If user is logged in, this MF should navigate away,
            so no need to render a "welcome" state here */}
      </Routes>
    </Router>
  );

  // return (
  //   <Router>
  //     <Routes>
  //       <Route
  //         path="/"
  //         element={
  //           user ? (
  //             <div>
  //               <h2>Welcome, {user.name}!</h2>
  //               <button onClick={() => dispatch(logout())}>Logout</button>
  //             </div>
  //           ) : (
  //             <LoginForm />
  //           )
  //         }
  //       />
  //       <Route
  //         path="/register"
  //         element={<RegisterForm />}
  //       />
  //     </Routes>
  //   </Router>
  // );

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
