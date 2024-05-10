import React, { useEffect, useState } from "react";
import "./model_list.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaPlus } from 'react-icons/fa';
import AlertBox from '../Inventory_Management_alert-box/alert-box';

const URL = "http://localhost:8070/bikes";

const fetchHandler = async () => {
  try {
    const response = await axios.get(URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bikes:", error);
    return [];
  }
};

function ModelList(props) {
  const [bikes, setBikes] = useState([]);
  const history = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [lowInventoryAlertCount, setLowInventoryAlertCount] = useState(0);

  useEffect(() => {
    fetchHandler().then((data) => setBikes(data.bikes));
    fetchLowInventoryBikes();
  }, []);

  const fetchLowInventoryBikes = async () => {
    try {
      const response = await axios.get(URL);
      const data = response.data;

      const lowStockBikes = data.filter(item => item.In_Stock <= 1);

      setLowInventoryAlertCount(prevCount => prevCount + lowStockBikes.length);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (bikeId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this model?"
    );
    if (confirmDelete) {
      await axios
        .delete(`${URL}/${bikeId}`)
        .then(() => {
          fetchHandler().then((data) => setBikes(data.bikes));
          history("/viewmodellist");
        })
        .catch((error) => console.error("Error deleting bike:", error));
    }
  };

  const handleAddModel = () => {
    history("/addmodel");
  };

  useEffect(() => {
    const filteredBikes = bikes.filter((bike) =>
      Object.values(bike).some((field) =>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setBikes(filteredBikes);
    setNoResults(filteredBikes.length === 0);
  }, [searchQuery]);

  return (
    <div>
      <h4 className="IM-subheading">Motorcycle Models Inventory</h4>
      <div className="IM-search-container">
        <input
          className="IM-search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Models Here..."
        />
        <button className="IM-add-button" onClick={handleAddModel}>
          <FaPlus /> Add Model
        </button>
      </div>

      {lowInventoryAlertCount > 0 && (
        <AlertBox type="warning" message={`Low Inventory Alert: ${lowInventoryAlertCount} bikes have low stock levels`} />
      )}

      <table className="IM-table">
        <thead>
          <tr>
            <th>Bike Image</th>
            <th>Bike ID</th>
            <th>Bike Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Colour</th>
            <th>Received</th>
            <th>In Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike, i) => (
            <tr key={i}>
              <td>
                <img
                  src={`http://localhost:8070/${bike.Image}`}
                  height={100}
                  width={100}
                  alt={bike.name}
                />
              </td>
              <td>{bike.Bike_ID}</td>
              <td>{bike.Bike_Name}</td>
              <td>{bike.Price}</td>
              <td>{bike.Description}</td>
              <td>{bike.Colour}</td>
              <td>{bike.Received}</td>
              <td
                style={{
                  color: bike.In_Stock <= 1 ? 'red' : 'black',
                }}
              >
                {bike.In_Stock}
                {bike.In_Stock <= 1 && (
                  <div className="restock-alert">
                    Restock!
                  </div>
                )}
              </td>
              <td>
                <Link to={`/viewmodellist/${bike._id}`}>
                  <button className="IM-custom-button">Edit</button>
                </Link>{" "}
                <button
                  onClick={() => deleteHandler(bike._id)}
                  className="IM-custom-button"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

     
    </div>
  );
}

export default ModelList;
