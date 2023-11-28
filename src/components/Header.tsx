import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { HeaderType } from '../types';
import SearchContext from '../context/SearchContext';

function Header({ children }: HeaderType) {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const { values, handleChange } = useContext(SearchContext);

  const searchView = () => {
    const path = window.location.pathname;
    if (path === '/profile'
      || path === '/done-recipes'
      || path === '/favorite-recipes') {
      return true;
    }
  };

  return (
    <div>
      <button onClick={ () => navigate('/profile') }>
        <img
          src="src/images/profileIcon.svg"
          data-testid="profile-top-btn"
          alt="profile"
        />

      </button>
      {
        !searchView()
        && (
          <button onClick={ () => setShowSearch(!showSearch) }>
            <img
              src="src/images/searchIcon.svg"
              data-testid="search-top-btn"
              alt="search"
            />

          </button>
        )
      }
      <h1 data-testid="page-title">{children}</h1>
      {
        showSearch
        && <input
          type="text"
          data-testid="search-input"
          onChange={ handleChange }
          value={ values.search }
          name="search"
        />
      }
    </div>
  );
}

export default Header;
