const queries = require('../queries/blog');
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
 * Create new blog post and save it to the database.
 */
exports.createChore = async (req, res) => {
  await dbconn.executeMysqlQuery(queries.CREATE_POST, [
    newChore.title, newChore.kebabTitle, newChore.body,
    newChore.blurb, newChore.tags && newChore.tags.join(','), newChore.createdBy
  ]);
  res.status(200).json({
    message: `Blog post saved successfully.`
  });
}

/**
 * Fetch a specific blog post by its kebabTitle.
 */
exports.fetchChoreById = async (req, res) => {
  const foundChore = await dbconn.executeMysqlQuery(queries.FIND_POST_BY_ID, [req.params.id]);
  if (!foundChore || foundChore.length < 1) {
    res.status(404).json({
      message: `Error retrieving blog post.`
    });
  } else {
    splitChoreTags(foundChore[0]);
    res.status(200).json({
      post: foundChore[0],
      message: `Successfully fetched blog post.`
    });
  }
}

/**
 * Fetch all blog posts' titles and blurbs.
 * TODO: Lazily paginate for future case when many posts exist and this becomes inefficient.
 */
exports.fetchAllChores = async (req, res) => {
  const allChores = await dbconn.executeMysqlQuery(queries.GET_ALL_POSTS);
  if (!allChores) {
    res.status(404).json({
      message: `Error fetching blog posts.`
    });
  } else {
    for (let i = 0; i < allChores.length; i++) {
      splitChoreTags(allChores[i]);
    }
    res.status(200).json({
      posts: allChores,
      message: `Successfully fetched blog posts.`
    });
  }
}

/**
 * Set the deleted flag on the specified post.
 */
exports.deleteChoreById = async (req, res) => {
  const foundChore = await dbconn.executeMysqlQuery(queries.FIND_POST_BY_ID, [req.params.id]);
  if (!foundChore || foundChore.length < 1) {
    res.status(404).json({
      message: `Error deleting blog post.`
    });
  } else {
    // set deleted to 1
    await dbconn.executeMysqlQuery(queries.DELETE_POST_BY_ID, [foundChore[0].id]);
    res.status(200).json({
      message: `Successfully deleted blog post.`
    });
  }
}

/**
 * Updates an existing post with the details provided.
 */
exports.updateChoreById = async (req, res) => {
  const updatedChore = new Chore(req.body.blogChore, req.userData.userId);
  const foundChore = await dbconn.executeMysqlQuery(queries.FIND_POST_BY_ID, [req.params.id]);
  if (!foundChore || foundChore.length < 1) {
    res.status(404).json({
      message: `Error updating blog post.`
    });
  } else {
    await dbconn.executeMysqlQuery(
      queries.UPDATE_POST_BY_ID,
      [
        updatedChore.title,
        updatedChore.kebabTitle,
        updatedChore.body,
        updatedChore.blurb,
        updatedChore.tags && updatedChore.tags.join(','),
        updatedChore.createdBy,
        req.params.id
      ]
    );
    res.status(200).json({
      message: `Successfully updated blog post.`
    });
  }
}

/**
 * Convert comma delimited string to array.
 * @param {*} blogChore 
 */
function splitChoreTags(blogChore) {
  if (blogChore.tags) {
    blogChore.tags = blogChore.tags.split(',');
  }
}