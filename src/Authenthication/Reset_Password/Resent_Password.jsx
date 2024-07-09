// ResetPassword.js
import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ResetImg from "./resetpasswordimg.jpg";
import "./ResetPassword.scss";

const ResetPassword = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5002/api/reset-password",
        values
      );
      if (response.data.success) {
        message.success(response.data.message);
        form.resetFields();
        navigate("/verify", {
          state: { otpToken: response.data.otpToken, userId: response.data.userId },
        });
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="reset-password-wrapper">
      <div className="reset-password-container">
        <div className="reset-password-images">
          <img className="reset-password-image" src={ResetImg} alt="Reset Password" />
        </div>
        <Form form={form} name="resetPassword" onFinish={onFinish} className="reset-password-form">
          <h2 className="reset-password-heading">Reset Password</h2>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Send Reset Link
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
