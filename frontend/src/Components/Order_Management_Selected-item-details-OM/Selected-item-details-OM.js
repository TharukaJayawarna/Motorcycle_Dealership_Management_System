import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Selected-item-details-OM.css";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";


function SelectedItemDetailsOM() {
  const [item, setItem] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [isOutOfStock, setIsOutOfStock] = useState(false);
  const [availableStock, setAvailableStock] = useState(0);
  const [additionalDetails, setAdditionalDetails] = useState({});

  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:8070/items/${id}`);
        setItem(response.data.item);
        setIsOutOfStock(response.data.item.In_Stock <= 0);
        setAvailableStock(response.data.item.In_Stock);
        setAdditionalDetails({
          Compatible_Motorcycle_Models: response.data.item.Compatible_Motorcycle_Models,
          Manufacturer: response.data.item.Manufacturer
        });
      } catch (error) {
        console.error("Error fetching item details: ", error);
      }
    };
    fetchItem();
  }, [id]);

  const handleAddToCart = async () => {
    if (isOutOfStock) {
      alert("This item is out of stock.");
      return;
    }

    if (quantity > availableStock) {
      alert(`Sorry, you can only add up to ${availableStock} items to the cart.`);
      return;
    }

    try {
      await axios.post(`http://localhost:8070/carts`, {
        Item_ID: item.Item_ID,
        Item_Name: item.Item_Name,
        Item_Price: item.Price,
        Quantity: quantity,
      });
      navigate("/userhomegallery/parts-and-accessories");
    } catch (error) {
      console.error("Error adding item to cart: ", error);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > availableStock) {
      setQuantity(availableStock);
      alert(`Sorry, you can only add up to ${availableStock} items.`);
    } else {
      setQuantity(newQuantity);
    }
  };

  const handleCheckoutFromItemDetails = () => {
    if (isOutOfStock) {
      alert("This item is out of stock.");
      return;
    }

    if (quantity > availableStock) {
      alert(`Sorry, you can only buy up to ${availableStock} items.`);
      return;
    }

    if (!item || !item.Item_ID || !item.Item_Name || !item.Price) {
      console.error("Item details are incomplete.");
      return;
    }

    navigate("/buynow", {
      state: {
        item: {
          Item_ID: item.Item_ID,
          Item_Name: item.Item_Name,
          Price: item.Price,
          image: item.image,
          ...additionalDetails
        },
        quantity: quantity
      }
    });
  };

  return (
    <div>
      <Home_navbar />
      <div className="container">
        <h3 className="om-heading-1">Item Details</h3>
        <div className="card-container">
          <div className="card">
            <div className="card-image">
              <img src={`http://localhost:8070/${item.Image}`} alt="item" />
            </div>
            <div className="card-content">
              <h4 className="card-title">{item.Item_Name}</h4>
              <div className="card-details">
                <div className="detail">
                  <label>Item ID:</label>
                  <span>{item.Item_ID}</span>
                </div>
                <div className="detail">
                  <label>Price:</label>
                  <span>LKR{item.Price}</span>
                </div>
                <div className="detail">
                  <label>Manufacturer:</label>
                  <span>{additionalDetails.Manufacturer}</span>
                </div>
                <div className="detail">
                  <label>Compatible Models:</label>
                  <span>{additionalDetails.Compatible_Motorcycle_Models}</span>
                </div>
                <div className="detail">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    name="Quantity"
                    min="1"
                    max={availableStock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="quantity-input"
                  />
                  {quantity > availableStock && (
                    <p className="error-message">
                      Sorry, you can only add up to {availableStock} items.
                    </p>
                  )}
                </div>
              </div>
              {isOutOfStock ? (
                <p className="out-of-stock">This item is out of stock.</p>
              ) : (
                <div className="card-actions">
                  <button
                    type="button"
                    className="buy-now-button"
                    onClick={handleCheckoutFromItemDetails}
                  >
                    Buy Now
                  </button>
                  <button
                    type="button"
                    className="add-to-cart-button"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Home_footer />
    </div>
  );
}

export default SelectedItemDetailsOM;