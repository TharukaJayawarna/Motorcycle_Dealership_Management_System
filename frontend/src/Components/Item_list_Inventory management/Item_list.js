import React, { useEffect, useState } from "react";
import "./Item_list.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:8070/items";


function ItemList(props) {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL);
      setItems(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (itemId) => {
    try {
      await axios.delete(`http://localhost:8070/items/${itemId}`);
      fetchItems();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(URL);
      const data = response.data.items;
      const filteredItems = data.filter((item) =>
        Object.values(item).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setItems(filteredItems);
      setNoResults(filteredItems.length === 0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h4>Spare parts and Accessories Inventory</h4>

      <div className="search-container">
        <input
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Items Here..."
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item Image</th>
            <th>Item ID</th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Manufacturer</th>
            <th>Category</th>
            <th>Compatible Motorcycle Models</th>
            <th>Received</th>
            <th>In Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={i}>
              <td>
                <img
                   src={`http://localhost:8070/Users/tharukajayawarna/Desktop/Motorcycle_Dealership_Management_System/frontend/public/Images/${item.Image}`}
                  height={100}
                  width={100}
                  alt="photos"
                />
              </td>
              <td>{item.Item_ID}</td>
              <td>{item.Item_Name}</td>
              <td>{item.Price}</td>
              <td>{item.Manufacturer}</td>
              <td>{item.Category}</td>
              <td>{item.Compatible_Motorcycle_Models}</td>
              <td>{item.Received}</td>
              <td>{item.In_Stock}</td>
              <td>
                <Link to={`/viewitemlist/${item._id}`}>
                  <button className="custom-button">Edit</button>
                </Link>{" "}
                <button
                  onClick={() => deleteHandler(item._id)}
                  className="custom-button"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      {noResults ? (
        <div>
          <p>No Items Found</p>
        </div>
      ) : null}
    </div>
  );
}

export default ItemList;