import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Input, Layout, Select } from 'antd';
import { HeartOutlined, UserOutlined, ShoppingCartOutlined, SearchOutlined, GlobalOutlined } from '@ant-design/icons';
import './Header.scss'; // Import the SCSS file
import Header_logo from './Header_logo.png';
import Cookie from 'js-cookie';
const { Header } = Layout;
const { Search } = Input;

const Headers = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const onSearch = (value) => {
    console.log(value); // You can add your search logic here
  }

  useEffect(() => {
    const isLoggedIn = setInterval(() => {
      const token = Cookie.get('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }, 1000);
  }, [isLoggedIn]); // Empty dependency array means this effect runs only once on component mount
  const filterOption = (input, option) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <div className='navbar'>
      <Layout>
        <Header className="navbar-container">
          <div className="logo-container">
            <Link style={{ textDecoration: 'none' }} to={"/home"}>
              <img src={Header_logo} alt="Logo" />
            </Link>
          </div>
          <div className="menu">
            {isLoggedIn ? (
              <Menu mode="horizontal" className="menu-container">
                <Link to={'/shop'}>
                  <Menu.Item key="menu1">
                    Shop
                  </Menu.Item>
                </Link>
                <Link to={'/men'}>
                  <Menu.Item key="menu2">Men</Menu.Item>
                </Link>
                <Menu.Item key="menu3">Women</Menu.Item>
                <Menu.Item key="menu4">Combos</Menu.Item>
                <Menu.Item key="menu5">Joggers</Menu.Item>
              </Menu>
            ) : (
              <></>
            )}
          </div>



          {isLoggedIn ? (
            <Search
              placeholder="Search"
              onSearch={onSearch}
              // style={{ width: 200 }}
              className="search-container custom-search"
              prefix={<SearchOutlined className="search-icon" />}
              suffix={null}
            />
          ) : (

            <Select
              showSearch
              placeholder="Select a Language"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch}
              filterOption={filterOption}
              options={[
                {
                  value: 'English (United State)',
                  label: 'English (United State)',
                },
                {
                  value: 'Japinese (Japan)',
                  label: 'Japinese (Japan)',
                },
                {
                  value: 'Arabic (Saudia Arabia)',
                  label: 'Arabic (Saudia Arabia)',
                },
              ]}
            />

          )}

          <div className="icon-container">
            {isLoggedIn ? (
              <>
                <Link className='wishlist' to={"/wishlist"}> <HeartOutlined className="icon" /></Link>
                <Link className='profile' to={"/profile"}><UserOutlined className="icon" /></Link>
                <Link className='cart' to={"/cart"}><ShoppingCartOutlined className="icon" /></Link>
              </>
            ) : (
              <>
                <Link to="./login" className="login">Login</Link>
                <Link to="./signup" className="login-or-signup-button signup-button">Signup</Link>
              </>
            )}
          </div>

        </Header>
      </Layout >
    </div >
  );
};

export default Headers;
