const express = require("express");
const mongoose = require("mongoose");
const router = require("./Route/supplierRoutes");

const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());
app.use("/suppliers",router);
app.use("/Availibility",router);

mongoose.connect("mongodb+srv://itpproject2080:2080@mdms.7ckq38t.mongodb.net/")
.then(()=> console.log("connect to MongoDB"))
.then(() =>{
    app.listen(5000);
})
.catch((err) => console.log((err)));



//call Register Model
require("./Model/Register");
const Suppliers = mongoose.model("Register");
app.post("/register",async(req,res) =>{
    const{UserName,email,Password,ConfirmPassword} = req.body;
    try{
        await Supplierscreate({
            UserName,
            email,
            Password,
            ConfirmPassword,
        });
        res.send({ status: "ok"});
    }catch (err) {
        res.send({ status: "err"});
    }
});