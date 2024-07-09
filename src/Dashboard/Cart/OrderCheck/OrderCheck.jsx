import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Collapse, Button, Form, Input, Select, message } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

const { Panel } = Collapse;
const { Option } = Select;

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/orders/all'); // Adjust URL as per your backend
        setOrders(response.data.orders); // Assuming your API returns orders as an array under 'orders' key
        message.success('Orders fetched successfully');
        console.log(response);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleEdit = (order) => {
    setEditingOrderId(order._id);
    setEditedOrder(order);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5002/api/orders/${editingOrderId}`, editedOrder);
      setOrders(orders.map(order => order._id === editingOrderId ? editedOrder : order));
      message.success('Order Status updated successfully');
      setEditingOrderId(null);
      setEditedOrder({});
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleCancel = () => {
    setEditingOrderId(null);
    setEditedOrder({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder({
      ...editedOrder,
      [name]: value,
    });
  };

  const handleSelectChange = (value) => {
    setEditedOrder({
      ...editedOrder,
      orderStatus: value,
    });
  };

  return (
    <div>
      <h2>Pending Orders</h2>
      <Collapse accordion>
        {orders?.map(order => (
          <Panel header={`Order ID: ${order._id}`} key={order._id}>
            {editingOrderId === order._id ? (
              <Form layout="vertical">
                <Form.Item label="Order Status">
                  <Select value={editedOrder.orderStatus} onChange={handleSelectChange}>
                    <Option value="Order Placed">Order Placed</Option>
                    <Option value="In Progress">In Progress</Option>
                    <Option value="Shipped">Shipped</Option>
                    <Option value="Delivered">Delivered</Option>
                    <Option value="Cancelled">Cancelled</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Estimated Delivery Date">
                  <Input name="estimatedDeliveryDate" value={editedOrder.estimatedDeliveryDate} onChange={handleChange} />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
                    Save
                  </Button>
                  <Button icon={<CloseOutlined />} onClick={handleCancel} style={{ marginLeft: '10px' }}>
                    Cancel
                  </Button>
                </Form.Item>
              </Form>
            ) : (
              <div>
                <p><strong>Items:</strong></p>
                <ul>
                  {order.cartItems.map((item, index) => (
                    <li key={index}>
                      {item.productDetails.name} x {item.quantity} - ${item.productDetails.price}
                      <img src={item.productDetails.ImgUrl} alt={item.productDetails.name} style={{ width: '50px', marginLeft: '10px' }} />
                    </li>
                  ))}
                </ul>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <p><strong>Estimated Delivery Date:</strong> {new Date(order.estimatedDeliveryDate).toLocaleDateString()}</p>
                <p><strong>Shipping Address:</strong></p>
                <p>{order.shipping_address.address_line_1}, {order.shipping_address.address_line_2}, {order.shipping_address.city}, {order.shipping_address.state}, {order.shipping_address.country}, {order.shipping_address.pincode}</p>
                <p><strong>Billing Address:</strong></p>
                <p>{order.billing_address.name}, {order.billing_address.email}</p>
                <p>{order.billing_address.address_line_1}, {order.billing_address.address_line_2}, {order.billing_address.city}, {order.billing_address.state}, {order.billing_address.country}, {order.billing_address.pincode}</p>
                <Button icon={<EditOutlined />} onClick={() => handleEdit(order)}>
                  Edit
                </Button>
              </div>
            )}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default Orders;
