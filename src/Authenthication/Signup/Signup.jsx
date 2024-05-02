import React from 'react';
import { Button, Input, Form, Checkbox, message } from 'antd';
import './Signup.scss';
import Signups from './Signup.jpg';
import Google from './google-icon.png';
import Twitter from './twitter-icon.png';
import axios from 'axios';

const Signup = () => {
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post('http://localhost:5002/signup', values, config);
            if (response && response.data) {
                message.success(response.data.message);
            } else {
                message.error('Invalid response from server');
            }
            form.resetFields();
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
                <h2 className='signup-heading'>Sign In Page</h2>
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
                        <Button className="signup-button" type="primary" htmlType="submit">
                            Sign Up
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

export default Signup;

