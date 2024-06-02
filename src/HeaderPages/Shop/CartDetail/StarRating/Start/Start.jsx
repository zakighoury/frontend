import React from 'react';
import { StarFilled, StarOutlined, StarTwoTone } from '@ant-design/icons';

const Star = ({ type }) => {
  if (type === 'full') {
    return <StarFilled style={{ color: '#fadb14' }} />;
  } else if (type === 'half') {
    return <StarTwoTone twoToneColor="#fadb14" />;
  } else if (type === 'empty') {
    return <StarOutlined />;
  }
  return null;
};

export default Star;
