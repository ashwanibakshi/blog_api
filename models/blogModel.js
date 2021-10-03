const mongoose  = require("mongoose");

const blogSchema = new mongoose.Schema({
      title:{
          type:String,
          required:true,
          unique:true
      },
      slug:{
          type:String,
          required:true,
          unique:true
      },
      content:{
          type:String,
          required:true
      },
      authorId:{
          type:mongoose.Types.ObjectId,
          required:true,
          ref:"users"
      },
      createdAt:{
          type:Date
      },
      updatedAt:{
          type:Date
      }
});


module.exports = mongoose.model("blogs",blogSchema);