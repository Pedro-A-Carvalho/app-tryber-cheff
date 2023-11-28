import { useState } from 'react';
import SearchContext from './SearchContext';

type SearchProviderType = {
  children: React.ReactNode;
};

function SearchProvider({ children }: SearchProviderType) {
  const [values, setValues] = useState({
    search: '',
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevState:any) => (
      {
        ...prevState,
        [event.target.name]: event.target.value,
      }));
  };
  const value = {
    handleChange,
    values };

  return (
    <SearchContext.Provider value={ value }>
      { children }
    </SearchContext.Provider>
  );
}

export default SearchProvider;
