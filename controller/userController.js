const userDb  = require("../db/userDb");


module.exports.addUser=(req,res)=>{
     userDb.addUser(req.body)
     .then((data)=>{
         res.json({data:data,msg:"success"});
     })
     .catch((err)=>{
         res.json({error:err.message});
     })
}

module.exports.editUserProfile=(req,res)=>{
      userDb.editUserProfile(req.params.id)
      .then((data)=>{
          res.json({data:data,msg:"success"});
      })
      .catch((err)=>{
          res.json({error:err.message});
      })
}

module.exports.updateUserProfile=(req,res)=>{
      userDb.updateUserProfile(req.body)
      .then((data)=>{
          res.json({data:data,msg:"success"}); 
      })
      .catch((err)=>{
          res.json({error:err.message});
      })
}

module.exports.updateUserStatus=(req,res)=>{
      userDb.updateUserStatus(req.body)
      .then((data)=>{
          res.json({data:data,msg:"success"});
      })
      .catch((err)=>{
           res.json({error:err.message});
      })
}

module.exports.showAllUser=(req,res)=>{
    let perpage=5,page=1;
    if(req.query.perpage){
        perpage = req.query.perpage;
    }
    if(req.query.page){
        page = req.query.page;
    }
      userDb.showAllUsers(perpage,page)
      .then((data)=>{
          res.json({
              data:data.data,
              current:page,
              pages: Math.ceil(data.count/perpage)
            });
      })
      .catch((err)=>{
          res.json({error:err.message});
      })
}