const Cart = require("../modules/CartModels");

//display part
const getAllCart = async (req, res, next) => {

    let Carts;
    try{
        Carts = await Cart.find();
    }catch (err) {
        console.log(err);
    }

    //not found
    if(!Carts){
        return res.status(404).json({message: "Cart not found"});
    }

    return res.status(200).json({Carts});
};

//Data insert
// const addtoCart = async (req, res, next) => {
//     const { Item_ID, Item_Name, Item_Price, Quantity } = req.body;
//     let Carts;
//     try {
//         Carts = new Cart({ Item_ID, Item_Name, Item_Price, Quantity });
//         await Carts.save();
//     }catch (err) {
//          console.log(err);
//     }

//     //not insert item
//     if(!Carts){
//         return res.status(404).json({message:"unable to add item"});
//     }

//     return res.status(200).json({Carts});
// };


const addtoCart = async (req, res, next) => {
    const { Item_ID, Item_Name, Item_Price, Quantity } = req.body;
  
    try {
      // Check if the item is already in the cart
      let cartItem = await Cart.findOne({ Item_ID });
  
      if (cartItem) {
        // If the item is already in the cart, update the quantity
        cartItem.Quantity += Quantity;
        await cartItem.save();
      } else {
        // If the item is not in the cart, create a new cart item
        cartItem = new Cart({ Item_ID, Item_Name, Item_Price, Quantity });
        await cartItem.save();
      }
  
      return res.status(200).json({ cartItem });
    } catch (err) {
      console.log(err);
      return res.status(404).json({ message: "Unable to add item" });
    }
  };
//get by Id
const getById = async (req, res, next) =>
{
    const id = req.params.id;

    let Carts;

    try{
        Carts = await Cart.findById(id);
    }catch (err) {
        console.log(err);
    }
 //not available Item
 if(!Carts){
    return res.status(404).json({message:"Item not found"});
}

return res.status(200).json({Carts});

};

//update cart
const updateCart = async (req, res, next) => {
    const id = req.params.id;
    const { Cart_ID, Item_Name, Item_Price, Item_Image, Quantity } = req.body;
    
let Carts;
  try {
    Carts = await Cart.findByIdAndUpdate(id,
        { Cart_ID:Cart_ID , Item_Name:Item_Name , Item_Price:Item_Price , Item_Image:Item_Image , Quantity:Quantity });
        Carts = await Carts.save();
  }catch (err) {
    console.log(err);
  }
  if(!Carts){
    return res.status(404).json({message:"Unable to update cart details"});
}

return res.status(200).json({Carts});

};

//delete bike details
const deleteCart = async (req, res, next) => {
    const id = req.params.id;

    let Carts;
    try {
        Carts = await Cart.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    if (!Carts) {
        return res.status(404).json({message:"Unable to delete cart"});
}

return res.status(200).json({Carts});

    
};

exports.getAllCart = getAllCart;
exports.addtoCart = addtoCart;
exports.getById = getById;
exports.updateCart = updateCart;
exports.deleteCart = deleteCart;