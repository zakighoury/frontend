import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal, message } from 'antd';
import './checkout.scss';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId, cartItems, subtotal, shippingCost, grandTotal, coupon, discount } = location.state || {};

  const [billingDetails, setBillingDetails] = useState({ fullName: '', email: '', phone: '' });
  const [shippingAddress, setShippingAddress] = useState({ address1: '', address2: '', city: '', state: '', postalCode: '', country: '' });
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [orderNumber, setOrderNumber] = useState('');
  // const [orderStatus, setOrderStatus] = useState('');

  const handleBillingChange = (e) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handleShippingChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      userId,
      cartItems,
      subtotal,
      shippingCost,
      grandTotal,
      coupon,
      discount,
      billingDetails,
      shippingAddress,
      shippingMethod,
      paymentMethod
    };

    try {
      const response = await axios.post('http://localhost:5002/api/orders', orderData);
      if (response.status === 200) {
        // setOrderNumber(response.data.orderNumber); // Set order number from response
        // setOrderStatus(response.data.orderStatus); // Set order status from response
        setIsModalVisible(true);
      } else {
        message.error('Failed to place order. Please try again.');
      }
    } catch (error) {
      message.error('An error occurred. Please try again.');
    }
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate('/order');  // Redirect to homepage or another route after placing order
  };

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return `$${price.toFixed(2)}`;
    }
    return price;
  };

  if (!location.state) {
    return <div>Loading...</div>;
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      <div className="checkout-section billing-section">
        <h3>Billing Details</h3>
        <form className="billing-form">
          <label>
            Full Name:
            <input type="text" name="fullName" value={billingDetails.fullName} onChange={handleBillingChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={billingDetails.email} onChange={handleBillingChange} required />
          </label>
          <label>
            Phone Number:
            <input type="tel" name="phone" value={billingDetails.phone} onChange={handleBillingChange} required />
          </label>
        </form>
      </div>

      <div className="checkout-section shipping-section">
        <h3>Shipping Address</h3>
        <form className="shipping-form">
          <label>
            Address Line 1:
            <input type="text" name="address1" value={shippingAddress.address1} onChange={handleShippingChange} required />
          </label>
          <label>
            Address Line 2:
            <input type="text" name="address2" value={shippingAddress.address2} onChange={handleShippingChange} />
          </label>
          <label>
            City:
            <input type="text" name="city" value={shippingAddress.city} onChange={handleShippingChange} required />
          </label>
          <label>
            State/Province:
            <input type="text" name="state" value={shippingAddress.state} onChange={handleShippingChange} required />
          </label>
          <label>
            Postal Code:
            <input type="text" name="postalCode" value={shippingAddress.postalCode} onChange={handleShippingChange} required />
          </label>
          <label>
            Country:
            <input type="text" name="country" value={shippingAddress.country} onChange={handleShippingChange} required />
          </label>
        </form>
      </div>

      <div className="checkout-section shipping-method-section">
        <h3>Shipping Method</h3>
        <form className="shipping-method-form">
          <label>
            <input type="radio" name="shippingMethod" value="standard" checked={shippingMethod === 'standard'} onChange={(e) => setShippingMethod(e.target.value)} required />
            Standard Shipping
          </label>
          <label>
            <input type="radio" name="shippingMethod" value="express" checked={shippingMethod === 'express'} onChange={(e) => setShippingMethod(e.target.value)} />
            Express Shipping
          </label>
        </form>
      </div>

      <div className="checkout-section payment-method-section">
        <h3>Payment Method</h3>
        <form className="payment-form">
          <label>
            <input type="radio" name="paymentMethod" value="creditCard" checked={paymentMethod === 'creditCard'} onChange={(e) => setPaymentMethod(e.target.value)} required />
            Credit Card
          </label>
          <label>
            <input type="radio" name="paymentMethod" value="paypal" checked={paymentMethod === 'paypal'} onChange={(e) => setPaymentMethod(e.target.value)} />
            PayPal
          </label>
        </form>
      </div>

      <div className="checkout-section order-summary-section">
        <h3>Order Summary</h3>
        <div className="order-items">
          {cartItems && cartItems.length > 0 ? (
            cartItems.map(item => (
              <div key={item._id} className="order-item">
                <img src={item.productDetails.ImgUrl} alt={item.productDetails.name} className="order-item-image" />
                <div className="order-item-details">
                  <h4>{item.productDetails.name}</h4>
                  <p>Color: {item.productDetails.color}</p>
                  <p>Size: {item.productDetails.size}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: {formatPrice(item.productDetails.price)}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No items in cart</p>
          )}
        </div>
        <div className="order-totals">
          <h4>Subtotal: {formatPrice(subtotal)}</h4>
          <h4>Shipping: {formatPrice(shippingCost)}</h4>
          <h4>Discount: {coupon ? `20% (${coupon})` : 'No coupon applied'}</h4>
          <h3>Grand Total: {formatPrice(grandTotal)}</h3>
        </div>
      </div>

      <div className="checkout-button">
        <button onClick={handlePlaceOrder}>Place Order</button>
      </div>

      <Modal
        title="Order Confirmation"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        okText="OK"
        cancelText="Cancel"
      >
        <p>Your order has been placed successfully!</p>
        {/* <p>Order Number: {orderNumber}</p> */}
        {/* <p>Order Status: {orderStatus}</p> */}
      </Modal>
    </div>
  );
};

export default Checkout;
