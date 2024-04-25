import React, { useEffect, useState } from 'react';
import './model_list.css'; 
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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

  useEffect(() => {
    fetchHandler().then((data) => setBikes(data.bikes));
  }, []);

  const deleteHandler = async (bikeId) => {
    await axios.delete(`http://localhost:8070/bikes/${bikeId}`)
      .then(() => {
        // Refresh the bike list after deletion
        fetchHandler().then((data) => setBikes(data.bikes));
      })
      .then(() => history("/viewmodellist"))
      .catch(error => console.error("Error deleting bike:", error));
  }

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredBikes = data.bikes.filter((bike) =>
        Object.values(bike).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setBikes(filteredBikes);
      setNoResults(filteredBikes.length === 0);
    });
  }

  return (
    <div>
      <h4>Motorcycle Models Inventory</h4>
      <div className="search-container">
        <input
          className="search-input"
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          name="search"
          placeholder="Search Models Here..."
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      <table>
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
                   src={`http://localhost:8070/Users/tharukajayawarna/Desktop/Motorcycle_Dealership_Management_System/frontend/public/Images/${bike.Image}`}
                  height={100}
                  width={100}
                  alt="photos"
                />
              </td>
              <td>{bike.Bike_ID}</td>
              <td>{bike.Bike_Name}</td>
              <td>{bike.Price}</td>
              <td>{bike.Description}</td>
              <td>{bike.Colour}</td> 
              <td>{bike.Received}</td>
              <td>{bike.In_Stock}</td>
              <td>
                <Link to={`/viewmodellist/${bike._id}`}><button className="custom-button">Edit</button></Link> <button onClick={() => deleteHandler(bike._id)} className="custom-button">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {noResults ? (
        <div>
          <p>No Item Found</p>
        </div>
      ) : null}
    </div>
  );
}

export default ModelList;
