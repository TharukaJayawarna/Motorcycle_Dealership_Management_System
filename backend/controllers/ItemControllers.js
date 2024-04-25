const Item = require("../modules/ItemModels");

//Display part
const getAllItems = async (req, res, next) => {
    let items;
    //Get all items
    try{
        items = await Item.find();
    }catch(err) {
        console.log(err);
    }

    //not found
    if(!items){
        return res.status(404).json({message: "Item not found"});
    }

    //Display all items
    return res.status(200).json({items});
};



//Insert part
const addItems = async (req, res, next) => {
    const {Image,Item_ID,Item_Name,Price,Manufacturer,Category,Compatible_Motorcycle_Models,Received,In_Stock} = req.body;
    let items;
    try {
        items = new Item({Image,Item_ID,Item_Name,Price,Manufacturer,Category,Compatible_Motorcycle_Models,Received,In_Stock});
        await items.save();
    }catch (err) {
         console.log(err);
    }

    //not insert items
    if(!items){
        return res.status(404).json({message:"unable to add items"});
    }

    return res.status(200).json({items});
};


//get by Id
const getById = async (req, res, next) =>
{
    const id = req.params.id;

    let item;

    try{
        item = await Item.findById(id);
    }catch (err) {
        console.log(err);
    }
 //not available items
 if(!item){
    return res.status(404).json({message:"Item not found"});
}

return res.status(200).json({item});


};

//update item details
const updateItem = async (req, res, next) => {
    const id = req.params.id;
    const {Image,Item_ID,Item_Name,Price,Manufacturer,Category,Compatible_Motorcycle_Models,Received,In_Stock} = req.body;
let items;
  try {
     items = await Item.findByIdAndUpdate(id,
        {Image: Image,Item_ID: Item_ID,Item_Name: Item_Name,Price: Price,Manufacturer: Manufacturer,Category: Category,Compatible_Motorcycle_Models: Compatible_Motorcycle_Models,Received: Received,In_Stock: In_Stock});
        items = await items.save();
  }catch (err) {
    console.log(err);
  }
  if(!items){
    return res.status(404).json({message:"Unable to update item details"});
}

return res.status(200).json({items});

};

//delete item details
const deleteItem = async (req, res, next) => {
    const id = req.params.id;

    let item;
    try {
        item = await Item.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    if (!item) {
        return res.status(404).json({message:"Unable to delete item"});
}

return res.status(200).json({item});

    
};
exports.getAllItems = getAllItems;
exports.addItems = addItems;
exports.getById = getById;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;


