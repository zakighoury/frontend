import React from 'react';
import { Button, Input, Form, Checkbox, message } from 'antd';
import './Login.scss';
import Signups from './Login.jpg';
import Google from '../Signup/google-icon.png';
import Twitter from '../Signup/twitter-icon.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const onFinish = async (values) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const response = await axios.post('http://localhost:5002/login', values, config);
      if (response && response.data) {
        message.success(response.data.message);
        navigate('/'); // Navigate to main page on successful login
      } else {
        message.error('Invalid response from server');
      }
      form.resetFields();
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  return (
    <div className='login-container'>
      <div className='login-image'>
        <img className='login-images' src={Signups} alt="Login Image" />
      </div>
      <div className="login-form">
        <h2 className='login-heading'>Login Page</h2>
        <Form
          form={form}
          name="login"
          onFinish={onFinish}
        >
          <Form.Item>
            <Button className="continue-with-google" type="secondary" block>
              <img src={Google} className="google" alt="" />   &nbsp; Continue with Google
            </Button>
          </Form.Item>
          <Form.Item>
            <Button className="continue-with-twitter" type="secondary" block>
              <img src={Twitter} className='google' alt="" />  Continue with Twitter
            </Button>
          </Form.Item>

          <span className="or"><span>or</span></span>
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Checkbox className="forgot-password">Forgot Password?</Checkbox>
          </Form.Item>
          <Form.Item>
            <Button className="login-button" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <div className="dont-have-account">
            <span>Don't have an account?</span>
            <a href="/signup" className="signup-link">Sign Up</a>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
