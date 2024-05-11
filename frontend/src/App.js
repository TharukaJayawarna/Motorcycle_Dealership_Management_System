import React from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
// import Home from "./Components/User_Profile_Management_Home/Home";
import Login from "./Components/User_Profile_Management_Login/Login";
import Register from "./Components/User_Profile_Management_Register/Register";
import AddUser from "./Components/User_Profile_Management_AddUser/AddUser";
import Users from "./Components/User_Profile_Management_UserDetails/Users";
import UpdateUser from "./Components/User_Profile_Management_UpdateUser/UpdateUser";
import UserDashboard from "./Components/UserDashboard/UserDashboard";
import EmployeeDahsboard from "./Components/EmployeeDashboard/EmployeeDahsboard";
import ManagerDashboard from "./Components/ManagerDashboard/ManagerDashboard";
import Profile from "./Components/User_Profile_Management_Profile/Profile";
import ResetPassword from "./Components/resetPassword/ResetPassword";
import OTP from "./Components/resetPassword/OTP";
import Admindashboard from "./Components/AdminDashboard/AdminDashboard";

import InventoryDashboard from "./Components/Inventory_Management_Inventory_dashboard/Inventory_dashboard";
import Add_Item from "./Components/Inventory_Management_Add_Item_Inventory management/Add_Item";
import Item_list from "./Components/Inventory_Management_Item_list/Item_list";
import Add_model from "./Components/Inventory_Management_Add_model_Inventory management/Add_model";
import Model_list from "./Components/Inventory_Management_Model_list/Model_list";
import Report from "./Components/Inventory_Management_Report/report";
import Update_item from "./Components/Inventory_Management_Update_item/Update_item";
import Update_model from "./Components/Inventory_Management_Update_model/Update_model";

import Gallery from "./Components/Inventory_Management_Gallery/Gallery";
import Motorcycle_gallery_Inventory_management from "./Components/Inventory_Management_item_gallery/Motorcycle_gallery_Inventory_management";
import UserHome_Inventory_management from "./Components/Inventory_Management_UserHome/UserHome_Inventory_management";

import SelectedItemDetailsOM from "./Components/Order_Management_Selected-item-details-OM/Selected-item-details-OM";
import OM_cart from "./Components/Order_Management_OM_cart/OM_cart";
import Checkout from "./Components/Order_Management_Checkout/Checkout";
import BuyNow from "./Components/Order_Management_BuyNow/BuyNow";
import MyOrders from "./Components/Order_Management_MyOrders/MyOrders";
import BikeDetails from "./Components/Order_Management_model-details/model-details";
import PreOrder from "./Components/Order_Management_preorder/preorder";
import Reserve from "./Components/Order_Management_reserve/reserve";

import Home from "./Components/Inventory_Management_home-main/home-main";
import OrderDashboard from "./Components/Order_Management_OrderDashboard/OrderDashboard";
import OrderDetails from "./Components/Order_Management_OrderDetails/OrderDetails";
import ReservationDetailsPage from "./Components/Order_Management_reservationdetails/reservationdetails";
import PreOrderDetailsPage from "./Components/Order_Management_preorderdetails/preorderdetails";
import CustomerPreOrderPage from "./Components/Order_Management_mypreorders/mypreorders";
import UserReservationDetailsPage from "./Components/Order_Management_myreservations/myreservations";
import ReportPage from "./Components/Order_Management_orderreport/orderreport";


import Home1 from './Components/Promo_and_Notify_Home/Home';
import AddPromo from './Components/Promo_and_Notify_AddPromo/AddPromo';
import Promos from './Components/Promo_and_Notify_PromoDetails/Promos';
import UpdatePromo from './Components/Promo_and_Notify_UpdatePromo/UpdatePromo';
import DisplayPromo from './Components/Promo_and_Notify_DisplayPromo/DisplayPromo';
import NotificationForm from './Components/Promo_and_Notify_NotificationForm/NotificationForm';



//Feedback
import AddRate from "./Components/Feedback/Add-Rates/AddRate";
import RateDetails from "./Components/Feedback/Rate/RateDetails";
//Complaint
import ValidatedDetails from "./Components/Complaints/Complaints/MyComplaints";
import AddComplaint from "./Components/Complaints/Add-Complaint/AddComplaint";
import MyRate from "./Components/Feedback/MyRate/MyRate";
import UpdateRate from "./Components/Feedback/UpdateRate/UpdateRate";
import UpdateComplaint from "./Components/Complaints/UpdateComplaint/UpdateComplaint";
import AdminDash from "./Components/Complaints/AdminDash/FeedbackAdminDash";
import Reply from "./Components/Complaints/AdminDash/Reply";

//financial
import FinancialManagement from "./Components/FinancialManagement/FinancialManagement";
import EmployeeSalaryForm from "./Components/EmployeeSalary";
import EmployeePayment from "./Components/EmplyoeePayment";
import SupplierForm from "./Components/SupplierForm";
import SupplierPayment from "./Components/SupplierPayment";
import AdditionalForm from "./Components/AdditionalForm";
import AdditionalPayment from "./Components/AdditionalPayment";
import UpdateEmployeeSalaryForm from "./Components/UpdateEmployeeSalary";
import FinancialReport from "./Components/FinancialReport";

import Home from './Components/pages/Home12';

import Profile12 from './Components/pages/Profile12';
import Dashboard from './Components/pages/Dashboard';
import Suppliers from './Components/pages/Suppliers';
import Notification from './Components/pages/Notification';
import Report from './Components/pages/Report';

import Avalibility from './Components/pages/Avalibility/Avalibilitylist';  
import Register12 from './Components/pages/Register12';
import Login12 from './Components/pages/Login12';
import Logout12 from './Components/pages/Logout12';

function App() {
  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("jsonwebtoken") ? true : false;

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const AdminRoute = ({ children }) => {
    const role = localStorage.getItem("role");
    if (role !== "Admin") {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/adduser"
            element={
              <AdminRoute>
                <AddUser />
              </AdminRoute>
            }
          />
          <Route
            path="/userdetails"
            element={
              <AdminRoute>
                <Users />
              </AdminRoute>
            }
          />

          <Route path="/userdetails/:id" element={<UpdateUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/employeedashboard" element={<EmployeeDahsboard />} />
          <Route path="/managerdashboard" element={<ManagerDashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/otp-sent/:email" element={<OTP />} />
          <Route path="/AdminDashboard" element={<Admindashboard />} />
        </Routes>

        <Routes>
          <Route path="/inventorydash" element={<InventoryDashboard />} />
          <Route path="/additem" element={<Add_Item />} />
          <Route path="/viewitemlist" element={<Item_list />} />
          <Route path="/addmodel" element={<Add_model />} />
          <Route path="/viewmodellist" element={<Model_list />} />
          <Route path="/report" element={<Report />} />
          <Route path="/viewitemlist/:id" element={<Update_item />} />
          <Route path="/viewmodellist/:id" element={<Update_model />} />

          <Route
            path="/userhomegallery/motorcycle-models"
            element={<Gallery />}
          />
          <Route
            path="/userhomegallery/parts-and-accessories"
            element={<Motorcycle_gallery_Inventory_management />}
          />
          <Route path="/" element={<UserHome_Inventory_management />} />

          <Route path="/item/:id" element={<SelectedItemDetailsOM />} />
          <Route path="/userhomegallery/cart" element={<OM_cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/buynow" element={<BuyNow />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/bikes/:id" element={<BikeDetails />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/preorder" element={<PreOrder />} />

          {/* <Route path="/home" element={<Home />}/> */}
          <Route path="/orderdash" element={<OrderDashboard />} />
          <Route path="/orderdetails" element={<OrderDetails />} />
          <Route
            path="/reservationdetails"
            element={<ReservationDetailsPage />}
          />
          <Route path="/preorderdetails" element={<PreOrderDetailsPage />} />
          <Route path="/mypreorders" element={<CustomerPreOrderPage />} />
          <Route
            path="/myreservations"
            element={<UserReservationDetailsPage />}
          />
          <Route path="/orderreport" element={<ReportPage />} />
        </Routes>

        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/mainhome" element={<Home1 />} />
          <Route path="/addpromo" element={<AddPromo />} />
          <Route path="/promodetails" element={<Promos />} />
          <Route path="/promodetails/:id" element={<UpdatePromo />} />
          <Route path="/displaypromo" element={<DisplayPromo />} />
          <Route path="/notifications" element={<NotificationForm />} />

          
          {/*Feedback and Rating*/}
          <Route path="/add-feedback" element={<AddRate />} />
          <Route path="/ratedetails" element={<RateDetails />} />
          <Route path="/myrate" element={<MyRate />} />
          <Route path="/updaterate/:id" element={<UpdateRate />} />

          {/*Complaint*/}
          <Route path="/validatedDetails" element={<ValidatedDetails />} />
          <Route path="/add-complaint" element={<AddComplaint />} />
          <Route path="/updatecomplaint/:id" element={<UpdateComplaint />} />
          <Route path="/admindash" element={<AdminDash />} />
          <Route path="/reply/:id" element={<Reply />} />


          {/* financial */}
          <Route path="/financialdash" element={<FinancialManagement/>} />
            <Route path="/employee-salary" element={<EmployeeSalaryForm/>} />
            <Route path="/employee-payment" element={<EmployeePayment/>} />
            <Route path="/supplier-form" element={<SupplierForm/>} />
            <Route path="/supplier-payment" element={<SupplierPayment/>} />
            <Route path="/additional-form" element={<AdditionalForm/>} />
            <Route path="/additional-payment" element={<AdditionalPayment/>} />
            <Route path="/update-employee-salary/:id" element={<UpdateEmployeeSalaryForm/>} />
            <Route path="/financial-reports" element={<FinancialReport/>} />
        </Routes>

        <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register12" element={<Register12 />} />
      <Route path="/login12" element={<Login12 />} />
      <Route path="/profile12" element={<Profile12 />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/notification" element={<Notification />} />
       <Route path="/report" element={<Report />} />
      <Route path="/logout12" element={<Logout12 />} />
      <Route path="/availability" element={<Avalibility />} /> 

    </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
