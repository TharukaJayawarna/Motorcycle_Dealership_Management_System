const PreOrder = require("../modules/PreOrderModels");

//display part
const getAllPreOrder = async (req, res, next) => {

    let PreOrders;
    try{
        PreOrders = await PreOrder.find();
    }catch (err) {
        console.log(err);
    }

    //not found
    if(!PreOrders){
        return res.status(404).json({message: "PreOrder not found"});
    }

    return res.status(200).json({PreOrders});
};

//Data insert
const addPreOrder = async (req, res, next) => {
    const { PreOrder_ID, Bike_Name, Bike_Color, Quantity, Date, Cus_Name, Email, Advance_Payment_slip  } = req.body;
    let PreOrders;
    try {
        PreOrders = new PreOrder({ PreOrder_ID, Bike_Name, Bike_Color, Quantity, Date, Cus_Name, Email, Advance_Payment_slip});
        await PreOrders.save();
    }catch (err) {
         console.log(err);
    }

    //not insert item
    if(!PreOrders){
        return res.status(404).json({message:"unable to add PreOrder"});
    }

    return res.status(200).json({PreOrders});
};

//get by Id
const getById = async (req, res, next) =>
{
    const id = req.params.id;

    let PreOrders;

    try{
        PreOrders = await PreOrder.findById(id);
    }catch (err) {
        console.log(err);
    }
 //not available Item
 if(!PreOrders){
    return res.status(404).json({message:"PreOrder not found"});
}

return res.status(200).json({PreOrders});

};

//update cart
const updatePreOrder = async (req, res, next) => {
    const id = req.params.id;
    const {PreOrder_ID, Bike_Name, Bike_Color, Quantity, Date, Cus_Name, Email, Advance_Payment_slip} = req.body;
    
let PreOrders;
  try {
    PreOrders = await PreOrder.findByIdAndUpdate(id,
        {PreOrder_ID:PreOrder_ID , Bike_Name:Bike_Name, Bike_Color:Bike_Color, Quantity:Quantity, Date:Date, Cus_Name:Cus_Name, Email:Email, Advance_Payment_slip:Advance_Payment_slip});
        PreOrders = await PreOrder.save();
  }catch (err) {
    console.log(err);
  }
  if(!PreOrders){
    return res.status(404).json({message:"Unable to update PreOrder details"});
}

return res.status(200).json({PreOrders});

};

//delete bike details
const deletePreOrder = async (req, res, next) => {
    const id = req.params.id;

    let PreOrders;
    try {
        PreOrders = await PreOrder.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    if (!PreOrders) {
        return res.status(404).json({message:"Unable to delete PreOrder"});
}

return res.status(200).json({PreOrders});

    
};

exports.getAllPreOrder = getAllPreOrder;
exports.addPreOrder = addPreOrder;
exports.getById = getById;
exports.updatePreOrder = updatePreOrder;
exports.deletePreOrder = deletePreOrder;