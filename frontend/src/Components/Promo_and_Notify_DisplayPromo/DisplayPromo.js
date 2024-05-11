import React from 'react';
import Nav from '../Nav/Nav';
import Promo from '../Promo_and_Notify_Promo/Promo';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./DisplayPromo.css"
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";

const DisplayPromo = () => {
  const [promos, setPromos] = React.useState([]);

  React.useEffect(() => {
    axios.get("http://localhost:8070/promos")
      .then(res => {
        setPromos(res.data.promos);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <Home_navbar />
       <br/>
      <h1 className="unique-heading">Display Promotions</h1>
      <br/>
      <br/>
      <div>
        {promos.map(promo => (
          <div key={promo._id}>
            <Promo promo={promo} isDisplayPage={true} />
          </div>
        ))}
        <div style={{
  position: 'absolute',
  top: '20%',
  left: '10%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'black',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none',
  cursor: 'pointer'
}}>
  <Link to={`/home-main/`} style={{ color: 'white' }}>Go Back</Link>
</div>
      </div>
      <Home_footer />
    </div>
  );
}

export default DisplayPromo;
