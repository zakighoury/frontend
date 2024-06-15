import React, { useEffect, useState } from "react";
import axios from "axios";
import { Collapse, Button, Select, message } from "antd";
import "./AllUser.scss";
import EditUserModal from "./EditUser/EditUserModal";
import UserDetailsModal from "./UserDetailsModal/UserDetailModal";

const { Panel } = Collapse;
const { Option } = Select;

const AllUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false); // State for edit modal visibility

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5002/api/users");
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5002/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      message.success("User deleted successfully");
    } catch (err) {
      setError(err.message);
      message.error("Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setEditModalVisible(true); // Open edit modal
  };

  const handleView = (user) => {
    setViewingUser(user);
  };

  const handleSave = async (updatedUser) => {
    try {
      const response = await axios.put(
        `http://localhost:5002/api/users/${updatedUser._id}`,
        updatedUser
      );
      setUsers(
        users.map((user) =>
          user._id === updatedUser._id ? response.data : user
        )
      );
      setEditingUser(null);
      setEditModalVisible(false); // Close edit modal after save
      message.success("User updated successfully");
    } catch (err) {
      setError(err.message);
      message.error("Failed to update user");
    }
  };

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      const response = await axios.patch(
        `http://localhost:5002/api/users/${userId}`,
        { status: newStatus }
      );
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, status: newStatus } : user
        )
      );
      message.success("User status updated successfully");
    } catch (err) {
      setError(err.message);
      message.error("Failed to update user status");
    }
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditModalVisible(false); // Close edit modal
  };

  const closeViewModal = () => {
    setViewingUser(null);
  };

  return (
    <div className="all-user-container">
      <h2 className="title">All Users</h2>
      <Collapse accordion>
        {users.map((user) => (
          <Panel header={user._id} key={user._id}>
            <div className="user-info">
              <img
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
                src={user.avatar}
                alt={user.username}
                className="user-avatar"
              />
            </div>
            <div className="user-details">
              <p>Name: {user.username}</p>
              <p> Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <p>Status: {user.status}</p>
              <Select
                value={user.status}
                onChange={(value) => handleStatusUpdate(user._id, value)}
              >
                <Option value="active">Active</Option>
                <Option value="inactive">Inactive</Option>
                <Option value="suspended">Suspended</Option>
              </Select>
              <p>ID: {user._id}</p>
              <div className="user-actions">
                <Button
                  onClick={() => handleDelete(user._id)}
                  className="delete-button"
                  danger
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleEdit(user)}
                  className="edit-button"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleView(user)}
                  className="view-button"
                >
                  View Details
                </Button>
              </div>
            </div>
          </Panel>
        ))}
      </Collapse>

      {isEditModalVisible && ( // Render edit modal based on visibility state
        <EditUserModal
          visible={isEditModalVisible}
          onClose={closeEditModal}
          onSave={handleSave}
          user={editingUser}
        />
      )}

      {viewingUser && (
        <UserDetailsModal
          visible={!!viewingUser}
          onClose={closeViewModal}
          user={viewingUser}
        />
      )}
    </div>
  );
};

export default AllUser;
