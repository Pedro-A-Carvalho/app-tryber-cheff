import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Header from '../components/Header';
import ShareButton from '../components/ShareButton';

import favoriteIconBlack from '../images/blackHeartIcon.svg';

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
  const [isFavorite, setIsFavorite] = useState<boolean[]>(favRecipes.map(() => false));

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

  const handleFavorite = (index: number) => {
    const updatedFavorites = [...favRecipes];
    updatedFavorites.splice(index, 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));

    const newIsFavorite = [...isFavorite];
    newIsFavorite.splice(index, 1);
    setIsFavorite(newIsFavorite);
    setFavRecipes(updatedFavorites);
  };

  const results = favRecipes.map((recipe, index) => (
    <section key={ recipe.id }>
      <Link
        key={ index }
        to={ `/${recipe.type}s/${recipe.id}` }
        data-testid={ `${index}-recipe-card` }
      >
        <div>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-horizontal-image` }
            style={ { width: '100vw', height: 'auto' } }
          />
          <p data-testid={ `${index}-card-name` }>{ recipe.name }</p>

        </div>
      </Link>

      <Link
        key={ index }
        to={ `/${recipe.type}s/${recipe.id}` }
      >
        <h1 data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </h1>
      </Link>

      {mealOrDrink(recipe, index)}

      <ShareButton index={ index } type={ recipe.type } id={ recipe.id } />

      <Button onClick={ () => handleFavorite(index) }>
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ favoriteIconBlack }
          alt="FavoriteBlack"
        />
      </Button>

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
        onClick={ () => setFavRecipes(getFavorite) }
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
