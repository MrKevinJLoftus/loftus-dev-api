const express = require('express');
const metrixController = require('../controllers/metrix');
const asyncWrapper = require('../middleware/async-wrapper');
const router = express.Router();

router.post("/goal", asyncWrapper(metrixController.createGoal));
router.get("/goals", asyncWrapper(metrixController.fetchAllGoals));
router.post("/goals/:id/update", asyncWrapper(metrixController.createGoalUpdate));

module.exports = router;
