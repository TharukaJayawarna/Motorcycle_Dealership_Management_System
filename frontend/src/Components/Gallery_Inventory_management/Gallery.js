import React, { useEffect, useState } from "react";
import Home_navbar from "../Home_navbar_Inventory_management/Home_navbar";
import Home_footer from "../Home_footer_Inventory_management/Home_footer";
import "./Gallery.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL_BIKES = "http://localhost:8070/bikes";

function Gallery(props) {
  const [bikes, setBikes] = useState([]);
  const [noBikes, setNoBikes] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useNavigate();

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

  return (
    <div>
      <Home_navbar />

      <br />
      <div className="search-bar">
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
      <img src="./Images/galleryimg.png" className="image" alt="" />
      <br />
      <h2>Motorcycle Models</h2>
      {noBikes && <p>No bikes found.</p>}
      <div className="gallery-container">
        {bikes.map((bike, i) => (
          <div key={i} className="gallery-item">
            <img
              src={`data:base64,image/jpeg,${bike.Bike_Image}`}
              alt={bike.Bike_Name}
            />
            <div className="item-details">
              <p>Bike ID: {bike.Bike_ID}</p>
              <p>Name: {bike.Bike_Name}</p>
              <p>Price: {bike.Price}</p>
              <p>Colour: {bike.Colour}</p>
            </div>
          </div>
        ))}
      </div>

      <br />
      <Home_footer />
    </div>
  );
}

export default Gallery;
