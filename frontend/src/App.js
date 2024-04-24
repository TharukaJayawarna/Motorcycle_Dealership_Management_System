import React from 'react';
import './App.css';
import InventoryDashboard from './Components/Inventory_dashboard_Inventory management/Inventory_dashboard';
import { Route, Routes } from 'react-router-dom';
import Add_Item from './Components/Add_Item_Inventory management/Add_Item';
import Item_list from './Components/Item_list_Inventory management/Item_list';
import Add_model from './Components/Add_model_Inventory management/Add_model';
import Model_list from './Components/Model_list_Inventory management/Model_list';
import Report from './Components/Report_Inventory management/report';
import Update_item from './Components/Update_item_Inventory_management/Update_item';
import Update_model from './Components/Update_model_Inventory_management/Update_model';


import Gallery from './Components/Gallery_Inventory_management/Gallery';
import Motorcycle_gallery_Inventory_management from './Components/Motorcycle_gallery_Inventory_management/Motorcycle_gallery_Inventory_management';
import UserHome_Inventory_management from './Components/UserHome_Inventory_management/UserHome_Inventory_management';


function App() {
  return (
    <div>
     
     <React.Fragment>
      <Routes>
      <Route path="/" element={<InventoryDashboard/>}/>
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
      </Routes>
     </React.Fragment>
     
    </div>
  );
}

export default App;
