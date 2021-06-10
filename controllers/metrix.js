const dbconn = require('../utilities/database_connectors');
const queries = require('../queries/metrix');

class MetrixGoal {
  // new posts come in as type { title, description }
  constructor(goal, userId) {
    this.name = goal.name || 'User Goal';
    this.description = (goal.description || '').trim();
    this.createdBy = userId;
  }
}

/**
 * Create a new goal.
 */
exports.createGoal = async (req, res) => {
  try {
    const goal = new MetrixGoal(req.body, req.userData.userId);
    await dbconn.executeMysqlQuery(queries.CREATE_GOAL, [
      goal.name, goal.description, goal.createdBy
    ]);
    res.status(200).json({
      message: `Goal created successfully.`
    });
  } catch (ex) {
    console.error(ex);
    res.status(500).json({
      message: `Unable to create goal.`
    });
  }
};

/**
 * Fetch all goals for current user.
 */
exports.fetchAllGoals = async (req, res) => {
  const results = await dbconn.executeMysqlQuery(queries.FETCH_ALL_GOALS, [req.userData.userId]);
  // results include 1 row for each update
  // need to format to have an array of updates on each goal
  const formattedResults = [];
  const goalIds = [...new Set((results || []).map(r => r.goalId))];
  goalIds.forEach((goalId) => {
    const rows = results.filter(r => r.goalId === goalId);
    formattedResults.push({
      goalId: rows[0].goalId,
      name: rows[0].name,
      description: rows[0].description,
      createdDate: rows[0].createdDate,
      updates: rows.filter(r => r.updateId).map(r => ({
        updateId: r.updateId,
        description: r.updateDescription,
        rating: r.updateRating,
        createdDate: r.updateCreatedDate
      }))
    });
  });
  res.status(200).json({
    message: `Goals fetched successfully.`,
    goals: formattedResults
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
