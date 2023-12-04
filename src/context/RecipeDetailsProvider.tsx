import { useState } from 'react';
import { RecipeAllTypes, RecipeProviderType } from '../types';
import RecipeDetailsContext from './RecipeDetailsContext';

function RecipeDetailsProvider({ children }: RecipeProviderType) {
  const [ingredients, setIngredients] = useState(['']);
  const [measure, setMeasure] = useState(['']);
  const [recipe, setRecipe] = useState<RecipeAllTypes[]>([]);
  const [recommended, setRecommended] = useState<RecipeAllTypes[]>([]);

  const filterIngredientsAndMeasure = (data: any) => {
    const filterIngredients = Object.keys(data[0])
      .filter((item) => item.startsWith('strIngredient'));
    const getIngredient = filterIngredients
      .map((ingredient) => data[0][ingredient]);
    setIngredients(getIngredient);

    const filterMeasure = Object.keys(data[0])
      .filter((item) => item.startsWith('strMeasure'));
    const getMeasure = filterMeasure
      .map((measureItem) => data[0][measureItem]);
    setMeasure(getMeasure);
  };

  const pageMeals = async (id: string) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    setRecipe(data.meals);
    // pega ingredients e measure
    filterIngredientsAndMeasure(data.meals);
    const responseDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const dataDrink = await responseDrink.json();
    setRecommended(dataDrink.drinks);
  };

  const pageDrinks = async (id: string) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    const data = await response.json();
    console.log(data.drinks);
    setRecipe(data.drinks);
    // pega ingredients e measure
    filterIngredientsAndMeasure(data.drinks);
    const responseMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const dataMeal = await responseMeal.json();
    setRecommended(dataMeal.meals);
  };

  const value = {
    ingredients,
    measure,
    pageDrinks,
    pageMeals,
    recipe,
    recommended,
  };

  return (
    <RecipeDetailsContext.Provider value={ value }>
      {children}
    </RecipeDetailsContext.Provider>
  );
}

export default RecipeDetailsProvider;
