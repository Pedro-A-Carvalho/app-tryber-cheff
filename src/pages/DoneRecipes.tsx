import { useState } from 'react';
import { DoneRecipeType } from '../types';
import ShareButton from '../components/ShareButton';
import Header from '../components/Header';

function DoneRecipes() {
  const getDoneRecipes: DoneRecipeType[] = JSON
    .parse(localStorage.getItem('doneRecipes') || '[]');

  const [doneRecipes, setDoneRecipes] = useState<DoneRecipeType[]>(getDoneRecipes);

  const mealOrDrink = (recipe: DoneRecipeType, index: any) => {
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

  const path = (window.location.href).split('/');

  const result = doneRecipes.map((recipe, index) => (
    <section key={ recipe.id }>
      <a href={ `${path[0]}//${path[2]}/${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
          style={ { width: '100vw', height: 'auto' } }
        />
      </a>

      <a href={ `${path[0]}//${path[2]}/${recipe.type}s/${recipe.id}` }>
        <h1 data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </h1>
      </a>

      <p data-testid={ `${index}-horizontal-done-date` }>
        { recipe.doneDate }
      </p>

      {mealOrDrink(recipe, index)}

      <ShareButton index={ index } type={ recipe.type } id={ recipe.id } />

      {recipe.tags.map((tag, indexx) => (
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
    const filtered = doneRecipes.filter((recipe) => (
      recipe.type === whichType
    ));
    console.log(filtered);
    setDoneRecipes(filtered);
    return filtered;
  };

  return (
    <>
      <Header>Done Recipes</Header>

      <button
        data-testid="filter-by-all-btn"
        onClick={ () => setDoneRecipes(getDoneRecipes) }
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
      {result}
    </>
  );
}

export default DoneRecipes;
