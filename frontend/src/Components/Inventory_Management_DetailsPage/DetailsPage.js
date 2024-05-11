import React from 'react';

const DetailsPage = ({ items }) => {
  return (
    <div>
      <h2>Low Inventory Items Details</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <strong>Item ID:</strong> {item.Item_ID} - <strong>Item Name:</strong> {item.Item_Name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailsPage;