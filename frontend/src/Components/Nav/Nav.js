import React from 'react';
import './nav.css'
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div>
      <ul classNames="home-ul">


<li className="home-li"><Link to="/profile" className="active home-a">
<h1>Profile</h1>
</Link>
</li>

<li className="home-li"><Link to="/dashboard" className="active home-a">
<h1>Logout</h1>
</Link>
</li>
</ul>
    </div>
  );
}

export default Nav;
