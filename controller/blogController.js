const blogDb  = require("../db/blogDb");

module.exports.addBlogPost=(req,res)=>{
   blogDb.addBlogPost(req.body) 
   .then((data)=>{
       res.json({data:data,msg:"success"});
   }) 
   .catch((err)=>{
       res.json({error:err.message});
   })
}

module.exports.editBlogPost=(req,res)=>{
    blogDb.editBlogPost(req.params.id)
    .then((data)=>{
        res.json({data:data,msg:"success"});
    })
    .catch((err)=>{
        res.json({error:err.message});
    })
}

module.exports.updateBlogPost=(req,res)=>{
    blogDb.updateBlogPost(req.body)
    .then((data)=>{
        res.json({data:data,msg:"success"});
    })
    .catch((err)=>{
        res.json({error:err.message});
    })
}

module.exports.removeBlogPost=(req,res)=>{
    console.log(req.params.id)
    blogDb.removeBlogPost(req.params.id)
    .then((data)=>{
        res.json({data:data,msg:"success"});
    })
    .catch((err)=>{
        res.json({error:err.message});
    })
}

module.exports.getSingleBlog=(req,res)=>{
   blogDb.getSingleBlog(req.params.id)
   .then((data)=>{
       res.json({data:data,msg:"success"});
   })
   .catch((err)=>{
       res.json({error:err.message});
   })
}

module.exports.showAllBlogs=(req,res)=>{

    let perpage=5,page=1;
    if(req.query.perpage!=undefined || req.query.page!=null){
        perpage = req.query.perpage
    }
    if(req.query.page!=undefined || req.query.page!=null){
          page = req.query.page
    }
    blogDb.showAllBlog(perpage,page)
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