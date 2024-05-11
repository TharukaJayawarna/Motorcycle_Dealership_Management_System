import React from 'react';
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import './Home_footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>
            <a href="https://wa.me/+94767721002" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp /> +94 76721002
            </a>
          </p>
          <p>
            <a href="mailto:jayawarnaauto@gmail.com">
              <FaEnvelope /> jayawarnaauto@gmail.com
            </a>
          </p>
          <p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Warapitiya+Junction%2C+Nakandalagoda%2C+Dharga+Town"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt /> Warapitiya Junction, Nakandalagoda, Dharga Town.
            </a>
          </p>
        </div>
        <div className="footer-newsletter">
          <h3>Subscribe to Our Newsletter</h3>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <a href="#"><FaFacebook /></a>
          <a href="#"><FaTwitter /></a>
          <a href="#"><FaInstagram /></a>
        </div>
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Jayawarna Auto (PVT) Limited. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;