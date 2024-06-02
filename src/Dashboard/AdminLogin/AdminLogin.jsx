import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { message } from 'antd';
import Cookie from 'js-cookie';
import './AdminLogin.scss';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const role = Cookie.get('role');
    if (role === 'user') {
      navigate('/login');
    } else if (role !== 'user') {
      navigate('/admin');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors

    try {
      const response = await axios.post('http://localhost:5002/admin/login', {
        username,
        role,
        password,
      });
      Cookie.set('role', response.data.role);

      if (role === 'admin') {
        message.success(response.data.message);
        setSuccess(response.data.message); // Set success message locally
        navigate('/adminpanel');
      } else {
        const role = Cookie.get('role');
        if (role === 'user') {
          message.error(response.data.err);
          setError(response.data.err); // Set error message locally
          navigate('/login');
        }
      }
    } catch (err) {
      if (err.response && err.response.status === 403) {
        setError('Unauthorized access'); // Set error message locally
      } else {
        setError(err.message); // Set error message locally
      }
    }
  };

  return (
    <div className='admin-flex'>
      {success && <div className="success-message">{success}</div>}
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
    </div>
  );
};

export default AdminLogin;
