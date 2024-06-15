import React from 'react';

const ColorSwatch = ({ color }) => {
  return (
  
    <div
      style={{
        width: 20,
        height: 20,
        backgroundColor: color,
        borderRadius: 4,
        marginRight: 8,
      }}
    />
  );
};

export default ColorSwatch;