// NewPassword.js
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const NewPassword = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = location.state;

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:5002/reset-password/new-password`, {
        newPassword: values.newPassword,
        token,
      });
      message.success('Password reset successfully');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="new-password-container">
      <h2 className="new-password-heading">Set New Password</h2>
      <Form onFinish={onFinish} layout="vertical">
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: 'Please enter your new password' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewPassword;
