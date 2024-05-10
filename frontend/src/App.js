import React from 'react';
import { Route, Routes } from 'react-router';
import './App.css';
import Home from './Components/Promo_and_Notify_Home/Home';
import AddPromo from './Components/Promo_and_Notify_AddPromo/AddPromo';
import Promos from './Components/Promo_and_Notify_PromoDetails/Promos';
import UpdatePromo from './Components/Promo_and_Notify_UpdatePromo/UpdatePromo';
import DisplayPromo from './Components/Promo_and_Notify_DisplayPromo/DisplayPromo';
import NotificationForm from './Components/Promo_and_Notify_NotificationForm/NotificationForm';

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mainhome" element={<Home />} />
          <Route path="/addpromo" element={<AddPromo />} />
          <Route path="/promodetails" element={<Promos />} />
          <Route path="/promodetails/:id" element={<UpdatePromo />} />
          <Route path="/displaypromo" element={<DisplayPromo />} />
          <Route path="/notifications" element={<NotificationForm />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
