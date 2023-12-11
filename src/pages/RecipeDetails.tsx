import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './RecipeDetails.css';
import shareIcon from '../images/shareIcon.svg';
import favoriteIconWhite from '../images/whiteHeartIcon.svg';
import favoriteIconBlack from '../images/blackHeartIcon.svg';
import RecipeDetailsContext from '../context/RecipeDetailsContext';
import ButtonCarousel from '../images/216151_right_chevron_icon.png';

function RecipeDetails() {
  const { ingredients, measure, pageDrinks, pageMeals, recipe,
    recommended, handleCopyClick, copyLink } = useContext(RecipeDetailsContext);
  const { id }: any = useParams();
  const location = useLocation();
  const path = location.pathname;
  const newPath = path.slice(1);
  const indexCaractere = newPath.indexOf('/');
  const navigate = useNavigate();
  const cards = recommended.slice(0, 6);
  const pathNameForStorage = newPath.slice(0, indexCaractere - 1);
  const [isFavorite, setIsFavorite] = useState(false);
  const type = path.split('/')[1];
  const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes')
  || JSON.stringify({ meals: {}, drinks: {} }));
  const carousel: any = useRef();

  useEffect(() => {
    const requestApi = async () => {
      if (path === `/meals/${id}`) {
        pageMeals(id);
        const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
        getFavorite
          .forEach((recipeFavorite: any) => {
            if (recipeFavorite.id.includes(id)) {
              setIsFavorite(true);
            }
          });
      }
      if (path === `/drinks/${id}`) {
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
  }, []);

  const handleFavorite = () => {
    const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const newFavorite = {
      id,
      type: pathNameForStorage,
      nationality: recipe[0].strArea || '',
      category: recipe[0].strCategory,
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

  const handleLeftClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(carousel.current.offsetWidth);
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log(carousel.current.offsetWidth);
    carousel.current.scrollLeft += carousel.current.offsetWidth;
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
                style={ { width: '100vw', height: 'auto' } }
              />
            )
          }
            <h2>Recommended</h2>
            <div className="container-recommended">
              <div
                className="carousel"
                ref={ carousel }
              >
                {cards.map((card, index) => (
                  <div
                    className="item"
                    key={ index }
                    data-testid={ `${index}-recommendation-card` }
                  >
                    <div className="image">
                      <img
                        src={ card.strDrinkThumb || card.strMealThumb }
                        alt={ card.strDrink || card.strMeal }
                        style={ { width: 'auto', height: '10em' } }
                      />
                    </div>
                    <div className="name-item">
                      <span
                        data-testid={ `${index}-recommendation-title` }
                      >
                        {card.strDrink || card.strMeal}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="buttons">
              <button onClick={ handleLeftClick } className="buttonLeft">
                <img
                  src={ ButtonCarousel }
                  alt="Scroll Left"
                />
              </button>
              <button onClick={ handleRightClick }>
                <img
                  src={ ButtonCarousel }
                  alt="Scroll Right"
                />
              </button>
            </div>

            {(Object.keys(recipesInProgress[`${type}`]).includes(id))
              ? (
                <button
                  data-testid="start-recipe-btn"
                  style={
                      { position: 'fixed', bottom: '0', left: '0', width: '100vw' }
}
                  onClick={ () => navigate(`${path}/in-progress`) }
                >
                  Continue Recipe
                </button>
              ) : (
                <button
                  data-testid="start-recipe-btn"
                  style={
                      { position: 'fixed', bottom: '0', left: '0', width: '100vw' }
}
                  onClick={ () => {
                    navigate(`${path}/in-progress`);
                  } }
                >
                  Start Recipe
                </button>
              )}
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
                alt={ !isFavorite ? 'FavoriteWhite' : 'FavoriteBlack' }
              />
            </button>
            {
            copyLink && <span>Link copied!</span>
          }
          </div>
        ))
      }
    </>
  );
}

export default RecipeDetails;
