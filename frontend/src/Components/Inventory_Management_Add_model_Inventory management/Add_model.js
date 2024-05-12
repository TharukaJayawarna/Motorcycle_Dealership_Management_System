import React, { useState } from 'react';
import './Add_model.css';
import axios from 'axios';
import { Link } from "react-router-dom";

function Add_model() {
    const [image, setImage] = useState(null);
    const [inputs,setInputs] = useState({
      Bike_ID:"",
      Bike_Name:"",
      Price:"",
      Description:"",
      Colour:"",
      Received:"",
    });
  
    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (files) {
        setImage(files[0]);
      } else {
        setInputs(prevInputs => ({
          ...prevInputs,
          [name]: value
        }));
      }
    };
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
       
  if (!inputs.Bike_Name || !inputs.Bike_ID || !inputs.Price || !inputs.Received) {
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
      formData.append("Bike_ID", inputs.Bike_ID);
      formData.append("Bike_Name", inputs.Bike_Name);
      formData.append("Price", inputs.Price);
      formData.append("Description", inputs.Description);
      formData.append("Colour", inputs.Colour);
      formData.append("Received", inputs.Received);
      console.log(image, inputs);
  
      try {
        const result = await axios.post(
          "http://localhost:8070/addmodel",
          formData,
          
        );
        console.log(result);
  
        if (result.data.status === "Success") {
          alert("Success...!");
  
          window.location.href = "/viewmodellist";
        } else {
          alert("Fail...!");
        }
      } catch (error) {
        console.error("Error :", error);
      }
    };

  return (
    <div>
      <div className="full-page-container">
      <div> <h3 className="add-model-heading"> Add new Motorcycle Models to the Inventory </h3>
<form onSubmit={handleSubmit}>
    <div className="add-model-inventory-dashboard">
    <div class = "add-model-container">
      
      <div className="add-model-left-section">
        
    <label htmlFor="bike-name" className="add-model-label">Model Name:</label>
          <input
            type="text"
            id="item-name"
            name="Bike_Name"
            value={inputs.Bike_Name}
            onChange={handleChange}
            required
            className="add-model-input"
          />
          <br></br>
          <br></br>
          <label htmlFor="bike-id"className="add-model-label">Model ID:</label>
          <input
            type="text"
            id="bike-id"
            name="Bike_ID"
            value={inputs.Bike_ID}
            onChange={handleChange}
            required
            className="add-model-input"
          />
          <br></br>
          <br></br>
          <label htmlFor="description"className="add-model-label">Description:</label>
          <input
            type="text"
            id="description"
            name="Description"
            value={inputs.Description}
            onChange={handleChange}
            className="add-model-input"
          />
          <br></br>
          <br></br>
          <label htmlFor="price"className="add-model-label">Price:</label>
  <div className="add-model-price-input-container">
    <p>LKR</p>
    <input
      type="text"
      id="price"
      name="Price"
      value={inputs.Price}
      onChange={handleChange}
      required
      className="add-model-input"
    />
  </div>
          <br></br>
          <br></br>
          <Link to="/">
           <button className="add-model-button">Cancel</button></Link>
          </div>

          <div className="add-model-right-section">
          <br></br>
          <br></br>
          <label htmlFor="image"className="add-model-label">Image (Upload):</label>
          <input type="file" id="image" name="Image" onChange={handleChange} />
          <br></br>
          <br></br>
          <label htmlFor="quantity"className="add-model-label">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="Received"
            min="1"
            value={inputs.Received}
            onChange={handleChange}
            required
            className="add-model-input"
          />

          <br></br>
          <br></br>
          <label htmlFor="colour"className="add-model-label">Colour:</label>
          <input
          type="text"
          id="colour"
          name="Colour"
          value={inputs.Colour}
          onChange={handleChange}
          className="add-model-input"
          />
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
       
  
          <button className="add-model-button">Add</button>
          </div>
          
</div>
</div>
</form>
</div>
    </div>
    </div>

  )
}

export default Add_model
