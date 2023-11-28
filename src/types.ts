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
