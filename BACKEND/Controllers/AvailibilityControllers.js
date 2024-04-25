const Supplier= require("../Model/Availibilitymodel")


const getAllAvailibility = async (_req, res, _next) => {

    let Availibility;

    try{
        Availibility = await Availibility.find();
    }catch (err) {
        console.log(err);
    }
    // not found
    if(! Availibility ){
        return res.status(404).json({message:" Availibility  not found"})
    }
    // Display all  Availibility 
    return res.status(200).json({ Availibility });
};

exports.getAllAvailibility  = getAllAvailibility;
//data Insert

const addAvailibility  = async (req, res, _next) => {

    const{ID, UserName, email, password} = req.body; 

    let  Availibility;

    try{
        suppliers = new  Availibility ({ID,UserName,email,password});
        await  Availibility .save();
    }catch (err)
{ 
    console.log(err);
}
// not insert  Availibility 
if(! Availibility ){
    return res.status(404).json({message:"unable to add users"});
}
return res.status(200).json({ Availibility });
};

exports.addAvailibility  = addAvailibility;

//Get by Id
const getById= async (req, res, _next) =>  {
    const id = req.params.id;

    let  Availibility;

    try{
        Availibility  = await  Availibility .findById(id);
    }catch (err){
        console.log(err);
    }
    // not available  Availibility 
    if(! Availibility ){
        return res.status(404).json({message:"unable to get  Availibility "});
    }
    return res.status(200).json({ Availibility });
    
};

exports.getById = getById;

// Update  Availibility  Details
const UpdateAvailibility  = async (req, res, _next) => {
    const id = req.params.id; 
    const{ID, UserName,email, password} = req.body; 

    let  Availibility;

    try{
        Availibility = await  Availibility.findByIdAndUpdate(id,
            {ID:ID, Userame: UserName, email: email, password: password});
            Availibility = await  Availibility.save();
    }catch(err){
        console.log(err);
    }
    if(! Availibility){
        return res.status(404).json({message:"unable to Update  Availibility Details Availibility"});
    }
    return res.status(200).json({ Availibility });

};

exports.UpdateAvailibility  = UpdateAvailibility ;

//Delete  Availibility  Details
const DeleteAvailibility  = async (req, res, _next) => {
    const id = req.params.id; 
     
    let  Availibility;

    try{
        Availibility  = await  Availibility.findByIdAndDelete(id)
    }catch (err){
        console.log(err);
    }
    if(! Availibility){
        return res.status(404).json({message:"unable to Delete  Availibility  Details"});
    }
    return res.status(200).json({ Availibility});

}; 

exports.DeleteAvailibility  = DeleteAvailibility ;
