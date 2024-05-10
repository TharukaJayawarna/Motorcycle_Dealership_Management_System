import React from 'react';
import './App.css';
import InventoryDashboard from './Components/Inventory_Management_Inventory_dashboard/Inventory_dashboard';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Add_Item from './Components/Inventory_Management_Add_Item_Inventory management/Add_Item';
import Item_list from './Components/Inventory_Management_Item_list/Item_list';
import Add_model from './Components/Inventory_Management_Add_model_Inventory management/Add_model';
import Model_list from './Components/Inventory_Management_Model_list/Model_list';
import Report from './Components/Inventory_Management_Report/report';
import Update_item from './Components/Inventory_Management_Update_item/Update_item';
import Update_model from './Components/Inventory_Management_Update_model/Update_model';


import Gallery from './Components/Inventory_Management_Gallery/Gallery';
import Motorcycle_gallery_Inventory_management from './Components/Inventory_Management_item_gallery/Motorcycle_gallery_Inventory_management';
import UserHome_Inventory_management from './Components/Inventory_Management_UserHome/UserHome_Inventory_management';


import SelectedItemDetailsOM from './Components/Order_Management_Selected-item-details-OM/Selected-item-details-OM';
import OM_cart from './Components/Order_Management_OM_cart/OM_cart';
import Checkout from './Components/Order_Management_Checkout/Checkout';
import BuyNow from './Components/Order_Management_BuyNow/BuyNow';
import MyOrders from './Components/Order_Management_MyOrders/MyOrders';
import BikeDetails from './Components/Order_Management_model-details/model-details'
import PreOrder from './Components/Order_Management_preorder/preorder';
import Reserve from './Components/Order_Management_reserve/reserve';

import Home from './Components/Inventory_Management_home-main/home-main';
import OrderDashboard from './Components/Order_Management_OrderDashboard/OrderDashboard';
import OrderDetails from './Components/Order_Management_OrderDetails/OrderDetails';
import ReservationDetailsPage from './Components/Order_Management_reservationdetails/reservationdetails';
import PreOrderDetailsPage from './Components/Order_Management_preorderdetails/preorderdetails';
import CustomerPreOrderPage from './Components/Order_Management_mypreorders/mypreorders';
import UserReservationDetailsPage from './Components/Order_Management_myreservations/myreservations';
import ReportPage from './Components/Order_Management_orderreport/orderreport';


function App() {
  return (
    <div>
     
     <React.Fragment>
      <Routes>
      <Route path="/inventorydash" element={<InventoryDashboard/>}/>
      <Route path="/additem" element={<Add_Item/>}/>
      <Route path="/viewitemlist" element={<Item_list/>}/>
      <Route path="/addmodel" element={<Add_model/>}/>
      <Route path="/viewmodellist" element={<Model_list/>}/>
      <Route path="/report" element={<Report/>}/>
      <Route path="/viewitemlist/:id" element={<Update_item/>}/>
      <Route path="/viewmodellist/:id" element={<Update_model/>}/>

      <Route path="/userhomegallery/motorcycle-models" element={<Gallery/>}/>
      <Route path="/userhomegallery/parts-and-accessories" element={<Motorcycle_gallery_Inventory_management/>}/>
      <Route path="/userhome" element={<UserHome_Inventory_management/>}/>

      <Route path="/item/:id" element={<SelectedItemDetailsOM/>}/>
      <Route path="/userhomegallery/cart" element={<OM_cart/>}/>
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/buynow" element={<BuyNow />}/>
      <Route path="/myorders" element={<MyOrders />}/>
      <Route path="/bikes/:id" element={<BikeDetails />} />
      <Route path="/reserve" element={<Reserve />}/>
      <Route path="/preorder" element={<PreOrder />}/>

      <Route path="/home" element={<Home />}/>
     <Route path="/orderdash" element={<OrderDashboard />}/>
     <Route path="/orderdetails" element={<OrderDetails />}/>
     <Route path="/reservationdetails" element={<ReservationDetailsPage />}/>
    <Route path="/preorderdetails" element={<PreOrderDetailsPage />}/>
    <Route path="/mypreorders" element={<CustomerPreOrderPage />}/>
    <Route path="/myreservations" element={<UserReservationDetailsPage />}/>
    <Route path="/orderreport" element={<ReportPage />}/>

      </Routes>
     </React.Fragment>
     
    </div>
  );
}

export default App;
