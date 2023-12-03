import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { RecipeAllTypes } from '../types';
import './RecipeDetails.css';
import 'slick-carousel/slick/slick.css';

function RecipeDetails() {
  const [recipe, setRecipe] = useState<RecipeAllTypes[]>([]);
  const [ingredients, setIngredients] = useState(['']);
  const [measure, setMeasure] = useState(['']);
  const [recommended, setRecommended] = useState<RecipeAllTypes[]>([]);
  const { id } = useParams();
  const location = useLocation();
  const path = location.pathname;
  const cards = recommended.slice(0, 6);

  const pageMeals = async () => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    console.log(data.meals);
    setRecipe(data.meals);

    // pega ingredientes
    const filterIngredients = Object.keys(data.meals[0])
      .filter((item) => item.startsWith('strIngredient'));
    const getIngredient = filterIngredients
      .map((ingredient) => data.meals[0][ingredient]);
    setIngredients(getIngredient);
    // pega quantidades
    const filterMeasure = Object.keys(data.meals[0])
      .filter((item) => item.startsWith('strMeasure'));
    const getMeasure = filterMeasure
      .map((measureItem) => data.meals[0][measureItem]);
    setMeasure(getMeasure);

    const responseDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const dataDrink = await responseDrink.json();
    setRecommended(dataDrink.drinks);
    console.log(dataDrink.drinks);
  };

  const pageDrinks = async () => {
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

    const responseMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const dataMeal = await responseMeal.json();
    setRecommended(dataMeal.meals);
    console.log(dataMeal.meals);
  };

  useEffect(() => {
    const requestApi = async () => {
      if (path === `/meals/${id}`) {
        pageMeals();
      }
      if (path === `/drinks/${id}`) {
        pageDrinks();
      }
    };
    requestApi();
  }, []);

  console.log(ingredients);

  const settings = {
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 700,
    arrows: true,
  };

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

            <h2>Recommended</h2>
            <Slider { ...settings }>
              {cards.map((card, index) => (
                <div
                  key={ index }
                  className="card"
                  data-testid={ `${index}-recommendation-card` }
                >
                  <img
                    src={ card.strDrinkThumb || card.strMealThumb }
                    alt={ card.strDrink || card.strMeal }
                    style={ { width: 'auto', height: '10em' } }
                  />
                  <p
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {card.strDrink || card.strMeal}

                  </p>
                </div>
              ))}
            </Slider>

            <button
              data-testid="start-recipe-btn"
              style={ { position: 'fixed', bottom: '0', left: '0', width: '100vw' } }
            >
              Start Recipe

            </button>

          </div>

        ))
}
    </>
  );
}

export default RecipeDetails;
