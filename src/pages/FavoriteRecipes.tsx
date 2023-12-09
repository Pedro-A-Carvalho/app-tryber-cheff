import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

type FavRecipeType = {
  id: string,
  type: string,
  nationality: string,
  category: string,
  name: string,
  alcoholicOrNot: string,
  image: string,
  tags: string[],
};

function FavoriteRecipes() {
  const getFavorite = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');

  const [favRecipes, setFavRecipes] = useState<FavRecipeType[]>(getFavorite);

  const mealOrDrink = (recipe: FavRecipeType, index: any) => {
    if (recipe.type === 'meal') {
      return (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.nationality} - ${recipe.category}` }
        </p>
      );
    } if (recipe.type === 'drink') {
      return (
        <p data-testid={ `${index}-horizontal-top-text` }>
          {recipe.alcoholicOrNot}
        </p>
      );
    }
  };

  const location = useLocation();
  const path = location.pathname;

  const results = favRecipes.map((recipe, index) => (
    <section key={ recipe.id }>
      <a href={ `${path[0]}//${path[2]}/${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </a>

      <a href={ `${path[0]}//${path[2]}/${recipe.type}s/${recipe.id}` }>
        <h1 data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </h1>
      </a>

      {mealOrDrink(recipe, index)}

      <ShareButton index={ index } type={ recipe.type } id={ recipe.id } />

      {recipe.tags && recipe.tags.map((tag, indexx) => (
        <a
          key={ indexx }
          href={ tag }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </a>
      ))}

    </section>
  ));

  const filter = (whichType: string) => {
    const filtered = favRecipes.filter((recipe) => (
      recipe.type === whichType
    ));
    console.log(filtered);
    setFavRecipes(filtered);
    return filtered;
  };

  return (
    <>
      <Header>Favorite Recipes</Header>

      <button
        data-testid="filter-by-all-btn"

      >
        All
      </button>

      <button
        data-testid="filter-by-meal-btn"
        onClick={ () => filter('meal') }
      >
        Meals
      </button>

      <button
        data-testid="filter-by-drink-btn"
        onClick={ () => filter('drink') }
      >
        Drinks
      </button>
      {results}
    </>
  );
}

export default FavoriteRecipes;
