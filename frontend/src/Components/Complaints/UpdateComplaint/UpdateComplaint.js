import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";

function UpdateComplaint() {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    complaint: '',
  });
  
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/complaints/${id}`
        );
        setInputs(response.data.complaint);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8080/complaints/${id}`, {
        username: String(inputs.username),
        email: String(inputs.email),
        complaint: String(inputs.complaint),
      })
      .then((res) => res.data);
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    sendRequest().then(() => {
      window.alert("Update successfully!");
      history("/validatedDetails");
    });
  };
  return (
    <div>
      <div className="rate-full-box">
        <div>
          <h1 className="rate_topic">
            Update <span className="rate-us">Rate</span>
          </h1>
          <form onSubmit={handleSubmit} className="rate-full-box-form">
            <label className="rate-full-box-label">Username</label>
            <input
              type="text"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              className="rate-full-box-input"
              required
            />
            <br />
            <label className="rate-full-box-label">Email</label>
            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              className="rate-full-box-input"
              required
            />
            <br />
      
            <label className="rate-full-box-label">Comment</label>
            <textarea
              className="rate-full-box-input rate-text"
              name="complaint"
              value={inputs.complaint}
              onChange={handleChange}
              required
            />
            <br />
            <button type="submit" className="centerbtn_rate">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateComplaint;
