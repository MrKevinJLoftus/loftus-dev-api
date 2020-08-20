const express = require('express');
const blogPostController = require('../controllers/blog-post');
const asyncWrapper = require('../middleware/async-wrapper');
const checkAdmin = require('../middleware/check-admin');

const router = express.Router();

router.post("/post", checkAdmin, asyncWrapper(blogPostController.createNewBlogPost));
router.get("/post/:title", asyncWrapper(blogPostController.fetchPostByTitle));
router.get("/posts", asyncWrapper(blogPostController.fetchAllPosts));
router.delete("/post/:title", checkAdmin, asyncWrapper(blogPostController.deletePostByKebabTitle));

module.exports = router;
