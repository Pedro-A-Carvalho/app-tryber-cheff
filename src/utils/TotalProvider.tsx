import RecipeDetailsProvider from '../context/RecipeDetailsProvider';
import RecipeProvider from '../context/RecipeProvider';
import SearchProvider from '../context/SearchProvider';
import { ChildrenType } from '../types';

function TotalProvider({ children }:ChildrenType) {
  return (
    <RecipeProvider>
      <RecipeDetailsProvider>
        <SearchProvider>
          {children}
        </SearchProvider>
      </RecipeDetailsProvider>
    </RecipeProvider>
  );
}

export default TotalProvider;
