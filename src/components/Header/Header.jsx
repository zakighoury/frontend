import React from 'react';
import {Link } from 'react-router-dom';
import { Menu, Input } from 'antd';
import { Layout } from 'antd';
import { HeartOutlined, UserOutlined, ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import './Header.scss'; // Import the SCSS file
import Header_logo from './Header_logo.png';
// import Link from 'antd/es/typography/Link';
const { Header } = Layout;
const { Search } = Input;

const header = () => {
  const onSearch = (value) => {
    console.log(value); // You can add your search logic here
  }

  return (
    <div className='navbar'>
      <Layout>
        <Header className="navbar-container">
          <div className="logo-container">
            <img src={Header_logo} alt="Logo" />
          </div>
          <div className="menu">
            {window.location.pathname !== '/signup' && (
              <Menu mode="horizontal" className="menu-container">
                <Menu.Item key="menu1">Shop</Menu.Item>
                <Menu.Item key="menu2">Men</Menu.Item>
                <Menu.Item key="menu3">Women</Menu.Item>
                <Menu.Item key="menu4">Combos</Menu.Item>
                <Menu.Item key="menu5">Joggers</Menu.Item>
              </Menu>
            )}
          </div>

          {/* <div className='search-container'> */}
          <Search
            placeholder="Search"
            onSearch={onSearch}
            // style={{ width: 200 }}
            className="search-container custom-search"
            prefix={<SearchOutlined className="search-icon" />}
            suffix={null}
          />
          {/* </div> */}
          <div className="icon-container">
            {window.location.pathname === '/signup' ? (
              <>
                <Link to="./login" className="login">Login</Link>
                <Link to="./signup" className="login-or-signup-button signup-button">Signup</Link>
              </>
            ) : (
              <>
                <HeartOutlined className="icon" />
                <UserOutlined className="icon" />
                <ShoppingCartOutlined className="icon" />
              </>
            )}
          </div>

        </Header>
      </Layout>
    </div>
  );
};

export default header
