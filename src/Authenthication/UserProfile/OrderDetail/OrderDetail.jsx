import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Descriptions, Button, Steps, message } from "antd";
import "./OrderDetailPage.scss";

const { Step } = Steps;

const OrderDetail = () => {
  const [order, setOrder] = useState(null);

  const orderStatuses = [
    "Order Placed",
    "InProgress",
    "Shipped",
    "Delivered",
  ];

  const getOrderStatusIndex = (status) => {
    switch (status) {
      case "Order Placed":
        return 0;
      case "In Progress":
        return 1;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const userId = Cookies.get("userId");
        const orderId = Cookies.get("orderId");
        const response = await axios.get(
          `http://localhost:5002/api/orders/${userId}/${orderId}`
        );
        setOrder(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching order details:", error);
        message.error("Failed to fetch order details");
      }
    };

    fetchOrder();
  }, []);

  if (!order) {
    return <p>Loading...</p>;
  }

  const currentStatusIndex = getOrderStatusIndex(order.orderStatus);

  return (
    <div className="order-detail">
      <h2 className="order-detail__title">Order Detail</h2>
      <Descriptions bordered className="order-detail__descriptions">
        <Descriptions.Item label="Order Number">
          {order.OrderNumber}
        </Descriptions.Item>
      </Descriptions>
      <div className="order-detail__steps">
        <Steps current={currentStatusIndex} size="small">
          {orderStatuses.map((status, index) => (
            <Step
              key={index}
              title={status}
              status={
                currentStatusIndex === index
                  ? "process"
                  : currentStatusIndex > index
                  ? "finish"
                  : "wait"
              }
              className={currentStatusIndex >= index ? "completed-step" : ""}
            />
          ))}
        </Steps>
      </div>
      <Descriptions bordered className="order-detail__descriptions">
        <Descriptions.Item label="Order Date">
          {new Date(order.orderDate).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Estimated Delivery Date">
          {new Date(order.estimatedDeliveryDate).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Payment Method">
          {order.payment.cardType}
        </Descriptions.Item>
        <Descriptions.Item label="Shipping Address" span={2}>
          {order.shipping_address.address_line_1},{" "}
          {order.shipping_address.address_line_2},{" "}
          {order.shipping_address.city}, {order.shipping_address.state},{" "}
          {order.shipping_address.country}, {order.shipping_address.pincode}
        </Descriptions.Item>
        <Descriptions.Item label="Billing Address" span={2}>
          {order.billing_address.name}, {order.billing_address.email},{" "}
          {order.billing_address.address_line_1},{" "}
          {order.billing_address.address_line_2}, {order.billing_address.city},{" "}
          {order.billing_address.state}, {order.billing_address.country},{" "}
          {order.billing_address.pincode}
        </Descriptions.Item>
      </Descriptions>

      <h3 className="order-detail__items-title">Order Items</h3>
      <div className="order-items">
        {order.cartItems.map((item) => (
          <div key={item._id} className="order-item">
            <img
              src={item.productDetails.ImgUrl}
              alt={item.productDetails.name}
              className="order-item__image"
            />
            <div className="order-item__details">
              <h4 className="order-item__name">{item.productDetails.name}</h4>
              <p className="order-item__detail">Color: {item.productDetails.color}</p>
              <p className="order-item__detail">Size: {item.productDetails.size}</p>
              <p className="order-item__detail">Quantity: {item.quantity}</p>
              <p className="order-item__detail">Price: ${item.productDetails.price.toFixed(2)}</p>
              <p className="order-item__detail">Total: ${(item.productDetails.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="primary"
        onClick={() => window.history.back()}
        className="order-detail__back-button"
      >
        Back
      </Button>
    </div>
  );
};

export default OrderDetail;
