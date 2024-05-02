import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.scss';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status on component mount
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await axios.get('http://localhost:5002/admin/check-auth', {
        // Add any headers or credentials required for authentication check
        // headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.authenticated) {
        setAuthenticated(true);
        navigate('/adminpanel'); // Redirect if already authenticated
      }
    } catch (err) {
      console.error('Authentication check failed:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:5002/admin/login', {
        username,
        password,
      });

      if (!response.data.message) {
        throw new Error('Invalid credentials');
      }

      // Redirect to admin dashboard on successful login
      navigate('/adminpanel');
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('Unauthorized access');
      } else {
        setError(err.message);
      }
    }
  };

  if (authenticated) {
    return null; // Render nothing if already authenticated
  }

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default AdminLogin;
