import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Update_item.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Update_item() {
  const [image, setImage] = useState("");
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8070/items/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.item));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      const response = await axios.put(`http://localhost:8070/items/${id}`, {
        Item_ID: String(inputs.Item_ID),
        Item_Name: String(inputs.Item_Name),
        Price: String(inputs.Price),
        Manufacturer: String(inputs.Manufacturer),
        Category: String(inputs.Category),
        Compatible_Motorcycle_Models: String(
          inputs.Compatible_Motorcycle_Models
        ),
        Received: Number(inputs.Received),
      });
      if (response.data.items) {
        alert("Item details updated successfully");
        history("/viewitemlist");
      } else {
        alert("Unable to update item details");
      }
    } catch (error) {
      console.error("Error updating item details:", error);
      alert("Error updating item details. Please try again later.");
    }
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest();
  };

  return (
   <div>

<div className="full-page-container">
     <div>
      <div>
        <h3 className="IM_UpdateItem-heading">
          Update Item Details in the Inventory
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="IM_UpdateItem-inventory-dashboard">
            <div className="IM_UpdateItem-container">
              <div className="IM_UpdateItem-left-section">
                <label htmlFor="item-name" className="IM_UpdateItem-label">
                  Item Name:
                </label>
                <input
                  type="text"
                  id="item-name"
                  name="Item_Name"
                  value={inputs.Item_Name}
                  onChange={handleChange}
                  className="IM_UpdateItem-input"
                  required
                />
                <br />
                <br />
                <label htmlFor="item-id" className="IM_UpdateItem-label">
                  Item ID:
                </label>
                <input
                  type="text"
                  id="item-id"
                  name="Item_ID"
                  value={inputs.Item_ID}
                  onChange={handleChange}
                  className="IM_UpdateItem-input"
                  required
                />
                <br />
                <br />
                <label htmlFor="manufacturer" className="IM_UpdateItem-label">
                  Manufacturer:
                </label>
                <input
                  type="text"
                  id="manufacturer"
                  name="Manufacturer"
                  value={inputs.Manufacturer}
                  onChange={handleChange}
                  className="IM_UpdateItem-input"
                />
                <br />
                <br />
                <label htmlFor="price" className="IM_UpdateItem-label">
                  Price:
                </label>
                <input
                  type="text"
                  id="price"
                  name="Price"
                  value={inputs.Price}
                  onChange={handleChange}
                  className="IM_UpdateItem-input"
                  required
                />
                <br />
                <br />
                <br />
                <br />

                <Link to="/viewitemlist">
                  <button className="IM_UpdateItem-button">Cancel</button>
                </Link>
              </div>
              <div className="IM_UpdateItem-right-section">
                <label htmlFor="image" className="IM_UpdateItem-label">
                  Image:
                </label>
                <img
                  src={`http://localhost:8070/${inputs.Image}`}
                  height={100}
                  width={100}
                  alt={inputs.name}
                />
                <br />
                <br />
                <label htmlFor="received" className="IM_UpdateItem-label">
                  Received:
                </label>
                <input
                  type="number"
                  id="received"
                  name="Received"
                  min="1"
                  value={inputs.Received}
                  onChange={handleChange}
                  className="IM_UpdateItem-input"
                  required
                />
                <br />
                <br />
                <label
                  htmlFor="compatible-models"
                  className="IM_UpdateItem-label"
                >
                  Compatible Motorcycle Models:
                </label>
                <input
                  type="text"
                  id="compatible-models"
                  name="Compatible_Motorcycle_Models"
                  value={inputs.Compatible_Motorcycle_Models}
                  onChange={handleChange}
                  className="IM_UpdateItem-input"
                />
                <br />
                <br />
                <label htmlFor="category" className="IM_UpdateItem-label">
                  Category:
                </label>
                <input
                  type="text"
                  id="category"
                  name="Category"
                  value={inputs.Category}
                  onChange={handleChange}
                  className="IM_UpdateItem-input"
                />
                <br />
                <br />
                <button type="submit" className="IM_UpdateItem-button">
                  Update
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
   </div>
   </div>
  );
}

export default Update_item;
