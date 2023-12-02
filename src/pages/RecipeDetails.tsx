import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { RecipeDrinksTypes, RecipeMealsTypes } from '../types';

function RecipeDetails() {
  const [recipe, setRecipe] = useState<RecipeMealsTypes[] & RecipeDrinksTypes[]>([]);
  const [ingredients, setIngredients] = useState(['']);
  const [measure, setMeasure] = useState(['']);
  const [recommended, setRecommended] = useState();
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    const requestApi = async () => {
      if (path === `/meals/${id}`) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        console.log(data.meals);
        setRecipe(data.meals);

        // pega ingredientes
        const filterIngredients = Object.keys(data.meals[0])
          .filter((item) => item.startsWith('strIngredient'));
        const getIngredients = filterIngredients
          .map((ingredient) => data.meals[0][ingredient]);
        setIngredients(getIngredients);

        // pega quantidades
        const filterMeasure = Object.keys(data.meals[0])
          .filter((item) => item.startsWith('strMeasure'));
        const getMeasure = filterMeasure
          .map((measureItem) => data.meals[0][measureItem]);
        setMeasure(getMeasure);
        const responseDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        console.log(responseDrink);
        return responseDrink;
      }
      if (path === `/drinks/${id}`) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const data = await response.json();
        console.log(data.drinks);
        setRecipe(data.drinks);

        // pega ingredientes
        const filterIngredients = Object.keys(data.drinks[0])
          .filter((item) => item.startsWith('strIngredient'));
        const getIngredients = filterIngredients
          .map((ingredient) => data.drinks[0][ingredient]);
        setIngredients(getIngredients);

        // pega quantidades
        const filterMeasure = Object.keys(data.drinks[0])
          .filter((item) => item.startsWith('strMeasure'));
        const getMeasure = filterMeasure
          .map((measureItem) => data.drinks[0][measureItem]);
        setMeasure(getMeasure);
        console.log(getMeasure);

        const reponseMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        return reponseMeal;
      }
    };
    requestApi();
  }, []);

  console.log(ingredients);

  return (
    <>
      {
        recipe.map((item) => (
          <div key={ id }>
            <img
              src={ item.strMealThumb || item.strDrinkThumb }
              alt="recipe"
              data-testid="recipe-photo"
            />

            <h1 data-testid="recipe-title">{item.strMeal || item.strDrink}</h1>
            {
          path === `/meals/${id}`
            ? <p data-testid="recipe-category">{item.strCategory}</p>
            : <p data-testid="recipe-category">{item.strAlcoholic}</p>
        }

            <div>
              <h2>Ingredients</h2>
              {

                ingredients.map((ingredient, indexIngredient) => (
                  ingredient !== null && ingredient.length > 0
                    ? (
                      <ul key={ indexIngredient }>
                        <li
                          data-testid={ `${indexIngredient}-ingredient-name-and-measure` }
                        >
                          {`${ingredient} ${measure[indexIngredient]}`}

                        </li>
                      </ul>
                    ) : null
                ))

          }
            </div>

            <div>
              <h2>Instructions</h2>
              <p data-testid="instructions">{item.strInstructions}</p>
            </div>

            {
            path === `/meals/${id}`
            && (
              <iframe
                width="560"
                height="315"
                src={ item.strYoutube }
                title="Video"
                data-testid="video"
              />
            )
          }
          </div>

        ))
}
    </>
  );
}

export default RecipeDetails;
