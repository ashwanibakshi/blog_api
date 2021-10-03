const mongoose  = require("mongoose");


const userSchema = new mongoose.Schema({
   name :{
       type:String,
       required:true
   },
   email:{
       type:String,
       required:true,
       unique:true
   },
   password:{
       type:String,
       required:true
   },
   status:{
       type:String,
       default:"active"
   },
   createdAt:{
       type:Date
   },
   updatedAt:{
       type:Date
   }
});


module.exports = mongoose.model("users",userSchema);