import React, { useEffect, useState } from "react";
import "./Item_list.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus, FaSearch } from "react-icons/fa";

const URL = "http://localhost:8070/items";

function ItemList(props) {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [lowInventoryAlert5, setLowInventoryAlert5] = useState(false);
  const [lowInventoryAlert3, setLowInventoryAlert3] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL);
      const data = response.data.items;
      setItems(data);

      const lowStockItems5 = data.filter((item) => item.In_Stock < 5);
      const lowStockItems3 = data.filter((item) => item.In_Stock < 3);

      setLowInventoryAlert5(lowStockItems5.length > 0);
      setLowInventoryAlert3(lowStockItems3.length > 0);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (itemId) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this item?"
      );
      if (confirmDelete) {
        await axios.delete(`http://localhost:8070/items/${itemId}`);
        fetchItems();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  const handleAddItem = () => {
    navigate("/additem");
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    try {
      const response = await axios.get(URL);
      const data = response.data.items;
      const filteredItems = data.filter((item) =>
        Object.values(item).some((field) =>
          field.toString().toLowerCase().includes(query.toLowerCase())
        )
      );
      setItems(filteredItems);
      setNoResults(filteredItems.length === 0);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="IM-container kh-container">
      <h4 className="IM-subheading kh-subheading">Spare parts and Accessories Inventory</h4>

      <div className="IM-search-container kh-search-container">
        <div className="IM-search-wrapper kh-search-wrapper">
          <input
            className="IM-search-input kh-search-input"
            onChange={(e) => handleSearch(e.target.value)}
            type="text"
            name="search"
            placeholder="Search Items Here..."
          />
        </div>
        <button className="IM-add-button kh-add-button" onClick={handleAddItem}>
          <FaPlus /> Add Item
        </button>
      </div>

      <table className="IM-table kh-table">
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
            <tr key={i} className="kh-table-row">
              <td>
                <img
                  src={`http://localhost:8070/${item.Image}`}
                  height={100}
                  width={100}
                  alt={item.name}
                />
              </td>
              <td>{item.Item_ID}</td>
              <td>{item.Item_Name}</td>
              <td>{item.Price}</td>
              <td>{item.Manufacturer}</td>
              <td>{item.Category}</td>
              <td>{item.Compatible_Motorcycle_Models}</td>
              <td>{item.Received}</td>
              <td
                style={{
                  color:
                    item.In_Stock <= 2
                      ? "red"
                      : item.In_Stock <= 5
                      ? "orange"
                      : "inherit",
                  fontSize: "16px",
                }}
                className={item.In_Stock <= 2 ? "kh-low-stock-red" : item.In_Stock <= 5 ? "kh-low-stock-orange" : ""}
              >
                {item.In_Stock}
                {item.In_Stock <= 2 && (
                  <div style={{ color: "red", fontSize: "12px" }}>Restock!</div>
                )}
              </td>
              <td>
                <Link to={`/viewitemlist/${item._id}`}>
                  <button className="IM-custom-button kh-custom-button">Edit</button>
                </Link>{" "}
                <button
                  onClick={() => deleteHandler(item._id)}
                  className="IM-custom-button2 kh-custom-button2"
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
          <p className="kh-no-results">No Items Found</p>
        </div>
      ) : null}
    </div>
  );
}

export default ItemList;