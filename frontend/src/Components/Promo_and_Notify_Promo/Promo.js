import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./promo.css";

function Promo(props) {
  const { _id, description, image, date } = props.promo;
  const history = useNavigate();
  const location = useLocation();

  const deleteHandler = async () => {
    await axios
      .delete(`http://localhost:8070/promos/${_id}`)
      .then((res) => res.data)
      .then(() => history("/"))
      .then(() => history("/promodetails"));
  };

  const isDisplayPage = location.pathname === "/displaypromo";

  return (
    <div>
       
    <div className="container">
      <table className="promo-table">
        <tbody>
          <tr>
            <td className="profile-image">
              <img
                src={image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                alt=""
                className="avatar-image"
              />
            </td>
            <td>
              <h1 className="unique-heading">ID: {_id}</h1>
              <h1 className="unique-heading">Description: {description}</h1>
              <h1 className="unique-heading">Expiry Date: {new Date(date).toLocaleDateString()}</h1>
              {!isDisplayPage && (
                <div className="unique-button-group">
                  <button className="uni02-button">
                    <Link to={`/promodetails/${_id}`}>Update</Link>
                  </button>
                  <button className="uni01-button" onClick={deleteHandler}>
                    Delete
                  </button>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>

      
      
    
  );
}

export default Promo;
