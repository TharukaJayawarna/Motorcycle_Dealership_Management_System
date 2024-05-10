import React from 'react';
import './alert-box.css';

const AlertBox = ({ type, message }) => {
  return (
    <div className={`alert-box ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default AlertBox;