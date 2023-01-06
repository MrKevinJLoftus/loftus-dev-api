const express = require('express');
const choresController = require('../controllers/chores');
const asyncWrapper = require('../middleware/async-wrapper');
const checkAdmin = require('../middleware/check-admin');

const router = express.Router();

router.post("/", checkAdmin, asyncWrapper(choresController.createChore));
router.get("/:id", checkAdmin, asyncWrapper(choresController.fetchChoreById));
router.get("/", checkAdmin, asyncWrapper(choresController.fetchAllChores));
router.delete("/:id", checkAdmin, asyncWrapper(choresController.deleteChore));
router.patch("/:id", checkAdmin, asyncWrapper(choresController.updateChore));

router.get("/tasks", checkAdmin, asyncWrapper(choresController.fetchAllTasks));
router.post("/tasks", checkAdmin, asyncWrapper(choresController.logNewTask));
router.get("/dashboard", checkAdmin, asyncWrapper(choresController.getDashboardData));

router.get("/people", checkAdmin, asyncWrapper(choresController.fetchAllPeople));
router.post("/people", checkAdmin, asyncWrapper(choresController.createChorePerson));

module.exports = router;
