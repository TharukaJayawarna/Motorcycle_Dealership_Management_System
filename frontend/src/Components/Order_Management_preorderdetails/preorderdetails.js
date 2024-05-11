import React, { useState, useEffect } from "react";
import axios from "axios";
import "./preorderdetails.css";

const PreOrderDetailsPage = () => {
  const [preOrders, setPreOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8070/preorders")
      .then((response) => {
        setPreOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleDeletePreOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/preorders/${id}`);
      setPreOrders((prevPreOrders) =>
        prevPreOrders.filter((preOrder) => preOrder._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filteredPreOrders = preOrders.filter((preOrder) =>
    Object.values(preOrder)
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pre-order-details-container-kj">
      <h1 className="page-title-kj">Pre-Order Details</h1>
      <div className="search-container-kj">
        <input
          type="text"
          placeholder="Search pre-orders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input-kj"
        />
      </div>
      <div className="table-container-kj">
        <table className="pre-order-table-kj">
          <thead>
            <tr>
              <th>Pre-Order ID</th>
              <th>Bike Name</th>
              <th>Bike Color</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Payment Slip</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPreOrders.map((preOrder) => (
              <tr key={preOrder._id} className="table-row-kj">
                <td>{preOrder.PreOrder_ID}</td>
                <td>{preOrder.Bike_Name}</td>
                <td>{preOrder.Bike_Color}</td>
                <td>{preOrder.Quantity}</td>
                <td>{preOrder.Date}</td>
                <td>{preOrder.Cus_Name}</td>
                <td>{preOrder.Email}</td>
                <td>
                  {preOrder.Payment_slip ? (
                    <a
                      href={preOrder.Payment_slip}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="button-link-kj"
                    >
                      View Payment Slip
                    </a>
                  ) : (
                    <button className="button-link-kj" disabled>
                      View Payment Slip
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="cancel-pre-order-button-kj"
                    onClick={() => handleDeletePreOrder(preOrder._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PreOrderDetailsPage;
