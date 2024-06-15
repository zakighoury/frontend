import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Layout,
  Breadcrumb,
  Divider,
  Typography,
  Form,
  Input,
  Button,
  Menu,
  Tabs,
  Modal,
  Upload,
  message,
} from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  HeartOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import CommonHeading from "./CommonHeading/CommonHeading";
import Order from "./MYOrder/OrderPage";
import Wishlist from "./Wishlistpage/Wishlistpage";
import "./UserProfile.scss";

const { Header, Sider, Content } = Layout;
const { Title, Paragraph } = Typography;
const { TabPane } = Tabs;

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
  const [activeTab, setActiveTab] = useState("1");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalField, setModalField] = useState("");
  const [modalValue, setModalValue] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

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
          setAvatarUrl(response.data.user.avatar);
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

  const handleEdit = (field, value) => {
    setModalField(field);
    setModalValue(value);
    setModalVisible(true);
  };

  const handleModalOk = () => {
    // Update the form data
    setFormData((prevState) => ({
      ...prevState,
      [modalField]: modalValue,
    }));

    // Update profile on the server
    const token = Cookies.get("token");
    axios
      .post(
        `http://localhost:5002/upload-avatar`,
        {
          ...formData,
          [modalField]: modalValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        message.success("Profile updated successfully");
        setProfileData((prevState) => ({
          ...prevState,
          user: {
            ...prevState.user,
            [modalField]: modalValue,
          },
        }));
      })
      .catch((error) => {
        console.error("Error updating profile data:", error);
        message.error("Failed to update profile");
      });

    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleChange = (e) => {
    setModalValue(e.target.value);
  };

  const extractUsername = (email) => {
    const atIndex = email.indexOf("@");
    return atIndex !== -1 ? email.substring(0, atIndex) : email;
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === "done") {
      // Get the URL of the uploaded file and update the avatar URL
      setAvatarUrl(info.file.response.url);
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  return (
    <Layout style={layoutStyle}>
      <Header style={headerStyle}>
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <Link to="/" className="bold">
              Home
            </Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="bold">My Account</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span
              className="bold"
              style={{ color: "#722ED1", textTransform: "capitalize" }}
            >
              {}
            </span>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Divider />
      </Header>
      <Layout>
        <Sider width="25%" style={siderStyle}>
          {profileData && (
            <div>
              <img
                src={profileData.user.avatar}
                style={{ width: "100px", height: "100px" }}
                alt="Avatar"
                className="avatar"
              />
              <CommonHeading
                text={`Hello ${extractUsername(profileData.user.username)}`}
              />
            </div>
          )}
          <Paragraph className="m-0">Welcome to your Account</Paragraph>
          <Menu mode="vertical">
            <Menu.Item
              key="1"
              icon={<UserOutlined />}
              onClick={() => setActiveTab("1")}
            >
              My Order
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<HeartOutlined />}
              onClick={() => setActiveTab("2")}
            >
              Wishlist
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<UserOutlined />}
              onClick={() => setActiveTab("3")}
            >
              My Info
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<LogoutOutlined />}
              onClick={handleSignout}
            >
              Sign out
            </Menu.Item>
          </Menu>
        </Sider>
        <Content style={contentStyle} className="px-5">
          <div className="profile-content-background">
            <Tabs activeKey={activeTab} onChange={handleTabChange} type="card">
              <TabPane tab="My Order" key="1">
                <Order />
              </TabPane>
              <TabPane tab="Wishlist" key="2">
                <Wishlist />
              </TabPane>
              <TabPane tab="My Info" key="3">
                {profileData && (
                  <div className="profile-data">
                    <Title level={2}>Profile</Title>
                    <Paragraph className="label">
                      Avatar:
                      <Upload
                        name="avatar"
                        action="http://localhost:5002/upload-avatar"
                        showUploadList={false}
                        onChange={handleAvatarChange}
                      >
                        <Button icon={<UploadOutlined />}>Change Avatar</Button>
                      </Upload>
                    </Paragraph>
                    <Paragraph className="label">
                      Name: {extractUsername(profileData.user.username)}
                      <Button
                        type="link"
                        className="edit-button"
                        onClick={() =>
                          handleEdit("username", profileData.user.username)
                        }
                      >
                        Change
                      </Button>
                    </Paragraph>
                    <Paragraph className="label">
                      Email: {profileData.user.email}
                      <Button
                        type="link"
                        className="edit-button"
                        onClick={() =>
                          handleEdit("email", profileData.user.email)
                        }
                      >
                        Change
                      </Button>
                    </Paragraph>
                    <Paragraph className="label">
                      Role: {profileData.user.role}
                    </Paragraph>
                    <Paragraph className="label">
                      Status: {profileData.user.status}
                    </Paragraph>
                  </div>
                )}
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>

      <Modal
        title={`Edit ${modalField}`}
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        footer={[
          <Button key="back" onClick={handleModalCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalOk}>
            OK
          </Button>,
        ]}
      >
        <Form>
          <Form.Item label={modalField}>
            <Input value={modalValue} onChange={handleChange} />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Profile;
