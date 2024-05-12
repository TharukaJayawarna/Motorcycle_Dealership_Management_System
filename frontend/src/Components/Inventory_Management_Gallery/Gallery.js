import React, { useEffect, useState } from "react";
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";
import "./Gallery.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL_BIKES = "http://localhost:8070/bikes";

function Gallery(props) {
  const [bikes, setBikes] = useState([]);
  const [noBikes, setNoBikes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBikes();
  }, []);

  const fetchBikes = async () => {
    try {
      const response = await axios.get(URL_BIKES);
      setBikes(response.data.bikes);
      setNoBikes(response.data.bikes.length === 0);
    } catch (error) {
      console.error("Error fetching bikes:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchBikes();
    } else {
      const filteredBikes = bikes.filter((bike) =>
        Object.values(bike).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      setBikes(filteredBikes);
      setNoBikes(filteredBikes.length === 0);
    }
  };

  const viewDetails = (id) => {
    navigate(`/bikes/${id}`);
  };

  return (
    <div>
      <div className="full-page-container">
<div>
      
      <Home_navbar />
      
      <br />
      
      <div className="IM_Gallery-search-bar">
        <input
          type="text"
          placeholder="Find Anything In Here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <br />
      <img src="../Images/01.jpg" className="IM_Gallery-image" alt="img" />
      <br />
      <h2 className="IM_Gallery-h2">Motorcycle Models</h2>
      {noBikes && <p className="IM_Gallery-p">No bikes found.</p>}
      <div className="IM_Gallery-container">
        {bikes.map((bike, i) => (
          <div key={i} className="IM_Gallery-item">
             <img
                  src={`http://localhost:8070/${bike.Image}`}
                  
                  alt={bike.name}
                />
            <div className="IM_Gallery-item-details">
              <p className="IM_Gallery-p">Bike ID: {bike.Bike_ID}</p>
              <p className="IM_Gallery-p">Name: {bike.Bike_Name}</p>
              <p className="IM_Gallery-p">Price: LKR {bike.Price}</p>
              <p className="IM_Gallery-p">Colour: {bike.Colour}</p>
              <p className={bike.In_Stock > 0 ? "IM_Gallery-in-stock" : "IM_Gallery-out-of-stock"}>
                {bike.In_Stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            <button
              type="button"
              className="IM_Gallery-button"
              onClick={() => viewDetails(bike._id)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <br />
      <br />
      <Home_footer />
    </div>
    </div>
    </div>
    
  );
}

export default Gallery;