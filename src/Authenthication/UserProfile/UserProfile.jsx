import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Layout, Breadcrumb, Divider, Typography, Form, Input, Button, Menu } from "antd";
import { UserOutlined, LogoutOutlined, HeartOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
// import AppLayout from "../../config/AppLayout/AppLayout";
import CommonHeading from "./CommonHeading/CommonHeading";
import "./UserProfile.scss"; // Import your SCSS file
// import Order from './MYOrder/OrderPage'
const { Header, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;

const headerStyle = {
  color: "#fff",
  backgroundColor: "#fff",
  padding: "0",
};
const contentStyle = {
  backgroundColor: "#fff",
};
const siderStyle = {
  color: "#807d7e",
  backgroundColor: "#fff",
};
const layoutStyle = {
  borderRadius: 8,
  overflow: "hidden",
  width: "100%",
  backgroundColor: "#fff",
};

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const location = useLocation();

  useEffect(() => {
    const token = Cookies.get("token");
    const userId = Cookies.get("userId");

    if (token && userId) {
      axios
        .get(`http://localhost:5002/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfileData(response.data);
          setFormData(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching profile data:", error);
        });
    } else {
      console.error("Token or user ID not found in cookie");
    }
  }, []);

  const handleSignout = () => {
    const userRole = Cookies.get("role");
    if (userRole !== "admin") {
      Cookies.remove("token");
      Cookies.remove("userId");
      Cookies.remove("role");
      window.location.href = "/login";
    } else {
      console.warn("Unauthorized signout attempt");
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setFormData(profileData.user);
  };

  const handleSubmit = () => {
    setEditMode(false);
    console.log("Form data submitted:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const extractUsername = (email) => {
    const atIndex = email.indexOf("@");
    return atIndex !== -1 ? email.substring(0, atIndex) : email;
  };

  //   const currentPath = location.pathname.split("/")[2].split("-").join(" ");

  return (
    // <AppLayout>
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Breadcrumb
          items={[
            { title: <Link to="/" className="bold">Home</Link> },
            { title: <span className="bold">My Account</span> },
            { title: <span className="bold" style={{ color: "#722ED1", textTransform: "capitalize" }}>{ }</span> },
          ]}
          separator=">"
        />
        <Divider />
      </Header>
      <Layout>
        <Sider width="25%" style={siderStyle}>
          {profileData && (
            <CommonHeading text={`Hello ${extractUsername(profileData.user.username)}`} />
          )}
          <Paragraph className="m-0">Welcome to your Account</Paragraph>
          <Menu mode="vertical">
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/order">My Order</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<HeartOutlined />}>
              <Link to="/profile/my-wishlist">Wishlist</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<UserOutlined />}>
              <Link to="/profile/my-info">My info</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleSignout}>
              Sign out
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={contentStyle} className="px-5">
          <div className="profile-content-background">
            {profileData ? (
              <div className="profile-data">
                <Title level={2}>Profile</Title>
                {editMode ? (
                  <Form onFinish={handleSubmit}>
                    <Form.Item label="Name">
                      <Input name="name" value={extractUsername(formData.username)} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Email">
                      <Input name="email" value={formData.email} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Role">
                      <Input name="role" value={formData.role} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item label="Status">
                      <Input name="status" value={formData.status} onChange={handleChange} />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" htmlType="submit">Save</Button>
                      <Button onClick={handleCancel} style={{ marginLeft: 8 }}>Cancel</Button>
                    </Form.Item>
                  </Form>
                ) : (
                  <>
                    <Paragraph className="label">Name: {extractUsername(profileData.user.username)}</Paragraph>
                    <Paragraph className="label">Email: {profileData.user.email}</Paragraph>
                    <Paragraph className="label">Role: {profileData.user.role}</Paragraph>
                    <Paragraph className="label">Status: {profileData.user.status}</Paragraph>
                    <Button type="primary" onClick={handleEdit}>Edit</Button>
                  </>
                )}
              </div>
            ) : (
              <p>Loading profile data...</p>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
    // </AppLayout>
  );
};

export default Profile;
