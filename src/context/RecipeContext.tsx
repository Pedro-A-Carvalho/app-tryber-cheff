import { createContext } from 'react';
import { Category, Recipe } from '../types';

type RecipeContextType = {
  recipes: Recipe[];
  categories: Category[];
  filteredRecipes: Recipe[];
  setFilteredRecipes: (recipes: Recipe[]) => void;
};

const RecipeContext = createContext({} as RecipeContextType);

export default RecipeContext;
