import React from 'react';
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";
import './home-main.css';

function Home() {
  return (
    <div className="home-container-x">
      <Home_navbar />
      <main className="home-content-x">
        <section className="hero-section-x">
          <h1>Welcome to Jayawarna Auto</h1>
          <p>Explore our wide range of motorcycle models, parts, and accessories.</p>
          <a href="/userhomegallery/motorcycle-models" className="btn-x">View Motorcycle Models</a>  <a href="/userhomegallery/parts-and-accessories" className="btn-x">View Parts & Accessories</a>
         
        </section>
        <section className="featured-section-x">
          <h2>Featured Products</h2>
          <div className="featured-products-x">
            <div className="product-card-x">
              <img src="../Images/product1.jpg" alt="Product 1" />
              <h3>Motorcycle Model A</h3>
              <p>Description of Motorcycle Model A</p>
              <a href="/userhomegallery/motorcycle-models" className="btn-x">Learn More</a>
            </div>
            <div className="product-card-x">
              <img src="../Images/product2.jpg" alt="Product 2" />
              <h3>Motorcycle Model B</h3>
              <p>Description of Motorcycle Model B</p>
              <a href="/userhomegallery/motorcycle-models" className="btn-x">Learn More</a>
            </div>
            <div className="product-card-x">
              <img src="../Images/product3.jpg" alt="Product 3" />
              <h3>Motorcycle Accessory X</h3>
              <p>Description of Motorcycle Accessory X</p>
              <a href="/userhomegallery/parts-and-accessories" className="btn-x">Learn More</a>
            </div>
          </div>
        </section>
        <section className="promotions-section-x">
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
</section>
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
      < Home_footer />
    </div>
  );
}

export default Home;