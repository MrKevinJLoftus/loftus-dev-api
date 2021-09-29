const express = require('express');
const mealPrepController = require('../controllers/meal-prep');
const asyncWrapper = require('../middleware/async-wrapper');
const checkAdmin = require('../middleware/check-admin');

const router = express.Router();

router.post("/recipes", checkAdmin, asyncWrapper(mealPrepController.createNewRecipe));
router.get("/recipes/:id", asyncWrapper(mealPrepController.fetchRecipeById));
router.get("/recipes", asyncWrapper(mealPrepController.fetchAllRecipes));
router.get("/ingredients", asyncWrapper(mealPrepController.fetchAllIngredients));
router.delete("/recipes/:id", checkAdmin, asyncWrapper(mealPrepController.deleteRecipeById));
router.patch("/recipes/:id", checkAdmin, asyncWrapper(mealPrepController.updateRecipeById));

module.exports = router;
