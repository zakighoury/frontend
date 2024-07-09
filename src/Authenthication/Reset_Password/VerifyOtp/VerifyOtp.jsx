// VerifyOtp.js
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyOtp = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { otpToken, userId } = location.state;

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:5002/reset-password/verify-otp`, {
                otp: values.otp,
                otpToken,
                userId
            });
            if (response.data.success) {
                message.success('OTP verified successfully');
                navigate(`/new-password`, { state: { token: response.data.token } });
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.response?.data?.message || 'Failed to verify OTP');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-otp-container">
            <h2 className="verify-otp-heading">Verify OTP</h2>
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                    label="OTP"
                    name="otp"
                    rules={[{ required: true, message: 'Please enter the OTP' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Verify OTP
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default VerifyOtp;
