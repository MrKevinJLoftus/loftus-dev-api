const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Mongoose models
const User = require('../models/user');

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-isAdmin');
const userController = require('../controllers/user');
const asyncWrapper = require('../middleware/async-wrapper');

const router = express.Router();

router.post("/signup", asyncWrapper(userController.userSignUp));

router.post("/login", asyncWrapper(userController.userLogin));

module.exports = router;
