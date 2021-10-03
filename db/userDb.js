const userModel = require("../models/userModel");

module.exports.addUser=(data)=>{
  return new Promise((resolve,reject)=>{
     try {
          let userData = new userModel({
              name  : data.name,
             email  : data.email,
           password : data.password,
          createdAt : Date.now() 
          });
        userData.save((err,sdata)=>{
             if(err){
                 reject(err);
             }
             else if(sdata){
                  resolve(sdata);
             }
             else{
                 reject({message:"data not saved"});
             }
        });
     } catch (error) {
         reject(error);
     }
  });
}

module.exports.editUserProfile=(id)=>{
  return new Promise((resolve,reject)=>{
     try {
        userModel.findOne({"_id":id},{_id:1,name:1,email:1},(err,fdata)=>{
             if(err){
                reject(err);
             }   
             else if(fdata){
                resolve(fdata);
             }   
             else{
                reject({message:"no data found"});
             }                  
        });
     } catch (error) {
         reject(error); 
     }
  });
}

module.exports.updateUserProfile=(data)=>{
    return new Promise((resolve,reject)=>{
       try {
           let userData = {
               name  : data.name,
               email : data.email,
             updateAt:Date.now()  
           }
       userModel.findOneAndUpdate({"_id":data.id},
      {$set:userData},{new:true,select:{_id:1,name:1,email:1}},(err,udata)=>{
            if(err){
                reject(err);
            } 
            else if(udata){
                 resolve(udata);
            }
            else{
                reject({message:"profile not updated"});
            }
        });
       } catch (error) {
           reject(error);
       }
    });
}

module.exports.updateUserStatus=(data)=>{
  return new Promise((resolve,reject)=>{
       try {
           userModel.findOneAndUpdate({"_id":data.id},
           {$set:{"status":data.status}},{new:true},(err,udata)=>{
               if(err){
                   reject(err);
               }
               else if(udata){
                   resolve(udata);
               }
               else{
                   reject({message:"status not updated"});
               }
           });
       } catch (error) {
           reject(error);
       }
  });
}

module.exports.showAllUsers=(perpage,page)=>{
     return new Promise((resolve,reject)=>{
         try {

             var query   = {};
             query.skip  = (perpage*page)-perpage;
             query.limit = parseInt(perpage);

             userModel.find({},{},query,(err,data)=>{
                  if(err){
                      reject(err);
                  }  
                  else if(data){
             userModel.find().count((err,count)=>{
                       if(err){
                         reject(err);
                       }
                       else{
                           let dataa={
                                data:data,
                               count:count 
                           }
                          resolve(dataa);
                       } 
                    }); 
                  }
                  else{
                       reject({message:"no data found"});
                  }
             });
         } catch (error) {
             reject(error);
         }
     });
}