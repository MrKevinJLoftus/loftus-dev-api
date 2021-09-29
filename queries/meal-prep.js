module.exports = {
  CREATE_RECIPE: `insert into
  recipes (name, difficulty, health)
  values (?,?,?)`,
  CREATE_INGREDIENT: `insert into
    ingredients (name, description)
  values (?,?)`,
  INSERT_RECIPE_X_INGREDIENTS: (recipeId, ingredients) => {
    const params = [];
    let sql = `insert into recipe_x_ingredients (recipe_id,ingredient_id) values `;
    ingredients.forEach((ingredientId, index) => {
      params.push(recipeId);
      params.push(ingredientId);
      sql += `(?,?)${index === ingredients.length - 1 ? '' : ','}`;
    });
    return { sql, params };
  },
  FETCH_ALL_RECIPES: `select * from recipes r order by name`,
  FETCH_ALL_INGREDIENTS: `select * from ingredients i order by name`,
  FETCH_INGREDIENTS_BY_RECIPE_IDS: (recipeIds) => {
    const params = [];
    let sql = `select i.ingredient_id, i.name, i.description from
      ingredients i
    INNER JOIN
      recipe_x_ingredients rxi
    ON
      i.ingredient_id = rxi.ingredient_id AND (`;
    recipeIds.forEach((recipeId, index) => {
      sql += ` rxi.recipe_id = ? ${index < recipeIds.length - 1 ? ' OR ' : ''}`;
      params.push(recipeId);
    });
    sql += `) order by i.name`;
  },
  FETCH_INGREDIENTS_BY_RECIPE_ID: `select i.ingredient_id, i.name, i.description from
    ingredients i
  INNER JOIN
    recipe_x_ingredients rxi
  ON
    i.ingredient_id = rxi.ingredient_id AND rxi.recipe_id = ?
  order by i.name`
};
