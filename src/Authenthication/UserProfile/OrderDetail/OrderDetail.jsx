import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Tag } from "antd";
import Cookies from "js-cookie";
import "./OrderDetailPage.scss"; // Import SCSS file

function OrderDetailPage() {
  const [order, setOrder] = useState(null); // Change initial state to null
  const [loading, setLoading] = useState(true);
  const userId = Cookies.get("userId");
  const orderId = Cookies.get("orderId");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/orders/${userId}/${orderId}`);
        setOrder(response.data); // Set the fetched order data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching order:", error);
        message.error("Failed to fetch order");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [userId, orderId]);

  const getOrderStatusIndex = (orderStatus) => {
    switch (orderStatus) {
      case "Order Placed":
        return 0;
      case "inProgress":
        return 1;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      default:
        return 0;
    }
  };

  const statuses = ["Order Placed", "inProgress", "Shipped", "Delivered"];

  return (
    <div className="order-detail-page">
      {loading ? (
        <p>Loading...</p>
      ) : (
        order && (
          <div className="order-container">
            <div className="order-header">
              <div className="order-info-container">
                <div className="order-info">
                  <h2>Order Number: {order.orderNumber}</h2>
                  <p>Estimated Delivery Date: {new Date(order.estimatedDeliveryDate).toLocaleString()}</p>
                </div>
                <p>Total: ${order.grandTotal.toFixed(2)}</p>
              </div>
            </div>
            <div className="timeline">
              {statuses.map((status, index) => (
                <div key={index} className={`status ${index <= getOrderStatusIndex(order.orderStatus) ? 'active' : ''}`}>
                  <div className="status-dot"></div>
                  <div className="status-label">{status}</div>
                </div>
              ))}
            </div>
            <p className="verification-msg">You have successfully verified the product detail.</p>
            <div className="product-detail">
              <h3>Product Detail:</h3>
              {order.cartItems.map((item) => (
                <div key={item._id} className="product-item">
                  <img src={item.productDetails.ImgUrl} alt="" className="product-image" />
                  <p>Product Name: {item.productDetails.name}</p>
                  <p>Price: ${item.productDetails.price.toFixed(2)}</p>
                  <p>Color: {item.productDetails.color}</p>
                  <p>Size: {item.productDetails.size}</p>
                </div>
              ))}
            </div>
            <hr />
          </div>
        )
      )}
    </div>
  );
}

export default OrderDetailPage;
