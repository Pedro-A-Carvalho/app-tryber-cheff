import RecipeDetailsProvider from '../context/RecipeDetailsProvider';
import SearchProvider from '../context/SearchProvider';
import { ChildrenType } from '../types';

function TotalProvider({ children }:ChildrenType) {
  return (
    <RecipeDetailsProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </RecipeDetailsProvider>
  );
}

export default TotalProvider;
