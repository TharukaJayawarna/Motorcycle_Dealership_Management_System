import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaMoneyBillWave, FaMoneyCheck } from "react-icons/fa";
import NavigationBar from "../ManagerNavigation/NavigationBar";
import Nav from "../Nav/Nav";

function ManagerDashboard() {

  const [totalEmployeePayments, setTotalEmployeePayments] = useState(500000);
  const [totalSupplierPayments, setTotalSupplierPayments] = useState(30000);
  const [totalAdditionalPayments, setTotalAdditionalPayments] = useState(32000);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch total income, total expense, total employee payments,
      // total supplier payments, and total additional payments data from API

      const employeePaymentsResponse = await axios.get("http://localhost:8070/employee-payments");
      const supplierPaymentsResponse = await axios.get("http://localhost:8070/supplier-payments");
      const additionalPaymentsResponse = await axios.get("http://localhost:8070/additional-payments");

      const totalEmployeePaymentsData = employeePaymentsResponse.data.employeePayments;
      const totalSupplierPaymentsData = supplierPaymentsResponse.data.supplierPayments;
      const totalAdditionalPaymentsData = additionalPaymentsResponse.data.additionalPayments;


      setTotalEmployeePayments(totalEmployeePaymentsData);
      setTotalSupplierPayments(totalSupplierPaymentsData);
      setTotalAdditionalPayments(totalAdditionalPaymentsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Nav />
      <NavigationBar />
      <Container>
  
        <AnalyticCard icon={<FaMoneyCheck />} value={totalEmployeePayments} label="Total Employee Payments" />
        <AnalyticCard icon={<FaMoneyCheck />} value={totalSupplierPayments} label="Total Supplier Payments" />
        <AnalyticCard icon={<FaMoneyCheck />} value={totalAdditionalPayments} label="Total Additional Payments" />
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
      <div className="value">Rs. {value.toLocaleString()}</div>
      <div className="label">{label}</div>
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
};`

export default ManagerDashboard;
