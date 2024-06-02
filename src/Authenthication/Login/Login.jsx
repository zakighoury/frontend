import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Input, Form, message } from 'antd';
import './Login.scss';
import Signups from './Login.jpg';
import Google from '../Signup/google-icon.png';
import Twitter from '../Signup/twitter-icon.png';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie for handling cookies

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5002/login', values);
      console.log(response)
      if (response && response.data) {
        message.success(response.data.message);
        // Set the token and user ID in cookies
        Cookies.set('token', response.data.user.token);

        // console.log(response.data.user.token)
        Cookies.set('userId', response.data.user._id);
        Cookies.set('role', response.data.user.role);
        // console.log(response.data.user._id)
        navigate('/home'); // Navigate to main page on successful login
      } else {
        message.error('Invalid Credentials');
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
            name="usernameOrEmail"
            rules={[{ required: true, message: 'Please input your username or email!' }]}
          >
            <Input placeholder="Username or Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Link to={"/reset"} className="forgot-password">Forgot Password?</Link>
          </Form.Item>
          <Form.Item>
            <Button className="login-button" type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
          <div className="dont-have-account">
            <span>Don't have an account?</span>
            <Link to={"/signup"} className="signup-link">Sign Up</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
