import React, { useEffect, useState } from "react";
import Home_navbar from "../Home_navbar_Inventory_management/Home_navbar";
import Home_footer from '../Home_footer_Inventory_management/Home_footer'
import "./Motorcycle_gallery_Inventory_management.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL_ITEMS = "http://localhost:8070/items";


function Motorcycle_gallery_Inventory_management(props) {
  const [items, setItems] = useState([]);
  const [noItems, setNoItems] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const history = useNavigate();

  useEffect(() => {
    fetchItems();
  
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL_ITEMS);
      setItems(response.data.items);
      setNoItems(response.data.items.length === 0);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchItems();
      
    } else {
      const filteredItems = items.filter((item) =>
        Object.values(item).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    
      setItems(filteredItems);
      setNoItems(filteredItems.length === 0);

    }
  };
  return (
    
    <div>
      <Home_navbar></Home_navbar>
      <br></br>
        <div className="search-bar">
        <input
          type="text"
          placeholder="Find Anything In Here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>Search</button>
      </div>
      <br/>
      <img src= "./Images/galleryimg.png"className="App-logo" alt="" />
      <h2>Spare Parts And Accessories</h2>
      
      {noItems && <p>No items found.</p>}
      <div className="gallery-container">
        {items.map((item, i) => (
          <div key={i} className="gallery-item">
            <img src={`data:base64,image/jpeg,${item.Item_Image}`} alt={item.Item_Name} />
            <div className="item-details">
              <p>Item ID: {item.Item_ID}</p>
              <p>Name: {item.Item_Name}</p>
              <p>Price: {item.Price}</p>
            </div>
          </div>
        ))}
      </div>
      <br />
      <Home_footer></Home_footer>
    </div>
  )
}

export default Motorcycle_gallery_Inventory_management
