import React from "react";
import {Route, Routes} from "react-router";
import './App.css';
import FinancialManagement from "./Components/FinancialManagement/FinancialManagement";
import EmployeeSalaryForm from "./Components/EmployeeSalary";
import EmployeePayment from "./Components/EmplyoeePayment";
import SupplierForm from "./Components/SupplierForm";
import SupplierPayment from "./Components/SupplierPayment";
import AdditionalForm from "./Components/AdditionalForm";
import AdditionalPayment from "./Components/AdditionalPayment";
import UpdateEmployeeSalaryForm from "./Components/UpdateEmployeeSalary";
import FinancialReport from "./Components/FinancialReport";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
            <Route path="/" element={<FinancialManagement/>} />
            <Route path="/employee-salary" element={<EmployeeSalaryForm/>} />
            <Route path="/employee-payment" element={<EmployeePayment/>} />
            <Route path="/supplier-form" element={<SupplierForm/>} />
            <Route path="/supplier-payment" element={<SupplierPayment/>} />
            <Route path="/additional-form" element={<AdditionalForm/>} />
            <Route path="/additional-payment" element={<AdditionalPayment/>} />
            <Route path="/update-employee-salary/:id" element={<UpdateEmployeeSalaryForm/>} />
            <Route path="/financial-reports" element={<FinancialReport/>} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
