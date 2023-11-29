import { createContext } from 'react';
import { Category, Recipe } from '../types';

type RecipeContextType = {
  recipes: Recipe[];
  categories: Category[];
  filteredRecipes: Recipe[];
  filteredCategories: Category[];
  setFilteredRecipes: (recipes: Recipe[]) => void;
  setFilteredCategories: (categories: Category[]) => void;
  loading: boolean;
};

const RecipeContext = createContext({} as RecipeContextType);

export default RecipeContext;
