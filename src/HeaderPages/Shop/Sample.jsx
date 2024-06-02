import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const items = [
  {
    key: 'sub1',
    label: 'Tops',
    // icon: <MailOutlined />,
    children: [
      {
        key: '1',
        label: 'Plain T-Shirt',
      },
      {
        key: '2',
        label: 'Printed T-Shirt',
      },
    ],
  },
  {
    key: 'sub2',
    label: 'T-Shirts',
    // icon: <MailOutlined />,
    children: [
      {
        key: '3',
        label: 'Plain T-Shirt',
      },
      {
        key: '4',
        label: 'Printed T-Shirt',
      },
    ],
  },
  {
    key: 'sub3',
    label: 'Kurtis',
    // icon: <MailOutlined />,
    children: [
      {
        key: '5',
        label: 'Kurti',
      },
      {
        key: '6',
        label: 'Long Kurti',
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Trousers',
    // icon: <AppstoreOutlined />,
    children: [
      {
        key: '7',
        label: 'Jeans',
      },
      {
        key: '8',
        label: 'Joggers',
      },
    ],
  },
  {
    key: 'sub5',
    label: 'Boxers',
    // icon: <AppstoreOutlined />,
    children: [
      {
        key: '9',
        label: 'Boxers',
      },
      {
        key: '10',
        label: 'Shorts',
      },
    ],
  },
  {
    key: 'sub6',
    label: 'Payjamas',
    // icon: <SettingOutlined />,
    children: [
      {
        key: '11',
        label: 'Payjamas',
      },
      {
        key: '12',
        label: 'Night Suits',
      },
    ],
  },
  {
    key: 'sub7',
    label: 'Loungewear',
    // icon: <SettingOutlined />,
    children: [
      {
        key: '13',
        label: 'Lounge Pants',
      },
      {
        key: '14',
        label: 'Lounge T-Shirts',
      },
    ],
  },
];

const App = () => {
  const onClick = (e) => {
    console.log('click ', e);
  };
  return (
    <Menu
      onClick={onClick}
      style={{
        width: 256,
      }}
      defaultSelectedKeys={['1']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={items}
    />
  );
};

export default App;