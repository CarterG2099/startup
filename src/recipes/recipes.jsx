import React from 'react';

import './recipes.css';

export function Recipes() {
  const [recipes, setRecipes] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/recipes')
    .then((response) => {
      console.log("Successful call")
      // console.log("response: " + response.json())
      return response.json()
    })
    .then((recipes) => {
      console.log("Recipes: ", recipes)
      setRecipes(recipes);
      localStorage.setItem('recipes', JSON.stringify(recipes))
    })
    .catch((error) => {
      console.error(`Error loading recipes: ${error.message}`);
      const recipesText = localStorage.getItem('recipes');
      if (recipesText) {
        const parsedRecipes = JSON.parse(recipesText)
        if (parsedRecipes) { // Check if parsedRecipes is not null or undefined
          setRecipes(parsedRecipes);
        }
      }
    });
  },  []);

  const breakfastRows = [];
  const lunchRows = [];
  const dinnerRows = [];

    // Iterate over recipes to create table rows for each meal type
    recipes.forEach((recipe, i) => {
      const recipeTable = (
        <>
        <table>
          <thead>
            <tr>
              <th>Meal Title</th>
              <th>Ingredients</th>
              <th>Nutrition Info</th>
            </tr>
          </thead>
          <tbody>
            <tr className="meal-row">
              <td className='meal-title'>{recipe.mealTitle}</td>
              <td>
                <ul>
                  {recipe.ingredients}
                </ul>
              </td>
              <td>
                <ul>
                  <li>{recipe.perServing.calories}</li>
                  <li>{recipe.perServing.protein}</li>
                  <li>{recipe.perServing.fat}</li>
                  <li>{recipe.perServing.carbs}</li>
                </ul>
              </td>
            </tr>
            <tr className='link-row'>
              <td>{recipe.instructions}</td>
              <td>{recipe.reviewsLink}</td>
              <td>{recipe.votes}</td>
            </tr>
          </tbody>
        </table>
        </>
      );
  
      // Push the row to the corresponding meal type array
      if (recipe.mealType === 'breakfast') {
        breakfastRows.push(recipeTable);
      } else if (recipe.mealType === 'lunch') {
        lunchRows.push(recipeTable);
      } else if (recipe.mealType === 'dinner') {
        dinnerRows.push(recipeTable);
      }
    });

  return (
    <main className="container-fluid bg-light text-center text-dark">
      <h2 className="user-name"> Vote for Your Favorite Recipe</h2>
      <h3>Top Rated Recipes</h3>
      <br />
      <br />
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newRecipeModal">Add Recipe</button>
      <br />
      <div className="body-container">
        <table id="table-container">
          <thead>
            <tr>            
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
            <tr id="images">
              <td id="breakfast-image" className="img-thumbnail"></td>
              <td id="lunch-image" className="img-thumbnail"></td>
              <td id="dinner-image" className="img-thumbnail"></td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td id="breakfast-table" className="meal-table">{breakfastRows}</td>
              <td id='lunch-table' className="meal-table">{lunchRows}</td>
              <td id='dinner-table' className="meal-table">{dinnerRows}</td>
            </tr>          
          </tbody>
        </table>
      </div>
    </main>
  );
}