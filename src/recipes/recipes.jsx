  import React from 'react';

  import { InstructionModal } from './instructions';
  import { useState } from 'react';
  import DisplayPicture from './pictures';
  import './recipes.css';

  export function Recipes() {
    const [recipes, setRecipes] = React.useState([]);
    const [showInstructions, setShowInstructions] = useState(false);
    const [instructionText, setInstructionText] = useState('');

    const toggleInstructionsModal = (instructions) => {
      setInstructionText(instructions);
      setShowInstructions(true); // Always set to true when instructions link is clicked
    };

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

    const breakfastImage = <DisplayPicture mealType="breakfast" />;
    const lunchImage = <DisplayPicture mealType="lunch" />;
    const dinnerImage = <DisplayPicture mealType="dinner" />;

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
                    {/* Check if recipe.ingredients exists and is a string before splitting */}
                    {typeof recipe.ingredients === 'string' ? (
                      recipe.ingredients.split('\n').map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))
                    ) : (
                      <li>No ingredients</li>
                    )}
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
                <td>
                  <a
                    href="#"
                    onClick={() => toggleInstructionsModal(recipe.instructions)}
                  >
                    Instructions
                  </a>
                </td>
                <td><a href={recipe.reviewsLink}>Reviews</a></td>
                <td>
                  {recipe.votes}
                  <button class="btn btn-primary">UpVote</button>
                </td>
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

        {showInstructions && (
        <InstructionModal
          instructionText={instructionText}
          setShowInstructions={setShowInstructions}
        />
        )}

        <div className="body-container">
          <table id="table-container">
            <thead>
              <tr>            
                <th>Breakfast</th>
                <th>Lunch</th>
                <th>Dinner</th>
              </tr>
              <tr id="images">
                <td id="breakfast-image" className="img-thumbnail">{breakfastImage}</td>
                <td id="lunch-image" className="img-thumbnail">{lunchImage}</td>
                <td id="dinner-image" className="img-thumbnail">{dinnerImage}</td>
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