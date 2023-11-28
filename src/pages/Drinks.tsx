import { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from './SearchBar';
import Footer from '../components/Footer';
import SearchContext from '../context/SearchContext';

function Drinks() {
  const { values: { search } } = useContext(SearchContext);
  return (
    <>
      <Header>Drinks</Header>
      <SearchBar
        endIngredients={ `www.thecocktaildb.com/api/json/v1/1/search.php?i=${search}` }
        endName={ `www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}` }
        endFirstLetter={ `www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}` }
      />
      <Footer />
    </>
  );
}

export default Drinks;
