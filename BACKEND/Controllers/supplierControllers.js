const Supplier= require("../modules/suppliermodel")


const getAllsuppliers = async (_req, res, _next) => {

    let supplier;

    try{
        supplier = await Supplier.find();
    }catch (err) {
        console.log(err);
    }
    // not found
    if(!supplier){
        return res.status(404).json({message:"supplier not found"})
    }
    // Display all suppliers
    return res.status(200).json({supplier});
};

exports.getAllsuppliers = getAllsuppliers;
//data Insert

const addsuppliers = async (req, res, _next) => {

    const{supplierName, supplierID, email, password, Address, contactNumber} = req.body; 

    let suppliers;

    try{
        suppliers = new Supplier({supplierName,supplierID,email,password,Address,contactNumber});
        await suppliers.save();
    }catch (err)
{ 
    console.log(err);
}
// not insert suppliers
if(!suppliers){
    return res.status(404).json({message:"unable to add users"});
}
return res.status(200).json({suppliers});
};

exports.addsuppliers = addsuppliers;

//Get by Id
const getById= async (req, res, _next) =>  {
    const id = req.params.id;

    let suppliers;

    try{
        suppliers = await Supplier.findById(id);
    }catch (err){
        console.log(err);
    }
    // not available suppliers
    if(!suppliers){
        return res.status(404).json({message:"unable to get supplier"});
    }
    return res.status(200).json({suppliers});
    
};

exports.getById = getById;

// Update supplier Details
const UpdateSupplier = async (req, res, _next) => {
    const id = req.params.id; 
    const{supplierName, supplierID, email, password, Address, contactNumber} = req.body; 

    let suppliers;

    try{
        suppliers = await Supplier.findByIdAndUpdate(id,
            {supplierName: supplierName, supplierID: supplierID, email: email, password: password,  Address: Address, contactNumber: contactNumber});
            supplier = await suppliers.save();
    }catch(err){
        console.log(err);
    }
    if(!suppliers){
        return res.status(404).json({message:"unable to Update supplier Detailssupplier"});
    }
    return res.status(200).json({suppliers});

};

exports.Updatesupplier = UpdateSupplier;

//Delete supplier Details
const DeleteSupplier = async (req, res, _next) => {
    const id = req.params.id; 
     
    let suppliers;

    try{
        suppliers = await Supplier.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }
    if(!suppliers){
        return res.status(404).json({message:"unable to Delete supplier Details"});
    }
    return res.status(200).json({suppliers});

}; 

exports.DeleteSupplier = DeleteSupplier;


