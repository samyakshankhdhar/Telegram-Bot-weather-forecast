
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GoogleLoginButton from './components/GoogleLoginButton';
import Dashboard from './components/Dashboard';
import axios from 'axios';

const App = () => {
  const handleLoginSuccess = async (response) => {
    const { tokenId } = response;
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/google/callback`, { token: tokenId });
    localStorage.setItem('token', res.data.access_token);
    window.location.href = '/dashboard';
  };
  const handleLoginFailure = (response) => {
    console.log('Login failed:', response);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" exact>
          <GoogleLoginButton onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} />
        </Route>
        <Route path="/dashboard">
          {localStorage.getItem('token') ? <Dashboard /> : <Navigate to="/" />}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
