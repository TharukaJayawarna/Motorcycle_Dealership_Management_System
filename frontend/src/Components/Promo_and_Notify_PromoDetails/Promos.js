// Promos.js
import React, { useState, useEffect, useRef } from 'react';
import Nav from '../Nav/Nav';
import './Promos.css';
import axios from "axios";
import Promo from '../Promo_and_Notify_Promo/Promo';
import { useReactToPrint } from "react-to-print";
import { Link } from 'react-router-dom';
import NavigationBar from '../ManagerNavigation/NavigationBar';

const URL = "http://Localhost:8070/promos";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Promos() {
  const [promos, setPromos] = useState();
  useEffect(() => {
    fetchHandler().then((data) => setPromos(data.promos));
  }, []);

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    DocumentTitle: "Promos Report",
    onafterprint: () => alert("Promos Report Successfully Download!")
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filteredPromos = data.promos.filter((promo) =>
        Object.values(promo).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setPromos(filteredPromos);
      setNoResults(filteredPromos.length === 0);
    });
  };

  return (
    <div>
     <Nav />
      <NavigationBar /><br />
      <h1 className="unique-heading">Promo Details </h1>
      <div className="unique-search-container">
        <input
          onChange={(e) => setSearchQuery(e.target.value)}
          type="text"
          id="search"
          placeholder="Search Promo Details"
        ></input>
        <button className="unique-search-button" onClick={handleSearch}>
          Search
        </button>
      </div>

      {noResults ? (
        <div>
          <p>No Users Found</p>
        </div>
      ) : (
        <div ref={ComponentsRef}>
          {promos &&
            promos.map((promo, i) => (
              <div key={i}>
                <Promo promo={promo} />
              </div>
            ))}
        </div>
      )}
      
      
      <div className="unique-button-group">
        <button className="unique-button">
          <Link to="/addpromo">Add Promo</Link>
        </button>
        <button onClick={handlePrint} className="unique-button">
          Download Report
        </button>
        <button className="unique-button">
          <Link to="/displaypromo">Display Promotions</Link>
        </button>
      </div>
    </div>
  );
}

export default Promos;
