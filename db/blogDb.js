const blogModel  = require("../models/blogModel");
const userModel = require("../models/userModel");

module.exports.addBlogPost=(data)=>{
   return new Promise((resolve,reject)=>{
        try {
            let blogData = new blogModel({
                title : data.title,
                slug  : data.slug,
              content : data.content,
             authorId : data.authorid,
             createdAt: Date.now() 
            });
         userModel.find({"authorId":data.authorId,"status":"active"},
         (err,fdata)=>{
              if(err){
                  reject(err);
              }
              else if(fdata){
                 blogData.save((err,data)=>{
                    if(err){
                       reject(err);
                    } 
                    else if(data){
                       resolve(data);
                    }
                    else{
                       reject({message:"data not saved"});
                    }
                });      
              }
              else{
                reject({message:"user not found"});
              }
          });
        } catch (error) {
            reject(error);
        }
   });
}

module.exports.editBlogPost=(id)=>{
   return new Promise((resolve,reject)=>{
      try {
          blogModel.findOne({"_id":id},{},(err,data)=>{
              if(err){
                  reject(err);
              }
              else if(data){
                  console.log(data);
                 userModel.findOne({"_id":data.authorId,"status":"active"},(err,udata)=>{
                      if(err){
                          reject(err);
                      }
                      else if(!udata){
                          reject({message:"user is blocked"});
                      }
                      else{
                          resolve(data);
                      }
                 });
              }
              else{
                reject({message:"data not found"});
              }
          });
      } catch (error) {
          reject(error);
      } 
   });
}

module.exports.updateBlogPost=(data)=>{
   return new Promise((resolve,reject)=>{
      try {
           
         let udata = {
               title : data.title,
               slug  : data.slug,
             content : data.content,
             authorId: data.authorid,
            updatedAt: Date.now()    
        }   
            userModel.findOne({"_id":data.authorid,"status":"active"},(err,fdata)=>{
            if(err){
                reject(err);
            }
            else if(!fdata){
              reject({message:"user is blocked"});
            }
            else{
            blogModel.findOneAndUpdate({"_id":data.id},{$set:udata},
            {new:true,select:{_id:1,title:1,slug:1,content:1,authorId:1}},(err,udata)=>{
                if(err){
                    reject(err);
                }
                else if(udata){
                    resolve(udata);
                } 
                else{
                    reject({message:"data not updated"});
                }
              }); 
            }
        });
      } catch (error) {
          reject(error);
      }
   });
}

module.exports.removeBlogPost=(id)=>{
   return new Promise((resolve,reject)=>{
      try {
         blogModel.findOne({"_id":id},(err,data)=>{
                if(err){
                    reject(err)
                } 
                else{
          userModel.findOne({"_id":data.authorId,"status":"active"},(err,udata)=>{
                    if(err){
                        reject(err);
                    }
                    else if(!udata){
                        reject({message:"user is blocked"});
                    }
                    else{
            blogModel.deleteOne({"_id":id},(err,rdata)=>{
                    if(err){
                        reject(err);
                    }               
                    else if(rdata){
                         resolve(rdata);
                    }        
                    else{
                        reject({message:"data not removed"});
                    }               
                  });            
                }
              });       
            }
         });    
      } catch (error) {
          reject(error);
      }
   }); 
}

module.exports.getSingleBlog=(id)=>{
    return new Promise((resolve,reject)=>{
         try {
            blogModel.findOne({"_id":id},(err,fdata)=>{
                  if(err){
                      reject(err);
                  }
                  else if(fdata){
                      userModel.findOne({"_id":fdata.authorId,"status":"active"},(err,udata)=>{
                          if(err){
                              reject(err);
                          }
                          else if(!udata){
                               reject({message:"user is blocked"});
                          }
                          else{
                             resolve(fdata);   
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

module.exports.showAllBlog=(perpage,page)=>{
  return new Promise((resolve,reject)=>{
      try {
            var query  = {};
           query.skip  = (perpage*page)-perpage;
           query.limit = parseInt(perpage);

          blogModel.find({},{},query,(err,data)=>{
              if(err){
                  reject(err);
              }
              else if(data.length){
                  console.log(data.length);
                 blogModel.find().count((err,count)=>{
                      if(err){
                          reject(err);
                      }
                      else{
                          console.log(data)
                       let dataa  = {
                           data : data,
                          count : count
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