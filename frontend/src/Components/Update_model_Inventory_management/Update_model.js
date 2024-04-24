import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';

function Update_model() {
  const [image, setImage] = useState("");
    const [inputs, setInputs] = useState({});
    const history = useNavigate();
    const id = useParams().id;
  
    useEffect(() =>{
      const fetchHandler = async ()=>{
        await axios
        .get(`http://localhost:8070/bikes/${id}`)
        .then((res)=> res.data)
        .then((data)=> setInputs(data.bike));
      };
      fetchHandler();
    },[id]);
  
    const sendRequest = async ()=>{
      await axios
      .put(`http://localhost:8070/bikes/${id}`,{
        Bike_ID:String (inputs.Bike_ID),
        Bike_Name:String (inputs.Bike_Name),
        Price:String (inputs.Price),
        Description:String (inputs.Description),
        Colour:String (inputs.Colour),
        Received:Number (inputs.Received),
      })
      .then((res) => res.data);
    };
  
    const handleChange = (e)=>{
      setInputs((prevState)=> ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
  
    };
  
    const handleSubmit =(e)=>{
      e.preventDefault();
      console.log(inputs);
      sendRequest().then(()=>
      history("/viewmodellist"));
    };
  
  return (
    <div>
      <div> <h3> Add new Motorcycle Models to the Inventory </h3>
<form onSubmit={handleSubmit}>
    <div className="inventory-dashboard">
    <div class = "container">
      
      <div className="left-section">
        
    <label for="bike-name">Model Name:</label>
          <input
            type="text"
            id="item-name"
            name="Bike_Name"
            value={inputs.Bike_Name}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <label for="bike-id">Model ID:</label>
          <input
            type="text"
            id="bike-id"
            name="Bike_ID"
            value={inputs.Bike_ID}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <label for="description">Description:</label>
          <input
            type="text"
            id="description"
            name="Description"
            value={inputs.Description}
            onChange={handleChange}
          />
          <br></br>
          <br></br>
          <label for="price">Price:</label>
          <input
            type="text"
            id="price"
            name="Price"
            value={inputs.Price}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
           <Link to="/viewmodellist"><button className="custom-button">Cancel</button></Link>
          </div>

          <div className="right-section">
          <br></br>
          <br></br>
          <label for="image">Image:</label>
          <img src={image} height={100} width={100}  />
          <br></br>
          <br></br>
          <label for="received">Received:</label>
          <input
            type="number"
            id="received"
            name="Received"
            min="1"
            value={inputs.Received}
            onChange={handleChange}
            required
          />

          <br></br>
          <br></br>
          <label for="colour">Colour:</label>
          <input
          type="text"
          id="colour"
          name="Colour"
          value={inputs.Colour}
          onChange={handleChange}
          />
     <br></br>
     <br></br>
     <br></br>
     <br></br>
     <br></br>
       
  
          <button className="custom-button">Update</button>
          </div>
          
</div>
</div>
</form>
</div>
    </div>
  )
}

export default Update_model
