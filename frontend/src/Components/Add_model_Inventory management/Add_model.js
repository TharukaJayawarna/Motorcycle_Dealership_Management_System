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
        // Form validation
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
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
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
      <div> <h3> Add new Motorcycle Models to the Inventory </h3>
<form onSubmit={handleSubmit}>
    <div className="inventory-dashboard">
    <div class = "container">
      
      <div className="left-section">
        
    <label for="bike-name">Model Name:</label>
          <input
            type="text"
            id="item-name"
            name="Bike_Name"
            value={inputs.Bike_Name}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <label for="bike-id">Model ID:</label>
          <input
            type="text"
            id="bike-id"
            name="Bike_ID"
            value={inputs.Bike_ID}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <label for="description">Description:</label>
          <input
            type="text"
            id="description"
            name="Description"
            value={inputs.Description}
            onChange={handleChange}
          />
          <br></br>
          <br></br>
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
          <br></br>
          <br></br>
           <button className="custom-button">Cancel</button>
          </div>

          <div className="right-section">
          <br></br>
          <br></br>
          <label for="image">Image (Upload):</label>
          <input type="file" id="image" name="Image" onChange={handleChange} />
          <br></br>
          <br></br>
          <label for="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="Received"
            min="1"
            value={inputs.Received}
            onChange={handleChange}
            required
          />

          <br></br>
          <br></br>
          <label for="colour">Colour:</label>
          <input
          type="text"
          id="colour"
          name="Colour"
          value={inputs.Colour}
          onChange={handleChange}
          />
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
       
  
          <button className="custom-button">Add</button>
          </div>
          
</div>
</div>
</form>
</div>
    </div>

  )
}

export default Add_model
