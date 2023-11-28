import SearchProvider from '../context/SearchProvider';
import { ChildrenType } from '../types';

function TotalProvider({ children }:ChildrenType) {
  return (
    <SearchProvider>
      {children}
    </SearchProvider>
  );
}

export default TotalProvider;
