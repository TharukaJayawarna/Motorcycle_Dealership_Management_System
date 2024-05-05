import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineMore } from "react-icons/ai";

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get("http://localhost:4000/user/");
      const users = usersResponse.data.users; // Assuming your API response contains a key named 'users' which holds an array of users
      setTotalUsers(users.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Container>
      <Section>
        <AnalyticCard icon={<FaUserAlt />} value={totalUsers} label="Total Users" />
      </Section>
    </Container>
  );
}

const Container = styled.div`
  /* Add styling for the main container if needed */
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  grid-template-columns: repeat(1, 1fr);
  justify-content: space-between;
  margin: 0 60px;

  .analytic {
    justify-content: space-between;
    padding: 1rem 2rem 1rem 2rem;
    border-radius: 1rem;
    color: black;
    background-color: #2f69cc;
    justify-content: space-evenly;
    align-items: center;
    transition: 0.5s ease-in-out;
    width: 200px;

    h6 {
      color: white;
    }

    .design {
      display: flex;
      align-items: center;

      .logo {
        background-color: #2f69cc;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          font-size: 2rem;
        }
      }
      .action {
        margin-left: 80px;
        svg {
          font-size: 1.5rem;
        }
      }
    }
    .transfer {
      margin-top: 20px;
      color: grey;
    }
    .money {
      margin-top: 20px;
    }
  }
`;

const AnalyticCard = ({ icon, value, label }) => (
  <div className="analytic">
    <div className="design">
      <div className="logo">{icon}</div>
      <div className="action">
        <AiOutlineMore />
      </div>
    </div>
    <div className="transfer">
      <h6>{label}</h6>
    </div>
    <div className="money">
      <h5>{value}</h5>
    </div>
  </div>
);

export default AdminDashboard;
