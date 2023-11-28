import { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function Recipes() {
  const { categories, filteredRecipes } = useContext(RecipeContext);
  const sizeRecipes = Math.min(12, filteredRecipes.length);
  const recipes = filteredRecipes.slice(0, sizeRecipes);
  const sizeCategories = Math.min(5, recipes.length);
  const categoriesToFilter = categories.slice(0, sizeCategories);
  return (
    <div>
      <div>
        { categoriesToFilter.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            { category.strCategory }
          </button>
        ))}
      </div>
      { recipes.map((recipe, index) => (
        <div key={ recipe.id } data-testid={ `${index}-recipe-card` }>
          <img
            src={ recipe.image }
            alt={ recipe.name }
            data-testid={ `${index}-card-img` }
          />
          <p data-testid={ `${index}-card-name` }>{ recipe.name }</p>

        </div>
      ))}
    </div>
  );
}

export default Recipes;
