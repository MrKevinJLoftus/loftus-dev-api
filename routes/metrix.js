const express = require('express');
const metrixController = require('../controllers/metrix');
const asyncWrapper = require('../middleware/async-wrapper');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post("/goal", checkAuth, asyncWrapper(metrixController.createGoal));
router.get("/goals", checkAuth, asyncWrapper(metrixController.fetchAllGoals));
router.post("/goals/:id/update", checkAuth, asyncWrapper(metrixController.createGoalUpdate));

module.exports = router;
