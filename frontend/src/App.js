import React from "react";
import { Route, Routes } from "react-router";

import Home from "./Components/FeedbackHome";

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

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />

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
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
