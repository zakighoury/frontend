import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Tabs, Modal, message, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./OrderPage.scss";

const { TabPane } = Tabs;

function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const userId = Cookies.get("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5002/api/orders/${userId}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleDeleteOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5002/api/orders/${orderId}`
      );
      if (response.status === 200) {
        setOrders(orders.filter((order) => order._id !== orderId));
        message.success("Order deleted successfully");
      } else {
        message.error("Failed to delete order");
      }
    } catch (error) {
      message.error("Error deleting order:", error);
    }
  };

  const confirmDeleteOrder = (orderId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this order?",
      onOk: () => handleDeleteOrder(orderId),
      okText: "Yes",
      cancelText: "No",
    });
  };

  const formatPrice = (price) => {
    if (typeof price === "number") {
      return `$${price.toFixed(2)}`;
    }
    return price;
  };

  const renderOrders = (orderStatus) => {
    const filteredOrders = orders.filter(
      (order) => order.orderStatus === orderStatus
    );

    return filteredOrders.length > 0 ? (
      <div className="orders-list">
        {filteredOrders.map((order) => (
          <div key={order._id} className="order-card">
            <h3 className="order-number">Order Number: {order.orderNumber}</h3>
            <p className="order-status">Order Status: {order.orderStatus}</p>
            <p className="order-date">
              Order Date: {new Date(order.orderDate).toLocaleString()}
            </p>
            <p className="delivery-date">
              Estimated Delivery Date:{" "}
              {new Date(order.estimatedDeliveryDate).toLocaleString()}
            </p>
            <p className="payment-method">
              Payment Method: {order.paymentMethod}
            </p>
            <div className="order-items">
              {order.cartItems.map((item) => (
                <div key={item._id} className="order-item">
                  <img
                    src={item.productDetails.ImgUrl}
                    alt={item.productDetails.name}
                    className="order-item-image"
                  />
                  <div className="order-item-details">
                    <h4>{item.productDetails.name}</h4>
                    <p>Color: {item.productDetails.color}</p>
                    <p>Size: {item.productDetails.size}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {formatPrice(item.productDetails.price)}</p>
                    <p className="grand-total">
                      Total: {formatPrice(order.grandTotal)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="order-btn">
              <Link
                to={`/order-detail/${userId}/${order._id}`}
                onClick={() => Cookies.set("orderId", order._id)}
              >
                <Button>View Detail</Button>
              </Link>
            </div>
            {orderStatus === "Order Placed" && (
              <CloseCircleOutlined
                className="delete-icon"
                onClick={() => confirmDeleteOrder(order._id)}
                title="Delete Order"
              />
            )}
          </div>
        ))}
      </div>
    ) : (
      <p>No orders found.</p>
    );
  };

  return (
    <div>
      <h2 className="orders-title">Your Orders</h2>
      <div className="orders-page">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Active" key="1">
            {renderOrders("Order Placed")}
            {renderOrders("inProgress")} {/* Corrected status */}
            {renderOrders("Shipped")} {/* Corrected status */}
          </TabPane>
          <TabPane tab="Canceled" key="3">
            {renderOrders("Cancelled")} {/* Corrected status */}
          </TabPane>
          <TabPane tab="Completed" key="4">
            {renderOrders("Delivered")} {/* Corrected status */}
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default OrdersPage;
