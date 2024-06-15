import React, { useState, useEffect } from "react";
import axios from "axios";
import { message, Button, Input, InputNumber, Collapse, Select, Modal } from "antd";
import "./OrderCheck.scss"; // Import SCSS file

const { Panel } = Collapse;
const { Option } = Select;

const statuses = ["Order Placed", "inProgress", "Shipped", "Delivered"];

const OrderListPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/api/orders`);
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        message.error("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleEditToggle = (order) => {
    setEditingOrderId(order._id);
    setEditedOrder(order);
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setEditedOrder(null);
  };

  const handleInputChange = (field, value) => {
    setEditedOrder({ ...editedOrder, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...editedOrder.cartItems];
    updatedItems[index].productDetails[field] = value;
    setEditedOrder({ ...editedOrder, cartItems: updatedItems });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5002/api/orders/${editingOrderId}`, editedOrder);
      setOrders(orders.map(order => order._id === editingOrderId ? editedOrder : order));
      setEditingOrderId(null);
      setEditedOrder(null);
      message.success("Order updated successfully");
    } catch (error) {
      console.error("Error updating order:", error);
      message.error("Failed to update order");
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5002/api/orders/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      message.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      message.error("Failed to delete order");
    }
  };

  const confirmDelete = (orderId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this order?",
      onOk: () => handleDelete(orderId),
      okText: "Yes",
      cancelText: "No",
    });
  };

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

  return (
    <div className="order-list-page">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1 className="order-list-title">Order List</h1>
        <Collapse accordion>
          {orders.map(order => (
            <Panel header={`Order Number: ${order.orderNumber}`} key={order._id}>
              <div className="order-container">
                <div className="order-header">
                  <div className="order-info-container">
                    <div className="order-info">
                      <h2>Order Number: {order.orderNumber}</h2>
                      {editingOrderId === order._id ? (
                        <Input
                          value={editedOrder.estimatedDeliveryDate}
                          onChange={(e) => handleInputChange("estimatedDeliveryDate", e.target.value)}
                        />
                      ) : (
                        <p>Estimated Delivery Date: {new Date(order.estimatedDeliveryDate).toLocaleString()}</p>
                      )}
                    </div>
                    {editingOrderId === order._id ? (
                      <InputNumber
                        min={0}
                        value={editedOrder.grandTotal}
                        onChange={(value) => handleInputChange("grandTotal", value)}
                      />
                    ) : (
                      <p>Total: ${order.grandTotal.toFixed(2)}</p>
                    )}
                    {editingOrderId === order._id ? (
                      <Select
                        value={editedOrder.orderStatus}
                        onChange={(value) => handleInputChange("orderStatus", value)}
                      >
                        {statuses.map(status => (
                          <Option key={status} value={status}>
                            {status}
                          </Option>
                        ))}
                      </Select>
                    ) : (
                      <p>Order Status: {order.orderStatus}</p>
                    )}
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
                  {order.cartItems.map((item, index) => (
                    <div key={item._id} className="product-item">
                      <img src={item.productDetails.ImgUrl} alt="" className="product-image" />
                      {editingOrderId === order._id ? (
                        <>
                          <Input
                            value={editedOrder.cartItems[index].productDetails.name}
                            onChange={(e) => handleItemChange(index, "name", e.target.value)}
                          />
                          <InputNumber
                            min={0}
                            value={editedOrder.cartItems[index].productDetails.price}
                            onChange={(value) => handleItemChange(index, "price", value)}
                          />
                          <Input
                            value={editedOrder.cartItems[index].productDetails.color}
                            onChange={(e) => handleItemChange(index, "color", e.target.value)}
                          />
                          <Input
                            value={editedOrder.cartItems[index].productDetails.size}
                            onChange={(e) => handleItemChange(index, "size", e.target.value)}
                          />
                        </>
                      ) : (
                        <>
                          <p>Product Name: {item.productDetails.name}</p>
                          <p>Price: ${item.productDetails.price.toFixed(2)}</p>
                          <p>Color: {item.productDetails.color}</p>
                          <p>Size: {item.productDetails.size}</p>
                        </>
                      )}
                    </div>
                  ))}
                </div>
                <hr />
                <div className="edit-buttons">
                  {editingOrderId === order._id ? (
                    <>
                      <Button type="primary" onClick={handleSave}>Save</Button>
                      <Button onClick={handleCancelEdit}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button type="primary" onClick={() => handleEditToggle(order)}>Edit</Button>
                      <Button type="danger" onClick={() => confirmDelete(order._id)}>Delete</Button>
                    </>
                  )}
                </div>
              </div>
            </Panel>
          ))}
        </Collapse>
        </div>
      )}
    </div>
  );
};

export default OrderListPage;
