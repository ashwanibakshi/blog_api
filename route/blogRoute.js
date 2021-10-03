const express   = require("express");

const router = express.Router();

const blogController = require("../controller/blogController");

router.post('/add',blogController.addBlogPost);

router.get('/edit/:id',blogController.editBlogPost);

router.put('/update',blogController.updateBlogPost);

router.delete('/remove/:id',blogController.removeBlogPost);

router.get('/:id',blogController.getSingleBlog);

router.get('/show/all',blogController.showAllBlogs);

module.exports = router;