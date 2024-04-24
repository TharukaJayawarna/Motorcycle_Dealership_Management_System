const Order = require("../modules/OrderModels");

//display part
const getAllOrder = async (req, res, next) => {

    let Orders;
    try{
        Orders = await Order.find();
    }catch (err) {
        console.log(err);
    }

    //not found
    if(!Orders){
        return res.status(404).json({message: "Order not found"});
    }

    return res.status(200).json({Orders});
};

//Data insert
const addOrder = async (req, res, next) => {
    const { Order_ID, Item_Name, Quantity, Net_Amount, Cus_Name, Email, Date, Payment_slip } = req.body;
    let Orders;
    try {
        Orders = new Order({ Order_ID, Item_Name, Quantity, Net_Amount, Cus_Name, Email, Date, Payment_slip});
        await Orders.save();
    }catch (err) {
         console.log(err);
    }

    //not insert item
    if(!Orders){
        return res.status(404).json({message:"unable to add order"});
    }

    return res.status(200).json({Orders});
};

//get by Id
const getById = async (req, res, next) =>
{
    const id = req.params.id;

    let Orders;

    try{
        Orders = await Order.findById(id);
    }catch (err) {
        console.log(err);
    }
 //not available order
 if(!Orders){
    return res.status(404).json({message:"order not found"});
}

return res.status(200).json({Orders});

};

//update Order
const updateOrder = async (req, res, next) => {
    const id = req.params.id;
    const { Order_ID, Item_Name, Quantity, Net_Amount, Cus_Name, Email, Date, Payment_slip } = req.body;
    
let Orders;
  try {
    Orders = await Order.findByIdAndUpdate(id,
        { Order_ID:Order_ID , Item_Name:Item_Name , Quantity:Quantity , Net_Amount:Net_Amount , Cus_Name:Cus_Name , Email:Email , Date:Date, Payment_slip:Payment_slip });
        Orders = await Order.save();
  }catch (err) {
    console.log(err);
  }
  if(!Orders){
    return res.status(404).json({message:"Unable to update Order details"});
}

return res.status(200).json({Orders});

};

//delete Order details
const deleteOrder = async (req, res, next) => {
    const id = req.params.id;

    let Orders;
    try {
        Orders = await Order.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    if (!Orders) {
        return res.status(404).json({message:"Unable to delete Order"});
}

return res.status(200).json({Orders});

    
};

exports.getAllOrder = getAllOrder;
exports.addOrder = addOrder;
exports.getById = getById;
exports.updateOrder = updateOrder;
exports.deleteOrder = deleteOrder;