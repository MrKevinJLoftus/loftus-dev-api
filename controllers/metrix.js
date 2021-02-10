const dbconn = require('../utilities/database_connectors');
const queries = require('../queries/metrix');

class MetrixGoal {
  // new posts come in as type { title, description, frequency }
  constructor(goal, userId) {
    this.name = goal.title || 'User Goal';
    this.desc = goal.description?.trim() || '';
    this.freq = goal.frequency || 1;
    this.createdBy = userId;
  }
}

/**
 * Create a new goal.
 */
exports.createGoal = async (req, res) => {
  const goal = new MetrixGoal(req.body, req.userData.userId);
  await dbconn.executeMysqlQuery(queries.CREATE_GOAL, [
    goal.name, goal.desc, goal.freq, goal.createdBy
  ]);
  res.status(200).json({
    message: `Goal created successfully.`
  });
};

/**
 * Fetch all goals for current user.
 */
exports.fetchAllGoals = async (req, res) => {
  const results = await dbconn.executeMysqlQuery(queries.FETCH_ALL_GOALS, [req.userData.userId]);
  res.status(200).json({
    message: `Goals fetched successfully.`,
    goals: results
  });
};

/**
 * Insert a new goal update.
 */
exports.createGoalUpdate = async (req, res) => {
  await dbconn.executeMysqlQuery(queries.CREATE_GOAL_UPDATE, [
    req.params.id, req.body.description, req.body.rating || null
  ]);
  res.status(200).json({
    message: `Goal updated successfully.`
  });
};

/**
 * Fetch all updates for a specific goal.
 */
exports.fetchAllUpdatesByGoal = async (req, res) => {
  const results = await dbconn.executeMysqlQuery(queries.FETCH_ALL_UPDATES_BY_GOAL, [req.params.id]);
  res.status(200).json({
    message: `Goal updates fetched successfully.`,
    updates: results
  });
};
