import { ReactNode } from 'react';

export type HeaderType = {
  children: ReactNode,
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
