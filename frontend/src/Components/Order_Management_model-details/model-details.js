import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";
import "./model-details.css";

const BikeDetails = () => {
  const { id } = useParams();
  const [bike, setBike] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBikeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/bikes/${id}`);
        setBike(response.data.bike);
      } catch (error) {
        console.error("Error fetching bike details:", error);
      }
    };
    fetchBikeDetails();
  }, [id]);

  const handleReserve = () => {
    if (quantity > bike.In_Stock) {
      setError(`Quantity cannot exceed the available stock. Available quantity is: ${bike.In_Stock}`);
    } else {
      navigate("/reserve", { state: { bike, quantity } });
    }
  };

  const handlePreOrder = () => {
    navigate("/preorder", { state: { bike, quantity } });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setQuantity(value);
    setError("");
  };

  return (
   <div>
    <div className="full-page-container">
     <div>
      <Home_navbar />

      <div className="container">
        {bike ? (
          <div className="om-bike-details-card">
            <div className="om-bike-details-card-body">
              <div className="row">
                <div className="col-md-6">
                  <img
                    src={`http://localhost:8070/${bike.Image}`}
                  
                    alt={bike.Bike_Name}
                    className="om-bike-details-card-img"
                  />
                </div>
                <div className="col-md-6">
                  <h3 className="om-bike-details-card-title">{bike.Bike_Name}</h3>
                  <div className="om-bike-details-card-info">
                    <p>Bike ID: {bike.Bike_ID}</p>
                    <p>Price: LKR {bike.Price}</p>
                    <p>Colour: {bike.Colour}</p>
                    <p>Description: {bike.Description}</p>
                    <p>In Stock: {bike.In_Stock}</p>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="form-control"
                      min="1"
                      max={bike.In_Stock}
                    />
                    {error && <div className="text-danger">{error}</div>}
                  </div>
                  <div className="om-bike-details-card-actions">
                    {bike.In_Stock > 0 ? (
                      <button
                        className="btn btn-success om-bike-details-card-btn"
                        onClick={handleReserve}
                      >
                        Reserve
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning om-bike-details-card-btn"
                        onClick={handlePreOrder}
                      >
                        Pre-Order
                      </button>
                    )}
                    <button
                      className="btn btn-secondary om-bike-details-card-btn"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>Loading bike details...</p>
        )}
        
      </div>
      </div>
      </div>
      <div className="om9"><Home_footer />
    </div></div>
   
      
  );
};

export default BikeDetails;