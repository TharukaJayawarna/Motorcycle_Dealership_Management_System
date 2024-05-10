import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";
import "./OM_cart.css";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:8070/carts");
        setCartItems(response.data.Carts);
        // Initialize the quantities state
        const initialQuantities = {};
        response.data.Carts.forEach((item) => {
          initialQuantities[item._id] = item.Quantity;
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching cart items: ", error);
      }
    };
    fetchCartItems();
  }, []);

  const handleRemoveFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/carts/${id}`);
      setCartItems(cartItems.filter((item) => item._id !== id));
      // Remove the quantity from the state
      const newQuantities = { ...quantities };
      delete newQuantities[id];
      setQuantities(newQuantities);
    } catch (error) {
      console.error("Error removing item from cart: ", error);
    }
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setQuantities({ ...quantities, [id]: newQuantity });
  };

  const handleIncreaseQuantity = (id) => {
    const currentQuantity = quantities[id] || 1;
    handleUpdateQuantity(id, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (id) => {
    const currentQuantity = quantities[id] || 1;
    if (currentQuantity > 1) {
      handleUpdateQuantity(id, currentQuantity - 1);
    }
  };

  const handleCheckout = (item) => {
    navigate("/checkout", { state: { item, quantity: quantities[item._id] || 1 } }); // Pass quantity to Checkout
  };

  const handleCheckoutAll = () => {
    const itemsToCheckout = cartItems.filter(item => quantities[item._id] > 0).map(item => {
      return { ...item, quantity: quantities[item._id] || 1 };
    });
    navigate("/checkout", { state: { items: itemsToCheckout } });
  };

  return (
    <div>
      <Home_navbar />
      <div className="container-om">
        <h3 className="om-heading1">Cart</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="card-om">
            <div className="card-body-om">
              <table className="table-om">
                <thead>
                  <tr>
                    <th>Item ID</th>
                    <th>Item Name</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Net Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id}>
                      <td>{item.Item_ID}</td>
                      <td>{item.Item_Name}</td>
                      <td>{item.Item_Price}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleDecreaseQuantity(item._id)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={quantities[item._id] || 1}
                          onChange={(e) =>
                            handleUpdateQuantity(item._id, e.target.value)
                          }
                        />
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleIncreaseQuantity(item._id)}
                        >
                          +
                        </button>
                      </td>
                      <td>
                        {(
                          item.Item_Price * (quantities[item._id] || 1)
                        ).toFixed(2)}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => handleRemoveFromCart(item._id)}
                        >
                          Remove
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => handleCheckout(item)}
                        >
                          Checkout
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                className="btn btn-primary2"
                onClick={handleCheckoutAll}
              >
                Checkout All Items
              </button>
            </div>
          </div>
        )}
      </div>
      <Home_footer />
    </div>
  );
}

export default Cart;
