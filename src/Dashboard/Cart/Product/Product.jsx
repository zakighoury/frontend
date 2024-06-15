import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Input, InputNumber } from 'antd';
import './product.scss'; // Import SCSS file

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleEdit = async (item) => {
    try {
      const response = await axios.get(`http://localhost:5002/api/cart/${item._id}`);
      setEditingItem(response.data);
      setIsModalVisible(true);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  const handleDelete = async (cartItemId) => {
    try {
      await axios.delete(`http://localhost:5002/api/cart/${cartItemId}`);
      setCartItems(cartItems.filter(item => item._id !== cartItemId));
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Failed to delete item:', error);
    }
  };

  const handleModalCancel = () => {
    setEditingItem(null);
    setIsModalVisible(false);
  };

  const handleModalOk = async (values) => {
    try {
      await axios.put(`http://localhost:5002/api/cart/${editingItem._id}`, values);
      const updatedItems = cartItems.map(item =>
        item._id === editingItem._id ? { ...item, ...values } : item
      );
      setCartItems(updatedItems);
      setEditingItem(null);
      setIsModalVisible(false);
      console.log('Item updated successfully');
    } catch (error) {
      console.error('Failed to update item:', error);
    }
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.map(item => (
        <div className="cart-item" key={item._id}>
          <img src={item.ImgUrl} alt={item.name} className="cart-item-images" />
          <div className="cart-item-details">
            <h3 className="cart-item-titles">{item.name}</h3>
            <p>Category: {item.category}</p>
            <p>Subcategory: {item.subcategory}</p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <div className="cart-item-actions">
              <Button className="cart-edit-button" onClick={() => handleEdit(item)}>Edit</Button>
              <Button className="cart-delete-button" onClick={() => handleDelete(item._id)}>Delete</Button>
            </div>
          </div>
        </div>
      ))}

      <Modal
        title="Edit Item"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={[
          <Button key="cancel" onClick={handleModalCancel}>Cancel</Button>,
          <Button key="submit" type="primary" htmlType="submit" form="editForm">Save</Button>,
        ]}
        className="cart-edit-modal"
      >
        <Form
          id="editForm"
          initialValues={editingItem}
          onFinish={handleModalOk}
          layout="vertical"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          hideRequiredMark
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please enter name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: 'Please enter quantity' }]}
          >
            <InputNumber min={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Cart;
