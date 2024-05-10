import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaUserAlt, FaBox, FaShoppingCart } from "react-icons/fa";
import { AiOutlineMore } from "react-icons/ai";
import NavigationBar from "../AdminNavigation/NavigationBar";
import Nav from "../Nav/Nav";

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [stockLevelPercentage, setStockLevelPercentage] = useState(0);
  const [totalOrderCount, setTotalOrderCount] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const usersResponse = await axios.get("http://localhost:8070/user/");
      const users = usersResponse.data.users;
      setTotalUsers(users.length);

      // Fetch stock level percentage and total order count data here
      // For demonstration purposes, setting dummy values
      setStockLevelPercentage(75); // Assuming stock level is at 75%
      setTotalOrderCount(150);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Nav />
      <NavigationBar />
      <Container>
        <AnalyticCard icon={<FaUserAlt />} value={totalUsers} label="Total Users" />
        <AnalyticCard icon={<FaBox />} value={`${stockLevelPercentage}%`} label="Stock Level " />
        <AnalyticCard icon={<FaShoppingCart />} value={totalOrderCount} label="Total Order " />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #f0f0f0;
`;

const AnalyticCard = ({ icon, value, label }) => (
  <Card>
    <div className="icon">{icon}</div>
    <div className="content">
      <div className="value">{value}</div>
      <div className="label">{label}</div>
    </div>
    <div className="more">
      <AiOutlineMore />
    </div>
  </Card>
);

const Card = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 20px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  .icon {
    margin-right: 20px;
    font-size: 28px;
    color: #2f69cc;
  }

  .content {
    flex: 1;
  }

  .value {
    font-size: 32px;
    font-weight: bold;
    color: #333;
    margin-bottom: 5px;
  }

  .label {
    font-size: 16px;
    color: #666;
    letter-spacing: 0.5px;
    line-height: 1.4;
  }

  .more {
    font-size: 22px;
    color: #999;
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: #666;
    }
  }
`;

export default AdminDashboard;