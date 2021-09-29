const queries = require('../queries/meal-prep');
const dbconn = require('../utilities/database_connectors');

exports.createNewRecipe = async (req, res, next) => {
  // insert new recipe
  const insertRecipeResult = await dbconn.executeMysqlQuery(queries.CREATE_RECIPE, [
    req.body.name, req.body.difficulty, req.body.health
  ]);
  // insert recipe_x_ingredients records
  const { sql, params } = queries.INSERT_RECIPE_X_INGREDIENTS(insertRecipeResult.insertId, req.body.ingredients)
  res.status(200).json({
    message: `Recipe created successfully.`
  });
};

exports.createNewIngredient = async (req, res, next) => {

};

exports.fetchRecipeById = async (req, res, next) => {

};

exports.fetchAllRecipes = async (req, res, next) => {
  const results = await dbconn.executeMysqlQuery(queries.FETCH_ALL_RECIPES);
  res.status(200).json({
    message: `Fetched recipes successfully.`,
    recipes: results
  });
};

exports.fetchAllIngredients = async (req, res, next) => {

};

exports.deleteRecipeById = async (req, res, next) => {

};

exports.updateRecipeById = async (req, res, next) => {

};
