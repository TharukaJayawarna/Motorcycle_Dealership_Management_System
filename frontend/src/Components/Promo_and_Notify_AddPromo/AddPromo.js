import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadFileToFirebase from "../../utils/UploadFilesToFIreBase";
import "./AddPromo.css";
import Nav from "../Nav/Nav";
// import NavigationBar from "../ManagerNavigation/NavigationBar";
import { Link } from 'react-router-dom';

function AddPromo() {
  const navigate = useNavigate();
  const [file, setFile] = useState("");

  const [inputs, setInputs] = useState({
    description: "",
    date: "",
    image: "", // Add image field to the inputs state
  });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setInputs((prevState) => ({
      ...prevState,
      image: selectedFile, // Update the image field in the inputs state
    }));
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await sendRequest();
    navigate("/promodetails");
  };

  const sendRequest = async () => {
    let uploadImg = "No Image";
    if (file) {
      const response = await uploadFileToFirebase(file);
      uploadImg = response;
    }
    try {
      await axios.post("http://localhost:8070/promos", {
        description: inputs.description,
        image: uploadImg,
        date: inputs.date,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {/* <Nav /> */}
      {/* <NavigationBar /><br/> */}
      <h1 className="unique-heading">Add Promo</h1><br/>

      <form className="unique-form"onSubmit={handleSubmit}>
        <div className="mt-6 flex sm:flex-row justify-center">
          <label htmlFor="fileInput" className="unique-label">
            Image
            <br />
            <br />
            <div className="profile-image">
              <input
                type="file"
                id="fileInput"
                name="file"
                className="file-input"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleFileChange}
                required
              />
              <div className="avatar-container">
                <img
                  className="avatar-image"
                  src={
                    inputs.image
                      ? URL.createObjectURL(inputs.image)
                      : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                  }
                  alt="avatar"
                />
                <div className="avatar-overlay">Upload Image</div>
              </div>
            </div>
          </label>
        </div>

        <label className="unique-label">Description</label>
        <br />
        <input
          type="text"
          name="description"
          onChange={handleChange}
          value={inputs.description}
          required
        />
        <br />
        <br />

        <label className="unique-label">Expiry Date</label>
        <br />
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={inputs.date}
          required
        />
        <br />
        <br />

        <button className="unique-button" type="submit">Submit</button>
      </form>
      <br/>

      <button className="uni03-button">
        <Link to={`/promodetails/`}>Promo Details</Link>
      </button>
    </div>
  );
}

export default AddPromo;
