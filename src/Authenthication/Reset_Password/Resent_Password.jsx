import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, message } from 'antd';
import axios from 'axios';

const ResetPassword = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [showOtpForm, setShowOtpForm] = useState(false);
    const [otpSent, setOtpSent] = useState(false);

    const handleResetPassword = async (values) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post('http://localhost:5002/reset-password', values, config);
            if (response && response.data && response.data.success) {
                message.success(response.data.message);
                setShowOtpForm(true);
            } else {
                message.error('Invalid response from server');
            }
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    const handleResetWithOtp = async (values) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.post('http://localhost:5002/reset-password', values, config);
            if (response && response.data && response.data.success) {
                message.success(response.data.message);
                navigate('/login');
            } else {
                message.error('Invalid OTP');
            }
        } catch (error) {
            message.error(error.response.data.message);
        }
    };

    return (
        <div className='reset-password-container'>
            {!showOtpForm && (
                <div className="reset-password-form">
                    <h2 className='reset-password-heading'>Reset Password</h2>
                    <Form
                        form={form}
                        name="resetPassword"
                        onFinish={handleResetPassword}
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input type="email" placeholder="Email" />
                        </Form.Item>

                        <Form.Item>
                            <Button className="reset-password-button" type="primary" htmlType="submit">
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}

            {showOtpForm && (
                <div className="reset-otp-form">
                    <h2 className='reset-password-heading'>Verify OTP</h2>
                    <Form
                        form={form}
                        name="resetOtp"
                        onFinish={handleResetWithOtp}
                    >
                        <Form.Item
                            name="otp"
                            rules={[{ required: true, message: 'Please input the OTP sent to your email!' }]}
                        >
                            <Input type="text" placeholder="Enter OTP" />
                        </Form.Item>

                        <Form.Item
                            name="newPassword"
                            rules={[{ required: true, message: 'Please input your new password!' }]}
                        >
                            <Input type="password" placeholder="New Password" />
                        </Form.Item>

                        <Form.Item>
                            <Button className="reset-otp-button" type="primary" htmlType="submit">
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;
