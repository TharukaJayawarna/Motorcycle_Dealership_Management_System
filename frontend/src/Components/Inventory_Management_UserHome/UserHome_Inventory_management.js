import React from "react";
import Home_navbar from "../Inventory_Management_Home_navbar/Home_navbar";
import Home_footer from "../Inventory_Management_Home_footer/Home_footer";
import { Link } from 'react-router-dom';

function HomePage() {
  

  

  return (
    <div>
      {/* Header Section */}
      <header
        style={{
          backgroundImage:
            "url(https://www.bikebound.com/wp-content/uploads/2022/08/Honda-CB550-Cafe-Racer-9.jpg)",
          height: "500px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            maxWidth: "800px",
            padding: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              marginBottom: "20px",
            }}
          >
            Jayawarna Auto (PVT) Limited
          </h1>
          <p
            style={{
              fontSize: "24px",
              marginBottom: "30px",
            }}
          >
            A comprehensive web-based Motorcycle Dealership Management System to
            streamline and automate various aspects of their dealership
            operations.
          </p>
          <p
            style={{
              fontSize: "20px",
              marginBottom: "30px",
            }}
          >
            The system caters to the needs of customers, suppliers, and
            employees, providing a seamless and efficient experience.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/login">
      <button
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          color: "black",
          padding: "15px 30px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "18px",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease",
        }}
      >
        Login
      </button>
    </Link>
    
    <Link to="/register">
            <button
              
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                color: "black",
                padding: "15px 30px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: "bold",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                },
              }}
            >
              Sign Up
            </button>
            </Link>
          </div>
          
        </div>
      </header>
      {/* Navigation Bar */}
      <nav
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "15px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <li
            style={{
              margin: "0 20px",
            }}
          >
            <a
              href="/"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#007bff",
                },
              }}
            >
              Home
            </a>
          </li>
          <li
            style={{
              margin: "0 20px",
            }}
          >
            <a
              href="/features"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#007bff",
                },
              }}
            >
              Features
            </a>
          </li>
          <li
            style={{
              margin: "0 20px",
            }}
          >
            <a
              href="/pricing"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#007bff",
                },
              }}
            >
              Pricing
            </a>
          </li>
          <li
            style={{
              margin: "0 20px",
            }}
          >
            <a
              href="/contact"
              style={{
                color: "black",
                textDecoration: "none",
                fontSize: "18px",
                fontWeight: "bold",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#007bff",
                },
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
      {/* Main Section */}
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "40px 20px",
        }}
      >
        {/* Key Features Section */}
        <section
  className="key-features"
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    maxWidth: "1000px",
    width: "100%",
  }}
>
  <h2
    style={{
      fontSize: "32px",
      fontWeight: "bold",
      margin: "20px 0",
    }}
  >
    <img
      src="https://media.licdn.com/dms/image/C4E1BAQEoKisitV3k3g/company-background_10000/0/1645728284955/adam_systems_cover?e=2147483647&v=beta&t=3R2De39mvfOmJ88IEL4ZbpwNBZEMIPHOqjD4C3h9kMs"
      alt="Hero"
      style={{
        width: "100%",
        height: "200px",
        objectFit: "cover",
        borderRadius: "10px 10px 0 0",
      }}
    />
    <h2
      style={{
        fontSize: "32px",
        fontWeight: "bold",
        margin: "20px 0",
      }}
    ></h2>
    Dealership Management Platform
  </h2>
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: "20px",
    }}
  >
    <div
      style={{
        backgroundColor: "#f7f7f7", // Changed background color
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        User Account Management
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "rgba(0,0,0,0.6)",
        }}
      >
        Users must create accounts based on their roles. Human
        verification for enhanced security during registration.
      </p>
    </div>
    <div
      style={{
        backgroundColor: "#f7f7f7", // Changed background color
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Customer Access Control
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "rgba(0,0,0,0.6)",
        }}
      >
        Unregistered customers can access the gallery section only.
        Access to check motorcycle and spare parts availability, service
        and repair charges, and promotions details.
      </p>
    </div>
    <div
      style={{
        backgroundColor: "#f7f7f7", // Changed background color
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Customer Registration Benefits
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "rgba(0,0,0,0.6)",
        }}
      >
        Registered customers can purchase spare parts online, pre-order
        motorcycles and spare parts, book appointments for services and
        repairs, update personal information, and view previous
        purchases and services.
      </p>
    </div>
    <div
      style={{
        backgroundColor: "#f7f7f7", // Changed background color
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Feedback and Complaint Management
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "rgba(0,0,0,0.6)",
        }}
      >
        Features for giving feedback and making complaints. Updates
        through notifications.
      </p>
    </div>
    <div
      style={{
        backgroundColor: "#f7f7f7", // Changed background color
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        System Administrator Functions
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "rgba(0,0,0,0.6)",
        }}
      >
        Administrative tasks for managing all system users. Generate
        reports, update inventory and gallery, add/remove items, manage
        appointments, update service charges, access service history,
        and provide notifications.
      </p>
    </div>
    <div
      style={{
        backgroundColor: "#f7f7f7", // Changed background color
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Manager Responsibilities
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "rgba(0,0,0,0.6)",
        }}
      >
        Handle financial aspects, update promotions, allocate
        motorcycles. View requests from employees and suppliers,
        accept/decline requests. Access feedback and complaints, rate
        them, and make decisions based on them.
      </p>
    </div>
    <div
      style={{
        backgroundColor: "#f7f7f7", // Changed background color
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Supplier Portal Features
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "rgba(0,0,0,0.6)",
        }}
      >
        Suppliers can create accounts and securely log in. Manage
        account details, contact information, and preferences. Real-time
        visibility into current stock levels of spare parts. Submit
        restocking requests based on inventory levels. Automated
        notifications for approved or declined restocking requests.
      </p>
    </div>
    <div
      style={{
        backgroundColor: "#f7f7f7", // Changed background color
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        Employee Facilities
      </h3>
      <p
        style={{
          fontSize: "16px",
          color: "rgba(0,0,0,0.6)",
        }}
      >
        Access to request leaving forms, view salary details and
        bonuses, mark attendance, and submit complaints.
      </p>
    </div>
  </div>
</section>

      </main>
      {/* Footer */}
      <Home_footer /> {/* Assuming Home_footer component renders the footer */}
    </div>
  );
}

export default HomePage;
