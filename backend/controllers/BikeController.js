const Bike = require("../modules/BikeModel");


//Display part
const getAllBikes = async (req, res, next) => {
    let bikes;
    //Get all bikes
    try{
        bikes = await Bike.find();
    }catch(err) {
        console.log(err);
    }

    //not found
    if(!bikes){
        return res.status(404).json({message: "Bike not found"});
    }

    //Display all bikes
    return res.status(200).json({bikes});
};

//Insert part
const addBikes = async (req, res, next) => {
    const {Image,Bike_ID,Bike_Name,Price,Description,Colour,Received,In_Stock} = req.body;
    let bikes;
    try {
        bikes = new Bike({Image,Bike_ID,Bike_Name,Price,Description,Colour,Received,In_Stock});
        await bikes.save();
    }catch (err) {
         console.log(err);
    }

    //not insert bikes
    if(!bikes){
        return res.status(404).json({message:"unable to add bike"});
    }

    return res.status(200).json({bikes});
};

//get by Id
const getById = async (req, res, next) =>
{
    const id = req.params.id;

    let bike;

    try{
        bike = await Bike.findById(id);
    }catch (err) {
        console.log(err);
    }
 //not available bikes
 if(!bike){
    return res.status(404).json({message:"Bike not found"});
}

return res.status(200).json({bike});


};

//update bike details
const updateBike = async (req, res, next) => {
    const id = req.params.id;
    const {Image,Bike_ID,Bike_Name,Price,Description,Colour,Received,In_Stock} = req.body;
    
let bikes;
  try {
     bikes = await Bike.findByIdAndUpdate(id,
        {Image: Image,Bike_ID: Bike_ID,Bike_Name: Bike_Name,Price: Price,Description: Description,Colour: Colour,Received: Received,In_Stock: In_Stock});
        bikes = await bikes.save();
  }catch (err) {
    console.log(err);
  }
  if(!bikes){
    return res.status(404).json({message:"Unable to update bike details"});
}

return res.status(200).json({bikes});

};

//delete bike details
const deleteBike = async (req, res, next) => {
    const id = req.params.id;

    let bike;
    try {
        bike = await Bike.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    if (!bike) {
        return res.status(404).json({message:"Unable to delete bike"});
}

return res.status(200).json({bike});

    
};
exports.getAllBikes = getAllBikes;
exports.addBikes = addBikes;
exports.getById = getById;
exports.updateBike = updateBike;
exports.deleteBike = deleteBike;