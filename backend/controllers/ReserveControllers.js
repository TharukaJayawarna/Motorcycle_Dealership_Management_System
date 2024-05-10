const Reserve = require("../modules/ReserveModels");

//display part
const getAllReserve = async (req, res, next) => {

    let Reserves;
    try{
        Reserves = await Reserve.find();
    }catch (err) {
        console.log(err);
    }

    //not found
    if(!Reserves){
        return res.status(404).json({message: "Reserve not found"});
    }

    return res.status(200).json({Reserves});
};

//Data insert
const addReserve = async (req, res, next) => {
    try {
      const { Reserve_ID, Cus_Name, Email, Bike_Name, Bike_Color, Date } = req.body;
  
      // Validate input data
      if (!Reserve_ID || !Cus_Name || !Email || !Bike_Name || !Bike_Color || !Date) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const newReserve = new Reserve({
        Reserve_ID,
        Cus_Name,
        Email,
        Bike_Name,
        Bike_Color,
        Date,
      });
  
      const savedReserve = await newReserve.save();
      return res.status(201).json(savedReserve);
    } catch (err) {
      console.error("Error adding reserve:", err);
      return res.status(500).json({ message: "Error adding reserve" });
    }
  };

//get by Id
const getById = async (req, res, next) =>
{
    const id = req.params.id;

    let Reserves;

    try{
        Reserves = await Reserve.findById(id);
    }catch (err) {
        console.log(err);
    }
 //not available Reserve
 if(!Reserves){
    return res.status(404).json({message:"Item not found"});
}

return res.status(200).json({Reserves});

};

//update cart
const updateReserve = async (req, res, next) => {
    const id = req.params.id;
    const { Reserve_ID, Cus_Name, Email, Bike_Name, Bike_Color, Date} = req.body;
    
let Reserves;
  try {
    Reserves = await Reserve.findByIdAndUpdate(id,
        { Reserve_ID:Reserve_ID , Cus_Name:Cus_Name, Email:Email, Bike_Name:Bike_Name, Bike_Color:Bike_Color, Date:Date });
        Reserves = await Reserve.save();
  }catch (err) {
    console.log(err);
  }
  if(!Reserves){
    return res.status(404).json({message:"Unable to update Reserve details"});
}

return res.status(200).json({Reserves});

};

//delete Reserve details
const deleteReserve = async (req, res, next) => {
    const id = req.params.id;

    let Reserves;
    try {
        Reserves = await Reserve.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    if (!Reserves) {
        return res.status(404).json({message:"Unable to delete Reserve"});
}

return res.status(200).json({Reserves});

    
};


exports.getAllReserve = getAllReserve;
exports.addReserve = addReserve;
exports.getById = getById;
exports.updateReserve = updateReserve;
exports.deleteReserve = deleteReserve;
