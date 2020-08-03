const express = require('express');
const User = require('../models/user');
const userController = require('../controllers/user');
const asyncWrapper = require('../middleware/async-wrapper');
const router = express.Router();

router.post("/login", asyncWrapper(userController.userLogin));
router.post("/create", asyncWrapper(userController.createUser));

module.exports = router;
