import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PasswordReset = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { userId, token } = useParams();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5002/reset-password/verify-token/${userId}/${token}`, values);
      if (response.data.success) {
        message.success(response.data.message);
        form.resetFields();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('Server error');
    }
    setLoading(false);
  };

  return (
    <div className="reset-password-container">
      <h2 className="reset-password-heading">Reset Password</h2>
      <Form form={form} name="resetPassword" onFinish={onFinish}>
        <Form.Item
          name="newPassword"
          rules={[{ required: true, message: 'Please input your new password!' }]}
        >
          <Input.Password placeholder="New Password" />
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

export default PasswordReset;
