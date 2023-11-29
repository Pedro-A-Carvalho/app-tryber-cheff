import { useContext } from 'react';
import Header from '../components/Header';
import SearchBar from './SearchBar';
import Footer from '../components/Footer';
import SearchContext from '../context/SearchContext';
import Recipes from '../components/Recipes';

function Drinks() {
  const { values: { search } } = useContext(SearchContext);
  return (
    <>
      <Header>Drinks</Header>
      <SearchBar
        endIngredients={ `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${search}` }
        endName={ `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}` }
        endFirstLetter={ `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search}` }
      />
      <Recipes />
      <Footer />
    </>
  );
}

export default Drinks;
