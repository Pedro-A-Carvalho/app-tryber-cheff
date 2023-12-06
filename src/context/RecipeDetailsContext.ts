import { createContext } from 'react';
import { RecipeDetailsContextType } from '../types';

const RecipeDetailsContext = createContext({} as RecipeDetailsContextType);

export default RecipeDetailsContext;
