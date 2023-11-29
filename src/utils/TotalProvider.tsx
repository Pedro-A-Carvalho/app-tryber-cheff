import RecipeProvider from '../context/RecipeProvider';
import SearchProvider from '../context/SearchProvider';
import { ChildrenType } from '../types';

function TotalProvider({ children }:ChildrenType) {
  return (
    <RecipeProvider>
      <SearchProvider>
        {children}
      </SearchProvider>
    </RecipeProvider>
  );
}

export default TotalProvider;
