import React from 'react';
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";
import './home-main.css';
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container-x">
      <Home_navbar />
      <main className="home-content-x">
        <section className="hero-section-x">
          <h1>Welcome to Jayawarna Auto</h1>
          <p>Explore our wide range of motorcycle models, parts, and accessories.</p>
          <a href="/userhomegallery/motorcycle-models" className="btn-x">View Motorcycle Models</a>
          <a href="/userhomegallery/parts-and-accessories" className="btn-x">View Parts & Accessories</a>
        </section>
        <section className="status-buttons-section-x">
          <div className="status-button">
          <button className="status-btn">
  <Link to="/reservationdetails">Reservation Status</Link>
</button>
</div>
<div className="status-button">
  <button className="status-btn">
    <Link to="/preorderdetails">Pre-Order Status</Link>
  </button>
</div>
<div className="status-button">
  <button className="status-btn">
    <Link to="/orderdetails">Order Status</Link>
  </button>
</div>
        </section>
        <section className="featured-section-x">
            <h2>Featured Products</h2>
            <div className="featured-products-x">
              <div className="product-card-x">
                <img
                  src="data:image/jpeg;base64,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"
                  alt="Product 1"
                />
                <h3>Dyno Scooby 125</h3>
                <p>Type: Petrol Motor Bike / Scooter</p>
                <a
                  href="http://localhost:3000/bikes/6639305f6c2876908b33940a"
                  className="btn-x"
                >
                  {" "}
                  More
                </a>
              </div>
              <div className="product-card-x">
                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2022/3/OQ/DF/PS/150142016/exide-xplore-motorcycle-vrla-bat-500x500.jpg"
                  alt="Product 2"
                />
                <h3>Battery</h3>
                <p>XLZ7LB</p>
                <a
                  href="http://localhost:3000/item/6639267067ff04483f437a3c"
                  className="btn-x"
                >
                  {" "}
                  More
                </a>
              </div>
              <div className="product-card-x">
                <img
                  src="https://www.dpmco.com/public/images/product/brake-shoe.png"
                  alt="Product 3"
                />
                <h3>Brake Liner</h3>
                <p>30151105</p>
                <a
                  href="http://localhost:3000/item/6639224c232d440c143e76ad"
                  className="btn-x"
                >
                  {" "}
                  More
                </a>
              </div>
            </div>
          </section>
        {/* <section className="promotions-section-x">
          <h2>Featured Promotions</h2>
          <div className="promotions-container-x">
            <div className="promotion-card-x">
              <img src="../Images/promotion1.jpg" alt="Promotion 1" />
              <div className="promotion-content-x">
                <h3>Summer Sale</h3>
                <p>Up to 50% off selected motorcycle models</p>
                <a href="/userhomegallery/motorcycle-models" className="btn-x">Shop Now</a>
              </div>
            </div>
            <div className="promotion-card-x">
              <img src="../Images/promotion2.jpg" alt="Promotion 2" />
              <div className="promotion-content-x">
                <h3>Free Shipping</h3>
                <p>On all orders over $100</p>
                <a href="/userhomegallery/parts-and-accessories" className="btn-x">Shop Accessories</a>
              </div>
            </div>
            <div className="promotion-card-x">
              <img src="../Images/promotion3.jpg" alt="Promotion 3" />
              <div className="promotion-content-x">
                <h3>Loyalty Program</h3>
                <p>Earn points and get exclusive rewards</p>
                <a href="#" className="btn-x">Learn More</a>
              </div>
            </div>
          </div>
        </section> */}
        <section className="services-repairs-section-x">
          <h2>Services & Repairs</h2>
          <div className="services-repairs-container-x">
            <div className="service-card-x">
              <h3>Recommended Service Intervals</h3>
              <p>
                General maintenance recommendations for your motorcycle by mileage or hours.
              </p>
              <a href="#" className="btn-x">Learn More</a>
            </div>
            <div className="service-card-x">
              <h3>Services Offered</h3>
              <p>
                From oil changes to tune-ups, we offer a wide range of services to keep your motorcycle running smoothly.
              </p>
              <a href="#" className="btn-x">View Services</a>
            </div>
            <div className="service-card-x">
              <h3>Service Hours</h3>
              <p>
                Our service hours differ from our store hours. Please check below for our service schedule.
              </p>
              <a href="#" className="btn-x">View Service Schedule</a>
            </div>
            <div className="service-card-x">
              <h3>Service Reviews</h3>
              <p>
                Read what our customers have to say about our service and repairs.
              </p>
              <a href="#" className="btn-x">Read Reviews</a>
            </div>
            <div className="service-card-x">
              <h3>Service Specials</h3>
              <p>
                Check out our current service specials and promotions.
              </p>
              <a href="#" className="btn-x">View Specials</a>
            </div>
            <div className="service-card-x">
              <h3>Customization</h3>
              <p>
                Let us help you personalize your motorcycle with our customization services.
              </p>
              <a href="#" className="btn-x">Learn More</a>
            </div>
            <div className="service-card-x">
              <h3>Certified Staff</h3>
              <p>
                Meet our certified service technicians and learn about their qualifications.
              </p>
              <a href="#" className="btn-x">Meet Our Team</a>
            </div>
            <div className="service-card-x">
              <h3>Warranty & Recalls</h3>
              <p>
                Learn about our warranty and recall policies for your motorcycle.
              </p>
              <a href="#" className="btn-x">View Warranty & Recalls</a>
            </div>
          </div>
        </section>
        <section className="about-section-x">
          <h2>About Jayawarna Auto</h2>
          <p>
            Jayawarna Auto is a leading provider of high-quality motorcycle models, parts, and accessories. With years of experience in the industry, we are dedicated to delivering exceptional customer service and ensuring your satisfaction.
          </p>
          <a href="#" className="btn-x">Learn More</a>
        </section>

      </main>
      <Home_footer />
    </div>
  );
}

export default Home;