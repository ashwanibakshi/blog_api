const express   = require("express");
const mongoose  = require("mongoose");

const app  = express();

mongoose.connect("mongodb://localhost:27017/blogg")
.then((data)=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log("connection error",err);
})

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/v1',require("./route/routes"));

let port = process.env.PORT || 3000;

app.listen(port,()=>console.log('server run at port '+port));