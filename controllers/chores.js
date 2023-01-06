const queries = require('../queries/chores');
const dbconn = require('../utilities/database_connectors');

// router.post("/", checkAdmin, asyncWrapper(choresController.createChore));
// router.get("/:id", checkAdmin, asyncWrapper(choresController.fetchChoreById));
// router.get("/", checkAdmin, asyncWrapper(choresController.fetchAllChores));
// router.delete("/:id", checkAdmin, asyncWrapper(choresController.deleteChore));
// router.patch("/:id", checkAdmin, asyncWrapper(choresController.updateChore));

// router.get("/tasks", checkAdmin, asyncWrapper(choresController.fetchAllTasks));
// router.post("/task", checkAdmin, asyncWrapper(choresController.logNewTask));
// router.get("/dashboard", checkAdmin, asyncWrapper(choresController.getDashboardData));

/**
 * Create new chore and save it to the database.
 */
exports.createChore = async (req, res) => {
  await dbconn.executeMysqlQuery(queries.CREATE_CHORE, [
    req.body.description
  ]);
  res.status(200).json({
    message: `Chore created successfully.`
  });
}

/**
 * Fetch a specific chore by ID.
 */
exports.fetchChoreById = async (req, res) => {
  const foundChore = await dbconn.executeMysqlQuery(queries.FIND_CHORE_BY_ID, [req.params.id]);
  if (!foundChore || foundChore.length < 1) {
    res.status(404).json({
      message: `Error retrieving chore.`
    });
  } else {
    res.status(200).json({
      chore: foundChore[0],
      message: `Successfully fetched chore.`
    });
  }
}

/**
 * Fetch all chores.
 */
exports.fetchAllChores = async (req, res) => {
  const allChores = await dbconn.executeMysqlQuery(queries.GET_ALL_CHORES);
  if (!allChores) {
    res.status(404).json({
      message: `Error fetching chores.`
    });
  } else {
    res.status(200).json({
      chores: allChores,
      message: `Successfully fetched chores.`
    });
  }
}

/**
 * Delete specified chore.
 */
exports.deleteChoreById = async (req, res) => {
  const foundChore = await dbconn.executeMysqlQuery(queries.DELETE_CHORE_BY_ID, [req.params.id]);
  if (!foundChore || foundChore.length < 1) {
    res.status(404).json({
      message: `Error deleting chore.`
    });
  } else {
    await dbconn.executeMysqlQuery(queries.DELETE_CHORE_BY_ID, [foundChore[0].id]);
    res.status(200).json({
      message: `Successfully deleted chore.`
    });
  }
}

/**
 * Updates an existing chore with the details provided.
 */
exports.updateChoreById = async (req, res) => {
  const foundChore = await dbconn.executeMysqlQuery(queries.UPDATE_CHORE_BY_ID, [req.params.id]);
  if (!foundChore || foundChore.length < 1) {
    res.status(404).json({
      message: `Error updating chore.`
    });
  } else {
    await dbconn.executeMysqlQuery(
      queries.UPDATE_POST_BY_ID,
      [
        req.body.description,
        req.params.id
      ]
    );
    res.status(200).json({
      message: `Successfully updated chore.`
    });
  }
}

/**
 * Create new chore person and save it to the database.
 */
 exports.createChorePerson = async (req, res) => {
  await dbconn.executeMysqlQuery(queries.CREATE_PERSON, [
    req.body.name
  ]);
  res.status(200).json({
    message: `Chore person created successfully.`
  });
}

/**
 * Fetch all chore people.
 */
exports.fetchAllPeople = async (req, res) => {
  const allPeople = await dbconn.executeMysqlQuery(queries.GET_ALL_PEOPLE);
  if (!allPeople) {
    res.status(404).json({
      message: `Error fetching chore people.`
    });
  } else {
    res.status(200).json({
      people: allPeople,
      message: `Successfully fetched chore people.`
    });
  }
}

/**
 * Log new completed task to the database.
 */
 exports.logNewTask = async (req, res) => {
   const { choreId, personId, notes } = req.body.task;
  await dbconn.executeMysqlQuery(queries.CREATE_PERSON, [
    choreId, personId, notes
  ]);
  res.status(200).json({
    message: `Task logged successfully.`
  });
}

/**
 * Fetch all tasks.
 */
 exports.fetchAllTasks = async (req, res) => {
  const allTasks = await dbconn.executeMysqlQuery(queries.GET_ALL_TASKS);
  if (!allTasks) {
    res.status(404).json({
      message: `Error fetching tasks.`
    });
  } else {
    res.status(200).json({
      tasks: allTasks,
      message: `Successfully fetched tasks.`
    });
  }
}

/**
 * Fetch most recently completed task for each chore.
 */
 exports.getDashboardData = async (req, res) => {
  const dashboardData = await dbconn.executeMysqlQuery(queries.GET_TASK_DASHBOARD);
  if (!dashboardData) {
    res.status(404).json({
      message: `Error fetching task dashboard data.`
    });
  } else {
    res.status(200).json({
      data: dashboardData,
      message: `Successfully fetched task dashboard data.`
    });
  }
}
