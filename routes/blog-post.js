const express = require('express');
const BlogPost = require('../models/blog-post');
const blogPostController = require('../controllers/blog-post');
const asyncWrapper = require('../middleware/async-wrapper');
const checkAdmin = require('../middleware/check-admin');

const router = express.Router();

router.post("/post", checkAdmin, asyncWrapper(blogPostController.createNewBlogPost));
router.get("/post/:title", asyncWrapper(blocPostController.fetchPostByTitle));
router.get("/posts", asyncWrapper(blogPostController.fetchAllPosts));

module.exports = router;
