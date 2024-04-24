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
    if (!inputs.Item_Name || !inputs.Item_ID || !inputs.Price || !inputs.Received) {
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
  
    // Form data preparation and submission
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
    console.log(image, inputs);
  
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
        alert("Success...!");
  
        window.location.href = "/viewitemlist";
      } else {
        alert("Fail...!");
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = new FormData();
  //   formData.append("image", image);
  //   formData.append("Item_ID", inputs.Item_ID);
  //   formData.append("Item_Name", inputs.Item_Name);
  //   formData.append("Price", inputs.Price);
  //   formData.append("Manufacturer", inputs.Manufacturer);
  //   formData.append("Category", inputs.Category);
  //   formData.append(
  //     "Compatible_Motorcycle_Models",
  //     inputs.Compatible_Motorcycle_Models
  //   );
  //   formData.append("Received", inputs.Received);
  //   console.log(image, inputs);

  //   try {
  //     const result = await axios.post(
  //       "http://localhost:8070/additem",
  //       formData,
  //       {
  //         headers: { "Content-Type": "multipart/form-data" },
  //       }
  //     );
  //     console.log(result);

  //     if (result.data.status === "Success") {
  //       alert("Success...!");

  //       window.location.href = "/viewitemlist";
  //     } else {
  //       alert("Fail...!");
  //     }
  //   } catch (error) {
  //     console.error("Error :", error);
  //   }
  // };

  return (
    <div>
      <div>
        <h3>Add new Item to the Inventory</h3>
        <form onSubmit={handleSubmit}>
          <div className="inventory-dashboard">
            <div className="container">
              <div className="left-section">
                <label htmlFor="item-name">Item Name:</label>
                <input
                  type="text"
                  id="item-name"
                  name="Item_Name"
                  value={inputs.Item_Name}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label htmlFor="item-id">Item ID:</label>
                <input
                  type="text"
                  id="item-id"
                  name="Item_ID"
                  value={inputs.Item_ID}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label htmlFor="manufacturer">Manufacturer:</label>
                <input
                  type="text"
                  id="manufacturer"
                  name="Manufacturer"
                  value={inputs.Manufacturer}
                  onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="price">Price:</label>
  <div className="price-input-container">
    <p>LKR</p>
    <input
      type="text"
      id="price"
      name="Price"
      value={inputs.Price}
      onChange={handleChange}
      required
    />
  </div>
                <br />
                <br />
                <Link to="/">
                  <button className="custom-button">Cancel</button>
                </Link>
              </div>
              <div className="right-section">
                <label htmlFor="image">Image (Upload):</label>
                <input
                  type="file"
                  accept="image/*"
                  id="image"
                  onChange={handleChange}
                />
                <br />
                <br />

                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  id="quantity"
                  name="Received"
                  min="1"
                  value={inputs.Received}
                  onChange={handleChange}
                  required
                />
                <br />
                <br />
                <label htmlFor="compatible-models">
                  Compatible Motorcycle Models:
                </label>
                <input
                  type="text"
                  id="compatible-models"
                  name="Compatible_Motorcycle_Models"
                  value={inputs.Compatible_Motorcycle_Models}
                  onChange={handleChange}
                />
                <br />
                <br />
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="Category"
                  value={inputs.Category}
                  onChange={handleChange}
                />
                <br />
                <br />
                <button type="submit" className="custom-button">
                  Add
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Add_Item;