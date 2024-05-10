import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from "../Nav/Nav";
import NavigationBar from "../ManagerNavigation/NavigationBar";
import uploadFileToFirebase from "../../utils/UploadFilesToFIreBase";
import { useParams } from 'react-router';
import "./UpdatePromo.css"
import { Link } from 'react-router-dom';

function UpdatePromo() {
    const history = useNavigate();
    const [file, setFile] = useState("");
    const { id } = useParams();
  
    const [inputs, setInputs] = useState({
      description: "",
      date: "" 
    });
    useEffect(() => {
        const fetchPromo = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/promos/${id}`);
                console.log('Promo details response:', response.data);
                if (response.data.promo) {
                    const promo = response.data.promo;
                    setInputs({
                        description: promo.description || '',
                        date: promo.date || '',
                        image: promo.image || '',
                        
                    });
                }
            } catch (error) {
                console.error('Error fetching promo:', error);
            }
        };
        fetchPromo();
    }, [id]);

    
    const sendRequest = async () => {
        let uploadImg = "No Image";
        if (file) {
          const response = await uploadFileToFirebase(file);
          uploadImg = response; // Assuming response is the URL of the uploaded image
          // Update inputs.image with the uploaded image URL
          setInputs(prevState => ({
              ...prevState,
              image: response
          }));
        }
    
        try {
            await axios.put(`http://localhost:5000/promos/${id}`, {
                description: inputs.description,
                date: inputs.date,
                image: uploadImg, // Use uploadImg here instead of inputs.image
            });
            history('/promodetails');
        } catch (error) {
            console.error('Error updating promo:', error);
        }
    };
    

      const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        sendRequest();
    };
    

    return (
      <div >      
  
      
      <Nav />  
      <NavigationBar /> <br /> <br /> 

      <h1 className="unique-heading">Update Promo</h1>  
      <form className="unique-form" onSubmit={handleSubmit}>
      
          <br />
      <div className="mt-6 flex sm:flex-row justify-center">
      <label htmlFor="fileInput" className="unique-label">
            Image
          <div className="profile-image ">
            <input  type="file"  id="fileInput"  name="file"  style={{ display: "none" }}  accept="image/*"  onChange={handleFileChange}  required  />
            <div className="avatar-container">
              <img
                className="avatar-image"
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="avatar"
              />
              <div className="avatar-overlay">Upload Image</div>
            </div>
          </div>
        </label>
      </div>
      
        <br /><br /><br />
        <label  className="unique-label">Description</label>
        <br />
        <input  type="text"  name="description"  onChange={handleChange}  value={inputs.description}  required  />
        <br /><br /><br />
        <label  className="unique-label">Expiry Date</label>
        <br />
        <input  type="date"  name="date"  onChange={handleChange}  value={inputs.date}  required  />
        <br />
        <br />
        
        <button  className="unique-button" type="submit">Submit</button>
      </form><br /><br />
      <button  className="uni03-button" ><Link to="/promodetails">Go Back</Link></button>
    </div>
  );

}

export default UpdatePromo;
