import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, Checkbox, message } from 'antd';
import './Signup.scss';
import Signups from './Signup.jpg';
import Google from './google-icon.png';
import Twitter from './twitter-icon.png';
import axios from 'axios';

const Signup = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate(); // Initialize useNavigate hook

    const onFinish = async (values) => {
        try {

            const response = await axios.post('http://localhost:5002/signup', values);
            if (response && response.data) {
                message.success(response.data.message);
                form.resetFields();
                navigate('/login'); // Navigate to login page after successful signup
            } else {
                message.error('Invalid response from server');
            }
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    return (
        <div className='signup-container'>
            <div className='signup-image'>
                <img className='signup-images' src={Signups} alt="Signup Image" />
            </div>
            <div className="signup-form">
                <h2 className='signup-heading'>Sign Up Page</h2>
                <Form
                    form={form}
                    name="signup"
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
                        <Checkbox className="forgot-password">Forgot Password?</Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button className="signup-button" type="primary" htmlType="submit">
                            Sign Up
                        </Button>
                    </Form.Item>
                    <div className="dont-have-account">
                        <span>Already have an account?</span>
                        <a href="/login" className="login-link">Log in</a>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Signup;
