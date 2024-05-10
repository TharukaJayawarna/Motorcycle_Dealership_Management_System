import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Update_model.css";
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function UpdateModel() {
  const [image, setImage] = useState("");
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:8070/bikes/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.bike));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try{
    const response = await axios
      .put(`http://localhost:8070/bikes/${id}`, {
        Bike_ID: String(inputs.Bike_ID),
        Bike_Name: String(inputs.Bike_Name),
        Price: String(inputs.Price),
        Description: String(inputs.Description),
        Colour: String(inputs.Colour),
        Received: Number(inputs.Received),
      });
      if (response.data.bike) {
        alert("Item details updated successfully");
        history("/viewmodellist");
      } else {
        alert("Item details updated successfully");
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
    sendRequest().then(() =>
      history("/viewmodellist"));
  };

  return (
    <div>
      <div>
        <h3 className="IM_UpdateModel-heading">Update Motorcycle Model Details in the Inventory</h3>
        <form onSubmit={handleSubmit}>
          <div className="IM_UpdateModel-inventory-dashboard">
            <div className="IM_UpdateModel-container">
              <div className="IM_UpdateModel-left-section">

                <label htmlFor="bike-name" className="IM_UpdateModel-label">Model Name:</label>
                <input
                  type="text"
                  id="bike-name"
                  name="Bike_Name"
                  value={inputs.Bike_Name}
                  onChange={handleChange}
                  className="IM_UpdateItem-input"
                  required
                />
                <br />
                <br />
                <label htmlFor="bike-id" className="IM_UpdateModel-label">Model ID:</label>
                <input
                  type="text"
                  id="bike-id"
                  name="Bike_ID"
                  value={inputs.Bike_ID}
                  onChange={handleChange}
                  className="IM_UpdateItem-input"
                  required
                />
                <br />
                <br />
                <label htmlFor="description" className="IM_UpdateModel-label">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="Description"
                  value={inputs.Description}
                  onChange={handleChange}
                  className="IM_UpdateItem-input"
                />
                <br />
                <br />
                <label htmlFor="price" className="IM_UpdateModel-label">Price:</label>
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
                <Link to="/viewmodellist"><button className="IM_UpdateModel-button">Cancel</button></Link>
              </div>

              <div className="IM_UpdateModel-right-section">
                <br />
                <br />
                <label htmlFor="image" className="IM_UpdateModel-label">Image:</label>
                <img
                  src={`http://localhost:8070/${inputs.Image}`}
                  height={100}
                  width={100}
                  alt={inputs.name}
                />
                <br />
                <br />
                <label htmlFor="received" className="IM_UpdateModel-label">Received:</label>
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
                <label htmlFor="colour" className="IM_UpdateModel-label">Colour:</label>
                <input
                  type="text"
                  id="colour"
                  name="Colour"
                  value={inputs.Colour}
                  className="IM_UpdateItem-input"
                  onChange={handleChange}
                />
                <br />
                <br />
                <br/>
                <button className="IM_UpdateModel-button" >Update</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateModel;
