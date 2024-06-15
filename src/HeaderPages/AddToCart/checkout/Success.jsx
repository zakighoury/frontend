import React from 'react';
import { Button, Result } from 'antd';
import Lottie from 'react-lottie';
import { useNavigate } from 'react-router-dom';
import * as successAnimation from './successAnimation.json'; // Import your Lottie animation JSON file

const Success = () => {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <Lottie options={defaultOptions} height={400} width={400} />
      <Result
        status="success"
        title="Order Placed Successfully!"
        subTitle="Thank you for your purchase. Your order number is #123456."
        extra={[
          <Button type="primary" key="continue" onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>,
        ]}
      />
    </div>
  );
};

export default Success;
