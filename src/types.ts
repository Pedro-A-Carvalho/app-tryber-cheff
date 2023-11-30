import { ReactNode } from 'react';

export type HeaderType = {
  children: ReactNode,
};

export type ChildrenType = {
  children: ReactNode,
};

export type SearchBarTypes = {
  endIngredients: string,
  endName: string,
  endFirstLetter: string,
};

export type SearchContextType = {
  values: {
    search: string;
  }
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type MealType = {
  idMeal: string,
  strMeal: string,
  strMealThumb: string,
};

export type DrinkType = {
  idDrink: string,
  strDrink: string,
  strDrinkThumb: string,
};

export type Recipe = {
  id: string;
  name: string;
  image: string;
};

export type Category = {
  strCategory: string;
};
