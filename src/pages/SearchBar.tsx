import React, { useContext, useState } from 'react';
import SearchContext from '../context/SearchContext';
import { SearchBarTypes } from '../types';

function SearchBar({ endIngredients, endName, endFirstLetter }: SearchBarTypes) {
  const { values: { search } } = useContext(SearchContext);
  const [searchType, setSearchType] = useState('');

  const handleSearchTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };

  const handleSearch = async () => {
    let endpoint = '';

    if (searchType === 'ingredient') {
      endpoint = endIngredients;
    } else if (searchType === 'name') {
      endpoint = endName;
    } else if (searchType === 'first-letter') {
      endpoint = endFirstLetter;
      if (search.length > 1) {
        window.alert('Your search must have only 1 (one) character');
      }
    }
    console.log(endpoint);
    const response = await fetch(endpoint);
    const data = await response.json();
    console.log(data);
  };

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            value="ingredient"
            checked={ searchType === 'ingredient' }
            onChange={ handleSearchTypeChange }
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>

        <label>
          <input
            type="radio"
            value="name"
            checked={ searchType === 'name' }
            onChange={ handleSearchTypeChange }
            data-testid="name-search-radio"
          />
          Name
        </label>

        <label>
          <input
            type="radio"
            value="first-letter"
            checked={ searchType === 'first-letter' }
            onChange={ handleSearchTypeChange }
            data-testid="first-letter-search-radio"
          />
          First Letter
        </label>
      </div>

      <button
        type="button"
        onClick={ handleSearch }
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
