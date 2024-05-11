import React from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'bootstrap/dist/css/bootstrap.min.css';
import empPaymentImage from './FinancialManagement/images/emp_payment.jpeg';
import supplierPaymentsImage from './FinancialManagement/images/sup_payment.jpeg';
import additionalPaymentsImage from './FinancialManagement/images/add_payment.jpeg';

const FinancialReport = () => {
    const handleDownloadEmployeeReport = async () => {
        try {
            const response = await fetch('http://localhost:8070/api/salaries/getAllSalaries');
            const employeePayments = await response.json();

            const doc = new jsPDF();
            doc.autoTable({
                head: [['Employee ID', 'Employee Name', 'Basic Salary', 'Bonus', 'Net Salary']],
                body: employeePayments.map(payment => [payment.Employee_ID, payment.Employee_Name, payment.Basic_Salary, payment.Bonus, payment.Net_Salary])
            });
            doc.save('employee-report.pdf');
        } catch (error) {
            console.error('Error generating employee report:', error);
        }
    };

    const handleDownloadSupplierReport = async () => {
        try {
            const response = await fetch('http://localhost:8070/api/suppliers/getAllSuppliers');
            const supplierPayments = await response.json();

            const doc = new jsPDF();
            doc.autoTable({
                head: [['Supplier ID', 'Supplier Name', 'Invoice Number', 'Amount']],
                body: supplierPayments.map(payment => [payment.supplierID, payment.supplierName, payment.Invoice_No, payment.amount])
            });
            doc.save('supplier-report.pdf');
        } catch (error) {
            console.error('Error generating supplier report:', error);
        }
    };

    const handleDownloadAdditionalReport = async () => {
        try {
            const response = await fetch('http://localhost:8070/api/additionals/getAllAdditionals');
            const additionalPayments = await response.json();

            const doc = new jsPDF();
            doc.autoTable({
                head: [['Bill ID', 'Additional Payment Name', 'Amount']],
                body: additionalPayments.map(payment => [payment.billId, payment.additionalPaymentName, payment.amount])
            });
            doc.save('additional-report.pdf');
        } catch (error) {
            console.error('Error generating additional report:', error);
        }
    };

    return (
        <div className="container my-4" style={{ backgroundColor: '#00538C', borderRadius: '20px' }}>
            <div className="card p-4">
                <h2 className="mb-4 text-center"><b>Download Financial Reports</b></h2>
                <div className="button-container">
                    <center>
                    <button className="financial-button" onClick={handleDownloadEmployeeReport}>
                        <img src={empPaymentImage} alt="Employee Payments"></img>
                        <span>Download Employee Payments Report</span>
                    </button>
                    </center>
                    <center>
                    <button className="financial-button" onClick={handleDownloadSupplierReport}>
                        <img src={supplierPaymentsImage} alt="Supplier Payments"></img>
                        <span>Download Supplier Payments Report</span>
                    </button>
                    </center>
                    <center>
                    <button className="financial-button" onClick={handleDownloadAdditionalReport}>
                        <img src={additionalPaymentsImage} alt="Additional Payments"></img>
                        <span>Download Additional Payments Report</span>
                    </button>
                    </center>
                </div>
            </div>
        </div>
    );
};

export default FinancialReport;
