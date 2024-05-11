import React from 'react';
import Nav from '../Nav/Nav';
import NavigationBar from '../ManagerNavigation/NavigationBar';
import { Link } from 'react-router-dom';
import './Home.css';

function Home1() {
  return (
    <div>
     <Nav />
      <NavigationBar /><br />
      <br /><br />
      <h1 className="unique-heading">Promo & Notification Home</h1>
      <br /> <br />
      <form className="unique-form">
        <button className="unique-button">
          <Link to={`/addpromo/`}>Promotions</Link>
        </button>
        <br/>
        <button className="unique-button">
          <Link to={`/notifications/`}>Notifications</Link>
        </button>
      </form>
    </div>
  );
}

export default Home1;
