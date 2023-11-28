import { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';

function Recipes() {
  const {
    categories,
    filteredRecipes,
    filteredCategories,
    setFilteredCategories,
    loading,
  } = useContext(RecipeContext);
  const sizeRecipes = Math.min(12, filteredRecipes.length);
  const sizeCategories = Math.min(5, categories.length);
  if (loading) return <div>Loading...</div>;
  console.log(filteredRecipes);
  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setFilteredCategories([]) }
        >
          All
        </button>
        { categories.slice(0, sizeCategories).map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ () => {
              if (filteredCategories.includes(category)) {
                setFilteredCategories(filteredCategories
                  .filter((cat) => cat !== category));
              } else {
                setFilteredCategories([category]);
              }
            } }
          >
            { category.strCategory }
          </button>
        ))}
      </div>
      { filteredRecipes.slice(0, sizeRecipes).map((recipe, index) => (
        <div key={ index } data-testid={ `${index}-recipe-card` }>
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
