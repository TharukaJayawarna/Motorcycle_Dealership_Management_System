import React, { useEffect, useState } from "react";
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";
import "./Motorcycle_gallery_Inventory_management.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL_ITEMS = "http://localhost:8070/items";

function Motorcycle_gallery_Inventory_management(props) {
  const [items, setItems] = useState([]);
  const [noItems, setNoItems] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const history = useNavigate();

  useEffect(() => {
    fetchItems();
  }, [selectedCategory]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(URL_ITEMS);
      let filteredItems = response.data.items;

      if (selectedCategory) {
        filteredItems = filteredItems.filter(item => item.Category === selectedCategory);
      }

      setItems(filteredItems);
      setNoItems(filteredItems.length === 0);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "" && !selectedCategory) {
      fetchItems();
    } else {
      let filteredItems = items.filter((item) =>
        Object.values(item).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );

      if (selectedCategory) {
        filteredItems = filteredItems.filter(item => item.Category === selectedCategory);
      }

      setItems(filteredItems);
      setNoItems(filteredItems.length === 0);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleViewDetails = (item) => {
    if (item.In_Stock <= 0) {
      alert("This item is out of stock.");
    } else {
      history(`/item/${item._id}`);
    }
  };

  return (
    <div>
      <Home_navbar></Home_navbar>
      <br></br>
      <div className="gallery-search-bar">
        <input
          type="text"
          placeholder="Find Anything In Here..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" onClick={handleSearch}>Search</button>
      </div>
      <img src="https://africa-business.com/features/images-africa/motorcycle-spare-parts-africa.jpg" className="gallery-image" alt="img" />
      <div className="category-buttons">
        <button
          className={`category-button ${selectedCategory === "" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("")}
        >
          All
        </button>
        <button
          className={`category-button ${selectedCategory === "Batteries" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Batteries")}
        >
          Batteries
        </button>
        <button
          className={`category-button ${selectedCategory === "Rasers" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Rasers")}
        >
          Razors
        </button>
        <button
          className={`category-button ${selectedCategory === "Chain Spocket Set" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Chain Spocket Set")}
        >
          Chain Sprocket Sets
        </button>
        <button
          className={`category-button ${selectedCategory === "Oil Filters" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Oil Filters")}
        >
          Oil Filters
        </button>
        <button
          className={`category-button ${selectedCategory === "Clutch Cables" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Clutch Cables")}
        >
          Clutch Cables
        </button>
        <button
          className={`category-button ${selectedCategory === "Meter Cables" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Meter Cables")}
        >
          Meter Cables
        </button>
        <button
          className={`category-button ${selectedCategory === "Disk Pads" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Disk Pads")}
        >
          Disk Pads
        </button>
        <button
          className={`category-button ${selectedCategory === "Brake Liners" ? "active" : ""}`}
          onClick={() => handleCategoryFilter("Brake Liners")}
        >
          Brake Liners
        </button>
      </div>
      <br/>
     
      <h2 className="gallery-h2">Spare Parts And Accessories</h2>
      
      {noItems && <p>No items found.</p>}
      <div className="gallery-container">
        {items.map((item, i) => (
          <div key={i} className="gallery-item">
            <img src={`http://localhost:8070/${item.Image}`}  alt={item.Item_Name} />
            <div className="gallery-item-details">
              <p className="gallery-p">Item ID: {item.Item_ID}</p>
              <p className="gallery-p">Name: {item.Item_Name}</p>
              <p className="gallery-p">Price: LKR {item.Price}</p>
              <p
                className={`gallery-button1 ${
                  item.In_Stock > 0 ? "in-stock" : "out-of-stock"
                }`}
              >
                {item.In_Stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
            </div>
            <button
              type="button"
              className="gallery-button"
              onClick={() => handleViewDetails(item)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
      <br />
      <Home_footer></Home_footer>
    </div>
  );
}

export default Motorcycle_gallery_Inventory_management;