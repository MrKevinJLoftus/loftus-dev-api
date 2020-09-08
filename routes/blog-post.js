const express = require('express');
const blogPostController = require('../controllers/blog-post');
const asyncWrapper = require('../middleware/async-wrapper');
const checkAdmin = require('../middleware/check-admin');

const router = express.Router();

router.post("/post", checkAdmin, asyncWrapper(blogPostController.createNewBlogPost));
router.get("/post/:id", asyncWrapper(blogPostController.fetchPostById));
router.get("/posts", asyncWrapper(blogPostController.fetchAllPosts));
router.delete("/post/:id", checkAdmin, asyncWrapper(blogPostController.deletePostById));
router.patch("/post/:id", checkAdmin, asyncWrapper(blogPostController.updatePostById));

module.exports = router;
