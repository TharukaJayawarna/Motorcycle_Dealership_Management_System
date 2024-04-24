import React, {useEffect,useState} from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';

function Update_item()  {
  const [image, setImage] = useState("");
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() =>{
    const fetchHandler = async ()=>{
      await axios
      .get(`http://localhost:8070/items/${id}`)
      .then((res)=> res.data)
      .then((data)=> setInputs(data.item));
    };
    fetchHandler();
  },[id]);

  const sendRequest = async ()=>{
    await axios
    .put(`http://localhost:8070/items/${id}`,{
      Item_ID:String (inputs.Item_ID),
      Item_Name:String (inputs.Item_Name),
      Price:String (inputs.Price),
      Manufacturer:String (inputs.Manufacturer),
      Category:String (inputs.Category),
      Compatible_Motorcycle_Models:String (inputs.Compatible_Motorcycle_Models),
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
    history("/viewitemlist"));
  };

  return (
    
    <div>
      <div> <h3> Add new Item to the Inventory </h3>
<form onSubmit={handleSubmit}>
    <div className="inventory-dashboard">
    <div class = "container">
      
      <div className="left-section">
        
    <label for="item-name">Item Name:</label>
          <input
            type="text"
            id="item-name"
            name="Item_Name"
            value={inputs.Item_Name}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <label for="item-id">Item ID:</label>
          <input
            type="text"
            id="item-id"
            name="Item_ID"
            value={inputs.Item_ID}
            onChange={handleChange}
            required
          />
          <br></br>
          <br></br>
          <label for="manufacturer">Manufacturer:</label>
          <input
            type="text"
            id="manufacturer"
            name="Manufacturer"
            value={inputs.Manufacturer}
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
           <Link to="/viewitemlist"><button className="custom-button">Cancel</button></Link>
          </div>

          <div className="right-section">
      
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
          <label for="compatible-models">Compatible Motorcycle Models:</label>
          <input
            type="text"
            id="compatible-models"
            name="Compatible_Motorcycle_Models"
            value={inputs.Compatible_Motorcycle_Models}
            onChange={handleChange}
          />
          <br></br>
          <br></br>
          <label for="category">Category:</label>
          <input
          type="text"
          id="category"
          name="Category"
          value={inputs.Category}
          onChange={handleChange}
          />
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

export default Update_item;
