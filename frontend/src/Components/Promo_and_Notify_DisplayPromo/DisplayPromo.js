import React from 'react';
import Nav from '../Nav/Nav';
import Promo from '../Promo_and_Notify_Promo/Promo';
import { Link } from 'react-router-dom';
import axios from "axios";
import "./DisplayPromo.css"

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
      
       <br/>
      <h1 className="unique-heading">Promotions Display </h1>
      <br/>
      <br/>
      <div>
        {promos.map(promo => (
          <div key={promo._id}>
            <Promo promo={promo} isDisplayPage={true} />
          </div>
        ))}
      </div>
     
    </div>
  );
}

export default DisplayPromo;
