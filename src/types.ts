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

export type RecipeDetailsContextType = {
  pageMeals: (id: string) => Promise<void>,
  pageDrinks: (id: string) => Promise<void>
  ingredients: string[],
  measure: string[],
  recipe: RecipeAllTypes[],
  recommended: RecipeAllTypes[]
  handleCopyClick: () => Promise<void>,
  copyLink: boolean,
  handleLeftClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  handleRightClick: (event: React.MouseEvent<HTMLButtonElement>) => void,
  carousel: any

};

export type RecipeProviderType = {
  children: ReactNode
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

export type RecipeAllTypes = {
  dateModified: string;
  idMeal: string;
  strArea: string;
  strCategory: string;
  strCreativeCommonsConfirmed: string;
  strDrinkAlternate: string;
  strImageSource: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strInstructions: string;
  strMeal: string;
  strMealThumb: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strTags: string;
  strYoutube: string;
  idDrinks: string;
  strAlcoholic: string;
  strDrink: string;
  strDrinkThumb: string;
  strGlass: string;
  strIBA: string;
  strInstructionsDE: string;
  strInstructionsES: string;
  strInstructionsFR: string;
  strInstructionsIT: string;
  strVideo: string;
};

export type DoneRecipeType = {
  id: string,
  nationality: string,
  name: string,
  category: string,
  image: string,
  tags: string[],
  alcoholicOrNot: string,
  type: string,
  doneDate: string,
};
