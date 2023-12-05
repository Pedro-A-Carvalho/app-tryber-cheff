import { useEffect, useState } from 'react';
import RecipeContext from './RecipeContext';
import { Category, DrinkType, MealType, Recipe } from '../types';

type RecipeProviderProps = {
  children: React.ReactNode;
};

function RecipeProvider({ children }: RecipeProviderProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const path = window.location.pathname;

  useEffect(
    () => {
      const fetchMeals = async () => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const { meals } = await response.json();
        const simplifiedMeals = meals.map((meal: MealType) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
        }));
        const response2 = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        const { meals: category } = await response2.json();
        setRecipes(simplifiedMeals);
        setCategories(category);
        setFilteredRecipes(simplifiedMeals);
      };
      const fetchDrinks = async () => {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const { drinks } = await response.json();
        const simplifiedDrinks = drinks.map((drink: DrinkType) => ({
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        }));
        const response2 = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        const { drinks: category } = await response2.json();
        setRecipes(simplifiedDrinks);
        setCategories(category);
        setFilteredRecipes(simplifiedDrinks);
      };
      // setLoading(true);
      if (path === '/meals') fetchMeals();
      if (path === '/drinks') fetchDrinks();
      // setLoading(false);
    },
    [path],
  );

  useEffect(
    () => {
      const filterMeals = async () => {
        if (filteredCategories.length === 0) {
          setFilteredRecipes(recipes);
          return;
        }
        const cat = filteredCategories[0].strCategory;
        console.log(cat);
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`);
        const { meals } = await response.json();
        const simplifiedMeals = meals.map((meal: MealType) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
        }));
        console.log(meals);
        setFilteredRecipes(simplifiedMeals);
      };
      const filterDrinks = async () => {
        if (filteredCategories.length === 0) {
          setFilteredRecipes(recipes);
          return;
        }
        const cat = filteredCategories[0].strCategory;
        console.log(cat);
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${cat}`);
        const { drinks } = await response.json();
        const simplifiedDrinks = drinks.map((drink: DrinkType) => ({
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
        }));
        console.log(drinks);
        setFilteredRecipes(simplifiedDrinks);
      };
      setLoading(true);
      if (path === '/meals') filterMeals();
      if (path === '/drinks') filterDrinks();
      setLoading(false);
    },
    [filteredCategories],
  );

  const context = {
    recipes,
    categories,
    filteredRecipes,
    filteredCategories,
    setFilteredRecipes,
    setFilteredCategories,
    loading,
  };

  return (
    <RecipeContext.Provider value={ context }>
      {children}
    </RecipeContext.Provider>
  );
}

export default RecipeProvider;
