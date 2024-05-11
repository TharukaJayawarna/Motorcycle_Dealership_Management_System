import React, { useState, useEffect } from "react";
import axios from "axios";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

const MyComplaints = () => {
  const [complaints, setComplaint] = useState([]);
  const [email, setGmail] = useState("");
  const handleChange = (e) => {
    setGmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8070/complaints?email=${email}`
      );
      console.log("Response:", response.data);
      const relevantCard = response.data.complaints.filter(
        (complaints) => complaints.email === email
      );

      setComplaint(relevantCard);

      if (relevantCard.length === 0) {
        alert("No  found,Plase enter valid Gmail address");
      }
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };
  /*Delete Code */
  const deleteHandler = async (_id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Details?"
    );

    if (confirmed) {
      try {
        await axios.delete(`http://localhost:8070/complaints/${_id}`);
        window.alert(" deleted successfully!");
        window.location.reload();
      } catch (error) {
        console.error("Error deleting Message details:", error);
      }
    }
  };
  return (
    <div>
      <div className="form_box_rate">
        <form className="form_rate" onSubmit={handleSubmit}>
          <label className="form_lable_rate" htmlFor="email">
            Enter Your Gmail
          </label>
          <br></br>
          <input
            className="form_input_rate"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <br></br>
          <button className="centerbtn_rate" type="submit">
            Check
          </button>
        </form>
      </div>
      <div className="tbl_data">
        <table className="table_details_admin">
          <thead>
            <tr className="tble_card_details_tr">
              <th className="admin_tbl_th">username</th>
              <th className="admin_tbl_th">Gmail</th>
              <th className="admin_tbl_th">complaint</th>
              <th className="admin_tbl_th">reply</th>
              <th className="admin_tbl_th">Actions</th>
            </tr>
          </thead>
          {complaints.map((complaints, index) => (
            <tbody>
              <tr key={index}>
                <td className="admin_tbl_td">{complaints.username}</td>
                <td className="admin_tbl_td gmil">{complaints.email}</td>
                <td className="admin_tbl_td">{complaints.complaint}</td>
                <td className="admin_tbl_td">
                  {complaints.reply ? complaints.reply : "Not yet replied"}
                </td>

                <td className="admin_tbl_td">
                  <Link
                    to={`/updatecomplaint/${complaints._id}`}
                    className="update_rate"
                  >
                    Update
                  </Link>
                  <button
                    className="dlt_rate"
                    onClick={() => deleteHandler(complaints._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MyComplaints;
