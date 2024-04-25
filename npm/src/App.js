 import React from 'react';
import Sidemenu from './Components/Sidemenu';
import {Routes, Route} from "react-router-dom";
// import { Dashboard } from '@mui/icons-material';
import Home from './Components/pages/Home';
import Register from './Components/pages/Register';
import Login from './Components/pages/Login';
import Profile from './Components/pages/Profile';
import Dashboard from './Components/pages/Dashboard';
import Suppliers from './Components/pages/Suppliers';
import Notification from './Components/pages/Notification';
import Report from './Components/pages/Report';
import Logout from './Components/pages/Logout';
import Nav from './Components/Nav';

 
 export default function App() {
   return (

       <>
        
          <Routes>
            <Route path="/" exact element={<Home/>}></Route>
            <Route path="/Register" exact element={<Register/>}></Route>
            <Route path="/Login" exact element={<Login/>}></Route>
            <Route path="/Profile" exact element={<Profile/>}></Route>
            <Route path="/Dashboard" exact element={<Dashboard/>}></Route>
            <Route path="/Suppliers" exact element={<Suppliers/>}></Route>
            <Route path="/Notification" exact element={<Notification/>}></Route>
            <Route path="/Report" exact element={<Report/>}></Route>
            <Route path="/Logout" exact element={<Logout/>}></Route>
            <Route path="/ Nav" exact element={<Nav/>}></Route>
            <Route path="/ Sidemenu" exact element={<Sidemenu/>}></Route>
 




          </Routes>
        
       </>
   )
 }
 