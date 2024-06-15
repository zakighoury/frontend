import React, { useState } from 'react';
import { Modal, Button, Input, Select } from 'antd';

const { Option } = Select;

const EditUserModal = ({ visible, onClose, onSave, user }) => {
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);

  const handleSave = () => {
    onSave({ ...user, username, email, role });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Edit User"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <div>
        <label>Username:</label>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Role:</label>
        <Select value={role} onChange={(value) => setRole(value)}>
          <Option value="user">User</Option>
          <Option value="admin">Admin</Option>
        </Select>
      </div>
    </Modal>
  );
};

export default EditUserModal;
