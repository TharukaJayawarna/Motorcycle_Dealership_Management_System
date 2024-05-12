import React, { useState } from "react";
import "./Add_Item.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Add_Item() {
  const [image, setImage] = useState(null);
  const [inputs, setInputs] = useState({
    Item_ID: "",
    Item_Name: "",
    Price: "",
    Manufacturer: "",
    Category: "",
    Compatible_Motorcycle_Models: "",
    Received: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (files) {
      setImage(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Form validation
    if (
      !inputs.Item_Name ||
      !inputs.Item_ID ||
      !inputs.Price ||
      !inputs.Received
    ) {
      alert("Please fill in all required fields.");
      return;
    }
  
    if (isNaN(parseFloat(inputs.Price))) {
      alert("Price must be a valid number.");
      return;
    }
  
    if (isNaN(parseInt(inputs.Received)) || inputs.Received <= 0) {
      alert("Received quantity must be a valid number greater than zero.");
      return;
    }
  
    if (!image) {
      alert("Please upload an image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("image", image);
    formData.append("Item_ID", inputs.Item_ID);
    formData.append("Item_Name", inputs.Item_Name);
    formData.append("Price", inputs.Price);
    formData.append("Manufacturer", inputs.Manufacturer);
    formData.append("Category", inputs.Category);
    formData.append(
      "Compatible_Motorcycle_Models",
      inputs.Compatible_Motorcycle_Models
    );
    formData.append("Received", inputs.Received);
  
    try {
      const result = await axios.post(
        "http://localhost:8070/additem",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(result);
  
      if (result.data.status === "Success") {
        alert("Item Successfully Added..!");
        window.location.href = "/viewitemlist";
      } else {
        alert("Fail to add Item..!");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };
  return (
    <div>
      <div className="full-page-container">
      <div>
        <h3 className="add-item-heading">Add new Item to the Inventory</h3>
        <form onSubmit={handleSubmit}>
          <div className="add-item-inventory-dashboard">
            <div className="add-item-container">
              <div className="add-item-left-section">
                <label htmlFor="item-name"className="add-item-label">Item Name:</label>
                <input
                  type="text"
                  id="item-name"
                  name="Item_Name"
                  value={inputs.Item_Name}
                  onChange={handleChange}
                  required
                  className="add-item-input"
                />
                <br />
                <br />
                <label htmlFor="item-id"className="add-item-label">Item ID:</label>
                <input
                  type="text"
                  id="item-id"
                  name="Item_ID"
                  value={inputs.Item_ID}
                  onChange={handleChange}
                  required
                  className="add-item-input"
                />
                <br />
                <br />
                <label htmlFor="manufacturer"className="add-item-label">Manufacturer:</label>
                <input
                  type="text"
                  id="manufacturer"
                  name="Manufacturer"
                  value={inputs.Manufacturer}
                  onChange={handleChange}
                  className="add-item-input"
                />
                <br />
                <br />
                <label htmlFor="price"className="add-item-label">Price:</label>
                <div className="add-item-price-input-container">
                  <p>LKR</p>
                  <input
                    type="text"
                    id="price"
                    name="Price"
                    value={inputs.Price}
                    onChange={handleChange}
                    required
                    className="add-item-input"
                  />
                </div>
                <br />
               
                <Link to="/">
                  <button className="add-item-button">Cancel</button>
                </Link>
              </div>
              <div className="add-item-right-section">
                <label htmlFor="image"className="add-item-label">Image (Upload):</label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  onChange={handleChange}
                />
                <br />
                <br />


                <label htmlFor="quantity"className="add-item-label">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="Received"
                  min="1"
                  value={inputs.Received}
                  onChange={handleChange}
                  required
                  className="add-item-input"
                />
                <br />
                <br />
                <label htmlFor="compatible-models"className="add-item-label">
                  Compatible Motorcycle Models:
                </label>
                <input
                  type="text"
                  id="compatible-models"
                  name="Compatible_Motorcycle_Models"
                  value={inputs.Compatible_Motorcycle_Models}
                  onChange={handleChange}
                  className="add-item-input"
                />
                <br />
                <br />
                <label htmlFor="category"className="add-item-label">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="Category"
                  value={inputs.Category}
                  onChange={handleChange}
                  className="add-item-input"
                />
                <br />
                <br />
                <br/>
                <button type="submit" className="add-item-button">
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Add_Item;
