import React from 'react';
import { Modal } from 'antd';
import './UserDetailsModal.scss';

const UserDetailsModal = ({ visible, onClose, user }) => {
  if (!user) return null;

  return (
    <Modal
      title="User Details"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="user-details-modal">
        <img src={user.avatar} alt={user.username} className="user-avatar" />
        <h3>{user.username}</h3>
        <p>Email: {user.email}</p>
        <p>Role: {user.role}</p>
        <p>Status: {user.status}</p>
        <p>ID: {user._id}</p>
      </div>
    </Modal>
  );
};

export default UserDetailsModal;
