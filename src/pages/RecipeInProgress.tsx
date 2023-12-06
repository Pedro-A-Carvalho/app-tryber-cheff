import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeDetailsContext from '../context/RecipeDetailsContext';
import shareIcon from '../images/shareIcon.svg';
import favoriteIconWhite from '../images/whiteHeartIcon.svg';
import favoriteIconBlack from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const path = window.location.pathname;
  const type = path.split('/')[1];
  const { id }: any = useParams();
  const navigate = useNavigate();
  const newPath = path.slice(1);
  const indexCaractere = newPath.indexOf('/');
  const pathNameForStorage = newPath.slice(0, indexCaractere - 1);
  const { ingredients, measure, pageDrinks, pageMeals, recipe,
    recommended, handleCopyClick, copyLink } = useContext(RecipeDetailsContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes') || '[]');
  const thisRecipe = recipesInProgress.find((element : any) => element.id === id);
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  const [ingredientsDone, setIngredientsDone] = useState<boolean[]>([]);
  let botaoFinalizar = true;
  if (ingredientsDone.length > 0) {
    ingredientsDone.forEach((element) => {
      if (!element) {
        botaoFinalizar = false;
      }
    });
  } else {
    botaoFinalizar = false;
  }

  if (thisRecipe === undefined) {
    const newRecipeInProgress = {
      id,
      ingredientsDone: [], // array de booleanos
    };
    const newStorage = JSON.parse(JSON.stringify(recipesInProgress));
    newStorage.push(newRecipeInProgress);
    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
  }

  useEffect(() => {
    const requestApi = async () => {
      if (path === `/meals/${id}/in-progress`) {
        pageMeals(id);
        const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

        getFavorite
          .forEach((recipeFavorite: any) => {
            if (recipeFavorite.id.includes(id)) {
              setIsFavorite(true);
            }
          });
      }
      if (path === `/drinks/${id}/in-progress`) {
        pageDrinks(id);
        const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

        getFavorite
          .forEach((recipeFavorite: any) => {
            if (recipeFavorite.id.includes(id)) {
              setIsFavorite(true);
            }
          });
      }
    };
    requestApi();
    setIngredientsDone(JSON.parse(localStorage.getItem(id) || '[]'));
  }, []);
  useEffect(() => {
    if (thisRecipe.ingredientsDone.length === 0) {
      const newIngredientsDone = ingredients
        .filter((ingredient) => ingredient !== null && ingredient.length > 0)
        .map(() => false);
      setIngredientsDone(newIngredientsDone);
    } else {
      const newIngredientsDone = thisRecipe.ingredientsDone;
      setIngredientsDone(newIngredientsDone);
    }
  }, [ingredients]);
  const handleFavorite = () => {
    const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const newFavorite = {
      id,
      type: pathNameForStorage,
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory || '',
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      name: recipe[0].strDrink || recipe[0].strMeal,
      image: recipe[0].strDrinkThumb || recipe[0].strMealThumb,
    };
    if (isFavorite) {
      const removeStorage = getFavorite
        .filter((recipeFavorite: any) => (
          !recipeFavorite.id.includes(id)
        ));
      setIsFavorite(false);
      localStorage
        .setItem('favoriteRecipes', JSON.stringify(removeStorage));
    } else {
      setIsFavorite(true);
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...getFavorite, newFavorite]));
    }
  };
  const handleRecipeDone = () => {
    const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const newDoneRecipe = {
      id,
      type: pathNameForStorage,
      area: recipe[0].strArea || '',
      category: recipe[0].strCategory || '',
      alcoholicOrNot: recipe[0].strAlcoholic || '',
      name: recipe[0].strDrink || recipe[0].strMeal,
      image: recipe[0].strDrinkThumb || recipe[0].strMealThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: recipe[0].strTags || [],
    };
    const removeStorage = recipesInProgress
      .filter((recipeInProgress: any) => (
        !recipeInProgress.includes(id)
      ));
    localStorage
      .setItem('inProgressRecipes', JSON.stringify([...removeStorage]));
    localStorage
      .setItem('doneRecipes', JSON.stringify([...getDoneRecipes, newDoneRecipe]));
    navigate('/done-recipes');
  };
  return (
    <div>
      {
        recipe.map((item) => (
          <div key={ id }>
            <img
              src={ item.strMealThumb || item.strDrinkThumb }
              alt="recipe"
              data-testid="recipe-photo"
              style={ { width: '100vw', height: 'auto' } }
            />
            <h1 data-testid="recipe-title">{item.strMeal || item.strDrink}</h1>
            {
          path === `/meals/${id}`
            ? <p data-testid="recipe-category">{item.strCategory}</p>
            : <p data-testid="recipe-category">{item.strAlcoholic}</p>
        }
            <div>
              <h2>Ingredients</h2>
              <ul>
                {
                ingredients.map((ingredient, index) => (
                  ingredient !== null && ingredient.length > 0
                    ? (
                      <li
                        key={ index }
                        data-testid={ `${index}-ingredient-step` }
                        style={
                            { textDecoration: ingredientsDone[index]
                              ? 'line-through solid rgb(0, 0, 0)' : 'none' }
}
                      >
                        {`${ingredient} ${measure[index]}`}
                        <input
                          type="checkbox"
                          name={ ingredient }
                          value={ ingredients }
                          onChange={ () => {
                            const newIngredientsDone = [...ingredientsDone];
                            newIngredientsDone[index] = !ingredientsDone[index];
                            setIngredientsDone(newIngredientsDone);
                            const newStorage = recipesInProgress.map(
                              (recipeInProgress: any) => {
                                if (recipeInProgress.id === id) {
                                  recipeInProgress
                                    .ingredientsDone = newIngredientsDone;
                                }
                                return recipeInProgress;
                              },
                            );
                            localStorage
                              .setItem('inProgressRecipes', JSON.stringify(newStorage));
                          } }
                          checked={ ingredientsDone[index] }
                        />
                      </li>
                    ) : null
                ))
          }
              </ul>
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
            <button
              data-testid="finish-recipe-btn"
              style={ { position: 'fixed', bottom: '0', left: '0', width: '100vw' } }
              onClick={ handleRecipeDone }
              disabled={ !botaoFinalizar }
            >
              Finish Recipe
            </button>
            <button
              data-testid="share-btn"
              style={ { marginBottom: '10vh' } }
              onClick={ handleCopyClick }
            >
              <img src={ shareIcon } alt="Share" />
            </button>
            <button
              onClick={ handleFavorite }
            >
              <img
                data-testid="favorite-btn"
                src={ !isFavorite ? favoriteIconWhite : favoriteIconBlack }
                alt="Share"
              />
            </button>
            {
            copyLink && <span>Link copied!</span>
          }
          </div>
        ))
      }
    </div>
  );
}
export default RecipeInProgress;
