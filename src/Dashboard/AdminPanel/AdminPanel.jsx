import React, { useState } from "react";
import { Tabs, Layout, Menu } from "antd";
import Cart from "../Cart/Cart";
import OrderCheck from "../Cart/OrderCheck/OrderCheck";
import AllUser from "../AllUser/AllUser";
import Product from "../Cart/Product/Product";
import PaymentList from "../Cart/PaymentList/PaymentList";
import {
  ShoppingCartOutlined,
  UserOutlined,
  OrderedListOutlined,
  CreditCardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";

const { TabPane } = Tabs;
const { Sider, Content } = Layout;

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("cart");
  const [collapsed, setCollapsed] = useState(false);

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleSidebar}
        width={200}
        style={{ background: "#fff" }}
      >
        <div className="logo" />
        <h1 style={{ textAlign: "center" }}>Admin Panel</h1>
        <Menu
          mode="inline"
          defaultSelectedKeys={["cart"]}
          selectedKeys={[activeTab]}
          onClick={({ key }) => handleTabChange(key)}
        >
          <Menu.Item key="cart" icon={<ShoppingCartOutlined />}>
            Cart
          </Menu.Item>
          <Menu.Item key="products" icon={<UserOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="orders" icon={<OrderedListOutlined />}>
            Orders
          </Menu.Item>
          <Menu.Item key="payment" icon={<CreditCardOutlined />}>
            Payment
          </Menu.Item>
          <Menu.Item key="User" icon={<UserOutlined />}>
            User
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ margin: "16px" }}>
          <Tabs activeKey={activeTab} onChange={handleTabChange}>
            <TabPane tab="Cart" key="cart">
              <Cart />
            </TabPane>
            <TabPane tab="Products" key="products">
              <Product />
            </TabPane>
            <TabPane tab="Orders" key="orders">
              <OrderCheck />
            </TabPane>
            <TabPane tab="Payment" key="payment">
              <PaymentList />
            </TabPane>
            <TabPane tab="User" key="User">
              <AllUser />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;
