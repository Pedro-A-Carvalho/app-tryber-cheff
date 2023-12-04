import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import './RecipeDetails.css';
import 'slick-carousel/slick/slick.css';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/whiteHeartIcon.svg';
import RecipeDetailsContext from '../context/RecipeDetailsContext';

function RecipeDetails() {
  const {
    ingredients,
    measure,
    pageDrinks,
    pageMeals,
    recipe,
    recommended } = useContext(RecipeDetailsContext);
  const [copyLink, setCopyLink] = useState(false);
  const { id }: any = useParams();
  const location = useLocation();
  const path = location.pathname;
  const newPath = path.slice(1);
  const indexCaractere = newPath.indexOf('/');
  const getPathName = newPath.slice(0, indexCaractere);
  const navigate = useNavigate();
  const cards = recommended.slice(0, 6);
  const [storage, setStorage] = useState([{}]);

  useEffect(() => {
    const requestApi = async () => {
      if (path === `/meals/${id}`) {
        pageMeals(id);
      }
      if (path === `/drinks/${id}`) {
        pageDrinks(id);
      }
    };
    requestApi();
  }, []);

  const settings = {
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 2,
    speed: 700,
    arrows: true,
  };

  // mock localStorage temporário até tela de progress ser implementada
  const inProgressRecipesTeste: any = [{
    drinks: {
      178319: [],
    },
    meals: {
      52771: [],
    },
  }];
  // ---

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyLink(true);
    } catch (error) {
      console.error('Erro ao copiar para a área de transferência:', error);
      setCopyLink(false);
    }
  };

  console.log(storage);

  const handleFavorite = () => {
    setStorage((prevState) => (
      [
        ...prevState,
        {
          id,
          type: getPathName,
          nationality: '',
          category: recipe[0].strCategory,
          alcoholicOrNot: recipe[0].strAlcoholic || '',
          name: recipe[0].strDrink || recipe[0].strMeal,
          image: recipe[0].strDrinkThumb,
        },
      ]));

    localStorage
      .setItem('favoriteRecipes', JSON.stringify(storage));
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

            {Object.keys(inProgressRecipesTeste[0][getPathName]).includes(id)
              ? (
                <button
                  data-testid="start-recipe-btn"
                  style={ { position: 'fixed', bottom: '0', left: '0', width: '100vw' } }
                  onClick={ () => navigate(`${path}/in-progress`) }
                >
                  Continue Recipe
                </button>
              ) : (
                <button
                  data-testid="start-recipe-btn"
                  style={ { position: 'fixed', bottom: '0', left: '0', width: '100vw' } }
                  onClick={ () => navigate(`${path}/in-progress`) }
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
              data-testid="favorite-btn"
              onClick={ handleFavorite }
            >
              <img src={ favoriteIcon } alt="Share" />
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
